/**
 * Rotas de Hidratação
 */

import express from 'express';
import { hydrationService } from '../services/hydrationService.js';

const router = express.Router();

/**
 * POST /api/hydration/log - Registrar consumo de água
 */
router.post('/log', async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ error: 'user_id e amount são obrigatórios' });
    }

    const { data, error } = await hydrationService.logWaterIntake(user_id, amount);

    if (error) {
      console.error('Erro ao registrar água:', error);
      return res.status(500).json({ error: 'Erro ao registrar água' });
    }

    // Retornar progresso atualizado
    const { data: progress } = await hydrationService.getDailyProgress(user_id);

    res.json({ 
      logged: data,
      progress 
    });
  } catch (error) {
    console.error('Erro ao registrar água:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/hydration/progress/:userId - Obter progresso diário
 */
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    const { data, error } = await hydrationService.getDailyProgress(userId, date);

    if (error) {
      console.error('Erro ao buscar progresso:', error);
      return res.status(500).json({ error: 'Erro ao buscar progresso' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/hydration/history/:userId - Obter histórico
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days } = req.query;

    const { data, error } = await hydrationService.getHistory(
      userId, 
      days ? parseInt(days) : 7
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

/**
 * GET /api/hydration/daily-summary/:userId - Resumo diário
 */
router.get('/daily-summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { days } = req.query;

    const { data, error } = await hydrationService.getDailyHistory(
      userId,
      days ? parseInt(days) : 7
    );

    if (error) {
      console.error('Erro ao buscar resumo:', error);
      return res.status(500).json({ error: 'Erro ao buscar resumo' });
    }

    res.json({ summary: data });
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
