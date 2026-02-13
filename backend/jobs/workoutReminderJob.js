/**
 * Job de Lembretes de Treino
 * Verifica a cada minuto se há treinos agendados para o horário atual
 */

import cron from 'node-cron';
import { reminderService } from '../services/reminderService.js';
import { sendTelegramMessage, formatWorkoutReminderMessage } from '../config/telegram.js';

/**
 * Mapa para controlar lembretes já enviados hoje
 * Estrutura: Map<reminderId, lastSentDate>
 */
const sentRemindersToday = new Map();

/**
 * Verifica se o lembrete já foi enviado hoje
 */
function wasReminderSentToday(reminderId) {
  const lastSent = sentRemindersToday.get(reminderId);
  
  if (!lastSent) return false;
  
  const today = new Date().toDateString();
  const lastSentDate = new Date(lastSent).toDateString();
  
  return today === lastSentDate;
}

/**
 * Verifica se o horário atual corresponde ao horário do lembrete (com margem de 1 minuto)
 */
function isReminderTime(reminderTime, userTimezone) {
  const now = new Date();
  const userTime = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));
  const currentTime = `${String(userTime.getHours()).padStart(2, '0')}:${String(userTime.getMinutes()).padStart(2, '0')}`;
  const reminderHourMin = reminderTime.substring(0, 5); // HH:MM
  
  return currentTime === reminderHourMin;
}

/**
 * Processar lembretes de treino
 */
async function processWorkoutReminders() {
  try {
    // Buscar lembretes ativos para hoje
    const { data: reminders, error } = await reminderService.getTodayActiveReminders();
    
    if (error) {
      console.error('❌ Erro ao buscar lembretes:', error);
      return;
    }

    if (!reminders || reminders.length === 0) {
      return;
    }

    console.log(`🔍 Verificando ${reminders.length} lembretes de treino...`);

    for (const reminder of reminders) {
      // Verificar se já foi enviado hoje
      if (wasReminderSentToday(reminder.id)) {
        continue;
      }

      // Usar timezone do usuário
      const userTimezone = reminder.users?.timezone || 'America/Sao_Paulo';
      
      // Verificar se está no horário
      if (!isReminderTime(reminder.time, userTimezone)) {
        continue;
      }

      // Enviar notificação via Telegram
      const workoutName = reminder.workouts?.name || 'Treino';
      const message = formatWorkoutReminderMessage(workoutName);

      const sent = await sendTelegramMessage(
        reminder.users.telegram_chat_id,
        message
      );

      if (sent) {
        // Marcar como enviado hoje
        sentRemindersToday.set(reminder.id, new Date());
        
        console.log(`💪 Lembrete de treino "${workoutName}" enviado para ${reminder.users.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao processar lembretes de treino:', error);
  }
}

/**
 * Limpar cache de lembretes enviados (executar à meia-noite)
 */
function clearSentRemindersCache() {
  sentRemindersToday.clear();
  console.log('🔄 Cache de lembretes enviados limpo (novo dia)');
}

/**
 * Iniciar cron jobs
 */
export function startWorkoutReminderJob() {
  console.log('🚀 Iniciando job de lembretes de treino...');
  
  // Verificar lembretes a cada 1 minuto
  cron.schedule('* * * * *', () => {
    processWorkoutReminders();
  });

  // Limpar cache à meia-noite
  cron.schedule('0 0 * * *', () => {
    clearSentRemindersCache();
  });

  console.log('✅ Job de lembretes de treino ativo (verifica a cada 1 minuto)');
}
