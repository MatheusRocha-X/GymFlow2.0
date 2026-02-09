/**
 * Service de Hidratação
 */

import { supabase } from '../config/supabase.js';

export const hydrationService = {
  /**
   * Registrar consumo de água
   */
  async logWater(userId, data) {
    const amount = typeof data === 'number' ? data : data.amount;
    const source = typeof data === 'object' ? (data.source || 'manual') : 'manual';

    const { data: result, error } = await supabase
      .from('hydration_history')
      .insert([{
        user_id: userId,
        amount: amount,
        source: source,
        date: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    return { data: result, error };
  },

  /**
   * Alias para compatibilidade
   */
  async logWaterIntake(userId, amount) {
    return this.logWater(userId, { amount, source: 'manual' });
  },

  /**
   * Buscar progresso diário
   */
  async getDailyProgress(userId, date = null) {
    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('hydration_history')
      .select('amount')
      .eq('user_id', userId)
      .eq('date', targetDate);

    if (error) return { data: null, error };

    const totalConsumed = data.reduce((sum, record) => sum + record.amount, 0);

    // Buscar meta do usuário
    const { data: userData } = await supabase
      .from('users')
      .select('daily_water_goal')
      .eq('id', userId)
      .single();

    const goal = userData?.daily_water_goal || 2000;
    const percentage = Math.round((totalConsumed / goal) * 100);

    return {
      data: {
        date: targetDate,
        total_consumed: totalConsumed,
        goal: goal,
        percentage: percentage
      },
      error: null
    };
  },

  /**
   * Buscar histórico de hidratação (últimos 7 dias)
   */
  async getHistory(userId, days = 7) {
    const { data, error } = await supabase
      .from('hydration_history')
      .select('*')
      .eq('user_id', userId)
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('logged_at', { ascending: false });

    return { data, error };
  },

  /**
   * Buscar histórico agrupado por dia
   */
  async getDailyHistory(userId, days = 7) {
    const { data, error } = await supabase
      .rpc('get_daily_hydration_summary', {
        p_user_id: userId,
        p_days: days
      });

    // Se a função RPC não existir, fazer manualmente
    if (error && error.message.includes('does not exist')) {
      const { data: records } = await supabase
        .from('hydration_history')
        .select('date, amount')
        .eq('user_id', userId)
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (!records) return { data: [], error: null };

      // Agrupar por data
      const grouped = records.reduce((acc, record) => {
        if (!acc[record.date]) {
          acc[record.date] = 0;
        }
        acc[record.date] += record.amount;
        return acc;
      }, {});

      const result = Object.entries(grouped).map(([date, amount]) => ({
        date,
        total_amount: amount
      }));

      return { data: result, error: null };
    }

    return { data, error };
  }
};
