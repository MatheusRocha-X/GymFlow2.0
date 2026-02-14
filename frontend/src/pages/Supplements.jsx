import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Filter, Pill, Search, Sparkles, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
import './Supplements.css';

export default function Supplements() {
  const { user } = useAuth();

  const [supplements, setSupplements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const [formData, setFormData] = useState({
    affiliate_link: '',
    category_id: '',
    brand_id: '',
    title: '',
    description: '',
    price: '',
    image_url: '',
    featured: false
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadSupplements();
  }, [selectedCategory, selectedBrand, searchQuery]);

  const hasActiveFilters = useMemo(
    () => !!searchQuery || !!selectedCategory || !!selectedBrand,
    [searchQuery, selectedCategory, selectedBrand]
  );

  const loadData = async () => {
    try {
      const [catsRes, brandsRes] = await Promise.all([
        api.get('/supplements/categories'),
        api.get('/supplements/brands')
      ]);
      setCategories(catsRes);
      setBrands(brandsRes);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const loadSupplements = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category_id = selectedCategory;
      if (selectedBrand) params.brand_id = selectedBrand;
      if (searchQuery) params.search = searchQuery;
      const response = await api.get('/supplements', { params });
      setSupplements(response);
    } catch (error) {
      console.error('Erro ao carregar suplementos:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  const handleProductClick = async (supplement) => {
    try {
      await api.post(`/supplements/${supplement.id}/click`, { user_id: user?.id });
      window.open(supplement.affiliate_link, '_blank');
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
      window.open(supplement.affiliate_link, '_blank');
    }
  };

  const handlePreviewLink = async () => {
    if (!formData.affiliate_link) return;
    try {
      setLoadingPreview(true);
      const response = await api.post('/supplements/preview', {
        affiliate_link: formData.affiliate_link,
        user_id: user.id
      });

      setPreviewData(response);
      setFormData((prev) => ({
        ...prev,
        title: response.title || prev.title,
        description: response.description || prev.description,
        price: response.price || prev.price,
        image_url: response.image_url || prev.image_url
      }));
    } catch (error) {
      console.error('Erro ao buscar preview:', error);
      alert('Erro ao buscar informacoes do produto. Verifique o link.');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    if (!formData.affiliate_link || !formData.category_id) {
      alert('Preencha os campos obrigatorios.');
      return;
    }

    try {
      const data = { ...formData, user_id: user.id };
      if (editingProduct) {
        await api.put(`/supplements/${editingProduct.id}`, data);
      } else {
        await api.post('/supplements', data);
      }
      setShowModal(false);
      resetForm();
      loadSupplements();
      alert('Produto salvo com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert(error.message || 'Erro ao salvar produto.');
    }
  };

  const handleEditProduct = (supplement) => {
    setEditingProduct(supplement);
    setFormData({
      affiliate_link: supplement.affiliate_link,
      category_id: supplement.category_id,
      brand_id: supplement.brand_id,
      title: supplement.title,
      description: supplement.description,
      price: supplement.price,
      image_url: supplement.image_url,
      featured: supplement.featured
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (supplementId) => {
    if (!confirm('Tem certeza que deseja remover este produto?')) return;
    try {
      await api.delete(`/supplements/${supplementId}`, { data: { user_id: user.id } });
      loadSupplements();
      alert('Produto removido com sucesso.');
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      alert('Erro ao remover produto.');
    }
  };

  const resetForm = () => {
    setFormData({
      affiliate_link: '',
      category_id: '',
      brand_id: '',
      title: '',
      description: '',
      price: '',
      image_url: '',
      featured: false
    });
    setEditingProduct(null);
    setPreviewData(null);
  };

  const formatPrice = (price) => {
    if (price == null || price === '' || isNaN(price)) return 'Preco nao informado';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const renderStars = (rating) => {
    if (!rating) return '';
    return '★'.repeat(Math.max(1, Math.round(rating)));
  };

  return (
    <div className="page supplements-page">
      <div className="container supplements-container">
        <PageHeader
          icon={Pill}
          title="Suplementos"
          subtitle="Produtos recomendados para potencializar seus treinos"
        />

        <section className="supp-filters card">
          <div className="supp-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Buscar suplemento, marca ou categoria..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchQuery && (
              <button type="button" className="icon-ghost" onClick={() => setSearchQuery('')}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="supp-filter-block">
            <p className="supp-filter-title">
              <Filter size={14} />
              Categorias
            </p>
            <div className="supp-chip-row">
              <button
                className={`supp-chip ${!selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`supp-chip ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="supp-filter-block">
            <p className="supp-filter-title">
              <Sparkles size={14} />
              Marcas
            </p>
            <div className="supp-chip-row">
              <button
                className={`supp-chip ${!selectedBrand ? 'active' : ''}`}
                onClick={() => setSelectedBrand(null)}
              >
                Todas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  className={`supp-chip ${selectedBrand === brand.id ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand.id)}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          <div className="supp-filter-footer">
            <span>{supplements.length} produtos encontrados</span>
            {hasActiveFilters && (
              <button type="button" className="clear-filter-btn" onClick={clearFilters}>
                Limpar filtros
              </button>
            )}
          </div>
        </section>

        {loading ? (
          <div className="supp-loading card">
            <div className="loading-spinner" />
            <p>Carregando suplementos...</p>
          </div>
        ) : supplements.length === 0 ? (
          <div className="supp-empty card">
            <h3>Nenhum suplemento encontrado</h3>
            <p>Tente ajustar os filtros ou aguarde novos produtos.</p>
          </div>
        ) : (
          <section className="supp-grid">
            {supplements.map((supplement) => (
              <article key={supplement.id} className={`supp-card ${supplement.featured ? 'featured' : ''}`}>
                {supplement.featured && <span className="supp-featured">Destaque</span>}
                <div className="supp-image-wrap">
                  <img
                    className="supp-image"
                    src={supplement.image_url}
                    alt={supplement.title}
                    loading="lazy"
                    onError={(event) => {
                      event.target.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="220"%3E%3Crect fill="%231e293b" width="300" height="220"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ESem imagem%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <div className="supp-card-body">
                  <div className="supp-meta">
                    <span className="supp-category">{supplement.category?.name || 'Categoria'}</span>
                    {supplement.brand?.name && <span className="supp-brand">{supplement.brand.name}</span>}
                  </div>

                  <h3 className="supp-title">{supplement.title}</h3>

                  {supplement.rating > 0 && (
                    <div className="supp-rating">
                      <span>{renderStars(supplement.rating)}</span>
                      <small>({supplement.total_reviews || 0})</small>
                    </div>
                  )}

                  <div className="supp-price">{formatPrice(supplement.price)}</div>

                  <div className="supp-actions">
                    <button type="button" className="supp-buy-btn" onClick={() => handleProductClick(supplement)}>
                      Ver produto
                      <ExternalLink size={15} />
                    </button>
                    {user?.is_admin && (
                      <button
                        type="button"
                        className="supp-edit-btn"
                        onClick={() => handleEditProduct(supplement)}
                      >
                        Editar
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {user?.is_admin && (
          <button
            className="supp-admin-fab"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            title="Adicionar produto"
          >
            +
          </button>
        )}
      </div>

      {showModal && (
        <div className="supp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="supp-modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="supp-modal-head">
              <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button type="button" className="supp-close-btn" onClick={() => setShowModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form className="supp-form" onSubmit={handleSaveProduct}>
              <div className="supp-form-group">
                <label>Link do produto *</label>
                <div className="supp-inline-input">
                  <input
                    type="url"
                    value={formData.affiliate_link}
                    onChange={(event) => setFormData({ ...formData, affiliate_link: event.target.value })}
                    placeholder="https://produto.mercadolivre.com.br/..."
                    required
                  />
                  <button
                    type="button"
                    className="supp-preview-btn"
                    onClick={handlePreviewLink}
                    disabled={loadingPreview || !formData.affiliate_link}
                  >
                    {loadingPreview ? 'Buscando...' : 'Preview'}
                  </button>
                </div>
              </div>

              {previewData && (
                <div className="supp-preview-card">
                  <h4>Preview</h4>
                  {previewData.image_url && <img src={previewData.image_url} alt="Preview" />}
                  <p>{previewData.title || 'Sem titulo'}</p>
                  <small>{formatPrice(previewData.price)}</small>
                </div>
              )}

              <div className="supp-form-grid">
                <div className="supp-form-group">
                  <label>Categoria *</label>
                  <select
                    value={formData.category_id}
                    onChange={(event) => setFormData({ ...formData, category_id: event.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="supp-form-group">
                  <label>Marca</label>
                  <select
                    value={formData.brand_id}
                    onChange={(event) => setFormData({ ...formData, brand_id: event.target.value })}
                  >
                    <option value="">Selecione</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="supp-form-group">
                <label>Titulo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                />
              </div>

              <div className="supp-form-group">
                <label>Descricao</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                />
              </div>

              <div className="supp-form-grid">
                <div className="supp-form-group">
                  <label>Preco (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                  />
                </div>
                <div className="supp-form-group">
                  <label>URL da imagem</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(event) => setFormData({ ...formData, image_url: event.target.value })}
                  />
                </div>
              </div>

              <div className="supp-check">
                <input
                  id="featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(event) => setFormData({ ...formData, featured: event.target.checked })}
                />
                <label htmlFor="featured">Produto em destaque</label>
              </div>

              <div className="supp-form-actions">
                <button type="button" className="supp-btn-muted" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="supp-btn-primary"
                  disabled={!formData.affiliate_link || !formData.category_id}
                >
                  {editingProduct ? 'Atualizar' : 'Criar'} produto
                </button>
              </div>

              {editingProduct && (
                <button
                  type="button"
                  className="supp-delete-btn"
                  onClick={() => handleDeleteProduct(editingProduct.id)}
                >
                  Excluir produto
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
