/**
 * Job Unificado de Lembretes v2.0
 * Verifica e envia todos os tipos de lembretes (água, treino, customizados)
 */

import cron from 'node-cron';
import { reminderService } from '../services/reminderService.js';
import { hydrationService } from '../services/hydrationService.js';
import { sendTelegramMessage } from '../config/telegram.js';

// Cache para evitar envios duplicados no mesmo minuto
const sentCache = new Map();

/**
 * Verifica se um lembrete deve ser enviado agora
 */
function shouldSendReminder(reminder) {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const currentDay = now.getDay();const reminderTime = reminder.time.substring(0, 5); // HH:MM

  // Verificar cache para evitar duplicatas
  const cacheKey = `${reminder.id}-${now.toISOString().substring(0, 16)}`; // minuto atual
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
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const startTime = reminder.water_start_time?.substring(0, 5) || '08:00';
      const endTime = reminder.water_end_time?.substring(0, 5) || '22:00';

      // Verificar se está dentro do horário
      if (currentTime < startTime || currentTime > endTime) {
        continue;
      }

      // Verificar se passou o intervalo desde o último envio
      const interval = reminder.water_interval_minutes || 60;
      const lastSent = reminder.last_sent_at ? new Date(reminder.last_sent_at) : null;

      if (lastSent) {
        const minutesSinceLastSent = (now - lastSent) / 1000 / 60;
        if (minutesSinceLastSent < interval) {
          continue;
        }
      }

      // Enviar lembrete
      const chatId = reminder.users?.telegram_chat_id;
      if (chatId) {
        const amount = reminder.water_amount_ml || 200;
        const goal = reminder.users?.daily_water_goal || 2000;

        const message = `
💧 *Hora de beber água!*

🥤 Sugestão: ${amount}ml
🎯 Meta diária: ${goal}ml

Mantenha-se hidratado! 💪
        `;

        await sendTelegramMessage(chatId, message);

        // Registrar no histórico automaticamente
        await hydrationService.logWater(reminder.user_id, {
          amount,
          source: 'reminder'
        });

        // Atualizar timestamp de último envio
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
        await sendTelegramMessage(chatId, message);
        await reminderService.updateLastSent(reminder.id);

        // Adicionar ao cache
        const now = new Date();
        const cacheKey = `${reminder.id}-${now.toISOString().substring(0, 16)}`;
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
 * Iniciar job de lembretes
 */
export function startReminderJob() {
  // Verificar lembretes de água a cada minuto
  cron.schedule('* * * * *', checkWaterReminders);

  // Verificar outros lembretes a cada minuto
  cron.schedule('* * * * *', checkScheduledReminders);

  // Limpar cache a cada hora
  cron.schedule('0 * * * *', clearCache);

  console.log('⏰ Job de lembretes iniciado');
}
