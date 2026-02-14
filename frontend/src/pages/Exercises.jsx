import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Filter,
  Search
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { categories, equipments, exercisesDatabase } from '../data/exercises';
import './Exercises.css';

const ITEMS_PER_PAGE = 18;

export default function Exercises() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEquipment, setSelectedEquipment] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const filteredExercises = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return exercisesDatabase.filter((exercise) => {
      const byText =
        !normalized ||
        exercise.name.toLowerCase().includes(normalized) ||
        exercise.category.toLowerCase().includes(normalized) ||
        exercise.equipment.toLowerCase().includes(normalized) ||
        exercise.muscles?.some((muscle) => muscle.toLowerCase().includes(normalized));
      const byCategory =
        selectedCategory === 'Todos' || exercise.category === selectedCategory;
      const byEquipment =
        selectedEquipment === 'Todos' || exercise.equipment === selectedEquipment;

      return byText && byCategory && byEquipment;
    });
  }, [query, selectedCategory, selectedEquipment]);

  const totalPages = Math.max(1, Math.ceil(filteredExercises.length / ITEMS_PER_PAGE));
  const firstItem = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredExercises.slice(firstItem, firstItem + ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory, selectedEquipment]);

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
              <label htmlFor="category-filter">Categoria</label>
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
                    <span className="pill category">{exercise.category}</span>
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
