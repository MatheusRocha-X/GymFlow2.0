import React, { useState } from 'react';
import { Search, Filter, Dumbbell, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { exercisesDatabase, categories, difficulties, equipments } from '../data/exercises';
import './Exercises.css';

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [selectedEquipment, setSelectedEquipment] = useState('Todos');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar exercícios
  const filteredExercises = exercisesDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscles.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Todos' || exercise.difficulty === selectedDifficulty;
    const matchesEquipment = selectedEquipment === 'Todos' || exercise.equipment === selectedEquipment;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEquipment;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Iniciante': return '#10b981';
      case 'Intermediário': return '#f59e0b';
      case 'Avançado': return '#ef4444';
      default: return '#6366f1';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Peito': '💪',
      'Costas': '🔙',
      'Pernas': '🦵',
      'Ombros': '💪',
      'Braços': '💪',
      'Abdômen': '🎯'
    };
    return icons[category] || '🏋️';
  };

  return (
    <div className="exercises-page">
      <PageHeader 
        icon={Dumbbell}
        title="Biblioteca de Exercícios"
        subtitle={`${filteredExercises.length} exercícios disponíveis`}
      />

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por exercício ou músculo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={18} />
            </button>
          )}
        </div>
        <button 
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="filters-panel fade-in">
          <div className="filter-group">
            <label>Categoria</label>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Dificuldade</label>
            <div className="filter-buttons">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Equipamento</label>
            <div className="filter-buttons">
              {equipments.map(eq => (
                <button
                  key={eq}
                  className={`filter-btn ${selectedEquipment === eq ? 'active' : ''}`}
                  onClick={() => setSelectedEquipment(eq)}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSelectedCategory('Todos');
              setSelectedDifficulty('Todos');
              setSelectedEquipment('Todos');
              setSearchTerm('');
            }}
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Exercise Grid */}
      <div className="exercises-grid">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <div 
              key={exercise.id}
              className="exercise-card premium-card"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="exercise-gif">
                <img src={exercise.gifUrl} alt={exercise.name} />
                <div className="exercise-category-badge">
                  <span>{getCategoryIcon(exercise.category)}</span>
                  {exercise.category}
                </div>
              </div>
              
              <div className="exercise-info">
                <h3>{exercise.name}</h3>
                
                <div className="exercise-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
                  >
                    {exercise.difficulty}
                  </span>
                  <span className="equipment-badge">
                    {exercise.equipment}
                  </span>
                </div>

                <div className="muscles-tags">
                  {exercise.muscles.slice(0, 2).map((muscle, i) => (
                    <span key={i} className="muscle-tag">{muscle}</span>
                  ))}
                  {exercise.muscles.length > 2 && (
                    <span className="muscle-tag more">+{exercise.muscles.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Dumbbell size={48} />
            <h3>Nenhum exercício encontrado</h3>
            <p>Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
          <div className="modal-content exercise-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedExercise(null)}>
              <X size={24} />
            </button>

            <div className="exercise-detail">
              <div className="exercise-detail-header">
                <div className="exercise-gif-large">
                  <img src={selectedExercise.gifUrl} alt={selectedExercise.name} />
                </div>
                
                <div className="exercise-title-section">
                  <h2>{selectedExercise.name}</h2>
                  <div className="exercise-badges">
                    <span className="category-badge">
                      {getCategoryIcon(selectedExercise.category)} {selectedExercise.category}
                    </span>
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(selectedExercise.difficulty) }}
                    >
                      {selectedExercise.difficulty}
                    </span>
                    <span className="equipment-badge">
                      {selectedExercise.equipment}
                    </span>
                  </div>
                </div>
              </div>

              <div className="exercise-detail-body">
                <div className="detail-section">
                  <h3>💪 Músculos Trabalhados</h3>
                  <div className="muscles-list">
                    {selectedExercise.muscles.map((muscle, i) => (
                      <span key={i} className="muscle-chip">{muscle}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3>📋 Como Executar</h3>
                  <ol className="instructions-list">
                    {selectedExercise.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div className="detail-section tips-section">
                  <h3>💡 Dica Importante</h3>
                  <p className="tips-text">{selectedExercise.tips}</p>
                </div>
              </div>

              <div className="exercise-actions">
                <button 
                  className="btn-primary"
                  onClick={() => {
                    // Função para adicionar ao treino será implementada
                    alert('Funcionalidade de adicionar ao treino em breve!');
                    setSelectedExercise(null);
                  }}
                >
                  <Dumbbell size={20} />
                  Adicionar ao Treino
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
