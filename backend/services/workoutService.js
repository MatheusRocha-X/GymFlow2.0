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
    console.log('WorkoutService.addExercise called');
    console.log('Workout ID:', workoutId);
    console.log('Exercise Data:', exerciseData);

    // Se order_index não foi fornecido, pegar o próximo índice disponível
    let orderIndex = exerciseData.order_index;
    
    if (orderIndex === undefined || orderIndex === null) {
      console.log('Order index não fornecido, buscando próximo disponível...');
      
      const { data: existingExercises, error: queryError } = await supabase
        .from('exercises')
        .select('order_index')
        .eq('workout_id', workoutId)
        .order('order_index', { ascending: false })
        .limit(1);
      
      if (queryError) {
        console.error('Erro ao buscar exercises existentes:', queryError);
      }
      
      console.log('Exercícios existentes:', existingExercises);
      
      orderIndex = existingExercises && existingExercises.length > 0 
        ? (existingExercises[0].order_index || 0) + 1 
        : 0;
      
      console.log('Order index calculado:', orderIndex);
    }

    const insertData = {
      workout_id: workoutId,
      name: exerciseData.name,
      sets: exerciseData.sets,
      reps: exerciseData.reps,
      rest_time: exerciseData.rest_time || null,
      order_index: orderIndex,
      notes: exerciseData.notes || null
    };

    console.log('Dados para inserção:', insertData);

    const { data, error } = await supabase
      .from('exercises')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('Erro do Supabase:', error);
    } else {
      console.log('Exercício inserido com sucesso:', data);
    }

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
   * Registrar treino realizado com dados de performance
   */
  async logWorkout(userId, workoutId, notes = null, performanceStats = {}) {
    // Buscar informações do treino
    const { data: workout } = await supabase
      .from('workouts')
      .select('name')
      .eq('id', workoutId)
      .single();

    // Calcular volume total se houver workoutLog
    let totalVolume = 0;
    if (performanceStats.workoutLog && Array.isArray(performanceStats.workoutLog)) {
      totalVolume = performanceStats.workoutLog.reduce((sum, log) => {
        return sum + ((log.reps || 0) * (log.weight || 0));
      }, 0);
    }

    const historyEntry = {
      user_id: userId,
      workout_id: workoutId,
      workout_name: workout?.name || 'Treino',
      notes: notes,
      duration: performanceStats.duration || null,
      total_rest_time: performanceStats.totalRestTime || 0,
      total_sets: performanceStats.sets || 0,
      total_exercises: performanceStats.exercises || 0,
      total_volume: totalVolume,
      performance_data: performanceStats.workoutLog || null
    };

    const { data, error } = await supabase
      .from('workout_history')
      .insert([historyEntry])
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
