# GymFlow 2.1 - Notas de Lançamento

## 🎉 Principais Mudanças

### 1. ✅ Migração da Água para Lembretes
- A aba de **Hidratação** foi removida e integrada à aba **Lembretes**
- Agora existe um sistema unificado para todos os tipos de lembretes
- A configuração de água está disponível na página de Lembretes

### 2. 🆓 Lembretes Livres e Personalizáveis
- Os usuários agora podem criar **lembretes customizados** como desejarem
- Tipos de lembretes disponíveis:
  - 💧 Lembretes de Água (configuráveis)
  - 💪 Lembretes de Treino (vinculados aos treinos)
  - 🔔 Lembretes Customizados (totalmente livres)

### 3. ⚙️ Configuração Completa de Água
Os lembretes de água agora são totalmente configuráveis:
- **Horário de Início** (quando começar a receber lembretes)
- **Horário de Término** (quando parar de receber lembretes)
- **Intervalo** entre lembretes (de 15 em 15 minutos até 4 horas)
- **Quantidade de ML** por lembrete (150ml, 200ml, 250ml ou 300ml)

### 4. 🗑️ Configurações Aprimoradas
Novas funcionalidades na página de Configurações:
- **Limpar Todos os Dados**: Remove completamente todos os dados do usuário (treinos, exercícios, histórico, lembretes)
- **Desenvolvido por Matheus do Nascimento Rocha**: Crédito visível no rodapé

### 5. 📱 Design Mobile Profissional
- Interface totalmente redesenhada com foco em dispositivos móveis
- Layout mais compacto e eficiente
- Navegação simplificada com **4 ícones** na barra inferior:
  - 🏠 Home
  - 💪 Treinos
  - 🔔 Lembretes (novo)
  - ⚙️ Configurações
- Modais animados com melhor usabilidade
- Gradientes e cores vibrantes

---

## 🔧 Mudanças Técnicas

### Backend

#### Banco de Dados (Schema v2.0)
```sql
-- Nova tabela unificada de lembretes
CREATE TABLE reminders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type TEXT CHECK (type IN ('water', 'workout', 'custom')),
  title TEXT,
  description TEXT,
  time TIME,
  recurrence TEXT,
  days_of_week INTEGER[],
  workout_id UUID REFERENCES workouts(id),
  -- Campos específicos para água:
  water_start_time TIME,
  water_end_time TIME,
  water_interval_minutes INTEGER,
  water_amount_ml INTEGER,
  -- Controle:
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Nova função para limpar dados
CREATE OR REPLACE FUNCTION clear_user_data(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  DELETE FROM workout_sessions WHERE user_id = p_user_id;
  DELETE FROM exercises WHERE workout_id IN (
    SELECT id FROM workouts WHERE user_id = p_user_id
  );
  DELETE FROM workouts WHERE user_id = p_user_id;
  DELETE FROM hydration_logs WHERE user_id = p_user_id;
  DELETE FROM reminders WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

#### Serviços Refatorados

**`reminderService.js` (v2.0)**
- `createReminder()` - Criar qualquer tipo de lembrete
- `getUserReminders(userId, type)` - Buscar por tipo (opcional)
- `updateReminder()` - Atualizar lembrete
- `deleteReminder()` - Excluir lembrete
- `toggleReminder()` - Ativar/desativar
- `updateLastSent()` - Atualizar data de envio

**`userService.js` (novo)**
- `updateSettings()` - Atualizar configurações gerais
- `clearUserData()` - Chamar RPC para limpar dados

**`hydrationService.js` (atualizado)**
- Adicionado suporte ao campo `source` (manual/reminder/auto)

#### Jobs Unificados

**`reminderJob.js` (novo)**
Substituiu `waterReminderJob.js` e `workoutReminderJob.js`:
- `checkWaterReminders()` - Verifica lembretes de água por intervalo
- `checkScheduledReminders()` - Verifica lembretes agendados (workout/custom)
- `sentCache` - Cache de memória para evitar duplicações
- Execução a cada minuto

#### Rotas Atualizadas

**`/api/reminders`**
- `POST /` - Criar lembrete (validação de type)
- `GET /user/:userId?type=water` - Buscar com filtro opcional
- `PUT /:reminderId` - Atualizar
- `DELETE /:reminderId` - Excluir
- `PATCH /:reminderId/toggle` - Ativar/desativar

**`/api/users`**
- `PUT /:userId/settings` - Atualizar configurações
- `DELETE /:userId/clear-data` - Limpar todos os dados

### Frontend

#### Páginas Removidas
- ❌ `Hydration.jsx` (removida)
- ❌ `Hydration.css` (removida)

#### Páginas Criadas/Atualizadas

**`Reminders.jsx` (novo design)**
- Seção de configuração de água com card gradiente
- Lista de lembretes customizados
- Modal para criar/editar lembretes
- Diferentes formulários para água vs custom
- Toggle de ativação/desativação
- Botões de edição e exclusão

**`Reminders.css` (novo design)**
- Design mobile-first compacto
- Gradientes roxo/azul para água
- Animações smooth nos modais
- Botões de ação circulares
- Layout responsivo

**`Settings.jsx` (simplificado)**
- Removidas configurações antigas de água
- Adicionado botão "Limpar Todos os Dados"
- Adicionado crédito do desenvolvedor
- Interface mais limpa

**`api.js` (atualizado)**
```javascript
// Novos métodos:
getReminders(userId, type)
createReminder(reminderData)
updateReminder(reminderId, updates)
deleteReminder(reminderId)
toggleReminder(reminderId, isActive)
updateSettings(userId, settings)
clearUserData(userId)
```

#### Navegação Atualizada

**`BottomNav.jsx`**
- Reduzido de 5 para 4 ícones
- Ícone de 💧 Droplet removido
- Ícone de 📅 Calendar substituído por 🔔 Bell (Lembretes)

**`App.jsx`**
- Rota `/hydration` removida
- Rota `/reminders` mantida

---

## 📋 Checklist de Migração

### Para usar o GymFlow 2.1:

1. **Atualizar Banco de Dados**
   ```bash
   # Execute o arquivo database/schema.sql no Supabase SQL Editor
   # Isso criará a nova tabela reminders e a função clear_user_data
   ```

2. **Instalar Dependências**
   ```bash
   cd backend
   npm install
   
   cd ../frontend
   npm install
   ```

3. **Configurar Variáveis de Ambiente**
   ```env
   # backend/.env
   SUPABASE_URL=sua_url
   SUPABASE_SERVICE_KEY=sua_chave
   TELEGRAM_BOT_TOKEN=seu_token
   PORT=3000
   
   # frontend/.env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Iniciar Aplicação**
   ```bash
   # Backend
   cd backend
   npm run dev
   
   # Frontend
   cd frontend
   npm run dev
   ```

---

## 🎯 Próximos Passos

### Funcionalidades Futuras Sugeridas:
- [ ] Gráficos de evolução de treinos
- [ ] Metas semanais/mensais
- [ ] Compartilhamento de treinos
- [ ] Integração com wearables
- [ ] Modo escuro
- [ ] Internacionalização (i18n)

---

## 🐛 Problemas Conhecidos

Nenhum problema conhecido no momento.

---

## 📞 Suporte

**Desenvolvedor**: Matheus do Nascimento Rocha

Para reportar bugs ou sugerir melhorias, entre em contato através do Telegram.

---

## 📄 Licença

Este projeto é de uso pessoal e educacional.

---

*GymFlow 2.1 - Transformando sua rotina fitness!* 💪🔔💧
