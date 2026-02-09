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
        }])
        .select()
        .single();

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
  }
};
