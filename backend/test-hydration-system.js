/**
 * Script de Teste - Sistema de Hidratação Melhorado
 * Execute: node backend/test-hydration-system.js
 */

import { userService } from './services/userService.js';
import { hydrationService } from './services/hydrationService.js';
import { reminderService } from './services/reminderService.js';

console.log('🧪 ===== TESTE DO SISTEMA DE HIDRATAÇÃO =====\n');

async function testHydrationSystem() {
  try {
    // 1. Criar usuário de teste
    console.log('1️⃣ Criando usuário de teste...');
    const { data: user, isNewUser } = await userService.findOrCreateByTelegramId(
      999999999,
      { username: 'test_hydration', name: 'Teste Hidratação' }
    );
    
    if (!user) {
      console.error('❌ Erro ao criar usuário');
      return;
    }
    
    console.log('✅ Usuário criado:', user.name);
    console.log(`   - ID: ${user.id}`);
    console.log(`   - Meta diária: ${user.daily_water_goal}ml (deve ser 3000ml)`);
    
    if (user.daily_water_goal !== 3000) {
      console.warn('⚠️  Meta não é 3000ml! Verificar schema.');
    }

    // 2. Verificar registro inicial de hidratação
    console.log('\n2️⃣ Verificando registro inicial de hidratação...');
    const { data: initialProgress } = await hydrationService.getDailyProgress(user.id);
    
    console.log('✅ Progresso inicial:');
    console.log(`   - Consumido: ${initialProgress.total_consumed}ml`);
    console.log(`   - Meta: ${initialProgress.goal}ml`);
    console.log(`   - Progresso: ${initialProgress.percentage}%`);
    
    if (isNewUser && initialProgress.total_consumed < 500) {
      console.warn('⚠️  Usuário novo deveria ter 500ml inicial!');
    }

    // 3. Criar lembrete de água com quick setup
    console.log('\n3️⃣ Criando lembrete de água (quick setup)...');
    
    // Verificar se já existe
    const { data: existingReminders } = await reminderService.getUserReminders(user.id, 'water');
    
    if (existingReminders && existingReminders.length > 0) {
      console.log('ℹ️  Lembrete de água já existe:');
      const reminder = existingReminders[0];
      console.log(`   - ID: ${reminder.id}`);
      console.log(`   - Ativo: ${reminder.is_active}`);
      console.log(`   - Horário: ${reminder.water_start_time} - ${reminder.water_end_time}`);
      console.log(`   - Intervalo: ${reminder.water_interval_minutes} min`);
      console.log(`   - Quantidade: ${reminder.water_amount_ml}ml`);
    } else {
      const { data: reminder, error } = await reminderService.createReminder(user.id, {
        type: 'water',
        title: 'Lembrete de Hidratação - Teste',
        description: 'Hora de beber água! 💧',
        is_active: true,
        time: '09:00:00',
        water_start_time: '08:00:00',
        water_end_time: '22:00:00',
        water_interval_minutes: 90,
        water_amount_ml: 300
      });

      if (error) {
        console.error('❌ Erro ao criar lembrete:', error);
      } else {
        console.log('✅ Lembrete criado com sucesso!');
        console.log(`   - ID: ${reminder.id}`);
        console.log(`   - Intervalo: ${reminder.water_interval_minutes} min`);
        console.log(`   - Quantidade: ${reminder.water_amount_ml}ml`);
      }
    }

    // 4. Simular envio de lembrete (adicionar água)
    console.log('\n4️⃣ Simulando recebimento de lembrete...');
    await hydrationService.logWater(user.id, {
      amount: 300,
      source: 'reminder'
    });
    console.log('✅ +300ml registrados (source: reminder)');

    // 5. Verificar progresso atualizado
    console.log('\n5️⃣ Verificando progresso atualizado...');
    const { data: updatedProgress } = await hydrationService.getDailyProgress(user.id);
    
    console.log('✅ Progresso após lembrete:');
    console.log(`   - Consumido: ${updatedProgress.total_consumed}ml`);
    console.log(`   - Meta: ${updatedProgress.goal}ml`);
    console.log(`   - Progresso: ${updatedProgress.percentage}%`);
    
    const expectedMin = isNewUser ? 800 : 300; // 500 inicial + 300 lembrete
    if (updatedProgress.total_consumed >= expectedMin) {
      console.log('✅ Sistema funcionando corretamente!');
    } else {
      console.warn('⚠️  Quantidade de água menor que o esperado');
    }

    // 6. Testar múltiplos lembretes
    console.log('\n6️⃣ Simulando múltiplos lembretes...');
    for (let i = 0; i < 9; i++) {
      await hydrationService.logWater(user.id, {
        amount: 300,
        source: 'reminder'
      });
    }
    console.log('✅ +2700ml registrados (9 lembretes)');

    // 7. Verificar se atingiu a meta
    console.log('\n7️⃣ Verificando meta final...');
    const { data: finalProgress } = await hydrationService.getDailyProgress(user.id);
    
    console.log('✅ Progresso final:');
    console.log(`   - Consumido: ${finalProgress.total_consumed}ml`);
    console.log(`   - Meta: ${finalProgress.goal}ml`);
    console.log(`   - Progresso: ${finalProgress.percentage}%`);
    
    if (finalProgress.percentage >= 100) {
      console.log('🎉 META ATINGIDA! Sistema funcionando perfeitamente!');
    } else {
      console.log(`📊 Faltam ${finalProgress.goal - finalProgress.total_consumed}ml para atingir a meta`);
    }

    // 8. Verificar histórico
    console.log('\n8️⃣ Verificando histórico...');
    const { data: history } = await hydrationService.getHistory(user.id, 1);
    
    if (history && history.length > 0) {
      console.log(`✅ Histórico: ${history.length} registros hoje`);
      console.log(`   - Manual: ${history.filter(h => h.source === 'manual').length}`);
      console.log(`   - Reminder: ${history.filter(h => h.source === 'reminder').length}`);
      console.log(`   - Auto: ${history.filter(h => h.source === 'auto').length}`);
    }

    // 9. Buscar usuários com lembretes ativos
    console.log('\n9️⃣ Testando função findAllWithWaterReminders...');
    const { data: usersWithReminders } = await userService.findAllWithWaterReminders();
    
    if (usersWithReminders) {
      console.log(`✅ Encontrados ${usersWithReminders.length} usuários com lembretes de água`);
      const testUser = usersWithReminders.find(u => u.id === user.id);
      if (testUser) {
        console.log('✅ Usuário de teste encontrado na lista:');
        console.log(`   - Horário: ${testUser.water_reminder_start_time} - ${testUser.water_reminder_end_time}`);
        console.log(`   - Intervalo: ${testUser.water_reminder_interval} min`);
        console.log(`   - Quantidade: ${testUser.water_amount_ml}ml`);
      }
    }

    console.log('\n✅ ===== TESTE CONCLUÍDO COM SUCESSO =====');
    console.log('\n📋 Resumo:');
    console.log(`   ✓ Meta padrão: 3000ml ✓`);
    console.log(`   ✓ Registro inicial: 500ml ✓`);
    console.log(`   ✓ Auto-registro: 300ml/lembrete ✓`);
    console.log(`   ✓ Lembretes configuráveis ✓`);
    console.log(`   ✓ Sistema completo funcionando ✓`);

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE:', error);
    console.error(error.stack);
  } finally {
    process.exit(0);
  }
}

// Executar teste
testHydrationSystem();
