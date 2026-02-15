import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown, Plus, Trash2, Scale, Activity, Calendar, Target, Award } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import './Evolution.css';

export default function Evolution() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState([]);
  const [stats, setStats] = useState({
    current: null,
    previous: null,
    weightDiff: null,
    fatDiff: null
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    body_fat_percentage: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [userHeight, setUserHeight] = useState(170); // Altura em cm para cálculo IMC

  useEffect(() => {
    loadMetrics();
    // Carregar altura do localStorage
    const savedHeight = localStorage.getItem('userHeight');
    if (savedHeight) {
      setUserHeight(parseInt(savedHeight));
    }
  }, [user]);

  const saveHeight = (height) => {
    setUserHeight(height);
    localStorage.setItem('userHeight', height.toString());
  };

  const calculateIMC = (weight) => {
    if (!weight || !userHeight) return null;
    const heightM = userHeight / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const getIMCCategory = (imc) => {
    if (!imc) return { label: '-', color: 'gray' };
    if (imc < 18.5) return { label: 'Abaixo do peso', color: '#3b82f6' };
    if (imc < 25) return { label: 'Peso normal', color: '#10b981' };
    if (imc < 30) return { label: 'Sobrepeso', color: '#f59e0b' };
    return { label: 'Obesidade', color: '#ef4444' };
  };

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const [metricsData, statsData] = await Promise.all([
        api.getUserMetrics(user.id, 30),
        api.getMetricsStats(user.id)
      ]);
      
      setMetrics(metricsData);
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      alert('Por favor, insira um peso válido');
      return;
    }

    try {
      await api.createMetric(
        user.id,
        parseFloat(formData.weight),
        formData.body_fat_percentage ? parseFloat(formData.body_fat_percentage) : null,
        formData.notes || null,
        formData.date
      );

      setFormData({
        weight: '',
        body_fat_percentage: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowModal(false);
      loadMetrics();
    } catch (error) {
      console.error('Erro ao salvar métrica:', error);
      alert('Erro ao salvar medição');
    }
  };

  const handleDelete = async (metricId) => {
    if (!confirm('Deseja realmente deletar esta medição?')) return;

    try {
      await api.deleteMetric(metricId);
      loadMetrics();
    } catch (error) {
      console.error('Erro ao deletar métrica:', error);
      alert('Erro ao deletar medição');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = String(dateString).split('-');
    if (!year || !month || !day) {
      const fallbackDate = new Date(dateString);
      return fallbackDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMetricDate = (metric) => metric.date || (metric.measured_at ? metric.measured_at.split('T')[0] : null);
  const formatShortDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = String(dateString).split('-');
    if (!year || !month || !day) return '-';
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const renderTrend = (diff, unit) => {
    if (diff === null || diff === 0) return null;
    
    const isPositive = diff > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'positive' : 'negative';
    
    return (
      <span className={`trend ${colorClass}`}>
        <Icon size={14} />
        {Math.abs(diff)}{unit}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="evolution-page">
        <div className="evolution-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando suas métricas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page evolution-page">
      <div className="container">
        <PageHeader 
          icon={TrendingUp}
          title="Evolução Corporal"
          subtitle="Acompanhe suas medições e progresso físico"
        />

        {/* Stats Cards */}
        {stats.current && (
          <div className="evo-stats-grid">
            <div className="evo-stat-card premium-card">
              <div className="evo-stat-icon weight">
                <Scale size={28} />
              </div>
              <div className="evo-stat-content">
                <span className="evo-stat-label">Peso Atual</span>
                <span className="evo-stat-value">{stats.current.weight} kg</span>
                {renderTrend(stats.weightDiff, 'kg')}
                {stats.previous && (
                  <span className="evo-stat-subtext">Evolução total desde {formatDate(stats.previous.date || stats.previous.measured_at?.split('T')[0])}</span>
                )}
              </div>
            </div>

            <div className="evo-stat-card premium-card">
              <div className="evo-stat-icon imc">
                <Target size={28} />
              </div>
              <div className="evo-stat-content">
                <span className="evo-stat-label">IMC</span>
                <span className="evo-stat-value">{calculateIMC(stats.current.weight) || '-'}</span>
                {calculateIMC(stats.current.weight) && (
                  <span 
                    className="imc-category"
                    style={{ color: getIMCCategory(calculateIMC(stats.current.weight)).color }}
                  >
                    {getIMCCategory(calculateIMC(stats.current.weight)).label}
                  </span>
                )}
              </div>
            </div>

            {stats.current.body_fat_percentage && (
              <div className="evo-stat-card premium-card">
                <div className="evo-stat-icon fat">
                  <Activity size={28} />
                </div>
                <div className="evo-stat-content">
                  <span className="evo-stat-label">% Gordura</span>
                  <span className="evo-stat-value">{stats.current.body_fat_percentage}%</span>
                  {renderTrend(stats.fatDiff, '%')}
                </div>
              </div>
            )}

            <div className="evo-stat-card premium-card">
              <div className="evo-stat-icon total">
                <Award size={28} />
              </div>
              <div className="evo-stat-content">
                <span className="evo-stat-label">Total de Medições</span>
                <span className="evo-stat-value">{metrics.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de Evolução */}
        {metrics.length > 0 && (
          <div className="evolution-chart premium-card">
            <h2 className="section-title">
              <TrendingUp size={24} />
              Evolução do Peso
            </h2>
            <div className="chart-container">
              {metrics.slice().reverse().slice(0, 10).map((metric, index) => {
                const maxWeight = Math.max(...metrics.map(m => m.weight));
                const minWeight = Math.min(...metrics.map(m => m.weight));
                const range = maxWeight - minWeight || 1;
                const height = ((metric.weight - minWeight) / range) * 100;
                
                return (
                  <div key={metric.id} className="chart-bar-wrapper">
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar"
                        style={{ 
                          height: `${Math.max(height, 10)}%`,
                          background: 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))'
                        }}
                      >
                        <span className="chart-value">{metric.weight}kg</span>
                      </div>
                    </div>
                    <span className="chart-label">{formatShortDate(getMetricDate(metric))}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Histórico */}
        <section className="metrics-section premium-card">
          <div className="section-header">
            <h2 className="section-title">
              <Calendar size={24} />
              Histórico de Medições
            </h2>
          </div>
          
          {metrics.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <Scale size={64} />
              </div>
              <h3>Nenhuma medição registrada</h3>
              <p>Adicione sua primeira medição para começar a acompanhar sua evolução</p>
              <p className="empty-hint">💡 Registre medições regulares para visualizar seu progresso!</p>
            </div>
          ) : (
            <div className="metrics-list">
              {metrics.map((metric) => {
                const imc = calculateIMC(metric.weight);
                const imcCat = getIMCCategory(imc);
                
                return (
                  <div key={metric.id} className="metric-item">
                    <div className="metric-date-badge">
                      <Calendar size={14} />
                      {formatDate(getMetricDate(metric))}
                    </div>
                    
                    <div className="metric-data">
                      <div className="metric-primary">
                        <div className="metric-value-item">
                          <Scale size={18} />
                          <span className="value">{metric.weight} kg</span>
                        </div>
                        
                        {imc && (
                          <div className="metric-value-item">
                            <Target size={18} />
                            <span className="value">IMC: {imc}</span>
                            <span className="imc-badge" style={{ background: imcCat.color }}>
                              {imcCat.label}
                            </span>
                          </div>
                        )}
                        
                        {metric.body_fat_percentage && (
                          <div className="metric-value-item">
                            <Activity size={18} />
                            <span className="value">{metric.body_fat_percentage}% gordura</span>
                          </div>
                        )}
                      </div>
                      
                      {metric.notes && (
                        <p className="metric-notes">📝 {metric.notes}</p>
                      )}
                    </div>
                    
                    <button 
                      className="btn-delete-metric"
                      onClick={() => handleDelete(metric.id)}
                      title="Deletar medição"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Botão flutuante de adicionar */}
        <button 
          className="fab-button"
          onClick={() => setShowModal(true)}
          title="Adicionar nova medição"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Modal de Adicionar Medição */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content metric-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-enhanced">
              <div className="modal-title">
                <Scale size={28} />
                <div>
                  <h2>Nova Medição</h2>
                  <p>Registre seu peso e composição corporal</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="metric-form-enhanced">
              <div className="form-group-enhanced">
                <label>
                  <Scale size={18} />
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="500"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="Ex: 75.5"
                  required
                  autoFocus
                />
                {formData.weight && (
                  <span className="input-hint">
                    IMC: {calculateIMC(parseFloat(formData.weight)) || 'Configure sua altura'}
                  </span>
                )}
              </div>

              <div className="form-group-enhanced">
                <label>
                  <Activity size={18} />
                  % Gordura Corporal
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.body_fat_percentage}
                  onChange={(e) => setFormData({ ...formData, body_fat_percentage: e.target.value })}
                  placeholder="Ex: 15.2 (opcional)"
                />
              </div>

              <div className="form-row">
                <div className="form-group-enhanced">
                  <label>
                    <Calendar size={18} />
                    Data da Medição
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group-enhanced">
                  <label>
                    <Target size={18} />
                    Sua Altura (cm)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="50"
                    max="250"
                    value={userHeight}
                    onChange={(e) => saveHeight(parseInt(e.target.value) || 170)}
                    placeholder="Ex: 175"
                  />
                </div>
              </div>

              <div className="form-group-enhanced">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Após almoço, manhã em jejum, pós-treino..."
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary-large"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary-large">
                  <Plus size={20} />
                  Salvar Medição
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
