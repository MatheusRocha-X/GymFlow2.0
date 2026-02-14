-- ============================================
-- Migração: Melhorias de Hidratação
-- Data: 2026-02-13
-- Descrição: Atualiza meta padrão para 3000ml e corrige função clear_user_data
-- ============================================

-- Atualizar meta padrão de usuários existentes que ainda têm 2000ml
UPDATE users 
SET daily_water_goal = 3000 
WHERE daily_water_goal < 3000 OR daily_water_goal IS NULL;

-- Atualizar função clear_user_data para usar 3000ml
CREATE OR REPLACE FUNCTION clear_user_data(p_user_id UUID)
RETURNS void AS $$
BEGIN
  DELETE FROM hydration_history WHERE user_id = p_user_id;
  DELETE FROM body_metrics WHERE user_id = p_user_id;
  DELETE FROM workout_history WHERE user_id = p_user_id;
  DELETE FROM reminders WHERE user_id = p_user_id;
  DELETE FROM exercises WHERE workout_id IN (SELECT id FROM workouts WHERE user_id = p_user_id);
  DELETE FROM workouts WHERE user_id = p_user_id;
  
  -- Resetar configurações do usuário para 3000ml
  UPDATE users 
  SET daily_water_goal = 3000,
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Adicionar registro inicial de água para usuários sem histórico hoje
DO $$
DECLARE
  user_record RECORD;
  today_date DATE := CURRENT_DATE;
BEGIN
  FOR user_record IN 
    SELECT u.id 
    FROM users u
    WHERE NOT EXISTS (
      SELECT 1 FROM hydration_history h 
      WHERE h.user_id = u.id 
      AND h.date = today_date
    )
  LOOP
    -- Adicionar 500ml inicial para começar o dia
    INSERT INTO hydration_history (user_id, amount, source, date)
    VALUES (user_record.id, 500, 'auto', today_date);
  END LOOP;
END $$;

-- Verificar resultados
SELECT 
  COUNT(*) as total_users,
  AVG(daily_water_goal) as avg_goal,
  MIN(daily_water_goal) as min_goal,
  MAX(daily_water_goal) as max_goal
FROM users;

SELECT 
  COUNT(*) as users_with_hydration_today,
  SUM(amount) as total_water_logged_today
FROM hydration_history
WHERE date = CURRENT_DATE;

COMMENT ON COLUMN users.daily_water_goal IS 'Meta diária de hidratação em ml (padrão: 3000ml = 3L)';
