import { supabase } from '../config/supabase.js';

/**
 * ServiÃ§o para gerenciar suplementos com integraÃ§Ã£o ao Mercado Livre
 */
class SupplementService {
  /**
   * Resolve URLs encurtadas do Mercado Livre seguindo redirects ou extraindo do HTML
   * @param {string} url - URL original (pode ser encurtada)
   * @returns {Promise<string>} - URL final apÃ³s redirects ou MLB ID extraÃ­do
   */
  async resolveShortUrl(url) {
    try {
      // Se nÃ£o for link encurtado, retorna a URL original
      if (!url.includes('/sec/') && !url.includes('mpago.la')) {
        return url;
      }

      console.log('ðŸ”— Resolvendo link encurtado:', url);
      
      // Para links encurtados, tentar fazer GET e extrair MLB ID do HTML
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      const html = await response.text();
      
      // Procurar por MLB ID no HTML
      const mlbMatch = html.match(/MLB-?\d+/i);
      if (mlbMatch) {
        const mlbId = mlbMatch[0].toUpperCase();
        const fullId = mlbId.includes('-') ? mlbId : mlbId.replace(/^MLB/, 'MLB-');
        console.log('âœ… MLB ID encontrado no HTML:', fullId);
        return `https://produto.mercadolivre.com.br/${fullId}`;
      }
      
      // Se nÃ£o encontrou, tentar procurar por outras URLs no HTML
      const urlMatch = html.match(/https:\/\/[^"']*MLB[^"']*/i);
      if (urlMatch) {
        console.log('âœ… URL completa encontrada no HTML:', urlMatch[0]);
        return urlMatch[0];
      }
      
      console.log('âŒ NÃ£o conseguiu resolver o link encurtado');
      return url; // Retorna a URL original se nÃ£o conseguir resolver
    } catch (error) {
      console.error('Erro ao resolver URL:', error);
      return url; // Retorna a URL original em caso de erro
    }
  }

  /**
   * Extrai o ID do produto do Mercado Livre de uma URL
   * @param {string} url - URL do produto (ex: https://produto.mercadolivre.com.br/MLB-123456789)
   * @returns {string|null} - ID do produto ou null
   */
  extractMercadoLivreId(url) {
    try {
      if (!url || typeof url !== 'string') {
        return null;
      }

      // Limpar a URL
      url = url.trim();

      // Suporta vÃ¡rios formatos de URL do Mercado Livre
      const patterns = [
        /MLB-?\d+/i,  // MLB-123456789 ou MLB123456789
        /mlb-?\d+/i,  // mlb-123456789 (case insensitive)
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          // Garantir formato MLB-XXXXXXXX
          const id = match[0].toUpperCase();
          if (id.includes('-')) {
            return id;
          } else {
            // MLB123456789 -> MLB-123456789
            return id.replace(/^MLB/, 'MLB-');
          }
        }
      }
      
      console.log('âŒ Nenhum padrÃ£o correspondeu para:', url);
      return null;
    } catch (error) {
      console.error('Erro ao extrair ID do Mercado Livre:', error);
      return null;
    }
  }

  /**
   * Busca informaÃ§Ãµes de um produto no Mercado Livre via scraping da pÃ¡gina
   * @param {string} mercadolivreId - ID do produto (ex: MLB-123456789)
   * @returns {Object} - Dados do produto
   */
  async fetchMercadoLivreProduct(mercadolivreId) {
    try {
      // Preparar ID para URL
      const urlId = mercadolivreId.startsWith('MLB') ? mercadolivreId : `MLB${mercadolivreId.replace('-', '')}`;
      const cleanId = mercadolivreId.replace('-', '').replace('MLB', '');
      
      // URL da pÃ¡gina do produto
      const productUrl = `https://produto.mercadolivre.com.br/${urlId}`;
      
      console.log('ðŸ” Fazendo scraping da pÃ¡gina:', productUrl);
      
      // Pequeno delay para evitar bloqueio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fazer requisiÃ§Ã£o para a pÃ¡gina do produto
      const response = await fetch(productUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao acessar pÃ¡gina do produto: ${response.status}`);
      }

      const html = await response.text();
      
      // Extrair informaÃ§Ãµes usando expressÃµes regulares
      const productData = {
        mercadolivre_id: cleanId,
        permalink: productUrl
      };

      const titleMatch =
        html.match(/<h1[^>]*class="[^"]*ui-pdp-title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
        html.match(/<title>([^|]+)\|/i) ||
        html.match(/"title":"([^"]+)"/i);
      productData.title = titleMatch ? titleMatch[1].trim() : 'Produto sem tÃ­tulo';

      const priceMatch =
        html.match(/"price":\s*(\d+(?:\.\d+)?)/) ||
        html.match(/"original_price":\s*(\d+(?:\.\d+)?)/) ||
        html.match(/class="[^"]*price-tag[^"]*"[^>]*>\s*R\$\s*([\d.,]+)/i);
      if (priceMatch) {
        productData.price = parseFloat(String(priceMatch[1]).replace(',', '.'));
        productData.original_price = productData.price;
      } else {
        productData.price = 0;
        productData.original_price = 0;
      }

      const imageMatch =
        html.match(/"gallery_images":\s*\[\s*{\s*"src":\s*"([^"]+)"/) ||
        html.match(/"picture_url":"([^"]+)"/) ||
        html.match(/data-zoom="([^"]+)"/i);
      productData.image_url = imageMatch ? imageMatch[1] : null;

      const descMatch =
        html.match(/"description":\s*"([^"]+)"/) ||
        html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
      productData.description = descMatch ? descMatch[1] : productData.title;

      productData.stock_available = true;
      productData.rating = null;
      productData.total_reviews = 0;

      console.log('âœ… Produto extraÃ­do:', productData.title, '- R$', productData.price);
      return productData;
    } catch (error) {
      console.error('Erro ao buscar produto no Mercado Livre:', error);
      throw new Error('NÃ£o foi possÃ­vel buscar informaÃ§Ãµes do produto no Mercado Livre');
    }
  }
  async createSupplement(supplementData, userId) {
    try {
      // Verificar se usuÃ¡rio Ã© admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (userError || !user?.is_admin) {
        throw new Error('Acesso negado: apenas administradores podem criar suplementos');
      }

      // Se foi fornecido um link do Mercado Livre, extrair dados
      let mlData = {};
      if (supplementData.affiliate_link) {
        const mlId = this.extractMercadoLivreId(supplementData.affiliate_link);
        if (mlId) {
          try {
            mlData = await this.fetchMercadoLivreProduct(mlId);
            mlData.last_sync_at = new Date().toISOString();
          } catch (error) {
            console.error('Erro ao buscar dados do ML:', error);
            // Continua mesmo se falhar o fetch do ML
          }
        }
      }

      // Combinar dados fornecidos com dados do Mercado Livre
      // Filtrar apenas campos permitidos da tabela supplements
      const allowedFields = [
        'title', 'description', 'price', 'original_price', 'image_url', 
        'affiliate_link', 'mercadolivre_id', 'category_id', 'brand_id', 
        'is_active', 'featured', 'stock_available', 'rating', 'total_reviews'
      ];
      
      const filteredData = {};
      for (const field of allowedFields) {
        if (supplementData[field] !== undefined) {
          filteredData[field] = supplementData[field];
        }
      }

      const finalData = {
        ...mlData,
        ...filteredData,
        created_by: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Inserir no banco
      const { data, error } = await supabase
        .from('supplements')
        .insert([finalData])
        .select(`
          *,
          category:supplement_categories(id, name, slug),
          brand:supplement_brands(id, name, slug)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao criar suplemento:', error);
      throw error;
    }
  }

  /**
   * Atualiza um suplemento existente
   */
  async updateSupplement(supplementId, supplementData, userId) {
    try {
      // Verificar se usuÃ¡rio Ã© admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (userError || !user?.is_admin) {
        throw new Error('Acesso negado: apenas administradores podem atualizar suplementos');
      }

      const updateData = {
        ...supplementData,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('supplements')
        .update(updateData)
        .eq('id', supplementId)
        .select(`
          *,
          category:supplement_categories(id, name, slug),
          brand:supplement_brands(id, name, slug)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao atualizar suplemento:', error);
      throw error;
    }
  }

  /**
   * Sincroniza dados de um suplemento com o Mercado Livre
   */
  async syncWithMercadoLivre(supplementId, userId) {
    try {
      // Verificar se usuÃ¡rio Ã© admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (userError || !user?.is_admin) {
        throw new Error('Acesso negado');
      }

      // Buscar suplemento
      const { data: supplement, error: suppError } = await supabase
        .from('supplements')
        .select('*')
        .eq('id', supplementId)
        .single();

      if (suppError || !supplement) {
        throw new Error('Suplemento nÃ£o encontrado');
      }

      if (!supplement.mercadolivre_id) {
        throw new Error('Este suplemento nÃ£o possui ID do Mercado Livre');
      }

      // Buscar dados atualizados
      const mlData = await this.fetchMercadoLivreProduct(supplement.mercadolivre_id);

      // Atualizar no banco
      const { data, error } = await supabase
        .from('supplements')
        .update({
          title: mlData.title,
          description: mlData.description,
          price: mlData.price,
          original_price: mlData.original_price,
          image_url: mlData.image_url,
          stock_available: mlData.stock_available,
          rating: mlData.rating,
          total_reviews: mlData.total_reviews,
          last_sync_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', supplementId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao sincronizar com Mercado Livre:', error);
      throw error;
    }
  }

  /**
   * Lista todos os suplementos ativos (pÃºblico)
   */
  async listSupplements(filters = {}) {
    try {
      let query = supabase
        .from('supplements')
        .select(`
          *,
          category:supplement_categories(id, name, slug),
          brand:supplement_brands(id, name, slug)
        `)
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Filtros opcionais
      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      if (filters.brand_id) {
        query = query.eq('brand_id', filters.brand_id);
      }

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      if (filters.featured) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao listar suplementos:', error);
      throw error;
    }
  }

  /**
   * Busca um suplemento por ID
   */
  async getSupplementById(supplementId) {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select(`
          *,
          category:supplement_categories(id, name, slug),
          brand:supplement_brands(id, name, slug)
        `)
        .eq('id', supplementId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar suplemento:', error);
      throw error;
    }
  }

  /**
   * Registra um clique no link de afiliado
   */
  async registerClick(supplementId, userId, ipAddress, userAgent) {
    try {
      const { data, error } = await supabase
        .from('supplement_clicks')
        .insert([{
          supplement_id: supplementId,
          user_id: userId,
          ip_address: ipAddress,
          user_agent: userAgent,
          clicked_at: new Date().toISOString()
        }]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
      // NÃ£o lanÃ§a erro para nÃ£o impedir o redirecionamento
    }
  }

  /**
   * Deleta um suplemento (soft delete)
   */
  async deleteSupplement(supplementId, userId) {
    try {
      // Verificar se usuÃ¡rio Ã© admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (userError || !user?.is_admin) {
        throw new Error('Acesso negado');
      }

      const { data, error } = await supabase
        .from('supplements')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', supplementId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao deletar suplemento:', error);
      throw error;
    }
  }

  /**
   * Lista todas as categorias
   */
  async listCategories() {
    try {
      const { data, error } = await supabase
        .from('supplement_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  }

  /**
   * Lista todas as marcas
   */
  async listBrands() {
    try {
      const { data, error } = await supabase
        .from('supplement_brands')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao listar marcas:', error);
      throw error;
    }
  }

  /**
   * ObtÃ©m estatÃ­sticas de cliques (admin)
   */
  async getClickStats(userId, filters = {}) {
    try {
      // Verificar se usuÃ¡rio Ã© admin
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (userError || !user?.is_admin) {
        throw new Error('Acesso negado');
      }

      let query = supabase
        .from('supplement_clicks')
        .select(`
          *,
          supplement:supplements(id, title, category_id, brand_id)
        `)
        .order('clicked_at', { ascending: false });

      if (filters.supplement_id) {
        query = query.eq('supplement_id', filters.supplement_id);
      }

      if (filters.start_date) {
        query = query.gte('clicked_at', filters.start_date);
      }

      if (filters.end_date) {
        query = query.lte('clicked_at', filters.end_date);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar estatÃ­sticas:', error);
      throw error;
    }
  }
}

export default new SupplementService();
