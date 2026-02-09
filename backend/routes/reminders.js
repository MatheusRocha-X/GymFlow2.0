/**
 * Rotas de Lembretes Unificados v2.0
 */

import express from 'express';
import { reminderService } from '../services/reminderService.js';
import { sendTelegramMessage, formatReminderCreatedMessage, formatReminderToggledMessage } from '../config/telegram.js';

const router = express.Router();

/**
 * POST /api/reminders - Criar lembrete (água, treino ou customizado)
 */
router.post('/', async (req, res) => {
  try {
    const { user_id, type, ...reminderData } = req.body;

    if (!user_id || !type) {
      return res.status(400).json({ 
        error: 'user_id e type são obrigatórios' 
      });
    }

    // Validar tipo
    if (!['water', 'workout', 'custom'].includes(type)) {
      return res.status(400).json({
        error: 'type deve ser: water, workout ou custom'
      });
    }

    const { data, error } = await reminderService.createReminder(user_id, {
      type,
      ...reminderData
    });

    if (error) {
      console.error('Erro ao criar lembrete:', error);
      return res.status(500).json({ error: 'Erro ao criar lembrete' });
    }

    console.log(`✅ Lembrete criado: ${type} - ${reminderData.title || 'Sem título'}`);
    
    // Enviar notificação do Telegram
    if (data && data.telegram_chat_id) {
      try {
        const message = formatReminderCreatedMessage(type, reminderData.title);
        await sendTelegramMessage(data.telegram_chat_id, message);
        console.log(`📱 Notificação enviada: Lembrete criado para usuário ${user_id}`);
      } catch (telegramError) {
        console.error('Erro ao enviar notificação do Telegram:', telegramError);
        // Não retornar erro, apenas logar
      }
    }
    
    res.json(data);
  } catch (error) {
    console.error('Erro ao criar lembrete:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/reminders/user/:userId - Buscar lembretes do usuário
 * Query params: type (opcional) - filtrar por tipo
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    
    const { data, error } = await reminderService.getUserReminders(userId, type);

    if (error) {
      console.error('Erro ao buscar lembretes:', error);
      return res.status(500).json({ error: 'Erro ao buscar lembretes' });
    }

    // Retornar array diretamente para compatibilidade com frontend
    res.json(data || []);
  } catch (error) {
    console.error('Erro ao buscar lembretes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * GET /api/reminders/:reminderId - Buscar lembrete específico
 */
router.get('/:reminderId', async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { data, error } = await reminderService.getReminderById(reminderId);

    if (error) {
      console.error('Erro ao buscar lembrete:', error);
      return res.status(404).json({ error: 'Lembrete não encontrado' });
    }

    res.json({ reminder: data });
  } catch (error) {
    console.error('Erro ao buscar lembrete:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * PUT /api/reminders/:reminderId - Atualizar lembrete
 */
router.put('/:reminderId', async (req, res) => {
  try {
    const { reminderId } = req.params;
    const updates = req.body;

    const { data, error } = await reminderService.updateReminder(reminderId, updates);

    if (error) {
      console.error('Erro ao atualizar lembrete:', error);
      return res.status(500).json({ error: 'Erro ao atualizar lembrete' });
    }

    res.json({ reminder: data });
  } catch (error) {
    console.error('Erro ao atualizar lembrete:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * DELETE /api/reminders/:reminderId - Deletar lembrete
 */
router.delete('/:reminderId', async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { error } = await reminderService.deleteReminder(reminderId);

    if (error) {
      console.error('Erro ao deletar lembrete:', error);
      return res.status(500).json({ error: 'Erro ao deletar lembrete' });
    }

    res.json({ message: 'Lembrete deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar lembrete:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * PATCH /api/reminders/:reminderId/toggle - Ativar/desativar lembrete
 */
router.patch('/:reminderId/toggle', async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { is_active } = req.body;

    const { data, error } = await reminderService.toggleReminder(reminderId, is_active);

    if (error) {
      console.error('Erro ao alternar lembrete:', error);
      return res.status(500).json({ error: 'Erro ao alternar lembrete' });
    }

    // Enviar notificação do Telegram
    if (data && data.telegram_chat_id) {
      try {
        const message = formatReminderToggledMessage(data.type, data.title, is_active);
        await sendTelegramMessage(data.telegram_chat_id, message);
        console.log(`📱 Notificação enviada: Lembrete ${is_active ? 'ativado' : 'pausado'} para usuário ${data.user_id}`);
      } catch (telegramError) {
        console.error('Erro ao enviar notificação do Telegram:', telegramError);
        // Não retornar erro, apenas logar
      }
    }

    res.json({ reminder: data });
  } catch (error) {
    console.error('Erro ao alternar lembrete:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
