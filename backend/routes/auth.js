/**
 * Rotas de Autenticação e Usuários
 */

import express from 'express';
import { userService } from '../services/userService.js';
import { sendTelegramMessage, formatWelcomeMessage } from '../config/telegram.js';

const router = express.Router();

/**
 * POST /api/auth/telegram - Login/Registro via Telegram
 */
router.post('/telegram', async (req, res) => {
  try {
    const { telegram_chat_id, telegram_username, name } = req.body;

    if (!telegram_chat_id) {
      return res.status(400).json({ error: 'telegram_chat_id é obrigatório' });
    }

    const { data: user, error, isNewUser } = await userService.findOrCreateByTelegramId(
      telegram_chat_id,
      { username: telegram_username, name: name || 'Usuário' }
    );

    if (error) {
      console.error('Erro ao autenticar usuário:', error);
      return res.status(500).json({ error: 'Erro ao autenticar' });
    }

    // Se é um novo usuário, enviar mensagem de boas-vindas
    if (user && isNewUser) {
      try {
        await sendTelegramMessage(
          telegram_chat_id,
          formatWelcomeMessage(user.name)
        );
        console.log(`✅ Mensagem de boas-vindas enviada para ${user.name}`);
      } catch (telegramError) {
        console.error('Erro ao enviar mensagem do Telegram:', telegramError);
      }
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/users/:userId - Buscar dados do usuário
 */
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data: user, error } = await userService.findById(userId);

    if (error || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * PUT /api/users/:userId/settings - Atualizar configurações do usuário
 */
router.put('/:userId/settings', async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = req.body;

    const { data: user, error } = await userService.updateSettings(userId, settings);

    if (error) {
      console.error('Erro ao atualizar configurações:', error);
      return res.status(500).json({ error: 'Erro ao atualizar configurações' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/users/:userId/clear-data - Limpar todos os dados do usuário
 */
router.delete('/:userId/clear-data', async (req, res) => {
  try {
    const { userId } = req.params;

    const { error } = await userService.clearUserData(userId);

    if (error) {
      console.error('Erro ao limpar dados:', error);
      return res.status(500).json({ error: 'Erro ao limpar dados' });
    }

    res.json({ message: 'Dados limpos com sucesso' });
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/users/:userId/delete-account - Deletar conta permanentemente
 */
router.delete('/:userId/delete-account', async (req, res) => {
  try {
    const { userId } = req.params;

    const { error } = await userService.deleteAccountPermanently(userId);

    if (error) {
      console.error('Erro ao deletar conta:', error);
      return res.status(500).json({ error: 'Erro ao deletar conta' });
    }

    res.json({ message: 'Conta deletada permanentemente' });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
