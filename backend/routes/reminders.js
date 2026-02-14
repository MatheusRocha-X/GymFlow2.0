/**
 * Rotas de Lembretes Unificados v2.0
 */

import express from 'express';
import { reminderService } from '../services/reminderService.js';
import { hydrationService } from '../services/hydrationService.js';
import { sendTelegramMessage, formatReminderCreatedMessage, formatReminderToggledMessage, formatReminderDeletedMessage } from '../config/telegram.js';
import { supabase } from '../config/supabase.js';

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
    
    // Buscar lembrete antes de deletar para enviar notificação
    const { data: reminder } = await reminderService.getReminderById(reminderId);
    
    const { error } = await reminderService.deleteReminder(reminderId);

    if (error) {
      console.error('Erro ao deletar lembrete:', error);
      return res.status(500).json({ error: 'Erro ao deletar lembrete' });
    }

    console.log(`✅ Lembrete deletado: ${reminder?.type} - ${reminder?.title || 'Sem título'}`);
    
    // Enviar notificação do Telegram
    if (reminder) {
      try {
        // Buscar telegram_chat_id do usuário
        const { data: userData } = await supabase
          .from('users')
          .select('telegram_chat_id')
          .eq('id', reminder.user_id)
          .single();
        
        if (userData?.telegram_chat_id) {
          const message = formatReminderDeletedMessage(reminder.type, reminder.title);
          await sendTelegramMessage(userData.telegram_chat_id, message);
          console.log(`📱 Notificação enviada: Lembrete deletado para usuário ${reminder.user_id}`);
        }
      } catch (telegramError) {
        console.error('Erro ao enviar notificação do Telegram:', telegramError);
        // Não retornar erro, apenas logar
      }
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

/**
 * POST /api/reminders/water/quick-setup - Criar lembrete de água com configurações padrão otimizadas
 */
router.post('/water/quick-setup', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ 
        error: 'user_id é obrigatório' 
      });
    }

    // Verificar se já existe lembrete de água ativo
    const { data: existing } = await reminderService.getUserReminders(user_id, 'water');
    
    if (existing && existing.length > 0) {
      return res.status(400).json({ 
        error: 'Usuário já possui lembrete de água configurado',
        reminder: existing[0]
      });
    }

    // Criar lembrete com configurações otimizadas
    const { data, error } = await reminderService.createReminder(user_id, {
      type: 'water',
      title: 'Lembrete de Hidratação',
      description: 'Hora de beber água! 💧',
      is_active: true,
      time: '09:00:00',
      water_start_time: '08:00:00',
      water_end_time: '22:00:00',
      water_interval_minutes: 90, // A cada 1h30min
      water_amount_ml: 300 // 300ml por lembrete
    });

    if (error) {
      console.error('Erro ao criar lembrete rápido de água:', error);
      return res.status(500).json({ error: 'Erro ao criar lembrete' });
    }

    console.log(`✅ Lembrete rápido de água criado para usuário ${user_id}`);
    
    // Enviar notificação do Telegram
    if (data && data.telegram_chat_id) {
      try {
        const message = '💧 *Lembretes de Hidratação Ativados!*\n\n' +
          '⏰ Horário: 08:00 às 22:00\n' +
          '⏱️ Intervalo: A cada 1h30min\n' +
          '💦 +300ml serão registrados automaticamente\n' +
          '🎯 Meta: 3000ml (3L) por dia\n\n' +
          'ℹ️ O primeiro lembrete será enviado no próximo intervalo.\n' +
          '✨ Aguarde e mantenha-se hidratado!';
        await sendTelegramMessage(data.telegram_chat_id, message);
      } catch (telegramError) {
        console.error('Erro ao enviar notificação:', telegramError);
      }
    }
    
    res.json(data);
  } catch (error) {
    console.error('Erro ao criar lembrete rápido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * POST /api/reminders/:reminderId/test - Enviar lembrete de teste (registra água imediatamente)
 */
router.post('/:reminderId/test', async (req, res) => {
  try {
    const { reminderId } = req.params;
    
    // Buscar lembrete
    const { data: reminder, error: fetchError } = await reminderService.getReminderById(reminderId);
    
    if (fetchError || !reminder) {
      return res.status(404).json({ error: 'Lembrete não encontrado' });
    }

    // Buscar dados do usuário
    const { data: userData } = await supabase
      .from('users')
      .select('telegram_chat_id, daily_water_goal, name')
      .eq('id', reminder.user_id)
      .single();

    if (!userData?.telegram_chat_id) {
      return res.status(400).json({ error: 'Usuário sem Telegram configurado' });
    }

    // Se for lembrete de água, enviar com auto-registro
    if (reminder.type === 'water') {
      const amount = reminder.water_amount_ml || 300;
      const goal = userData.daily_water_goal || 3000;

      // Buscar progresso atual
      const { data: progress } = await hydrationService.getDailyProgress(reminder.user_id);
      const currentAmount = progress?.total_consumed || 0;
      const newAmount = currentAmount + amount;
      const percentage = Math.round((newAmount / goal) * 100);

      const message = `
🧪 *Teste de Lembrete de Hidratação*

✅ +${amount}ml registrado automaticamente
📊 Progresso: ${newAmount}ml / ${goal}ml (${percentage}%)

🎉 Seu lembrete está funcionando perfeitamente!
      `;

      await sendTelegramMessage(userData.telegram_chat_id, message);

      // Registrar água automaticamente
      await hydrationService.logWater(reminder.user_id, {
        amount,
        source: 'reminder'
      });

      // Buscar progresso final
      const { data: finalProgress } = await hydrationService.getDailyProgress(reminder.user_id);

      res.json({ 
        message: 'Lembrete de teste enviado',
        water_logged: amount,
        progress: finalProgress
      });
    } else {
      // Para outros tipos, apenas enviar notificação
      const message = `
🧪 *Teste de Lembrete*

📋 Tipo: ${reminder.type}
📝 ${reminder.title}

${reminder.description || ''}

✅ Seu lembrete está configurado e funcionando!
      `;

      await sendTelegramMessage(userData.telegram_chat_id, message);

      res.json({ 
        message: 'Lembrete de teste enviado'
      });
    }

    console.log(`✅ Lembrete de teste enviado para ${userData.name}`);
  } catch (error) {
    console.error('Erro ao enviar lembrete de teste:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
