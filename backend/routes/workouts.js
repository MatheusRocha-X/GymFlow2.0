/**
 * Rotas de Treinos
 */

import express from 'express';
import { workoutService } from '../services/workoutService.js';

const router = express.Router();

/**
 * POST /api/workouts - Criar novo treino
 */
router.post('/', async (req, res) => {
  try {
    const { user_id, name, description } = req.body;

    if (!user_id || !name) {
      return res.status(400).json({ error: 'user_id e name são obrigatórios' });
    }

    const { data, error } = await workoutService.createWorkout(user_id, {
      name,
      description
    });

    if (error) {
      console.error('Erro ao criar treino:', error);
      return res.status(500).json({ error: 'Erro ao criar treino' });
    }

    res.json({ workout: data });
  } catch (error) {
    console.error('Erro ao criar treino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/workouts/user/:userId - Buscar treinos do usuário
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await workoutService.getUserWorkouts(userId);

    if (error) {
      console.error('Erro ao buscar treinos:', error);
      return res.status(500).json({ error: 'Erro ao buscar treinos' });
    }

    res.json({ workouts: data });
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/workouts/:workoutId - Buscar treino específico
 */
router.get('/:workoutId', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { data, error } = await workoutService.getWorkoutById(workoutId);

    if (error || !data) {
      return res.status(404).json({ error: 'Treino não encontrado' });
    }

    res.json({ workout: data });
  } catch (error) {
    console.error('Erro ao buscar treino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * PUT /api/workouts/:workoutId - Atualizar treino
 */
router.put('/:workoutId', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const updates = req.body;

    const { data, error } = await workoutService.updateWorkout(workoutId, updates);

    if (error) {
      console.error('Erro ao atualizar treino:', error);
      return res.status(500).json({ error: 'Erro ao atualizar treino' });
    }

    res.json({ workout: data });
  } catch (error) {
    console.error('Erro ao atualizar treino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/workouts/:workoutId - Deletar treino
 */
router.delete('/:workoutId', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { error } = await workoutService.deleteWorkout(workoutId);

    if (error) {
      console.error('Erro ao deletar treino:', error);
      return res.status(500).json({ error: 'Erro ao deletar treino' });
    }

    res.json({ message: 'Treino deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar treino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/workouts/:workoutId/exercises - Adicionar exercício
 */
router.post('/:workoutId/exercises', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const exerciseData = req.body;

    console.log('=== Adicionando exercício ===');
    console.log('Workout ID:', workoutId);
    console.log('Exercise Data:', JSON.stringify(exerciseData, null, 2));

    // Validação básica
    if (!exerciseData.name || !exerciseData.sets || !exerciseData.reps) {
      console.error('Validação falhou:', {
        hasName: !!exerciseData.name,
        hasSets: !!exerciseData.sets,
        hasReps: !!exerciseData.reps
      });
      return res.status(400).json({ 
        error: 'name, sets e reps são obrigatórios',
        received: exerciseData 
      });
    }

    const { data, error } = await workoutService.addExercise(workoutId, exerciseData);

    if (error) {
      console.error('Erro do Supabase ao adicionar exercício:', error);
      console.error('Workout ID:', workoutId);
      console.error('Exercise Data:', exerciseData);
      return res.status(500).json({ 
        error: 'Erro ao adicionar exercício',
        details: error.message || error.toString()
      });
    }

    console.log('Exercício adicionado com sucesso:', data);
    res.json({ exercise: data });
  } catch (error) {
    console.error('Exception ao adicionar exercício:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

/**
 * PUT /api/workouts/exercises/:exerciseId - Atualizar exercício
 */
router.put('/exercises/:exerciseId', async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const updates = req.body;

    const { data, error } = await workoutService.updateExercise(exerciseId, updates);

    if (error) {
      console.error('Erro ao atualizar exercício:', error);
      return res.status(500).json({ error: 'Erro ao atualizar exercício' });
    }

    res.json({ exercise: data });
  } catch (error) {
    console.error('Erro ao atualizar exercício:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/workouts/exercises/:exerciseId - Deletar exercício
 */
router.delete('/exercises/:exerciseId', async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const { error } = await workoutService.deleteExercise(exerciseId);

    if (error) {
      console.error('Erro ao deletar exercício:', error);
      return res.status(500).json({ error: 'Erro ao deletar exercício' });
    }

    res.json({ message: 'Exercício deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar exercício:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/workouts/:workoutId/complete - Marcar treino como realizado
 */
router.post('/:workoutId/complete', async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { user_id, notes, duration, totalRestTime, exercises, sets, workoutLog } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id é obrigatório' });
    }

    const performanceStats = {
      duration,
      totalRestTime,
      exercises,
      sets,
      workoutLog
    };

    const { data, error } = await workoutService.logWorkout(user_id, workoutId, notes, performanceStats);

    if (error) {
      console.error('Erro ao registrar treino:', error);
      return res.status(500).json({ error: 'Erro ao registrar treino' });
    }

    res.json({ logged: data });
  } catch (error) {
    console.error('Erro ao registrar treino:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/workouts/history/:userId - Histórico de treinos
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;

    const { data, error } = await workoutService.getWorkoutHistory(
      userId,
      limit ? parseInt(limit) : 30
    );

    if (error) {
      console.error('Erro ao buscar histórico:', error);
      return res.status(500).json({ error: 'Erro ao buscar histórico' });
    }

    res.json({ history: data });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
