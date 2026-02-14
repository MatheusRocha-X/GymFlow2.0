import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Dumbbell, Trash2, Check, X, Search, BookOpen, Play, Edit2, ChevronDown, ChevronUp, Filter, Zap, Activity, Layers3, Sparkles, Clock3, GitBranchPlus, Gauge } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import ActiveWorkout from '../components/ActiveWorkout';
import { exercisesDatabase, categories } from '../data/exercises';
import { PROFILE_LIBRARY, createWorkoutPlan, parseDurationToMinutes, canonicalCategory } from '../services/aiWorkoutPlanner';
import './Workouts.css';

export default function Workouts() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseDetails, setExerciseDetails] = useState({ sets: 3, reps: 12, rest_time: 60 });
  const [searchExercise, setSearchExercise] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedWorkouts, setExpandedWorkouts] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [workoutSearch, setWorkoutSearch] = useState('');
  const [showAiTrainingModal, setShowAiTrainingModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiConfig, setAiConfig] = useState({
    includeWarmup: true,
    duration: '1h',
    split: 'ABC',
    profile: 'HYPERTROPHY'
  });
  const [aiDraftPlan, setAiDraftPlan] = useState([]);
  const [aiProgress, setAiProgress] = useState({
    active: false,
    value: 0,
    label: ''
  });

  useEffect(() => {
    loadWorkouts();
  }, [user]);

  const splitLabels = {
    ABC: 'ABC',
    ABCD: 'ABCD',
    ABCDE: 'ABCDE',
    UPPER_LOWER: 'Superior e Inferior',
    FULL_BODY: 'FullBody'
  };

  const exerciseByName = exercisesDatabase.reduce((acc, exercise) => {
    acc[exercise.name] = exercise;
    return acc;
  }, {});

  const exercisesByCanonicalCategory = exercisesDatabase.reduce((acc, exercise) => {
    const category = canonicalCategory(exercise.category);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {});

  const loadWorkouts = async () => {
    try {
      const { workouts: data } = await api.getUserWorkouts(user.id);
      setWorkouts(data || []);
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    }
  };

  const createWorkout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');

    setLoading(true);
    try {
      await api.createWorkout(user.id, name, description);
      await loadWorkouts();
      setShowCreateForm(false);
      e.target.reset();
    } catch (error) {
      console.error('Erro ao criar treino:', error);
      alert('Erro ao criar treino');
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (workoutId) => {
    if (!confirm('Deseja realmente deletar este treino?')) return;

    try {
      await api.deleteWorkout(workoutId);
      await loadWorkouts();
    } catch (error) {
      console.error('Erro ao deletar treino:', error);
      alert('Erro ao deletar treino');
    }
  };

  const completeWorkout = async (workoutId) => {
    try {
      await api.completeWorkout(workoutId, user.id);
      alert('Treino registrado! 💪');
    } catch (error) {
      console.error('Erro ao registrar treino:', error);
      alert('Erro ao registrar treino');
    }
  };

  const startWorkout = (workout) => {
    if (!workout.exercises || workout.exercises.length === 0) {
      alert('Adicione exercícios ao treino antes de iniciar!');
      return;
    }
    setActiveWorkout(workout);
  };

  const handleWorkoutComplete = async (stats) => {
    try {
      // Preparar dados de performance para o backend
      const performanceData = {
        duration: stats.duration,
        totalRestTime: stats.totalRestTime,
        exercises: stats.exercises,
        sets: stats.sets,
        workoutLog: stats.workoutLog
      };

      // Salvar no backend (banco de dados)
      await api.completeWorkout(activeWorkout.id, user.id, performanceData);

      // Também salvar no localStorage como backup/cache
      const workoutHistory = {
        workoutId: activeWorkout.id,
        workoutName: stats.workoutName,
        userId: user.id,
        completedAt: new Date().toISOString(),
        duration: stats.duration,
        totalRestTime: stats.totalRestTime,
        exercises: stats.exercises,
        sets: stats.sets,
        workoutLog: stats.workoutLog
      };

      const existingHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
      existingHistory.push(workoutHistory);
      localStorage.setItem('workoutHistory', JSON.stringify(existingHistory));
      
      setActiveWorkout(null);
      
      // Mostrar resumo detalhado
      const totalVolume = stats.workoutLog.reduce((sum, log) => sum + (log.reps * log.weight), 0);
      alert(`Treino concluído! 💪\n\nTempo total: ${stats.totalMinutes}m\nSéries completadas: ${stats.completedSets}\nTempo de descanso: ${stats.totalRestMinutes}m\nVolume total: ${totalVolume.toFixed(1)}kg\n\nDados salvos no banco de dados!`);
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      alert('Erro ao salvar treino no histórico. Os dados foram salvos localmente.');
    }
  };

  const openExercisePicker = (workout) => {
    setCurrentWorkout(workout);
    setShowExercisePicker(true);
  };

  const closeExercisePicker = () => {
    setShowExercisePicker(false);
    setSelectedExercise(null);
    setSearchExercise('');
    setSelectedCategory('Todos');
    setExerciseDetails({ sets: 3, reps: 12, rest_time: 60 });
  };

  const toggleWorkoutExpanded = (workoutId) => {
    setExpandedWorkouts(prev => ({
      ...prev,
      [workoutId]: !prev[workoutId]
    }));
  };

  const addExerciseToWorkout = async () => {
    if (!selectedExercise || !currentWorkout) return;

    setLoading(true);
    try {
      await api.addExercise(currentWorkout.id, {
        name: selectedExercise.name,
        sets: exerciseDetails.sets,
        reps: exerciseDetails.reps,
        rest_time: exerciseDetails.rest_time
      });
      
      await loadWorkouts();
      closeExercisePicker();
      alert('Exercício adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      console.error('Detalhes:', {
        workout: currentWorkout?.id,
        exercise: selectedExercise?.name,
        details: exerciseDetails,
        errorMessage: error?.message,
        errorResponse: error?.response?.data
      });
      alert(`Erro ao adicionar exercício: ${error?.response?.data?.error || error?.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  const removeExerciseFromWorkout = async (workoutId, exerciseId) => {
    if (!confirm('Remover este exercício do treino?')) return;

    try {
      await api.deleteExercise(exerciseId);
      await loadWorkouts();
    } catch (error) {
      console.error('Erro ao remover exercício:', error);
      alert('Erro ao remover exercício');
    }
  };

  // Filtrar exercícios para o picker
  const closeAiTrainingModal = () => {
    if (aiLoading) return;
    setShowAiTrainingModal(false);
    setAiDraftPlan([]);
    setAiProgress({
      active: false,
      value: 0,
      label: ''
    });
  };

  const generateAiTrainingPreview = async (e) => {
    e.preventDefault();
    if (aiLoading) return;

    setAiLoading(true);
    setAiProgress({
      active: true,
      value: 12,
      label: 'Analisando divisao e perfil...'
    });

    try {
      const durationMinutes = parseDurationToMinutes(aiConfig.duration);
      setAiProgress({
        active: true,
        value: 48,
        label: 'Montando periodizacao inteligente...'
      });

      const workoutsPlan = createWorkoutPlan({
        splitKey: aiConfig.split,
        durationMinutes,
        includeWarmup: aiConfig.includeWarmup,
        profileKey: aiConfig.profile,
        exercisesDatabase,
        userSeed: `${user?.id || 'anon'}-${new Date().toISOString().slice(0, 10)}`
      });

      if (!workoutsPlan.length) {
        alert('Nao foi possivel gerar o plano com essa configuracao. Tente outro tempo ou divisao.');
        return;
      }

      setAiDraftPlan(workoutsPlan);
      setAiProgress({
        active: true,
        value: 100,
        label: 'Previa pronta. Ajuste exercicios antes de salvar.'
      });
    } catch (error) {
      console.error('Erro ao gerar IA TRAINING:', error);
      alert('Erro ao gerar IA TRAINING. Tente novamente.');
      setAiProgress({
        active: false,
        value: 0,
        label: ''
      });
    } finally {
      setAiLoading(false);
    }
  };

  const updateAiExercise = (workoutIndex, exerciseIndex, nextExerciseName) => {
    const selected = exerciseByName[nextExerciseName];
    if (!selected) return;

    setAiDraftPlan((prev) =>
      prev.map((workout, wi) => {
        if (wi !== workoutIndex) return workout;
        return {
          ...workout,
          exercises: workout.exercises.map((exercise, ei) => {
            if (ei !== exerciseIndex) return exercise;
            return {
              ...exercise,
              name: selected.name
            };
          })
        };
      })
    );
  };

  const saveAiTrainingPlan = async () => {
    if (aiLoading || aiDraftPlan.length === 0) return;

    setAiLoading(true);
    try {
      const totalExercises = aiDraftPlan.reduce(
        (sum, workout) => sum + (workout.exercises?.length || 0),
        0
      );
      const totalSteps = aiDraftPlan.length + totalExercises;
      let completedSteps = 0;

      for (const plannedWorkout of aiDraftPlan) {
        const created = await api.createWorkout(user.id, plannedWorkout.name, plannedWorkout.description);
        const workoutId = created?.workout?.id;

        completedSteps += 1;
        setAiProgress({
          active: true,
          value: Math.min(99, Math.round((completedSteps / totalSteps) * 100)),
          label: `Criando ${plannedWorkout.name}...`
        });

        if (!workoutId) {
          throw new Error('Falha ao obter o ID do treino criado pela IA.');
        }

        for (const exercise of plannedWorkout.exercises) {
          await api.addExercise(workoutId, exercise);
          completedSteps += 1;
          setAiProgress({
            active: true,
            value: Math.min(99, Math.round((completedSteps / totalSteps) * 100)),
            label: `Adicionando exercicios de ${plannedWorkout.name}...`
          });
        }
      }

      setAiProgress({
        active: true,
        value: 100,
        label: 'Treinos IA salvos com sucesso.'
      });

      await loadWorkouts();
      const createdCount = aiDraftPlan.length;
      setAiDraftPlan([]);
      setShowAiTrainingModal(false);
      alert(`IA TRAINING criou ${createdCount} treino(s) com sucesso.`);
    } catch (error) {
      console.error('Erro ao gerar IA TRAINING:', error);
      alert('Erro ao gerar IA TRAINING. Tente novamente.');
      setAiProgress({
        active: false,
        value: 0,
        label: ''
      });
    } finally {
      setAiLoading(false);
    }
  };

  const filteredExercises = exercisesDatabase.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchExercise.toLowerCase()) ||
      ex.category.toLowerCase().includes(searchExercise.toLowerCase()) ||
      ex.muscles?.some(m => m.toLowerCase().includes(searchExercise.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredWorkouts = workouts.filter((workout) => {
    const q = workoutSearch.trim().toLowerCase();
    if (!q) return true;

    const matchesWorkout =
      workout.name?.toLowerCase().includes(q) ||
      workout.description?.toLowerCase().includes(q);
    const matchesExercise = workout.exercises?.some((exercise) =>
      exercise.name?.toLowerCase().includes(q)
    );

    return matchesWorkout || matchesExercise;
  });

  const totalExercisesInAllWorkouts = workouts.reduce(
    (sum, workout) => sum + (workout.exercises?.length || 0),
    0
  );

  const totalSetsInAllWorkouts = workouts.reduce(
    (sum, workout) =>
      sum +
      (workout.exercises?.reduce(
        (exerciseSum, exercise) => exerciseSum + (exercise.sets || 0),
        0
      ) || 0),
    0
  );

  return (
    <div className="page workouts-page">
      <div className="container">
        <PageHeader 
          icon={Dumbbell}
          title="Meus Treinos"
          subtitle={`${workouts.length} treino(s) criado(s)`}
        />

        <section className="workouts-overview-panel">
          <div className="overview-card">
            <span className="overview-icon">
              <Dumbbell size={16} />
            </span>
            <div>
              <strong>{workouts.length}</strong>
              <small>Treinos salvos</small>
            </div>
          </div>
          <div className="overview-card">
            <span className="overview-icon">
              <Layers3 size={16} />
            </span>
            <div>
              <strong>{totalExercisesInAllWorkouts}</strong>
              <small>Exercicios totais</small>
            </div>
          </div>
          <div className="overview-card">
            <span className="overview-icon">
              <Activity size={16} />
            </span>
            <div>
              <strong>{totalSetsInAllWorkouts}</strong>
              <small>Series totais</small>
            </div>
          </div>
        </section>

        <section className="workouts-search-panel">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar treino ou exercicio..."
            value={workoutSearch}
            onChange={(e) => setWorkoutSearch(e.target.value)}
          />
          {workoutSearch && (
            <button type="button" onClick={() => setWorkoutSearch('')}>
              <X size={14} />
            </button>
          )}
        </section>
        
        <div className="page-actions">
          <Button
            icon={Plus}
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant={showCreateForm ? 'secondary' : 'primary'}
          >
            {showCreateForm ? 'Cancelar' : 'Criar Novo Treino'}
          </Button>
          <Button
            icon={Sparkles}
            onClick={() => setShowAiTrainingModal(true)}
            variant="primary"
            loading={aiLoading}
          >
            IA TRAINING
          </Button>
        </div>

        {showCreateForm && (
          <div className="create-form premium-card slide-up">
            <div className="form-header">
              <Zap size={24} className="form-icon" />
              <h3>Novo Treino Personalizado</h3>
              <p>Crie um treino sob medida para seus objetivos</p>
            </div>
            <form onSubmit={createWorkout}>
              <div className="form-group">
                <label htmlFor="name">
                  <Dumbbell size={16} />
                  Nome do Treino *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Treino A - Peito e Tríceps"
                  required
                  className="enhanced-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">
                  <Edit2 size={16} />
                  Descrição (opcional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Descreva o foco deste treino, grupos musculares trabalhados, objetivos..."
                  className="enhanced-input"
                />
              </div>

              <Button type="submit" fullWidth loading={loading} icon={Plus}>
                {loading ? 'Criando...' : 'Criar Treino'}
              </Button>
            </form>
          </div>
        )}

        <div className="workouts-list">
          {filteredWorkouts.length === 0 ? (
            <div className="empty-state premium-card">
              <div className="empty-icon-wrapper">
                <Dumbbell size={64} />
              </div>
              <h3>Nenhum treino criado ainda</h3>
              <p>Comece criando seu primeiro treino personalizado</p>
              <p className="empty-hint">💡 Dica: Adicione exercícios da nossa biblioteca completa!</p>
            </div>
          ) : (
            filteredWorkouts.map((workout) => {
              const isExpanded = expandedWorkouts[workout.id];
              const exerciseCount = workout.exercises?.length || 0;
              
              return (
                <div key={workout.id} className={`workout-card premium-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="workout-card-header" onClick={() => toggleWorkoutExpanded(workout.id)}>
                    <div className="workout-header-left">
                      <div className="workout-icon">
                        <Dumbbell size={24} />
                      </div>
                      <div className="workout-info">
                        <h3>{workout.name}</h3>
                        {workout.description && (
                          <p className="workout-description">{workout.description}</p>
                        )}
                        <div className="workout-stats">
                          <span className="stat-badge">
                            <Dumbbell size={14} />
                            {exerciseCount} {exerciseCount === 1 ? 'exercício' : 'exercícios'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="workout-header-right">
                      {exerciseCount > 0 && (
                        <button
                          className="icon-btn primary tooltip-trigger"
                          onClick={(e) => {
                            e.stopPropagation();
                            startWorkout(workout);
                          }}
                          title="Iniciar treino"
                          style={{ 
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderColor: 'transparent',
                            color: 'white'
                          }}
                        >
                          <Play size={20} />
                        </button>
                      )}
                      <button
                        className="icon-btn success tooltip-trigger"
                        onClick={(e) => {
                          e.stopPropagation();
                          completeWorkout(workout.id);
                        }}
                        title="Marcar como concluído"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        className="icon-btn danger tooltip-trigger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWorkout(workout.id);
                        }}
                        title="Deletar treino"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button className="expand-btn">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="workout-content">
                      {workout.exercises && workout.exercises.length > 0 ? (
                        <div className="exercises-list-enhanced">
                          {workout.exercises.map((exercise, index) => {
                            const exerciseData = exercisesDatabase.find(ex => ex.name === exercise.name);
                            
                            return (
                              <div key={exercise.id} className="exercise-item-enhanced">
                                <div className="exercise-number">{index + 1}</div>
                                
                                {exerciseData && (
                                  <div className="exercise-gif-thumb">
                                    <img src={exerciseData.gifUrl} alt={exercise.name} loading="lazy" />
                                  </div>
                                )}
                                
                                <div className="exercise-info-enhanced">
                                  <h4>{exercise.name}</h4>
                                  <div className="exercise-params-display">
                                    <span className="param-chip">
                                      <strong>{exercise.sets}</strong> séries
                                    </span>
                                    <span className="param-chip">
                                      <strong>{exercise.reps}</strong> reps
                                    </span>
                                    {exercise.rest_time && (
                                      <span className="param-chip rest">
                                        {exercise.rest_time}s descanso
                                      </span>
                                    )}
                                  </div>
                                  {exerciseData && (
                                    <div className="exercise-meta">
                                      <span className="category-tag">{exerciseData.category}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <button
                                  className="remove-exercise-btn-enhanced"
                                  onClick={() => removeExerciseFromWorkout(workout.id, exercise.id)}
                                  title="Remover exercício"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="no-exercises">
                          <BookOpen size={32} />
                          <p>Nenhum exercício adicionado ainda</p>
                        </div>
                      )}

                      <button 
                        className="add-exercise-btn-enhanced"
                        onClick={() => openExercisePicker(workout)}
                      >
                        <Plus size={20} />
                        <span>Adicionar Exercício da Biblioteca</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {showAiTrainingModal && (
        <div className="modal-overlay" onClick={closeAiTrainingModal}>
          <div className="modal-content ai-training-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-enhanced ai-header">
              <div className="modal-title">
                <Sparkles size={28} />
                <div>
                  <h2>IA TRAINING</h2>
                  <p>Gerador inteligente de divisoes com controle de volume e tempo.</p>
                </div>
              </div>
              <button className="modal-close" onClick={closeAiTrainingModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={generateAiTrainingPreview} className="ai-training-form">
              <div className="ai-option-card">
                <label className="ai-switch-row">
                  <span>
                    <strong>Adicionar serie de aquecimento</strong>
                    <small>O primeiro exercicio sera reservado para aquecer.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={aiConfig.includeWarmup}
                    onChange={(event) =>
                      setAiConfig((prev) => ({ ...prev, includeWarmup: event.target.checked }))
                    }
                  />
                </label>
              </div>

              <div className="ai-grid">
                <div className="ai-option-card">
                  <label htmlFor="ai-duration">
                    <Clock3 size={16} />
                    Tempo de Treino
                  </label>
                  <input
                    id="ai-duration"
                    type="text"
                    className="enhanced-input"
                    placeholder="Ex: 45m, 1h, 1h30"
                    value={aiConfig.duration}
                    onChange={(event) =>
                      setAiConfig((prev) => ({ ...prev, duration: event.target.value }))
                    }
                    required
                  />
                  <small>Faixa aceita: 30 a 120 minutos.</small>
                </div>

                <div className="ai-option-card">
                  <label htmlFor="ai-split">
                    <GitBranchPlus size={16} />
                    Divisoes
                  </label>
                  <select
                    id="ai-split"
                    className="enhanced-input"
                    value={aiConfig.split}
                    onChange={(event) =>
                      setAiConfig((prev) => ({ ...prev, split: event.target.value }))
                    }
                  >
                    {Object.entries(splitLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <small>A IA cria uma rotina completa para a divisao selecionada.</small>
                </div>

                <div className="ai-option-card">
                  <label htmlFor="ai-profile">
                    <Gauge size={16} />
                    Perfil IA
                  </label>
                  <select
                    id="ai-profile"
                    className="enhanced-input"
                    value={aiConfig.profile}
                    onChange={(event) =>
                      setAiConfig((prev) => ({ ...prev, profile: event.target.value }))
                    }
                  >
                    {Object.entries(PROFILE_LIBRARY).map(([key, profile]) => (
                      <option key={key} value={key}>
                        {profile.label}
                      </option>
                    ))}
                  </select>
                  <small>Define foco de intensidade, repeticoes e descanso.</small>
                </div>
              </div>

              <div className="ai-preview">
                <strong>Como a IA monta os treinos</strong>
                <p>
                  Balanceamento entre grupos musculares, alternancia de intensidade e
                  distribuicao automatica por tempo.
                </p>
              </div>

              {aiProgress.active && (
                <div className="ai-progress-wrap">
                  <div className="ai-progress-head">
                    <strong>Progresso</strong>
                    <span>{aiProgress.value}%</span>
                  </div>
                  <div className="ai-progress-bar">
                    <div className="ai-progress-fill" style={{ width: `${aiProgress.value}%` }} />
                  </div>
                  <small>{aiProgress.label}</small>
                </div>
              )}

              <div className="ai-actions">
                <Button type="submit" loading={aiLoading} icon={Sparkles}>
                  {aiLoading ? 'Gerando previa...' : 'Gerar previa IA'}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  loading={aiLoading}
                  disabled={aiLoading || aiDraftPlan.length === 0}
                  onClick={saveAiTrainingPlan}
                >
                  Salvar treinos IA
                </Button>
              </div>
            </form>

            {aiDraftPlan.length > 0 && (
              <div className="ai-draft-list">
                <h3>Previa editavel dos treinos</h3>
                {aiDraftPlan.map((workout, workoutIndex) => (
                  <div key={`${workout.name}-${workoutIndex}`} className="ai-draft-card">
                    <div className="ai-draft-head">
                      <strong>{workout.name}</strong>
                      <small>{workout.estimatedMinutes || 0} min estimados</small>
                    </div>
                    <p>{workout.description}</p>
                    <div className="ai-draft-exercises">
                      {workout.exercises.map((exercise, exerciseIndex) => {
                        const currentExerciseData = exerciseByName[exercise.name];
                        const exerciseCategory = canonicalCategory(currentExerciseData?.category);
                        const optionsPool =
                          exercisesByCanonicalCategory[exerciseCategory] || exercisesDatabase;

                        return (
                          <div key={`${exercise.name}-${exerciseIndex}`} className="ai-exercise-row">
                            <div className="ai-exercise-gif">
                              {currentExerciseData?.gifUrl ? (
                                <img src={currentExerciseData.gifUrl} alt={exercise.name} loading="lazy" />
                              ) : (
                                <span>Sem GIF</span>
                              )}
                            </div>
                            <select
                              className="enhanced-input"
                              value={exercise.name}
                              onChange={(event) =>
                                updateAiExercise(workoutIndex, exerciseIndex, event.target.value)
                              }
                            >
                              {optionsPool.map((optionExercise) => (
                                <option key={optionExercise.id} value={optionExercise.name}>
                                  {optionExercise.name}
                                </option>
                              ))}
                            </select>
                            <span>{exercise.sets}x</span>
                            <span>{exercise.reps} reps</span>
                            <span>{exercise.rest_time || 0}s</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <div className="modal-overlay" onClick={closeExercisePicker}>
          <div className="modal-content exercise-picker-modal-enhanced" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-enhanced">
              <div className="modal-title">
                <BookOpen size={28} />
                <div>
                  <h2>Biblioteca de Exercícios</h2>
                  <p>Selecione um exercício para adicionar ao treino</p>
                </div>
              </div>
              <button className="modal-close" onClick={closeExercisePicker}>
                <X size={24} />
              </button>
            </div>

            {!selectedExercise ? (
              <>
                <div className="search-section-modal">
                  <div className="search-bar-modal">
                    <Search size={20} />
                    <input
                      type="text"
                      placeholder="Buscar por nome, categoria ou músculo..."
                      value={searchExercise}
                      onChange={(e) => setSearchExercise(e.target.value)}
                      autoFocus
                    />
                    {searchExercise && (
                      <button className="clear-search" onClick={() => setSearchExercise('')}>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="category-filters">
                  <Filter size={16} />
                  <div className="category-pills">
                    {['Todos', ...categories].map(cat => (
                      <button
                        key={cat}
                        className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="results-count">
                  <span>{filteredExercises.length} exercício(s) encontrado(s)</span>
                </div>

                <div className="exercises-picker-grid-enhanced">
                  {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="exercise-picker-card"
                        onClick={() => setSelectedExercise(exercise)}
                      >
                        <div className="exercise-card-gif">
                          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
                          <div className="exercise-card-overlay">
                            <Plus size={24} />
                            <span>Adicionar</span>
                          </div>
                        </div>
                        <div className="exercise-card-content">
                          <h4>{exercise.name}</h4>
                          <div className="exercise-card-tags">
                            <span className="tag-category">{exercise.category}</span>
                          </div>
                          <div className="exercise-card-muscles">
                            {exercise.muscles?.slice(0, 3).map((m, i) => (
                              <span key={i} className="muscle-tag">{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      <Search size={48} />
                      <h3>Nenhum exercício encontrado</h3>
                      <p>Tente ajustar os filtros ou buscar por outro termo</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="exercise-config-enhanced">
                <button 
                  className="back-to-list-enhanced"
                  onClick={() => setSelectedExercise(null)}
                >
                  <ChevronDown size={18} style={{ transform: 'rotate(90deg)' }} />
                  Voltar para lista
                </button>

                <div className="selected-exercise-showcase">
                  <div className="showcase-gif">
                    <img src={selectedExercise.gifUrl} alt={selectedExercise.name} />
                  </div>
                  <div className="showcase-info">
                    <h3>{selectedExercise.name}</h3>
                    <div className="showcase-badges">
                      <span className="badge-cat">{selectedExercise.category}</span>
                      <span className="badge-equip">{selectedExercise.equipment}</span>
                    </div>
                    <div className="showcase-muscles">
                      <strong>Músculos trabalhados:</strong>
                      <div className="muscles-list">
                        {selectedExercise.muscles?.map((m, i) => (
                          <span key={i} className="muscle-badge">{m}</span>
                        ))}
                      </div>
                    </div>
                    {selectedExercise.instructions && (
                      <div className="showcase-instructions">
                        <strong>Como executar:</strong>
                        <ul>
                          {selectedExercise.instructions?.slice(0, 3).map((inst, i) => (
                            <li key={i}>{inst}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="config-divider">
                  <span>Configure os parâmetros</span>
                </div>

                <div className="exercise-params-enhanced">
                  <div className="param-card">
                    <div className="param-icon">💪</div>
                    <label>Séries</label>
                    <div className="param-input-wrapper">
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, sets: Math.max(1, exerciseDetails.sets - 1)})}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={exerciseDetails.sets}
                        onChange={(e) => setExerciseDetails({...exerciseDetails, sets: parseInt(e.target.value) || 1})}
                      />
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, sets: Math.min(10, exerciseDetails.sets + 1)})}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="param-card">
                    <div className="param-icon">🔄</div>
                    <label>Repetições</label>
                    <div className="param-input-wrapper">
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, reps: Math.max(1, exerciseDetails.reps - 1)})}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={exerciseDetails.reps}
                        onChange={(e) => setExerciseDetails({...exerciseDetails, reps: parseInt(e.target.value) || 1})}
                      />
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, reps: Math.min(50, exerciseDetails.reps + 1)})}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="param-card">
                    <div className="param-icon">⏱️</div>
                    <label>Descanso (seg)</label>
                    <div className="param-input-wrapper">
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, rest_time: Math.max(0, exerciseDetails.rest_time - 15)})}
                      >
                        -15
                      </button>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        step="15"
                        value={exerciseDetails.rest_time}
                        onChange={(e) => setExerciseDetails({...exerciseDetails, rest_time: parseInt(e.target.value) || 0})}
                      />
                      <button
                        type="button"
                        onClick={() => setExerciseDetails({...exerciseDetails, rest_time: Math.min(300, exerciseDetails.rest_time + 15)})}
                      >
                        +15
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-add-to-workout-enhanced"
                  onClick={addExerciseToWorkout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Adicionando...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Adicionar ao Treino
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Workout Overlay */}
      {activeWorkout && (
        <ActiveWorkout
          workout={activeWorkout}
          onClose={() => setActiveWorkout(null)}
          onComplete={handleWorkoutComplete}
        />
      )}
    </div>
  );
}

