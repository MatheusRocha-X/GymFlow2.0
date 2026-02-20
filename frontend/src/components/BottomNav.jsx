import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, BookOpen, Bell, TrendingUp, Settings, Pill } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  const confirmNavigation = () => {
    return !localStorage.getItem('activeWorkoutInProgress') ||
      confirm('Um treino esta em andamento. Sair vai perder o progresso. Deseja continuar?');
  };

  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/workouts', icon: Dumbbell, label: 'Treinos' },
    { to: '/exercises', icon: BookOpen, label: 'Exercícios' },
    { to: '/supplements', icon: Pill, label: 'Suplementos' },
    { to: '/reminders', icon: Bell, label: 'Lembretes' },
    { to: '/evolution', icon: TrendingUp, label: 'Evolução' },
    { to: '/settings', icon: Settings, label: 'Config' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          onClick={(event) => {
            if (!confirmNavigation()) {
              event.preventDefault();
            }
          }}

          key={to}
          to={to}
          className={({ isActive }) => 
            `bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <Icon size={24} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
