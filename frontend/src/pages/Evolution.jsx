import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown, Plus, Trash2, Scale, Activity, Calendar, Target, Award, ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import { exercisesDatabase } from '../data/exercises';
import './Evolution.css';

export default function Evolution() {
  const METRICS_PER_PAGE = 5;
  const HISTORY_LIMIT = 200;
  const { user } = useAuth();
  const [metrics, setMetrics] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [stats, setStats] = useState({
    current: null,
    previous: null,
    weightDiff: null,
    fatDiff: null
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [metricsPage, setMetricsPage] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [trendMetric, setTrendMetric] = useState('max_weight');
  const [historySort, setHistorySort] = useState('date');
  const [historyRange, setHistoryRange] = useState('all');
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

  useEffect(() => {
    setMetricsPage(1);
  }, [metrics.length]);

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
      const [metricsData, statsData, historyData] = await Promise.all([
        api.getUserMetrics(user.id, 30),
        api.getMetricsStats(user.id),
        api.getWorkoutHistory(user.id, HISTORY_LIMIT)
      ]);
      
      setMetrics(metricsData);
      setStats(statsData);
      setWorkoutHistory(historyData?.history || historyData || []);
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


  const exerciseSessionsMap = React.useMemo(() => {
    const map = {};
    workoutHistory.forEach((entry) => {
      const logs = entry?.performance_data || entry?.performanceData || entry?.performance_log || [];
      if (!Array.isArray(logs) || logs.length === 0) return;

      const entryDate = entry.completed_at
        ? entry.completed_at.split('T')[0]
        : entry.date || entry.measured_at?.split?.('T')?.[0] || null;

      const perExercise = {};
      logs.forEach((log) => {
        const name = log.exerciseName || log.exercise_name || log.name;
        if (!name) return;
        if (!perExercise[name]) {
          perExercise[name] = {
            totalReps: 0,
            totalVolume: 0,
            maxWeight: 0,
            sets: 0
          };
        }
        const reps = Number(log.reps) || 0;
        const weight = Number(log.weight) || 0;
        perExercise[name].totalReps += reps;
        perExercise[name].totalVolume += reps * weight;
        perExercise[name].maxWeight = Math.max(perExercise[name].maxWeight, weight);
        perExercise[name].sets += 1;
      });

      Object.entries(perExercise).forEach(([name, stats]) => {
        if (!map[name]) map[name] = [];
        map[name].push({
          ...stats,
          workoutName: entry.workout_name || 'Treino',
          completedAt: entry.completed_at || entryDate,
          date: entryDate
        });
      });
    });

    Object.values(map).forEach((sessions) => {
      sessions.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
    });

    return map;
  }, [workoutHistory]);

  const exerciseOptions = React.useMemo(() => {
    return Object.keys(exerciseSessionsMap)
      .filter((name) =>
        (exerciseSessionsMap[name] || []).some(
          (session) => session.maxWeight > 0 || session.totalVolume > 0 || session.totalReps > 0
        )
      )
      .sort((a, b) => a.localeCompare(b));
  }, [exerciseSessionsMap]);

  useEffect(() => {
    if (!selectedExercise && exerciseOptions.length > 0) {
      setSelectedExercise(exerciseOptions[0]);
    }
  }, [exerciseOptions, selectedExercise]);

  const selectedSessions = selectedExercise ? (exerciseSessionsMap[selectedExercise] || []) : [];
  const rangeCutoff = React.useMemo(() => {
    if (historyRange === '30') {
      return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    if (historyRange === '90') {
      return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    }
    return null;
  }, [historyRange]);

  const normalizedSessions = React.useMemo(() => {
    let sessions = selectedSessions.map((session) => ({
      ...session,
      workoutKey: String(session.workoutName || '').toLowerCase()
    }));

    sessions = sessions.filter(
      (session) => session.maxWeight > 0 || session.totalVolume > 0 || session.totalReps > 0
    );

    if (rangeCutoff) {
      sessions = sessions.filter((session) => {
        if (!session.completedAt) return false;
        return new Date(session.completedAt) >= rangeCutoff;
      });
    }

    if (historySort === 'workout_abc') {
      sessions.sort((a, b) => {
        const letterA = a.workoutKey.match(/\btreino\s*([a-z])\b/i)?.[1] || '';
        const letterB = b.workoutKey.match(/\btreino\s*([a-z])\b/i)?.[1] || '';
        if (letterA && letterB && letterA != letterB) {
          return letterA.localeCompare(letterB);
        }
        return new Date(a.completedAt) - new Date(b.completedAt);
      });
    } else if (historySort === 'workout_name') {
      sessions.sort((a, b) => {
        const nameSort = a.workoutKey.localeCompare(b.workoutKey);
        if (nameSort != 0) return nameSort;
        return new Date(a.completedAt) - new Date(b.completedAt);
      });
    } else {
      sessions.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
    }

    return sessions;
  }, [selectedSessions, historySort, rangeCutoff]);

  const latestSession = normalizedSessions[normalizedSessions.length - 1] || null;
  const previousSession = normalizedSessions[normalizedSessions.length - 2] || null;
  const bestMaxWeight = normalizedSessions.reduce((max, s) => Math.max(max, s.maxWeight), 0);
  const averageVolume = normalizedSessions.length
    ? Math.round(normalizedSessions.reduce((sum, s) => sum + s.totalVolume, 0) / normalizedSessions.length)
    : 0;

  const chartMetricLabel = trendMetric === 'total_volume'
    ? 'Volume (kg)'
    : trendMetric === 'total_reps'
      ? 'Reps'
      : 'Carga Maxima (kg)';

  const chartData = normalizedSessions.slice(-12);
  const maxChartValue = Math.max(
    1,
    ...chartData.map((session) => {
      if (trendMetric === 'total_volume') return session.totalVolume;
      if (trendMetric === 'total_reps') return session.totalReps;
      return session.maxWeight;
    })
  );

  const movingAverage = chartData.map((session, index) => {
    const windowSlice = chartData.slice(Math.max(0, index - 2), index + 1);
    const sum = windowSlice.reduce((acc, item) => {
      if (trendMetric === 'total_volume') return acc + item.totalVolume;
      if (trendMetric === 'total_reps') return acc + item.totalReps;
      return acc + item.maxWeight;
    }, 0);
    return sum / windowSlice.length;
  });

  const chartPoints = chartData
    .map((session, index) => {
      const value = movingAverage[index] || 0;
      const x = chartData.length > 1 ? (index / (chartData.length - 1)) * 100 : 50;
      const y = 100 - (value / maxChartValue) * 100;
      return `${x},${Math.max(0, Math.min(100, y))}`;
    })
    .join(' ');

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

  const totalMetricPages = Math.max(1, Math.ceil(metrics.length / METRICS_PER_PAGE));
  const metricsStartIndex = (metricsPage - 1) * METRICS_PER_PAGE;
  const pagedMetrics = metrics.slice(metricsStartIndex, metricsStartIndex + METRICS_PER_PAGE);

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
        {exerciseOptions.length > 0 && (
          <section className="workout-evolution premium-card">
            <div className="section-header">
              <h2 className="section-title">
                <Dumbbell size={24} />
                Evolução de Cargas
              </h2>
            </div>

            <div className="workout-evolution-toolbar">
              <div className="filter-row">
                <label htmlFor="history-range">Periodo</label>
                <select
                  id="history-range"
                  value={historyRange}
                  onChange={(event) => setHistoryRange(event.target.value)}
                >
                  <option value="all">Todo periodo</option>
                  <option value="30">Ultimos 30 dias</option>
                  <option value="90">Ultimos 90 dias</option>
                </select>
              </div>

              <div className="filter-row">
                <label htmlFor="history-sort">Ordenar</label>
                <select
                  id="history-sort"
                  value={historySort}
                  onChange={(event) => setHistorySort(event.target.value)}
                >
                  <option value="date">Data</option>
                  <option value="workout_abc">Treino A/B/C</option>
                  <option value="workout_name">Nome do treino</option>
                </select>
              </div>

              <div className="filter-row">
                <label htmlFor="exercise-history-select">Exercicio</label>
                <select
                  id="exercise-history-select"
                  value={selectedExercise}
                  onChange={(event) => setSelectedExercise(event.target.value)}
                >
                  {exerciseOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="metric-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${trendMetric === 'max_weight' ? 'active' : ''}`}
                  onClick={() => setTrendMetric('max_weight')}
                >
                  Carga maxima
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${trendMetric === 'total_volume' ? 'active' : ''}`}
                  onClick={() => setTrendMetric('total_volume')}
                >
                  Volume
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${trendMetric === 'total_reps' ? 'active' : ''}`}
                  onClick={() => setTrendMetric('total_reps')}
                >
                  Reps
                </button>
              </div>
            </div>

            {normalizedSessions.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum dado de carga registrado para este exercício.</p>
              </div>
            ) : (
              <>
                <div className="workout-evolution-stats">
                  <div className="evo-mini-card">
                    <span className="mini-label">Última sessão</span>
                    <strong className="mini-value">{latestSession?.maxWeight || 0} kg</strong>
                    {previousSession && (
                      <span className="mini-sub">
                        {latestSession.maxWeight - previousSession.maxWeight >= 0 ? '+' : ''}
                        {latestSession.maxWeight - previousSession.maxWeight} kg vs anterior
                      </span>
                    )}
                  </div>
                  <div className="evo-mini-card">
                    <span className="mini-label">Melhor carga</span>
                    <strong className="mini-value">{bestMaxWeight} kg</strong>
                    {bestMaxWeight > 0 && <span className="mini-sub">PR do exercicio</span>}
                  </div>
                  <div className="evo-mini-card">
                    <span className="mini-label">Volume médio</span>
                    <strong className="mini-value">{averageVolume} kg</strong>
                  </div>
                  <div className="evo-mini-card">
                    <span className="mini-label">Sessões</span>
                    <strong className="mini-value">{normalizedSessions.length}</strong>
                  </div>
                </div>

                {selectedExercise && exerciseSessionsMap[selectedExercise]?.[0]?.workoutName && (
                  <div className="exercise-gif-header">
                    <div className="exercise-gif">
                      {(() => {
                        const exerciseInfo = exercisesDatabase.find(
                          (ex) => ex.name === selectedExercise || ex.originalName === selectedExercise
                        );
                        if (!exerciseInfo?.gifUrl) return <span>Sem GIF</span>;
                        return <img src={exerciseInfo.gifUrl} alt={selectedExercise} loading="lazy" />;
                      })()}
                    </div>
                    <div className="exercise-gif-info">
                      <strong>{selectedExercise}</strong>
                      {exerciseSessionsMap[selectedExercise]?.[0]?.workoutName && (
                        <span>{exerciseSessionsMap[selectedExercise]?.[0]?.workoutName}</span>
                      )}
                    </div>
                  </div>
                )}
                <div className="workout-evolution-chart">
                  <div className="chart-header">
                    <span>{chartMetricLabel}</span>
                    {chartData.length > 1 && <span className="chart-sub">Media movel (3)</span>}
                  </div>
                  <div className="chart-container">
                    {chartData.length > 1 && (
                      <svg className="chart-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline points={chartPoints} />
                        {chartData.map((session, index) => {
                          const value = movingAverage[index] || 0;
                          const x = chartData.length > 1 ? (index / (chartData.length - 1)) * 100 : 50;
                          const y = 100 - (value / maxChartValue) * 100;
                          return <circle key={`${session.completedAt}-dot`} cx={x} cy={y} r="1.6" />;
                        })}
                      </svg>
                    )}
                    {chartData.map((session) => {
                      const rawValue =
                        trendMetric === 'total_volume'
                          ? session.totalVolume
                          : trendMetric === 'total_reps'
                            ? session.totalReps
                            : session.maxWeight;
                      const height = (rawValue / maxChartValue) * 100;
                      const isPr = trendMetric === 'max_weight' && rawValue === bestMaxWeight;
                      return (
                        <div key={`${session.completedAt}-${session.workoutName}`} className="chart-bar-wrapper">
                          <div className="chart-bar-container">
                            <div
                              className={`chart-bar ${isPr ? 'pr' : ''}`}
                              style={{
                                height: `${Math.max(height, 8)}%`,
                                background: 'linear-gradient(180deg, #22d3ee, #34d399)'
                              }}
                            >
                              <span className="chart-value">
                                {rawValue}{trendMetric === 'total_reps' ? '' : 'kg'}
                              </span>
                              {isPr && <span className="chart-pr">PR</span>}
                            </div>
                          </div>
                          <span className="chart-label">{formatShortDate(session.date)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>
        )}

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
              {pagedMetrics.map((metric) => {
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

          {metrics.length > METRICS_PER_PAGE && (
            <nav className="metrics-pagination" aria-label="Paginação de medições">
              <button
                type="button"
                className="page-btn"
                onClick={() => setMetricsPage((value) => Math.max(1, value - 1))}
                disabled={metricsPage === 1}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              <strong>
                Página {metricsPage} de {totalMetricPages}
              </strong>

              <button
                type="button"
                className="page-btn"
                onClick={() => setMetricsPage((value) => Math.min(totalMetricPages, value + 1))}
                disabled={metricsPage === totalMetricPages}
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            </nav>
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
