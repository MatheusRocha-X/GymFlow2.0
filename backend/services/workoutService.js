/**
 * Service de Treinos
 */

import { supabase } from '../config/supabase.js';

export const workoutService = {
  /**
   * Criar novo treino
   */
  async createWorkout(userId, workoutData) {
    const { data, error } = await supabase
      .from('workouts')
      .insert([{
        user_id: userId,
        name: workoutData.name,
        description: workoutData.description || null
      }])
      .select()
      .single();

    return { data, error };
  },

  /**
   * Buscar todos treinos do usuário
   */
  async getUserWorkouts(userId) {
    const { data, error } = await supabase
      .from('workouts')
      .select(`
        *,
        exercises(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    return { data, error };
  },

  /**
   * Buscar treino por ID
   */
  async getWorkoutById(workoutId) {
    const { data, error } = await supabase
      .from('workouts')
      .select(`
        *,
        exercises(*)
      `)
      .eq('id', workoutId)
      .single();

    if (data && data.exercises) {
      data.exercises.sort((a, b) => a.order_index - b.order_index);
    }

    return { data, error };
  },

  /**
   * Atualizar treino
   */
  async updateWorkout(workoutId, updates) {
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', workoutId)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Deletar treino
   */
  async deleteWorkout(workoutId) {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', workoutId);

    return { error };
  },

  /**
   * Adicionar exercício ao treino
   */
  async addExercise(workoutId, exerciseData) {
    const { data, error } = await supabase
      .from('exercises')
      .insert([{
        workout_id: workoutId,
        name: exerciseData.name,
        sets: exerciseData.sets,
        reps: exerciseData.reps,
        rest_time: exerciseData.rest_time || null,
        order_index: exerciseData.order_index,
        notes: exerciseData.notes || null
      }])
      .select()
      .single();

    return { data, error };
  },

  /**
   * Atualizar exercício
   */
  async updateExercise(exerciseId, updates) {
    const { data, error } = await supabase
      .from('exercises')
      .update(updates)
      .eq('id', exerciseId)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Deletar exercício
   */
  async deleteExercise(exerciseId) {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', exerciseId);

    return { error };
  },

  /**
   * Registrar treino realizado
   */
  async logWorkout(userId, workoutId, notes = null) {
    // Buscar informações do treino
    const { data: workout } = await supabase
      .from('workouts')
      .select('name')
      .eq('id', workoutId)
      .single();

    const { data, error } = await supabase
      .from('workout_history')
      .insert([{
        user_id: userId,
        workout_id: workoutId,
        workout_name: workout?.name || 'Treino',
        notes: notes
      }])
      .select()
      .single();

    return { data, error };
  },

  /**
   * Buscar histórico de treinos
   */
  async getWorkoutHistory(userId, limit = 30) {
    const { data, error } = await supabase
      .from('workout_history')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    return { data, error };
  }
};
