import React from 'react';
import './PageHeader.css';

export default function PageHeader({ icon: Icon, title, subtitle }) {
  return (
    <header className="page-header">
      <div className="page-header-content">
        <div className="page-header-icon">
          {Icon && <Icon size={28} />}
        </div>
        <div className="page-header-text">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="page-header-logo">
        <img src="/gymflow-logo.png" alt="GymFlow" />
      </div>
    </header>
  );
}
