import React from 'react';
import './BottomTabNavigation.css';

export default function BottomTabNavigation({ pages, currentIndex, onTabChange }) {
  const confirmNavigation = () => {
    return !localStorage.getItem('activeWorkoutInProgress') ||
      confirm('Um treino esta em andamento. Sair vai perder o progresso. Deseja continuar?');
  };

  const handleTabClick = (index) => {
    if (!confirmNavigation()) return;
    onTabChange(index);
  };

  return (
    <div className="bottom-tab-navigation">
      {pages.map((page, index) => (
        <button
          key={page.path}
          className={`tab-button ${index === currentIndex ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
          style={{ '--tab-color': page.color }}
        >
          <span className="tab-icon">{page.icon}</span>
          <span className="tab-label">{page.label}</span>
        </button>
      ))}
    </div>
  );
}
