/**
 * Service de Métricas Corporais (Evolução)
 */

import { supabase } from '../config/supabase.js';

export const metricsService = {
  /**
   * Criar nova medição
   */
  async createMetric(userId, metricData) {
    const { data, error } = await supabase
      .from('body_metrics')
      .insert([{
        user_id: userId,
        weight: metricData.weight,
        body_fat_percentage: metricData.body_fat_percentage || null,
        notes: metricData.notes || null,
        date: metricData.date || new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    return { data, error };
  },

  /**
   * Buscar métricas do usuário
   */
  async getUserMetrics(userId, limit = 30) {
    const { data, error } = await supabase
      .from('body_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('measured_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  /**
   * Buscar estatísticas do usuário
   */
  async getUserStats(userId) {
    const { data, error } = await supabase
      .from('body_metrics')
      .select('weight, body_fat_percentage, measured_at')
      .eq('user_id', userId)
      .order('measured_at', { ascending: false })
      .limit(2);

    if (error || !data || data.length === 0) {
      return {
        data: {
          current: null,
          previous: null,
          weightDiff: null,
          fatDiff: null
        },
        error
      };
    }

    const current = data[0];
    const previous = data.length > 1 ? data[1] : null;

    const weightDiff = previous ? parseFloat((current.weight - previous.weight).toFixed(2)) : null;
    const fatDiff = previous && current.body_fat_percentage && previous.body_fat_percentage
      ? parseFloat((current.body_fat_percentage - previous.body_fat_percentage).toFixed(2))
      : null;

    return {
      data: {
        current,
        previous,
        weightDiff,
        fatDiff
      },
      error: null
    };
  },

  /**
   * Atualizar métrica
   */
  async updateMetric(metricId, updates) {
    const { data, error } = await supabase
      .from('body_metrics')
      .update(updates)
      .eq('id', metricId)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Deletar métrica
   */
  async deleteMetric(metricId) {
    const { error } = await supabase
      .from('body_metrics')
      .delete()
      .eq('id', metricId);

    return { error };
  },

  /**
   * Buscar última medição do usuário
   */
  async getLatestMetric(userId) {
    const { data, error } = await supabase
      .from('body_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('measured_at', { ascending: false })
      .limit(1)
      .single();

    return { data, error };
  }
};
