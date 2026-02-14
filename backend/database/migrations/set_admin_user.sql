-- ============================================
-- Script: Definir usuário como Admin
-- Date: 2026-02-13
-- ============================================

-- Primeiro, vamos encontrar seu usuário
-- Buscar por telegram_chat_id (se você fez login via Telegram)
SELECT id, name, email, telegram_chat_id, telegram_username, is_admin
FROM users
WHERE telegram_chat_id = '6509785869';

-- OU buscar por email (se você tem email cadastrado)
-- SELECT id, name, email, telegram_chat_id, is_admin
-- FROM users
-- WHERE email = 'seu-email@exemplo.com';

-- OU listar todos os usuários para encontrar o seu
-- SELECT id, name, email, telegram_chat_id, telegram_username, is_admin
-- FROM users
-- ORDER BY created_at DESC
-- LIMIT 10;

-- Depois de encontrar o UUID correto, execute:
-- UPDATE users 
-- SET is_admin = TRUE 
-- WHERE id = 'UUID-AQUI';

-- Exemplo com telegram_chat_id:
UPDATE users 
SET is_admin = TRUE 
WHERE telegram_chat_id = '6509785869';

-- Verificar se funcionou
SELECT id, name, telegram_username, is_admin
FROM users
WHERE telegram_chat_id = '6509785869';
