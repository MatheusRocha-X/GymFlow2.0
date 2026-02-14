-- ============================================
-- Debug: Verificar status de admin do usuário
-- Date: 2026-02-13
-- ============================================

-- Ver o usuário e verificar se is_admin está TRUE
SELECT 
  id,
  name,
  telegram_chat_id,
  telegram_username,
  is_admin,
  created_at
FROM users
WHERE telegram_chat_id = '6509785869';

-- Se is_admin for NULL ou FALSE, forçar para TRUE
UPDATE users 
SET is_admin = TRUE 
WHERE telegram_chat_id = '6509785869';

-- Verificar novamente
SELECT 
  id,
  name,
  telegram_chat_id,
  is_admin
FROM users
WHERE telegram_chat_id = '6509785869';

-- Ver TODOS os campos do usuário para debug
SELECT * FROM users WHERE telegram_chat_id = '6509785869';
