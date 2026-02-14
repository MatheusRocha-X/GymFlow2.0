-- ============================================
-- GymFlow Database Schema v2.0
-- Supabase PostgreSQL
-- Melhorias: Lembretes unificados e mais flexíveis
-- ============================================

-- ============================================
-- LIMPEZA (comente se for primeira instalação)
-- ============================================

DROP TABLE IF EXISTS workout_reminders CASCADE;
DROP VIEW IF EXISTS daily_hydration_progress CASCADE;
DROP TABLE IF EXISTS hydration_history CASCADE;

-- ============================================
-- TABELAS PRINCIPAIS
-- ============================================

-- Tabela de Usuários (simplificada)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_chat_id BIGINT UNIQUE NOT NULL,
  telegram_username TEXT,
  name TEXT NOT NULL,
  daily_water_goal INTEGER DEFAULT 3000, -- ml (meta diária de hidratação)
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Treinos
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Exercícios
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps TEXT NOT NULL,
  rest_time INTEGER,
  order_index INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Lembretes Unificada
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN ('water', 'workout', 'custom')),
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  
  recurrence TEXT DEFAULT 'daily' CHECK (recurrence IN ('daily', 'weekly', 'weekdays', 'weekends', 'custom')),
  days_of_week INTEGER[],
  time TIME NOT NULL,
  
  water_start_time TIME,
  water_end_time TIME,
  water_interval_minutes INTEGER DEFAULT 60,
  water_amount_ml INTEGER DEFAULT 200,
  
  workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sent_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Histórico de Treinos
CREATE TABLE IF NOT EXISTS workout_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES workouts(id) ON DELETE SET NULL,
  workout_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Tabela de Histórico de Hidratação
CREATE TABLE IF NOT EXISTS hydration_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'reminder', 'auto'))
);

-- ============================================
-- ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_telegram_chat_id ON users(telegram_chat_id);
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_exercises_workout_id ON exercises(workout_id);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_type ON reminders(type);
CREATE INDEX IF NOT EXISTS idx_reminders_active ON reminders(is_active);
CREATE INDEX IF NOT EXISTS idx_workout_history_user_id ON workout_history(user_id);
CREATE INDEX IF NOT EXISTS idx_hydration_history_user_id ON hydration_history(user_id);
CREATE INDEX IF NOT EXISTS idx_hydration_history_date ON hydration_history(date);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_workouts_updated_at ON workouts;
CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON workouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reminders_updated_at ON reminders;
CREATE TRIGGER update_reminders_updated_at
  BEFORE UPDATE ON reminders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS
-- ============================================

CREATE OR REPLACE VIEW daily_hydration_progress AS
SELECT 
  h.user_id,
  h.date,
  u.daily_water_goal,
  COALESCE(SUM(h.amount), 0) as total_consumed,
  ROUND((COALESCE(SUM(h.amount), 0)::NUMERIC / NULLIF(u.daily_water_goal, 0) * 100), 0) as progress_percentage
FROM users u
LEFT JOIN hydration_history h ON u.id = h.user_id
GROUP BY h.user_id, h.date, u.daily_water_goal;

-- ============================================
-- FUNÇÕES
-- ============================================

CREATE OR REPLACE FUNCTION clear_user_data(p_user_id UUID)
RETURNS void AS $$
BEGIN
  DELETE FROM hydration_history WHERE user_id = p_user_id;
  DELETE FROM workout_history WHERE user_id = p_user_id;
  DELETE FROM reminders WHERE user_id = p_user_id;
  DELETE FROM exercises WHERE workout_id IN (SELECT id FROM workouts WHERE user_id = p_user_id);
  DELETE FROM workouts WHERE user_id = p_user_id;
  UPDATE users SET daily_water_goal = 2000, updated_at = NOW() WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
