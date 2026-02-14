-- ============================================
-- Migration: Add Performance Tracking to Workout History
-- Date: 2026-02-13
-- ============================================

-- Adicionar colunas para dados de performance na tabela workout_history
ALTER TABLE workout_history 
ADD COLUMN IF NOT EXISTS duration INTEGER, -- duração em segundos
ADD COLUMN IF NOT EXISTS total_rest_time INTEGER DEFAULT 0, -- tempo de descanso em segundos
ADD COLUMN IF NOT EXISTS total_sets INTEGER DEFAULT 0, -- total de séries completadas
ADD COLUMN IF NOT EXISTS total_exercises INTEGER DEFAULT 0, -- total de exercícios
ADD COLUMN IF NOT EXISTS total_volume DECIMAL(10, 2) DEFAULT 0, -- volume total (reps × carga) em kg
ADD COLUMN IF NOT EXISTS performance_data JSONB; -- dados detalhados de cada série

-- Criar índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_workout_history_completed_at 
ON workout_history(user_id, completed_at DESC);

-- Criar índice para consultas por workout_id
CREATE INDEX IF NOT EXISTS idx_workout_history_workout_id 
ON workout_history(workout_id);

-- Criar índice no campo JSONB para queries eficientes
CREATE INDEX IF NOT EXISTS idx_workout_history_performance_data 
ON workout_history USING gin(performance_data);

-- Comentários das colunas
COMMENT ON COLUMN workout_history.duration IS 'Duração total do treino em segundos';
COMMENT ON COLUMN workout_history.total_rest_time IS 'Tempo total de descanso em segundos';
COMMENT ON COLUMN workout_history.total_sets IS 'Total de séries completadas';
COMMENT ON COLUMN workout_history.total_exercises IS 'Total de exercícios realizados';
COMMENT ON COLUMN workout_history.total_volume IS 'Volume total do treino (soma de reps × carga) em kg';
COMMENT ON COLUMN workout_history.performance_data IS 'Array JSON com dados detalhados de cada série: [{exerciseName, set, reps, weight, timestamp}]';

-- ============================================
-- Exemplo de consulta: Top exercícios por volume
-- ============================================
/*
SELECT 
  jsonb_array_elements(performance_data)->>'exerciseName' as exercise,
  SUM((jsonb_array_elements(performance_data)->>'reps')::int * 
      (jsonb_array_elements(performance_data)->>'weight')::decimal) as total_volume
FROM workout_history
WHERE user_id = 'YOUR_USER_ID'
GROUP BY exercise
ORDER BY total_volume DESC
LIMIT 10;
*/

-- ============================================
-- Exemplo de consulta: Progresso semanal
-- ============================================
/*
SELECT 
  DATE(completed_at) as workout_date,
  COUNT(*) as total_workouts,
  SUM(total_volume) as daily_volume,
  SUM(duration) / 60 as total_minutes
FROM workout_history
WHERE user_id = 'YOUR_USER_ID'
  AND completed_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(completed_at)
ORDER BY workout_date DESC;
*/
