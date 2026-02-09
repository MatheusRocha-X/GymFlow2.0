import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Dumbbell, Trash2, Check, X, Search, BookOpen } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import { exercisesDatabase } from '../data/exercises';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, [user]);

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

  const openExercisePicker = (workout) => {
    setCurrentWorkout(workout);
    setShowExercisePicker(true);
  };

  const closeExercisePicker = () => {
    setShowExercisePicker(false);
    setSelectedExercise(null);
    setSearchExercise('');
    setExerciseDetails({ sets: 3, reps: 12, rest_time: 60 });
  };

  const addExerciseToWorkout = async () => {
    if (!selectedExercise || !currentWorkout) return;

    setLoading(true);
    try {
      await api.addExerciseToWorkout(
        currentWorkout.id,
        selectedExercise.name,
        exerciseDetails.sets,
        exerciseDetails.reps,
        exerciseDetails.rest_time
      );
      
      await loadWorkouts();
      closeExercisePicker();
      alert('Exercício adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      alert('Erro ao adicionar exercício');
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
  const filteredExercises = exercisesDatabase.filter(ex =>
    ex.name.toLowerCase().includes(searchExercise.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchExercise.toLowerCase()) ||
    ex.muscles.some(m => m.toLowerCase().includes(searchExercise.toLowerCase()))
  );

  return (
    <div className="page workouts-page">
      <div className="container">
        <PageHeader 
          icon={Dumbbell}
          title="Treinos"
          subtitle="Gerencie seus treinos e exercícios"
        />
        
        <div className="page-actions">
          <Button
            icon={Plus}
            onClick={() => setShowCreateForm(!showCreateForm)}
            variant={showCreateForm ? 'secondary' : 'primary'}
          >
            {showCreateForm ? 'Cancelar' : 'Novo Treino'}
          </Button>
        </div>

        {showCreateForm && (
          <div className="create-form premium-card slide-up">
            <h3>Criar Novo Treino</h3>
            <form onSubmit={createWorkout}>
              <div className="form-group">
                <label htmlFor="name">Nome do Treino *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Treino A - Peito e Tríceps"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Descrição (opcional)</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Ex: Foco em hipertrofia de peito..."
                />
              </div>

              <Button type="submit" fullWidth loading={loading}>
                Criar Treino
              </Button>
            </form>
          </div>
        )}

        <div className="workouts-list">
          {workouts.length === 0 ? (
            <div className="empty-state premium-card">
              <Dumbbell size={48} color="var(--text-tertiary)" />
              <h3>Nenhum treino criado</h3>
              <p>Crie seu primeiro treino e adicione exercícios da biblioteca</p>
            </div>
          ) : (
            workouts.map((workout) => (
              <div key={workout.id} className="workout-card premium-card">
                <div className="workout-header">
                  <div className="workout-info">
                    <h3>{workout.name}</h3>
                    {workout.description && (
                      <p className="workout-description">{workout.description}</p>
                    )}
                    <div className="workout-meta">
                      <span className="exercise-count">
                        <Dumbbell size={14} />
                        {workout.exercises?.length || 0} exercício(s)
                      </span>
                    </div>
                  </div>
                  
                  <div className="workout-actions">
                    <button
                      className="icon-btn success"
                      onClick={() => completeWorkout(workout.id)}
                      title="Marcar como realizado"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => deleteWorkout(workout.id)}
                      title="Deletar treino"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {workout.exercises && workout.exercises.length > 0 && (
                  <div className="exercises-list">
                    {workout.exercises.map((exercise) => (
                      <div key={exercise.id} className="exercise-item">
                        <div className="exercise-item-info">
                          <span className="exercise-name">{exercise.name}</span>
                          <span className="exercise-details">
                            {exercise.sets} séries × {exercise.reps} reps
                            {exercise.rest_time && ` • ${exercise.rest_time}s descanso`}
                          </span>
                        </div>
                        <button
                          className="remove-exercise-btn"
                          onClick={() => removeExerciseFromWorkout(workout.id, exercise.id)}
                          title="Remover exercício"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  className="add-exercise-btn"
                  onClick={() => openExercisePicker(workout)}
                >
                  <Plus size={18} />
                  Adicionar Exercício da Biblioteca
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <div className="modal-overlay" onClick={closeExercisePicker}>
          <div className="modal-content exercise-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <BookOpen size={24} />
                Adicionar Exercício
              </h2>
              <button className="modal-close" onClick={closeExercisePicker}>
                <X size={24} />
              </button>
            </div>

            {!selectedExercise ? (
              <>
                <div className="search-bar-modal">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Buscar exercício por nome, categoria ou músculo..."
                    value={searchExercise}
                    onChange={(e) => setSearchExercise(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="exercises-picker-grid">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="exercise-picker-item"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <div className="exercise-picker-gif">
                        <img src={exercise.gifUrl} alt={exercise.name} />
                      </div>
                      <div className="exercise-picker-info">
                        <h4>{exercise.name}</h4>
                        <span className="exercise-picker-category">{exercise.category}</span>
                        <div className="exercise-picker-muscles">
                          {exercise.muscles.slice(0, 2).map((m, i) => (
                            <span key={i}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="exercise-config">
                <div className="selected-exercise-preview">
                  <img src={selectedExercise.gifUrl} alt={selectedExercise.name} />
                  <div>
                    <h3>{selectedExercise.name}</h3>
                    <p>{selectedExercise.category} • {selectedExercise.difficulty}</p>
                    <div className="muscles-preview">
                      {selectedExercise.muscles.map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  className="back-to-list"
                  onClick={() => setSelectedExercise(null)}
                >
                  ← Voltar para lista de exercícios
                </button>

                <div className="exercise-params">
                  <div className="param-group">
                    <label>Séries</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={exerciseDetails.sets}
                      onChange={(e) => setExerciseDetails({...exerciseDetails, sets: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="param-group">
                    <label>Repetições</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={exerciseDetails.reps}
                      onChange={(e) => setExerciseDetails({...exerciseDetails, reps: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="param-group">
                    <label>Descanso (segundos)</label>
                    <input
                      type="number"
                      min="0"
                      max="300"
                      step="15"
                      value={exerciseDetails.rest_time}
                      onChange={(e) => setExerciseDetails({...exerciseDetails, rest_time: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <button
                  className="btn-add-to-workout"
                  onClick={addExerciseToWorkout}
                  disabled={loading}
                >
                  {loading ? 'Adicionando...' : 'Adicionar ao Treino'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
