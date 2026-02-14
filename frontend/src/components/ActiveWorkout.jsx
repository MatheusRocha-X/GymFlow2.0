import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Flag, Timer, Activity, Flame } from 'lucide-react';
import { exercisesDatabase } from '../data/exercises';
import './ActiveWorkout.css';

export default function ActiveWorkout({ workout, onClose, onComplete }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workoutStartTime] = useState(Date.now());
  const [totalRestTime, setTotalRestTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPerformanceForm, setShowPerformanceForm] = useState(false);
  const [performanceData, setPerformanceData] = useState({ reps: '', weight: '' });
  const [workoutLog, setWorkoutLog] = useState([]);
  const timerRef = useRef(null);
  const elapsedTimerRef = useRef(null);
  const audioRef = useRef(null);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseData = exercisesDatabase.find(ex => ex.name === currentExercise.name);
  const totalExercises = workout.exercises.length;
  const totalSets = currentExercise.sets;
  const isLastSet = currentSet === totalSets;
  const isLastExercise = currentExerciseIndex === totalExercises - 1;

  // Timer effect
  useEffect(() => {
    if (isRunning && restTime > 0) {
      timerRef.current = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotification();
            return 0;
          }
          setTotalRestTime(t => t + 1);
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, restTime]);

  // Elapsed time effect - atualiza o tempo total a cada segundo
  useEffect(() => {
    elapsedTimerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - workoutStartTime) / 1000));
    }, 1000);

    return () => clearInterval(elapsedTimerRef.current);
  }, [workoutStartTime]);

  const playNotification = () => {
    // Vibração se disponível
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const startRest = () => {
    const restSeconds = currentExercise.rest_time || 60;
    setRestTime(restSeconds);
    setIsResting(true);
    setIsRunning(true);
  };

  const skipRest = () => {
    setRestTime(0);
    setIsRunning(false);
    setIsResting(false);
  };

  const continueAfterRest = () => {
    setIsResting(false);
    setRestTime(0);
    setIsRunning(false);
  };

  const pauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    const restSeconds = currentExercise.rest_time || 60;
    setRestTime(restSeconds);
    setIsRunning(false);
  };

  const completeSet = () => {
    // Mostrar formulário de registro de performance
    setPerformanceData({ 
      reps: currentExercise.reps || '', 
      weight: '' 
    });
    setShowPerformanceForm(true);
  };

  const savePerformanceAndContinue = () => {
    // Salvar dados da série
    const performanceLog = {
      exerciseIndex: currentExerciseIndex,
      exerciseName: currentExercise.name,
      set: currentSet,
      reps: parseInt(performanceData.reps) || 0,
      weight: parseFloat(performanceData.weight) || 0,
      timestamp: Date.now()
    };
    
    setWorkoutLog([...workoutLog, performanceLog]);
    setShowPerformanceForm(false);
    
    const setKey = `${currentExerciseIndex}-${currentSet}`;
    setCompletedSets([...completedSets, setKey]);

    if (isLastSet) {
      // Último set do exercício
      if (isLastExercise) {
        // Último exercício do treino
        finishWorkout();
      } else {
        // Próximo exercício
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(false);
        setPerformanceData({ reps: '', weight: '' });
      }
    } else {
      // Próximo set
      setCurrentSet(currentSet + 1);
      startRest();
    }
  };

  const finishWorkout = () => {
    clearInterval(timerRef.current);
    clearInterval(elapsedTimerRef.current);
    
    const duration = Math.floor((Date.now() - workoutStartTime) / 1000);
    onComplete({
      duration,
      totalRestTime,
      exercises: workout.exercises.length,
      sets: completedSets.length,
      totalMinutes: Math.floor(duration / 60),
      totalRestMinutes: Math.floor(totalRestTime / 60),
      completedSets: completedSets.length,
      workoutLog: workoutLog,
      workoutName: workout.name,
      workoutId: workout.id
    });
  };

  const handleClose = () => {
    if (confirm('Deseja realmente sair do treino? Seu progresso será perdido.')) {
      clearInterval(timerRef.current);
      clearInterval(elapsedTimerRef.current);
      onClose();
    }
  };

  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTime(0);
      setIsRunning(false);
    }
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setIsResting(false);
      setRestTime(0);
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentExerciseIndex * 100) + ((currentSet / totalSets) * 100)) / totalExercises;
  const totalWorkoutSets = workout.exercises.reduce((sum, exercise) => sum + (exercise.sets || 0), 0);
  const restDuration = currentExercise.rest_time || 60;
  const restProgress = restDuration > 0 ? ((restDuration - restTime) / restDuration) * 100 : 100;

  return (
    <div className="active-workout-overlay">
      <div className="active-workout-container">
        {/* Header */}
        <div className="active-workout-header">
          <div className="workout-title-section">
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
          </div>
          <button className="close-workout-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="workout-progress-section">
          <div className="progress-text">
            <span>Exercício {currentExerciseIndex + 1} de {totalExercises}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <div className="workout-progress-bar">
            <div 
              className="workout-progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="workout-live-metrics">
            <div className="live-metric">
              <Timer size={15} />
              <div>
                <small>Tempo ativo</small>
                <strong>{formatTime(elapsedTime)}</strong>
              </div>
            </div>
            <div className="live-metric">
              <Activity size={15} />
              <div>
                <small>SÃ©ries feitas</small>
                <strong>{completedSets.length}/{totalWorkoutSets}</strong>
              </div>
            </div>
            <div className="live-metric">
              <Flame size={15} />
              <div>
                <small>Descanso</small>
                <strong>{formatTime(totalRestTime)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Info */}
        <div className="current-exercise-section">
          <div className="exercise-nav">
            <button 
              onClick={goToPreviousExercise}
              disabled={currentExerciseIndex === 0}
              className="nav-exercise-btn"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="exercise-main-info">
              {exerciseData && (
                <div className="exercise-gif-display">
                  <img src={exerciseData.gifUrl} alt={currentExercise.name} />
                </div>
              )}
              <h3>{currentExercise.name}</h3>
              <div className="exercise-badges">
                {exerciseData && (
                  <>
                    <span className="badge-cat">{exerciseData.category}</span>
                  </>
                )}
              </div>
            </div>

            <button 
              onClick={goToNextExercise}
              disabled={currentExerciseIndex === totalExercises - 1}
              className="nav-exercise-btn"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Set Info */}
          <div className="set-info-section">
            <div className="set-counter">
              <div className="set-label">Série Atual</div>
              <div className="set-number">{currentSet} / {totalSets}</div>
            </div>
            <div className="reps-info">
              <div className="reps-label">Repetições</div>
              <div className="reps-number">{currentExercise.reps}</div>
            </div>
          </div>

          {/* Set Indicators */}
          <div className="sets-indicators">
            {Array.from({ length: totalSets }).map((_, index) => {
              const setNum = index + 1;
              const isCompleted = completedSets.includes(`${currentExerciseIndex}-${setNum}`);
              const isCurrent = setNum === currentSet;
              
              return (
                <div 
                  key={setNum}
                  className={`set-indicator ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                >
                  {isCompleted ? <Check size={16} /> : setNum}
                </div>
              );
            })}
          </div>
        </div>

        {/* Rest Timer or Action */}
        {isResting ? (
          <div className="rest-section">
            <div className="rest-header">
              <h3>Descanso</h3>
              <p>Prepare-se para a próxima série</p>
            </div>
            
            <div className={`rest-timer ${restTime === 0 ? 'time-up' : ''} ${!isRunning && restTime > 0 ? 'paused' : ''}`}>
              <div
                className="rest-ring"
                style={{ '--rest-progress': `${Math.max(0, Math.min(100, restProgress))}%` }}
              >
                <div className="rest-ring-center">
                  <small>Descanso</small>
                  <strong>{formatTime(restTime)}</strong>
                </div>
              </div>
              <div className="timer-display">{formatTime(restTime)}</div>
              {restTime === 0 && <div className="time-up-text">Tempo encerrado! 🔥</div>}
            </div>

            <div className="rest-controls">
              {restTime === 0 ? (
                <button className="timer-btn primary" onClick={continueAfterRest}>
                  <Check size={20} />
                  Continuar Treino
                </button>
              ) : (
                <>
                  <button className="timer-btn primary" onClick={skipRest}>
                    <ChevronRight size={20} />
                    Pular Descanso
                  </button>
                  <button className="timer-btn" onClick={pauseTimer}>
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning ? 'Pausar' : 'Retomar'}
                  </button>
                  <button className="timer-btn" onClick={resetTimer}>
                    <RotateCcw size={20} />
                    Reiniciar
                  </button>
                </>
              )}
            </div>
          </div>
        ) : showPerformanceForm ? (
          <div className="performance-form-section">
            <div className="performance-header">
              <h3>Registrar Performance</h3>
              <p>Como foi essa série?</p>
            </div>
            
            <div className="performance-inputs">
              <div className="perf-input-group">
                <label>
                  <span className="perf-icon">🔄</span>
                  Repetições
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Ex: 12"
                  value={performanceData.reps}
                  onChange={(e) => setPerformanceData({...performanceData, reps: e.target.value})}
                  autoFocus
                />
              </div>
              
              <div className="perf-input-group">
                <label>
                  <span className="perf-icon">⚖️</span>
                  Carga (kg)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  placeholder="Ex: 20"
                  value={performanceData.weight}
                  onChange={(e) => setPerformanceData({...performanceData, weight: e.target.value})}
                />
              </div>
            </div>

            <button 
              className="save-performance-btn"
              onClick={savePerformanceAndContinue}
              disabled={!performanceData.reps}
            >
              <Check size={24} />
              Salvar e Continuar
            </button>
          </div>
        ) : (
          <div className="action-section">
            <button className="complete-set-btn" onClick={completeSet}>
              <Check size={24} />
              {isLastSet ? (
                isLastExercise ? 'Finalizar Treino' : 'Próximo Exercício'
              ) : 'Série Completa'}
            </button>
            
            {isLastSet && isLastExercise && (
              <button className="finish-workout-btn" onClick={finishWorkout}>
                <Flag size={20} />
                Concluir Treino Antecipadamente
              </button>
            )}
          </div>
        )}

        {/* Workout Stats */}
        <div className="workout-stats-footer">
          <div className="stat-item">
            <span className="stat-label">Tempo Total</span>
            <span className="stat-value">
              {formatTime(elapsedTime)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Séries Completas</span>
            <span className="stat-value">
              {completedSets.length} / {totalWorkoutSets}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Descanso Total</span>
            <span className="stat-value">{formatTime(totalRestTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
