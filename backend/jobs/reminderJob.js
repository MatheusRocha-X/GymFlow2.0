/**
 * Job Unificado de Lembretes v2.0
 * Verifica e envia todos os tipos de lembretes (água, treino, customizados)
 */

import cron from 'node-cron';
import { reminderService } from '../services/reminderService.js';
import { hydrationService } from '../services/hydrationService.js';
import { sendTelegramMessage, formatMotivationalMessage } from '../config/telegram.js';
import { getCurrentTimeString, getCurrentDayOfWeek } from '../utils/timezone.js';
import { supabase } from '../config/supabase.js';

// Cache para evitar envios duplicados no mesmo minuto
const sentCache = new Map();

/**
 * Verifica se um lembrete deve ser enviado agora
 */
function shouldSendReminder(reminder) {
  // Usar timezone do usuário (padrão: America/Sao_Paulo se não estiver definido)
  const userTimezone = reminder.users?.timezone || 'America/Sao_Paulo';
  
  // Obter hora atual no timezone do usuário
  const currentTime = getCurrentTimeString(userTimezone);
  const currentDay = getCurrentDayOfWeek(userTimezone);

  const reminderTime = reminder.time.substring(0, 5); // HH:MM

  // Verificar cache para evitar duplicatas
  const now = new Date();
  const cacheKey = `${reminder.id}-${currentTime}-${now.getDate()}`; // incluir data
  if (sentCache.has(cacheKey)) {
    return false;
  }

  // Verificar se o horário atual coincide com o do lembrete
  if (currentTime !== reminderTime) {
    return false;
  }

  // Verificar recorrência
  switch (reminder.recurrence) {
    case 'daily':
      return true;
    
    case 'weekly':
      return reminder.days_of_week && reminder.days_of_week.includes(currentDay);
    
    case 'weekdays':
      return currentDay >= 1 && currentDay <= 5;
    
    case 'weekends':
      return currentDay === 0 || currentDay === 6;
    
    case 'custom':
      return reminder.days_of_week && reminder.days_of_week.includes(currentDay);
    
    default:
      return false;
  }
}

/**
 * Verificar lembretes de água (trabalham com intervalo)
 */
