import express from 'express';
import supplementService from '../services/supplementService.js';

const router = express.Router();

/**
 * @route GET /api/supplements
 * @desc Lista todos os suplementos ativos (público)
 */
router.get('/', async (req, res) => {
  try {
    const filters = {
      category_id: req.query.category_id,
      brand_id: req.query.brand_id,
      search: req.query.search,
      featured: req.query.featured === 'true'
    };

    const supplements = await supplementService.listSupplements(filters);
    res.json(supplements);
  } catch (error) {
    console.error('Erro ao listar suplementos:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/supplements/categories
 * @desc Lista todas as categorias (público)
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await supplementService.listCategories();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/supplements/brands
 * @desc Lista todas as marcas (público)
 */
router.get('/brands', async (req, res) => {
  try {
    const brands = await supplementService.listBrands();
    res.json(brands);
  } catch (error) {
    console.error('Erro ao listar marcas:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/supplements/:id
 * @desc Busca um suplemento por ID (público)
 */
router.get('/:id', async (req, res) => {
  try {
    const supplement = await supplementService.getSupplementById(req.params.id);
    
    if (!supplement) {
      return res.status(404).json({ error: 'Suplemento não encontrado' });
    }

    res.json(supplement);
  } catch (error) {
    console.error('Erro ao buscar suplemento:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/supplements
 * @desc Cria um novo suplemento (apenas admin)
 * @body { affiliate_link, category_id, brand_id, title?, description?, price?, image_url?, featured? }
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.body.user_id; // Em produção, usar JWT do header

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!req.body.affiliate_link) {
      return res.status(400).json({ error: 'Link de afiliado é obrigatório' });
    }

    const supplement = await supplementService.createSupplement(req.body, userId);
    res.status(201).json(supplement);
  } catch (error) {
    console.error('Erro ao criar suplemento:', error);
    
    if (error.message.includes('Acesso negado')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route PUT /api/supplements/:id
 * @desc Atualiza um suplemento (apenas admin)
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const supplement = await supplementService.updateSupplement(
      req.params.id,
      req.body,
      userId
    );

    res.json(supplement);
  } catch (error) {
    console.error('Erro ao atualizar suplemento:', error);
    
    if (error.message.includes('Acesso negado')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/supplements/:id/sync
 * @desc Sincroniza dados com Mercado Livre (apenas admin)
 */
router.post('/:id/sync', async (req, res) => {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const supplement = await supplementService.syncWithMercadoLivre(
      req.params.id,
      userId
    );

    res.json(supplement);
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
    
    if (error.message.includes('Acesso negado')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route DELETE /api/supplements/:id
 * @desc Remove um suplemento (soft delete) (apenas admin)
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    await supplementService.deleteSupplement(req.params.id, userId);
    res.json({ message: 'Suplemento removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover suplemento:', error);
    
    if (error.message.includes('Acesso negado')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/supplements/:id/click
 * @desc Registra um clique no link de afiliado
 */
router.post('/:id/click', async (req, res) => {
  try {
    const userId = req.body.user_id || null;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await supplementService.registerClick(
      req.params.id,
      userId,
      ipAddress,
      userAgent
    );

    res.json({ message: 'Clique registrado' });
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    // Não retorna erro para não impedir o redirecionamento
    res.json({ message: 'OK' });
  }
});

/**
 * @route GET /api/supplements/stats/clicks
 * @desc Obtém estatísticas de cliques (apenas admin)
 */
router.get('/stats/clicks', async (req, res) => {
  try {
    const userId = req.query.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const filters = {
      supplement_id: req.query.supplement_id,
      start_date: req.query.start_date,
      end_date: req.query.end_date
    };

    const stats = await supplementService.getClickStats(userId, filters);
    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    
    if (error.message.includes('Acesso negado')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route POST /api/supplements/preview
 * @desc Preview de produto do Mercado Livre (apenas admin)
 */
router.post('/preview', async (req, res) => {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { affiliate_link } = req.body;

    console.log('🔍 Preview - URL recebida:', affiliate_link);

    if (!affiliate_link) {
      return res.status(400).json({ error: 'Link é obrigatório' });
    }

    // Resolver URL encurtada (se for o caso)
    const fullUrl = await supplementService.resolveShortUrl(affiliate_link);

    const mlId = supplementService.extractMercadoLivreId(fullUrl);
    console.log('🔍 Preview - ID extraído:', mlId);
    
    if (!mlId) {
      return res.status(400).json({ error: 'Link do Mercado Livre inválido' });
    }

    const productData = await supplementService.fetchMercadoLivreProduct(mlId);
    res.json(productData);
  } catch (error) {
    console.error('Erro ao buscar preview:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
