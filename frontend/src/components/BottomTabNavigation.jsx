import React from 'react';
import './BottomTabNavigation.css';

export default function BottomTabNavigation({ pages, currentIndex, onTabChange }) {
  const handleTabClick = (index) => {
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