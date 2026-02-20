import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Filter,
  Search,
  X
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { categories, equipments, exercisesDatabase, primaryCategories } from '../data/exercises';
import './Exercises.css';

const ITEMS_PER_PAGE = 18;

const normalizeText = (value) => {
  if (!value) return '';
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function Exercises() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('Todas');
  const [selectedEquipment, setSelectedEquipment] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const filteredExercises = useMemo(() => {
    const normalized = normalizeText(query.trim());

    return exercisesDatabase.filter((exercise) => {
      const nameText = normalizeText(exercise.name);
      const originalText = normalizeText(exercise.originalName);
      const categoryText = normalizeText(exercise.category);
      const primaryText = normalizeText(exercise.primaryCategory);
      const equipmentText = normalizeText(exercise.equipment);
      const muscleText = exercise.muscles?.map(normalizeText) || [];

      const byText =
        !normalized ||
        nameText.includes(normalized) ||
        originalText.includes(normalized) ||
        categoryText.includes(normalized) ||
        primaryText.includes(normalized) ||
        equipmentText.includes(normalized) ||
        muscleText.some((muscle) => muscle.includes(normalized));
      const byCategory =
        selectedCategory === 'Todos' ||
        normalizeText(selectedCategory) === categoryText;
      const byPrimary =
        selectedPrimaryCategory === 'Todas' ||
        normalizeText(selectedPrimaryCategory) === primaryText;
      const byEquipment =
        selectedEquipment === 'Todos' ||
        normalizeText(selectedEquipment) === equipmentText;

      return byText && byCategory && byPrimary && byEquipment;
    });
  }, [query, selectedCategory, selectedPrimaryCategory, selectedEquipment]);

  const totalPages = Math.max(1, Math.ceil(filteredExercises.length / ITEMS_PER_PAGE));
  const firstItem = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredExercises.slice(firstItem, firstItem + ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory, selectedPrimaryCategory, selectedEquipment]);

  useEffect(() => {
    const scroller = document.querySelector('.nebula-content');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('Todos');
    setSelectedPrimaryCategory('Todas');
    setSelectedEquipment('Todos');
  };

  return (
    <div className="page exercises-page">
      <div className="container">
        <PageHeader
          icon={Dumbbell}
          title="Biblioteca de Exercicios"
          subtitle={`${filteredExercises.length} exercicios encontrados`}
        />

        <section className="exercise-toolbar card">
          <div className="search-input-wrap">
            <Search size={18} />
            <input
              type="text"
              value={query}
              placeholder="Buscar por nome, musculo, categoria..."
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className="ghost-icon-btn"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`toggle-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters((value) => !value)}
          >
            <Filter size={16} />
            Filtros
          </button>
        </section>

        {showFilters && (
          <section className="filters-panel card fade-in">
            <div className="filter-row">
              <label htmlFor="primary-category-filter">Grupo muscular</label>
              <select
                id="primary-category-filter"
                value={selectedPrimaryCategory}
                onChange={(event) => setSelectedPrimaryCategory(event.target.value)}
              >
                <option value="Todas">Todas</option>
                {primaryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-row">
              <label htmlFor="category-filter">Subgrupo</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-row">
              <label htmlFor="equipment-filter">Equipamento</label>
              <select
                id="equipment-filter"
                value={selectedEquipment}
                onChange={(event) => setSelectedEquipment(event.target.value)}
              >
                {equipments.map((equipment) => (
                  <option key={equipment} value={equipment}>
                    {equipment}
                  </option>
                ))}
              </select>
            </div>

            <div className="active-chips">
              <span className="chip">{selectedPrimaryCategory}</span>
              <span className="chip">{selectedCategory}</span>
              <span className="chip">{selectedEquipment}</span>
            </div>

            <button type="button" className="clear-filters-btn" onClick={clearFilters}>
              Limpar filtros
            </button>
          </section>
        )}

        {currentItems.length > 0 ? (
          <section className="exercise-grid">
            {currentItems.map((exercise) => (
              <article key={exercise.id} className="exercise-card-v2">
                <div className="exercise-thumb">
                  <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
                </div>
                <div className="exercise-content">
                  <h3>{exercise.name}</h3>
                  <div className="card-tags">
                    <span className="pill subcategory">{exercise.category}</span>
                    <span className="pill primary">{exercise.primaryCategory}</span>
                    <span className="pill equipment">{exercise.equipment}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="exercise-empty card">
            <Dumbbell size={44} />
            <h3>Nenhum exercicio encontrado</h3>
            <p>Tente outro termo de busca ou altere os filtros.</p>
          </section>
        )}

        {filteredExercises.length > ITEMS_PER_PAGE && (
          <nav className="pagination-v2 card" aria-label="Paginacao de exercicios">
            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            <strong>
              Pagina {page} de {totalPages}
            </strong>

            <button
              type="button"
              className="page-btn"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={page === totalPages}
            >
              Proxima
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>

    </div>
  );
}
