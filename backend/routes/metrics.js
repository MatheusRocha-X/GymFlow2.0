/**
 * Rotas de Métricas Corporais (Evolução)
 */

import express from 'express';
import { metricsService } from '../services/metricsService.js';

const router = express.Router();

/**
 * POST /api/metrics - Criar nova medição
 */
router.post('/', async (req, res) => {
  try {
    const { user_id, weight, body_fat_percentage, notes, date } = req.body;

    if (!user_id || !weight) {
      return res.status(400).json({ 
        error: 'user_id e weight são obrigatórios' 
      });
    }

    const { data, error } = await metricsService.createMetric(user_id, {
      weight,
      body_fat_percentage,
      notes,
      date
    });

    if (error) {
      console.error('Erro ao criar métrica:', error);
      return res.status(500).json({ error: 'Erro ao criar métrica' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao criar métrica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/metrics/user/:userId - Buscar métricas do usuário
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit } = req.query;
    
    const { data, error } = await metricsService.getUserMetrics(
      userId, 
      limit ? parseInt(limit) : 30
    );

    if (error) {
      console.error('Erro ao buscar métricas:', error);
      return res.status(500).json({ error: 'Erro ao buscar métricas' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/metrics/stats/:userId - Buscar estatísticas do usuário
 */
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await metricsService.getUserStats(userId);

    if (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * PUT /api/metrics/:metricId - Atualizar métrica
 */
router.put('/:metricId', async (req, res) => {
  try {
    const { metricId } = req.params;
    const updates = req.body;

    const { data, error } = await metricsService.updateMetric(metricId, updates);

    if (error) {
      console.error('Erro ao atualizar métrica:', error);
      return res.status(500).json({ error: 'Erro ao atualizar métrica' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao atualizar métrica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/metrics/:metricId - Deletar métrica
 */
router.delete('/:metricId', async (req, res) => {
  try {
    const { metricId } = req.params;
    const { error } = await metricsService.deleteMetric(metricId);

    if (error) {
      console.error('Erro ao deletar métrica:', error);
      return res.status(500).json({ error: 'Erro ao deletar métrica' });
    }

    res.json({ message: 'Métrica deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar métrica:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
