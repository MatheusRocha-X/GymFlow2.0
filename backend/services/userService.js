/**
 * Service de Usuários
 */

import { supabase } from '../config/supabase.js';

export const userService = {
  /**
   * Buscar ou criar usuário por chat_id do Telegram
   */
  async findOrCreateByTelegramId(telegramChatId, userData = {}) {
    try {
      // Verificar se usuário já existe
      const { data: existingUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_chat_id', telegramChatId)
        .single();

      if (existingUser) {
        return { data: existingUser, error: null, isNewUser: false };
      }

      // Criar novo usuário
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          telegram_chat_id: telegramChatId,
          telegram_username: userData.username || null,
          name: userData.name || 'Usuário',
          daily_water_goal: 3000 // Meta padrão de 3L
        }])
        .select()
        .single();

      // Registrar hidratação inicial de 500ml para começar o dia
      if (newUser && !createError) {
        await supabase
          .from('hydration_history')
          .insert([{
            user_id: newUser.id,
            amount: 500,
            source: 'auto',
            date: new Date().toISOString().split('T')[0]
          }]);
      }

      return { data: newUser, error: createError, isNewUser: true };
    } catch (error) {
      console.error('Erro em findOrCreateByTelegramId:', error);
      return { data: null, error, isNewUser: false };
    }
  },

  /**
   * Buscar usuário por ID
   */
  async findById(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  /**
   * Atualizar configurações do usuário
   */
  async updateSettings(userId, settings) {
    const updateData = {};
    
    if (settings.daily_water_goal !== undefined) {
      updateData.daily_water_goal = settings.daily_water_goal;
    }
    if (settings.name !== undefined) {
      updateData.name = settings.name;
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Limpar todos os dados do usuário
   */
  async clearUserData(userId) {
    const { error } = await supabase
      .rpc('clear_user_data', { p_user_id: userId });

    return { error };
  },

  /**
   * Deletar conta permanentemente (incluindo usuário)
   */
  async deleteAccountPermanently(userId) {
    const { error } = await supabase
      .rpc('delete_account_permanently', { p_user_id: userId });

    return { error };
  },

  /**
   * Buscar todos usuários com lembretes de água ativos
   */
  async findAllWithWaterReminders() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        telegram_chat_id,
        daily_water_goal,
        timezone
      `)
      .not('telegram_chat_id', 'is', null);

    // Buscar lembretes de água ativos para cada usuário
    if (data && data.length > 0) {
      const userIds = data.map(u => u.id);
      const { data: reminders } = await supabase
        .from('reminders')
        .select('*')
        .eq('type', 'water')
        .eq('is_active', true)
        .in('user_id', userIds);

      // Combinar dados
      const usersWithReminders = data.map(user => {
        const reminder = reminders?.find(r => r.user_id === user.id);
        if (reminder) {
          return {
            ...user,
            water_reminder_start_time: reminder.water_start_time || '08:00:00',
            water_reminder_end_time: reminder.water_end_time || '22:00:00',
            water_reminder_interval: reminder.water_interval_minutes || 60,
            water_amount_ml: reminder.water_amount_ml || 300
          };
        }
        return null;
      }).filter(Boolean);

      return { data: usersWithReminders, error: null };
    }

    return { data: [], error };
  }
};
