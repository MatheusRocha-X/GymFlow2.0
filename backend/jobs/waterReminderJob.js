/**
 * Job de Lembretes de Água
 * Verifica a cada minuto se algum usuário deve receber lembrete de hidratação
 */

import cron from 'node-cron';
import { userService } from '../services/userService.js';
import { hydrationService } from '../services/hydrationService.js';
import { sendTelegramMessage, formatWaterReminderMessage } from '../config/telegram.js';

/**
 * Verifica se está dentro do horário configurado pelo usuário
 */
function isWithinReminderTime(user) {
  const now = new Date();
  const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
  
  return currentTime >= user.water_reminder_start_time && 
         currentTime <= user.water_reminder_end_time;
}

/**
 * Verifica se deve enviar lembrete baseado no intervalo
 */
function shouldSendReminder(user, lastReminderTime) {
  if (!lastReminderTime) return true;
  
  const now = new Date();
  const minutesSinceLastReminder = (now - lastReminderTime) / 1000 / 60;
  
  return minutesSinceLastReminder >= user.water_reminder_interval;
}

// Mapa para rastrear último envio por usuário
const lastReminderMap = new Map();

/**
 * Processar lembretes de água
 */
async function processWaterReminders() {
  try {
    // Buscar todos usuários com lembretes ativos
    const { data: users, error } = await userService.findAllWithWaterReminders();
    
    if (error) {
      console.error('❌ Erro ao buscar usuários:', error);
      return;
    }

    if (!users || users.length === 0) {
      return;
    }

    console.log(`🔍 Verificando lembretes de água para ${users.length} usuários...`);

    for (const user of users) {
      // Verificar se está no horário configurado
      if (!isWithinReminderTime(user)) {
        continue;
      }

      // Verificar intervalo desde último lembrete
      const lastReminder = lastReminderMap.get(user.id);
      if (!shouldSendReminder(user, lastReminder)) {
        continue;
      }

      // Buscar progresso atual do dia
      const { data: progress } = await hydrationService.getDailyProgress(user.id);
      
      if (!progress) continue;

      // Se já atingiu a meta, não enviar mais lembretes hoje
      if (progress.percentage >= 100) {
        console.log(`✅ Usuário ${user.name} já atingiu a meta diária!`);
        continue;
      }

      // Enviar lembrete via Telegram
      const message = formatWaterReminderMessage(
        progress.total_consumed,
        progress.goal
      );

      const sent = await sendTelegramMessage(user.telegram_chat_id, message);

      if (sent) {
        // Atualizar timestamp do último lembrete
        lastReminderMap.set(user.id, new Date());
        
        // Incrementar automaticamente 200ml
        await hydrationService.logWaterIntake(user.id, 200);
        
        console.log(`💧 Lembrete de água enviado para ${user.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao processar lembretes de água:', error);
  }
}

/**
 * Iniciar cron job - verifica a cada 1 minuto
 */
export function startWaterReminderJob() {
  console.log('🚀 Iniciando job de lembretes de água...');
  
  // Executar a cada 1 minuto
  cron.schedule('* * * * *', () => {
    processWaterReminders();
  });

  console.log('✅ Job de lembretes de água ativo (verifica a cada 1 minuto)');
}
