# 🔄 Migration: Performance Tracking

## Descrição
Esta migration adiciona suporte completo para rastreamento de performance nos treinos, permitindo armazenar:
- Duração do treino
- Tempo de descanso
- Número de séries e exercícios
- Volume total (reps × carga)
- Dados detalhados de cada série (reps, carga, timestamp) em formato JSONB

## 📋 Pré-requisitos
- Acesso ao painel do Supabase
- Permissões para executar SQL

## 🚀 Como Executar

### Opção 1: Via Supabase Dashboard (Recomendado)
1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto GymFlow
3. No menu lateral, clique em **SQL Editor**
4. Clique em **+ New query**
5. Copie todo o conteúdo do arquivo `add_performance_tracking.sql`
6. Cole no editor SQL
7. Clique em **Run** (ou pressione Ctrl/Cmd + Enter)
8. Verifique se apareceu: "Success. No rows returned"

### Opção 2: Via CLI do Supabase
```bash
# Navegar para a pasta do backend
cd backend/database/migrations

# Executar a migration
supabase db push add_performance_tracking.sql
```

## ✅ Verificação

Execute este SQL para verificar se as colunas foram criadas:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'workout_history'
ORDER BY ordinal_position;
```

Você deve ver as novas colunas:
- `duration` (integer)
- `total_rest_time` (integer)
- `total_sets` (integer)
- `total_exercises` (integer)
- `total_volume` (numeric)
- `performance_data` (jsonb)

## 📊 Exemplo de Consulta

### Ver histórico completo de um usuário:
```sql
SELECT 
  workout_name,
  completed_at,
  duration / 60 as duration_minutes,
  total_sets,
  total_volume,
  performance_data
FROM workout_history
WHERE user_id = 'SEU_USER_ID'
ORDER BY completed_at DESC
LIMIT 10;
```

### Exercícios mais realizados:
```sql
SELECT 
  elem->>'exerciseName' as exercise_name,
  COUNT(*) as times_performed,
  AVG((elem->>'weight')::numeric) as avg_weight,
  SUM((elem->>'reps')::int * (elem->>'weight')::numeric) as total_volume
FROM workout_history,
jsonb_array_elements(performance_data) as elem
WHERE user_id = 'SEU_USER_ID'
GROUP BY elem->>'exerciseName'
ORDER BY times_performed DESC
LIMIT 10;
```

### Progresso nos últimos 30 dias:
```sql
SELECT 
  DATE(completed_at) as workout_date,
  COUNT(*) as workouts_count,
  SUM(total_volume) as daily_volume,
  SUM(duration) / 60 as total_minutes
FROM workout_history
WHERE user_id = 'SEU_USER_ID'
  AND completed_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(completed_at)
ORDER BY workout_date DESC;
```

## 🔄 Rollback (Desfazer)

Se precisar reverter as mudanças:

```sql
-- Remover colunas adicionadas
ALTER TABLE workout_history 
DROP COLUMN IF EXISTS duration,
DROP COLUMN IF EXISTS total_rest_time,
DROP COLUMN IF EXISTS total_sets,
DROP COLUMN IF EXISTS total_exercises,
DROP COLUMN IF EXISTS total_volume,
DROP COLUMN IF EXISTS performance_data;

-- Remover índices
DROP INDEX IF EXISTS idx_workout_history_completed_at;
DROP INDEX IF EXISTS idx_workout_history_workout_id;
DROP INDEX IF EXISTS idx_workout_history_performance_data;
```

## 📝 Observações

- Esta migration é **não destrutiva** - não apaga dados existentes
- Registros antigos terão valores `NULL` nos novos campos
- Os índices melhoram performance de consultas
- O campo `performance_data` usa JSONB para consultas eficientes
- Compatível com versão PostgreSQL 12+

## 🆘 Problemas Comuns

### Erro: "relation workout_history does not exist"
**Solução:** Execute primeiro o schema principal `schema_v2.sql`

### Erro: "column already exists"
**Solução:** A migration já foi executada. Verifique com:
```sql
\d workout_history
```

### Performance lenta em consultas JSONB
**Solução:** Os índices GIN já estão criados. Aguarde alguns minutos para o PostgreSQL atualizar as estatísticas.

## 📚 Recursos
- [Supabase Docs](https://supabase.com/docs/guides/database)
- [PostgreSQL JSONB](https://www.postgresql.org/docs/current/datatype-json.html)
- [GIN Indexes](https://www.postgresql.org/docs/current/gin.html)
