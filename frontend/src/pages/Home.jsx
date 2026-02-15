import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, Droplet, TrendingUp, Flame, Calendar, Sparkles } from 'lucide-react';
import api from '../services/api';
import './Home.css';

// Frases motivacionais rotativas
const motivationalQuotes = [
  { text: "A disciplina é a ponte entre objetivos e conquistas", author: "Jim Rohn" },
  { text: "O único treino ruim é aquele que não foi feito", author: "Desconhecido" },
  { text: "Seu corpo aguenta quase tudo. É sua mente que você precisa convencer", author: "Desconhecido" },
  { text: "Não importa quão devagar você vá, desde que não pare", author: "Confúcio" },
  { text: "A diferença entre o impossível e o possível está na determinação", author: "Tommy Lasorda" },
  { text: "Força não vem da capacidade física, mas de uma vontade indomável", author: "Mahatma Gandhi" },
  { text: "O sucesso não é acidental, é trabalho duro, perseverança e aprendizado", author: "Colin Powell" },
  { text: "Desafie-se, porque ninguém mais vai fazer isso por você", author: "Desconhecido" },
  { text: "Treine como se sua vida dependesse disso", author: "Desconhecido" },
  { text: "A dor que você sente hoje será a força que você sentirá amanhã", author: "Arnold Schwarzenegger" },
  { text: "Se não doer, você não está fazendo direito", author: "Desconhecido" },
  { text: "O único lugar onde sucesso vem antes do trabalho é no dicionário", author: "Vidal Sassoon" },
  { text: "Não conte os dias, faça os dias contarem", author: "Muhammad Ali" },
  { text: "A consistência é o que transforma metas em realidade", author: "Desconhecido" },
  { text: "Você não precisa ser extremo, só consistente", author: "Desconhecido" }
];

// Retorna frase do dia baseada na data
const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[index];
};

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    waterProgress: 0,
    workoutsThisWeek: 0,
    currentStreak: 0,
    nextReminder: null
  });
  const [loading, setLoading] = useState(true);
  const [dailyQuote] = useState(getDailyQuote());

  useEffect(() => {
    loadStats();
    if (!user?.id) return;

    const intervalId = setInterval(() => {
      loadStats();
    }, 60000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadStats();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const loadStats = async () => {
    try {
      if (!user?.id) return;
      // Carregar progresso de água
      const waterData = await api.getWaterProgress(user.id);
      const waterProgress = waterData?.percentage || 0;

      // Carregar histórico de treinos (últimos 7 dias)
      const { history } = await api.getWorkoutHistory(user.id, 30);
      
      // Contar treinos da semana atual
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const workoutsThisWeek = history?.filter(w => 
        new Date(w.completed_at) >= weekStart
      ).length || 0;

      // Carregar próximo lembrete
      const reminders = await api.getReminders(user.id);
      const activeReminders = reminders.filter(r => r.is_active);
      // Implementar lógica de próximo lembrete depois

      setStats({
        waterProgress,
        workoutsThisWeek,
        currentStreak: 0,
        nextReminder: null
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Header com saudação */}
        <header className="home-header fade-in">
          <div className="greeting">
            <h1>{getGreeting()}, <span className="user-name">{user?.name || 'Atleta'}</span></h1>
            <p className="subtitle">Pronto para superar seus limites hoje?</p>
          </div>
          <div className="header-icon">
            <Flame className="flame-icon" size={32} />
          </div>
        </header>

        {/* Frase motivacional do dia */}
        <div className="daily-quote-card slide-up">
          <div className="quote-icon">
            <Sparkles size={24} />
          </div>
          <div className="quote-content">
            <p className="quote-text">"{dailyQuote.text}"</p>
            <p className="quote-author">— {dailyQuote.author}</p>
          </div>
        </div>

        {/* Estatísticas principais */}
        <div className="stats-grid">
          <div className="stat-card water-stat fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-header">
              <Droplet size={24} />
              <span className="stat-label">Hidratação</span>
            </div>
            <div className="stat-value">{stats.waterProgress}%</div>
            <div className="stat-progress">
              <div 
                className="stat-progress-fill water-fill"
                style={{ width: `${stats.waterProgress}%` }}
              />
            </div>
          </div>

          <div className="stat-card workout-stat fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-header">
              <Dumbbell size={24} />
              <span className="stat-label">Treinos/Semana</span>
            </div>
            <div className="stat-value">{stats.workoutsThisWeek}</div>
            <div className="stat-footer">de 7 dias</div>
          </div>

          <div className="stat-card streak-stat fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="stat-header">
              <Flame size={24} />
              <span className="stat-label">Sequência</span>
            </div>
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-footer">dias seguidos</div>
          </div>
        </div>

        {/* Ações rápidas */}
        <section className="quick-actions-section fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title">Ações Rápidas</h2>
          <div className="quick-actions">
            <a href="/workouts" className="action-button workout-action">
              <Dumbbell size={24} />
              <span>Treinos</span>
            </a>
            
            <a href="/reminders" className="action-button reminders-action">
              <Calendar size={24} />
              <span>Lembretes</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

