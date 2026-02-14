-- ============================================
-- Migration: Add Supplements Feature
-- Date: 2026-02-13
-- ============================================

-- Adicionar coluna is_admin na tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Criar índice para consultas de administradores
CREATE INDEX IF NOT EXISTS idx_users_is_admin 
ON users(is_admin) WHERE is_admin = TRUE;

-- Criar tabela de categorias de suplementos
CREATE TABLE IF NOT EXISTS supplement_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de marcas
CREATE TABLE IF NOT EXISTS supplement_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de suplementos
CREATE TABLE IF NOT EXISTS supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2), -- preço antes do desconto
  image_url TEXT,
  affiliate_link TEXT NOT NULL,
  mercadolivre_id VARCHAR(100),
  category_id UUID REFERENCES supplement_categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES supplement_brands(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE, -- produto em destaque
  stock_available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3, 2), -- avaliação de 0 a 5
  total_reviews INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_sync_at TIMESTAMP -- última sincronização com Mercado Livre
);

-- Criar tabela de cliques em links de afiliados (para analytics)
CREATE TABLE IF NOT EXISTS supplement_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplement_id UUID REFERENCES supplements(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  clicked_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_supplements_category 
ON supplements(category_id) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_supplements_brand 
ON supplements(brand_id) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_supplements_featured 
ON supplements(featured) WHERE featured = TRUE AND is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_supplements_created_at 
ON supplements(created_at DESC) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_supplement_clicks_supplement 
ON supplement_clicks(supplement_id, clicked_at DESC);

-- Comentários das tabelas
COMMENT ON TABLE supplement_categories IS 'Categorias de suplementos disponíveis';
COMMENT ON TABLE supplement_brands IS 'Marcas de suplementos cadastradas';
COMMENT ON TABLE supplements IS 'Produtos suplementos com links de afiliados';
COMMENT ON TABLE supplement_clicks IS 'Rastreamento de cliques em links de afiliados';

-- Inserir categorias padrão
INSERT INTO supplement_categories (name, slug, display_order) VALUES
  ('Whey Protein', 'whey-protein', 1),
  ('Hipercalórico', 'hipercalorico', 2),
  ('Creatina', 'creatina', 3),
  ('Glutamina', 'glutamina', 4),
  ('Aminoácidos', 'aminoacidos', 5),
  ('Pré-treino', 'pre-treino', 6),
  ('Multi Vitamínico', 'multi-vitaminico', 7),
  ('Emagrecimento', 'emagrecimento', 8),
  ('Outros', 'outros', 9)
ON CONFLICT (slug) DO NOTHING;

-- Inserir marcas padrão
INSERT INTO supplement_brands (name, slug) VALUES
  ('Growth', 'growth'),
  ('Integralmedica', 'integralmedica'),
  ('Max Titanium', 'max-titanium'),
  ('Outros', 'outros')
ON CONFLICT (slug) DO NOTHING;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_supplements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER trigger_supplements_updated_at
  BEFORE UPDATE ON supplements
  FOR EACH ROW
  EXECUTE FUNCTION update_supplements_updated_at();

CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON supplement_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_supplements_updated_at();