async function checkWaterReminders() {
  try {
    const { data: reminders } = await reminderService.getActiveReminders();
    
    if (!reminders) return;

    const waterReminders = reminders.filter(r => r.type === 'water');

    for (const reminder of waterReminders) {
      // Usar timezone do usuário
      const userTimezone = reminder.users?.timezone || 'America/Sao_Paulo';
      const currentTime = getCurrentTimeString(userTimezone);

      const startTime = reminder.water_start_time?.substring(0, 5) || '08:00';
      const endTime = reminder.water_end_time?.substring(0, 5) || '22:00';
      
      const now = new Date();

      // Verificar se está dentro do horário
      if (currentTime < startTime || currentTime > endTime) {
        continue;
      }

      // Verificar se passou o intervalo desde o último envio
      const interval = reminder.water_interval_minutes || 60;
      const lastSent = reminder.last_sent_at ? new Date(reminder.last_sent_at) : null;

      if (lastSent) {
        // Usar horário real do servidor para calcular intervalo (não depende de timezone)
        const minutesSinceLastSent = (now - lastSent) / 1000 / 60;
        if (minutesSinceLastSent < interval) {
          continue;
        }
      }

      // Enviar lembrete
      const chatId = reminder.users?.telegram_chat_id;
      if (chatId) {
        const amount = reminder.water_amount_ml || 300;
        const goal = reminder.users?.daily_water_goal || 3000;

        // Buscar progresso atual
        const { data: progress } = await hydrationService.getDailyProgress(reminder.user_id);
        const currentAmount = progress?.total_consumed || 0;
        const newAmount = currentAmount + amount;
        const percentage = Math.round((newAmount / goal) * 100);

        const message = `
💧 *Hora de beber água!*

✅ +${amount}ml registrado automaticamente
📊 Progresso: ${newAmount}ml / ${goal}ml (${percentage}%)

Mantenha-se hidratado! 💪
        `;

        const sent = await sendTelegramMessage(chatId, message);
        if (!sent) {
          console.log(`⚠️ Falha ao enviar lembrete de água para usuário ${reminder.users.name}`);
          continue;
        }

        // Registrar no histórico somente após envio confirmado
        await hydrationService.logWater(reminder.user_id, {
          amount,
          source: 'reminder'
        });

        // Atualizar timestamp de último envio somente após envio confirmado
        await reminderService.updateLastSent(reminder.id);

        console.log(`✅ Lembrete de água enviado para usuário ${reminder.users.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao verificar lembretes de água:', error);
  }
}

/**
 * Verificar lembretes de treino e customizados
 */
async function checkScheduledReminders() {
  try {
    const { data: reminders } = await reminderService.getActiveReminders();
    
    if (!reminders) return;

    const scheduledReminders = reminders.filter(r => 
      r.type === 'workout' || r.type === 'custom'
    );

    for (const reminder of scheduledReminders) {
      if (!shouldSendReminder(reminder)) {
        continue;
      }

      const chatId = reminder.users?.telegram_chat_id;
      if (!chatId) continue;

      let message = '';

      if (reminder.type === 'workout') {
        const workoutName = reminder.workouts?.name || 'Treino';
        message = `
🏋️ *Lembrete de Treino*

📋 Treino: ${workoutName}
⏰ Agora é hora de treinar!

${reminder.description || 'Bora malhar! 💪'}
        `;
      } else if (reminder.type === 'custom') {
        message = `
🔔 *${reminder.title}*

${reminder.description || ''}

⏰ ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        `;
      }

      if (message) {
        const sent = await sendTelegramMessage(chatId, message);
        if (!sent) {
          console.log(`⚠️ Falha ao enviar lembrete "${reminder.title}" para ${reminder.users.name}`);
          continue;
        }

        await reminderService.updateLastSent(reminder.id);

        // Adicionar ao cache
        const userTimezone = reminder.users?.timezone || 'America/Sao_Paulo';
        const currentTime = getCurrentTimeString(userTimezone);
        const now = new Date();
        const cacheKey = `${reminder.id}-${currentTime}-${now.getDate()}`;
        sentCache.set(cacheKey, true);

        console.log(`✅ Lembrete "${reminder.title}" enviado para ${reminder.users.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao verificar lembretes agendados:', error);
  }
}

/**
 * Limpar cache a cada hora
 */
function clearCache() {
  sentCache.clear();
  console.log('🧹 Cache de lembretes limpo');
}

/**
 * Enviar mensagem motivacional matinal às 8h
 */
async function sendMotivationalMessages() {
  try {
    // Buscar todos os usuários com telegram_chat_id configurado
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, telegram_chat_id, timezone')
      .not('telegram_chat_id', 'is', null);

    if (error || !users) {
      console.error('❌ Erro ao buscar usuários para mensagem motivacional:', error);
      return;
    }

    for (const user of users) {
      const userTimezone = user.timezone || 'America/Sao_Paulo';
      const currentTime = getCurrentTimeString(userTimezone);
      
      // Verificar se é 8h no timezone do usuário
      if (currentTime === '08:00') {
        const now = new Date();
        const cacheKey = `motivational-${user.id}-${now.getDate()}`;
        
        // Verificar cache para evitar envio duplicado
        if (sentCache.has(cacheKey)) {
          continue;
        }

        const message = formatMotivationalMessage(user.name || 'Campeão');
        await sendTelegramMessage(user.telegram_chat_id, message);
        
        sentCache.set(cacheKey, true);
        console.log(`✅ Mensagem motivacional enviada para ${user.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao enviar mensagens motivacionais:', error);
  }
}

/**
 * Iniciar job de lembretes
 */
export function startReminderJob() {
  // Verificar lembretes de água a cada minuto
  cron.schedule('* * * * *', checkWaterReminders);

  // Verificar outros lembretes a cada minuto
  cron.schedule('* * * * *', checkScheduledReminders);

  // Enviar mensagens motivacionais a cada minuto (verifica timezone)
  cron.schedule('* * * * *', sendMotivationalMessages);

  // Limpar cache a cada hora
  cron.schedule('0 * * * *', clearCache);

  console.log('⏰ Job de lembretes iniciado');
  console.log('☀️ Job de mensagens motivacionais iniciado (8h da manhã)');
}
