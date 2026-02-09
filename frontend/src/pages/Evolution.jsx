import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown, Plus, Trash2, Scale, Activity, Calendar } from 'lucide-react';
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

  useEffect(() => {
    loadMetrics();
  }, [user]);

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
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderTrend = (diff, unit) => {
    if (diff === null || diff === 0) return null;
    
    const isPositive = diff > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'trend-up' : 'trend-down';
    
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
    <div className="evolution-page">
      <div className="evolution-container">
        <PageHeader 
          icon={TrendingUp}
          title="Evolução"
          subtitle="Acompanhe seu progresso físico"
        />

        {/* Stats Cards */}
        {stats.current && (
          <div className="stats-cards fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-card weight-card">
              <div className="stat-icon">
                <Scale size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Peso Atual</span>
                <div className="stat-value-group">
                  <span className="stat-value">{stats.current.weight} kg</span>
                  {renderTrend(stats.weightDiff, 'kg')}
                </div>
              </div>
            </div>

            {stats.current.body_fat_percentage && (
              <div className="stat-card fat-card">
                <div className="stat-icon">
                  <Activity size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">% Gordura</span>
                  <div className="stat-value-group">
                    <span className="stat-value">{stats.current.body_fat_percentage}%</span>
                    {renderTrend(stats.fatDiff, '%')}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Histórico */}
        <section className="metrics-history fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Histórico de Medições</h2>
          
          {metrics.length === 0 ? (
            <div className="empty-state">
              <Scale size={48} className="empty-icon" />
              <p className="empty-message">Nenhuma medição registrada</p>
              <p className="empty-hint">Adicione sua primeira medição para começar a acompanhar sua evolução</p>
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={20} />
                Adicionar Medição
              </button>
            </div>
          ) : (
            <div className="metrics-list">
              {metrics.map((metric, index) => (
                <div 
                  key={metric.id} 
                  className="metric-card"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="metric-date">
                    <Calendar size={16} />
                    <span>{formatDate(metric.measured_at)}</span>
                  </div>
                  
                  <div className="metric-values">
                    <div className="metric-value">
                      <Scale size={18} />
                      <span>{metric.weight} kg</span>
                    </div>
                    
                    {metric.body_fat_percentage && (
                      <div className="metric-value">
                        <Activity size={18} />
                        <span>{metric.body_fat_percentage}%</span>
                      </div>
                    )}
                  </div>
                  
                  {metric.notes && (
                    <p className="metric-notes">{metric.notes}</p>
                  )}
                  
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(metric.id)}
                    title="Deletar medição"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal de Adicionar Medição */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Medição</h2>
              <button 
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="metric-form">
              <div className="form-group">
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
                />
              </div>

              <div className="form-group">
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
                  placeholder="Ex: 15.2"
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Após almoço, manhã em jejum..."
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={18} />
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
