/**
 * Configuração do Telegram Bot
 */

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN é obrigatório no .env');
}

// Criar bot (sem polling, pois usaremos apenas para enviar mensagens)
export const bot = new TelegramBot(token, { polling: false });

/**
 * Envia mensagem via Telegram
 * @param {number} chatId - ID do chat do Telegram
 * @param {string} message - Mensagem a ser enviada
 * @param {object} options - Opções adicionais (parse_mode, etc.)
 */
export async function sendTelegramMessage(chatId, message, options = {}) {
  try {
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      ...options
    });
    console.log(`✅ Mensagem enviada para chat_id ${chatId}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao enviar mensagem para ${chatId}:`, error.message);
    return false;
  }
}

/**
 * Formata mensagem de lembrete de água
 */
export function formatWaterReminderMessage(currentProgress, waterGoal) {
  const percentage = Math.round((currentProgress / waterGoal) * 100);
  const emoji = percentage >= 100 ? '🎉' : percentage >= 75 ? '💪' : percentage >= 50 ? '👍' : '💧';
  
  return `${emoji} <b>Hora de beber água!</b>\n\n` +
         `💧 Tome 200ml de água\n` +
         `📊 Progresso hoje: ${percentage}%\n` +
         `🎯 Meta: ${currentProgress}ml / ${waterGoal}ml`;
}

/**
 * Formata mensagem de lembrete de treino
 */
export function formatWorkoutReminderMessage(workoutName) {
  return `💪 <b>Hora do Treino ${workoutName}!</b>\n\n` +
         `É hora de treinar! Bora manter a consistência! 🔥\n\n` +
         `Acesse o app para ver seus exercícios.`;
}

/**
 * Formata mensagem de boas-vindas
 */
export function formatWelcomeMessage(userName) {
  return `👋 <b>Bem-vindo ao GymFlow, ${userName}!</b>\n\n` +
         `🏋️ Seu assistente pessoal de treinos e hidratação.\n\n` +
         `Você receberá lembretes de:\n` +
         `• 💧 Hidratação durante o dia\n` +
         `• 💪 Treinos nos horários agendados\n\n` +
         `Configure tudo pelo aplicativo web!`;
}

/**
 * Formata mensagem de lembrete criado
 */
export function formatReminderCreatedMessage(reminderType, reminderName) {
  const icons = {
    water: '💧',
    workout: '💪',
    custom: '🔔'
  };
  
  const icon = icons[reminderType] || '🔔';
  const name = reminderName || (reminderType === 'water' ? 'Hidratação' : 'Lembrete');
  
  return `${icon} <b>Lembrete Criado!</b>\n\n` +
         `<i>${name}</i> foi ativado com sucesso.\n\n` +
         `Você começará a receber notificações nos horários configurados! ⏰`;
}

/**
 * Formata mensagem de lembrete ativado/desativado
 */
export function formatReminderToggledMessage(reminderType, reminderName, isActive) {
  const icons = {
    water: '💧',
    workout: '💪',
    custom: '🔔'
  };
  
  const icon = icons[reminderType] || '🔔';
  const name = reminderName || (reminderType === 'water' ? 'Hidratação' : 'Lembrete');
  const status = isActive ? 'Ativado' : 'Pausado';
  const emoji = isActive ? '✅' : '⏸️';
  
  return `${icon} <b>Lembrete ${status}!</b>\n\n` +
         `<i>${name}</i> foi ${isActive ? 'ativado' : 'pausado'}. ${emoji}\n\n` +
         `${isActive ? 'Você voltará a receber notificações nos horários configurados.' : 'Você não receberá notificações até reativar este lembrete.'}`;
}
