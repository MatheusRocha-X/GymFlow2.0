import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Calendar, Dumbbell, Zap, Target, Award, BarChart3, Activity } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
import './Progress.css';

export default function Progress() {
  const { user } = useAuth();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalVolume: 0,
    totalTime: 0,
    averageWorkoutTime: 0,
    favoriteExercises: [],
    weeklyProgress: []
  });

  useEffect(() => {
    loadWorkoutHistory();
  }, [user]);

  const loadWorkoutHistory = async () => {
    setLoading(true);
    try {
      // Buscar do backend
      const { history } = await api.getWorkoutHistory(user.id, 100);
      
      // Formatar dados vindos do banco
      const formattedHistory = history?.map(h => ({
        workoutId: h.workout_id,
        workoutName: h.workout_name,
        userId: h.user_id,
        completedAt: h.completed_at,
        duration: h.duration || 0,
        totalRestTime: h.total_rest_time || 0,
        exercises: h.total_exercises || 0,
        sets: h.total_sets || 0,
        workoutLog: h.performance_data || []
      })) || [];

      setWorkoutHistory(formattedHistory);
      calculateStats(formattedHistory);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      // Fallback: tentar localStorage
      const localHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
      setWorkoutHistory(localHistory);
      calculateStats(localHistory);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (history) => {
    if (history.length === 0) {
      return;
    }

    // Total de treinos
    const totalWorkouts = history.length;

    // Volume total (reps × carga)
    const totalVolume = history.reduce((sum, workout) => {
      const workoutVolume = workout.workoutLog?.reduce((vol, log) => {
        return vol + (log.reps * log.weight);
      }, 0) || 0;
      return sum + workoutVolume;
    }, 0);

    // Tempo total
    const totalTime = history.reduce((sum, workout) => sum + workout.duration, 0);

    // Tempo médio
    const averageWorkoutTime = Math.floor(totalTime / totalWorkouts / 60);

    // Exercícios mais realizados
    const exerciseCount = {};
    history.forEach(workout => {
      workout.workoutLog?.forEach(log => {
        exerciseCount[log.exerciseName] = (exerciseCount[log.exerciseName] || 0) + 1;
      });
    });

    const favoriteExercises = Object.entries(exerciseCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Progresso semanal (últimos 7 dias)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayWorkouts = history.filter(w => {
        const workoutDate = new Date(w.completedAt).toISOString().split('T')[0];
        return workoutDate === dateStr;
      });

      last7Days.push({
        date: dateStr,
        day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        workouts: dayWorkouts.length,
        volume: dayWorkouts.reduce((sum, w) => {
          return sum + (w.workoutLog?.reduce((vol, log) => vol + (log.reps * log.weight), 0) || 0);
        }, 0)
      });
    }

    setStats({
      totalWorkouts,
      totalVolume: Math.round(totalVolume),
      totalTime: Math.floor(totalTime / 60),
      averageWorkoutTime,
      favoriteExercises,
      weeklyProgress: last7Days
    });
  };

  const getInsights = () => {
    const insights = [];

    if (stats.totalWorkouts >= 10) {
      insights.push({
        icon: '🔥',
        title: 'Consistência Impressionante!',
        description: `Você já completou ${stats.totalWorkouts} treinos. Continue assim!`,
        type: 'success'
      });
    }

    if (stats.totalVolume > 1000) {
      insights.push({
        icon: '💪',
        title: 'Volume de Treino Elevado',
        description: `${stats.totalVolume}kg movimentados no total. Seu corpo está ficando mais forte!`,
        type: 'success'
      });
    }

    const recentWorkouts = workoutHistory.slice(-5);
    if (recentWorkouts.length >= 5) {
      const avgGap = recentWorkouts.reduce((sum, workout, i) => {
        if (i === 0) return 0;
        const prevDate = new Date(recentWorkouts[i - 1].completedAt);
        const currDate = new Date(workout.completedAt);
        return sum + (currDate - prevDate) / (1000 * 60 * 60 * 24);
      }, 0) / (recentWorkouts.length - 1);

      if (avgGap <= 2) {
        insights.push({
          icon: '⚡',
          title: 'Frequência Ideal',
          description: `Você está treinando a cada ${avgGap.toFixed(1)} dias em média. Excelente ritmo!`,
          type: 'success'
        });
      } else if (avgGap > 4) {
        insights.push({
          icon: '⏰',
          title: 'Aumente a Frequência',
          description: `Seus treinos estão espaçados ${avgGap.toFixed(1)} dias. Tente treinar mais vezes por semana!`,
          type: 'warning'
        });
      }
    }

    if (stats.averageWorkoutTime < 30) {
      insights.push({
        icon: '🎯',
        title: 'Treinos Eficientes',
        description: `Média de ${stats.averageWorkoutTime} minutos por treino. Direto ao ponto!`,
        type: 'info'
      });
    }

    if (insights.length === 0) {
      insights.push({
        icon: '🚀',
        title: 'Comece sua Jornada',
        description: 'Complete mais treinos para receber insights personalizados!',
        type: 'info'
      });
    }

    return insights;
  };

  const maxVolume = Math.max(...stats.weeklyProgress.map(d => d.volume), 1);

  if (loading) {
    return (
      <div className="page progress-page">
        <div className="container">
          <PageHeader 
            icon={TrendingUp}
            title="Acompanhamento Inteligente"
            subtitle="Carregando seus dados..."
          />
          <div className="loading-state premium-card">
            <div className="loading-spinner"></div>
            <p>Carregando histórico de treinos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page progress-page">
      <div className="container">
        <PageHeader 
          icon={TrendingUp}
          title="Acompanhamento Inteligente"
          subtitle="Análise completa da sua evolução"
        />

        {workoutHistory.length === 0 ? (
          <div className="empty-state premium-card">
            <div className="empty-icon-wrapper">
              <BarChart3 size={64} />
            </div>
            <h3>Nenhum treino registrado</h3>
            <p>Complete treinos registrando reps e carga para ver sua evolução</p>
            <p className="empty-hint">💡 Seus dados serão salvos automaticamente durante os treinos!</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card premium-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <Dumbbell size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Total de Treinos</span>
                  <span className="stat-value">{stats.totalWorkouts}</span>
                </div>
              </div>

              <div className="stat-card premium-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                  <Target size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Volume Total</span>
                  <span className="stat-value">{stats.totalVolume.toLocaleString()}kg</span>
                </div>
              </div>

              <div className="stat-card premium-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <Activity size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Tempo Total</span>
                  <span className="stat-value">{stats.totalTime}min</span>
                </div>
              </div>

              <div className="stat-card premium-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  <Zap size={24} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Tempo Médio</span>
                  <span className="stat-value">{stats.averageWorkoutTime}min</span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="insights-section">
              <h2 className="section-title">
                <Award size={24} />
                Insights Personalizados
              </h2>
              <div className="insights-grid">
                {getInsights().map((insight, index) => (
                  <div key={index} className={`insight-card premium-card ${insight.type}`}>
                    <div className="insight-icon">{insight.icon}</div>
                    <div className="insight-content">
                      <h3>{insight.title}</h3>
                      <p>{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="chart-section premium-card">
              <h2 className="section-title">
                <BarChart3 size={24} />
                Progresso Semanal
              </h2>
              <div className="chart-container">
                {stats.weeklyProgress.map((day, index) => (
                  <div key={index} className="chart-bar-wrapper">
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar"
                        style={{ 
                          height: `${(day.volume / maxVolume) * 100}%`,
                          background: day.workouts > 0 
                            ? 'linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))'
                            : 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {day.workouts > 0 && (
                          <span className="chart-value">{day.workouts}</span>
                        )}
                      </div>
                    </div>
                    <span className="chart-label">{day.day}</span>
                  </div>
                ))}
              </div>
              <p className="chart-legend">Volume de treino (kg) nos últimos 7 dias</p>
            </div>

            {/* Favorite Exercises */}
            {stats.favoriteExercises.length > 0 && (
              <div className="favorites-section premium-card">
                <h2 className="section-title">
                  <Target size={24} />
                  Exercícios Mais Realizados
                </h2>
                <div className="favorites-list">
                  {stats.favoriteExercises.map((exercise, index) => (
                    <div key={index} className="favorite-item">
                      <div className="favorite-rank">#{index + 1}</div>
                      <div className="favorite-info">
                        <span className="favorite-name">{exercise.name}</span>
                        <span className="favorite-count">{exercise.count} séries</span>
                      </div>
                      <div 
                        className="favorite-bar"
                        style={{ 
                          width: `${(exercise.count / stats.favoriteExercises[0].count) * 100}%` 
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Workouts */}
            <div className="history-section premium-card">
              <h2 className="section-title">
                <Calendar size={24} />
                Histórico Recente
              </h2>
              <div className="history-list">
                {workoutHistory.slice(-10).reverse().map((workout, index) => {
                  const workoutVolume = workout.workoutLog?.reduce((sum, log) => 
                    sum + (log.reps * log.weight), 0) || 0;
                  
                  return (
                    <div key={index} className="history-item">
                      <div className="history-date">
                        <Calendar size={16} />
                        {new Date(workout.completedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="history-content">
                        <h4>{workout.workoutName}</h4>
                        <div className="history-stats">
                          <span>{workout.sets} séries</span>
                          <span>•</span>
                          <span>{Math.floor(workout.duration / 60)}min</span>
                          <span>•</span>
                          <span>{workoutVolume.toFixed(0)}kg</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
