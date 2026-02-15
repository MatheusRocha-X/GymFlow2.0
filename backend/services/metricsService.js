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
      .order('date', { ascending: false })
      .order('measured_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  /**
   * Buscar estatísticas do usuário
   */
  async getUserStats(userId) {
    const [latestResult, firstResult] = await Promise.all([
      supabase
        .from('body_metrics')
        .select('weight, body_fat_percentage, measured_at, date')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .order('measured_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('body_metrics')
        .select('weight, body_fat_percentage, measured_at, date')
        .eq('user_id', userId)
        .order('date', { ascending: true })
        .order('measured_at', { ascending: true })
        .limit(1)
        .maybeSingle()
    ]);

    const latestError = latestResult.error;
    const firstError = firstResult.error;
    if (latestError || firstError) {
      return {
        data: {
          current: null,
          previous: null,
          weightDiff: null,
          fatDiff: null
        },
        error: latestError || firstError
      };
    }

    const current = latestResult.data;
    const baseline = firstResult.data;

    if (!current) {
      return {
        data: {
          current: null,
          previous: null,
          weightDiff: null,
          fatDiff: null
        },
        error: null
      };
    }

    const weightDiff = baseline && current ? parseFloat((current.weight - baseline.weight).toFixed(2)) : null;
    const fatDiff = baseline && current.body_fat_percentage && baseline.body_fat_percentage
      ? parseFloat((current.body_fat_percentage - baseline.body_fat_percentage).toFixed(2))
      : null;

    return {
      data: {
        current,
        previous: baseline,
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
      .order('date', { ascending: false })
      .order('measured_at', { ascending: false })
      .limit(1)
      .single();

    return { data, error };
  }
};
