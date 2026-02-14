-- ============================================
-- Fix: Corrigir nome da marca Integralmedica
-- Date: 2026-02-13
-- ============================================

-- Atualizar o nome da marca para "Integralmedica" (sem espaço, sem acento)
UPDATE supplement_brands 
SET name = 'Integralmedica'
WHERE slug = 'integralmedica';

-- Verificar se a atualização funcionou
SELECT * FROM supplement_brands WHERE slug = 'integralmedica';
