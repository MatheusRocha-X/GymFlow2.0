/**
 * Service de Lembretes Unificado v2.0
 */

import { supabase } from '../config/supabase.js';

export const reminderService = {
  /**
   * Criar lembrete (água, treino ou customizado)
   */
  async createReminder(userId, reminderData) {
    const { data, error } = await supabase
      .from('reminders')
      .insert([{
        user_id: userId,
        ...reminderData
      }])
      .select(`
        *,
        users(telegram_chat_id)
      `)
      .single();

    // Flatten telegram_chat_id para o objeto principal
    if (data && data.users) {
      data.telegram_chat_id = data.users.telegram_chat_id;
      delete data.users;
    }

    return { data, error };
  },

  /**
   * Buscar lembretes do usuário
   */
  async getUserReminders(userId, type = null) {
    let query = supabase
      .from('reminders')
      .select(`
        *,
        workouts(name, description)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    return { data, error };
  },

  /**
   * Buscar lembrete específico
   */
  async getReminderById(reminderId) {
    const { data, error } = await supabase
      .from('reminders')
      .select(`
        *,
        workouts(name, description)
      `)
      .eq('id', reminderId)
      .single();

    return { data, error };
  },

  /**
   * Buscar lembretes ativos para envio
   */
  async getActiveReminders() {
    const { data, error } = await supabase
      .from('reminders')
      .select(`
        *,
        users(telegram_chat_id, name, daily_water_goal, timezone),
        workouts(name)
      `)
      .eq('is_active', true);

    return { data, error };
  },

  /**
   * Buscar lembretes ativos para hoje (usado pelo workoutReminderJob)
   */
  async getTodayActiveReminders() {
    const { data, error } = await supabase
      .from('reminders')
      .select(`
        *,
        users(telegram_chat_id, name, timezone),
        workouts(name)
      `)
      .eq('is_active', true)
      .in('type', ['workout', 'custom']);

    return { data, error };
  },

  /**
   * Atualizar lembrete
   */
  async updateReminder(reminderId, updates) {
    const { data, error } = await supabase
      .from('reminders')
      .update(updates)
      .eq('id', reminderId)
      .select(`
        *,
        users(telegram_chat_id)
      `)
      .single();

    // Flatten telegram_chat_id para o objeto principal
    if (data && data.users) {
      data.telegram_chat_id = data.users.telegram_chat_id;
      delete data.users;
    }

    return { data, error };
  },

  /**
   * Deletar lembrete
   */
  async deleteReminder(reminderId) {
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', reminderId);

    return { error };
  },

  /**
   * Ativar/desativar lembrete
   */
  async toggleReminder(reminderId, isActive) {
    return this.updateReminder(reminderId, { is_active: isActive });
  },

  /**
   * Atualizar timestamp de último envio
   */
  async updateLastSent(reminderId) {
    return this.updateReminder(reminderId, { 
      last_sent_at: new Date().toISOString() 
    });
  },

  /**
   * Deletar todos os lembretes de um usuário
   */
  async deleteAllUserReminders(userId) {
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('user_id', userId);

    return { error };
  }
};
