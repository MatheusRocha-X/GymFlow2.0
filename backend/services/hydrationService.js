/**
 * Hydration service
 */

import { supabase } from '../config/supabase.js';

export const hydrationService = {
  /**
   * Fetch user timezone (fallback: America/Sao_Paulo).
   */
  async getUserTimezone(userId) {
    const { data } = await supabase
      .from('users')
      .select('timezone')
      .eq('id', userId)
      .single();

    return data?.timezone || 'America/Sao_Paulo';
  },

  /**
   * Returns local date in YYYY-MM-DD for a timezone.
   */
  getDateInTimezone(timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const parts = formatter.formatToParts(new Date());
    const values = {};

    for (const part of parts) {
      if (part.type !== 'literal') values[part.type] = part.value;
    }

    return `${values.year}-${values.month}-${values.day}`;
  },

  /**
   * Log water intake.
   */
  async logWater(userId, data) {
    const amount = typeof data === 'number' ? data : data.amount;
    const source = typeof data === 'object' ? (data.source || 'manual') : 'manual';
    const timezone = await this.getUserTimezone(userId);
    const localDate = this.getDateInTimezone(timezone);

    const { data: result, error } = await supabase
      .from('hydration_history')
      .insert([
        {
          user_id: userId,
          amount,
          source,
          date: localDate
        }
      ])
      .select()
      .single();

    return { data: result, error };
  },

  /**
   * Alias for compatibility.
   */
  async logWaterIntake(userId, amount) {
    return this.logWater(userId, { amount, source: 'manual' });
  },

  /**
   * Fetch daily progress.
   */
  async getDailyProgress(userId, date = null) {
    const timezone = await this.getUserTimezone(userId);
    const targetDate = date || this.getDateInTimezone(timezone);

    const { data, error } = await supabase
      .from('hydration_history')
      .select('amount')
      .eq('user_id', userId)
      .eq('date', targetDate);

    if (error) return { data: null, error };

    const totalConsumed = data.reduce((sum, record) => sum + record.amount, 0);

    const { data: userData } = await supabase
      .from('users')
      .select('daily_water_goal')
      .eq('id', userId)
      .single();

    const goal = userData?.daily_water_goal || 3000;
    const percentage = Math.round((totalConsumed / goal) * 100);

    return {
      data: {
        date: targetDate,
        total_consumed: totalConsumed,
        goal,
        percentage
      },
      error: null
    };
  },

  /**
   * Fetch hydration history.
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
   * Fetch grouped daily hydration history.
   */
  async getDailyHistory(userId, days = 7) {
    const { data, error } = await supabase.rpc('get_daily_hydration_summary', {
      p_user_id: userId,
      p_days: days
    });

    if (error && error.message.includes('does not exist')) {
      const { data: records } = await supabase
        .from('hydration_history')
        .select('date, amount')
        .eq('user_id', userId)
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (!records) return { data: [], error: null };

      const grouped = records.reduce((acc, record) => {
        if (!acc[record.date]) acc[record.date] = 0;
        acc[record.date] += record.amount;
        return acc;
      }, {});

      const result = Object.entries(grouped).map(([day, amount]) => ({
        date: day,
        total_amount: amount
      }));

      return { data: result, error: null };
    }

    return { data, error };
  }
};
