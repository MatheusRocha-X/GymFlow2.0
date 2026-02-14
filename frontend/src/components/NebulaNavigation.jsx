import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NebulaNavigation.css';

// Pages
import Home from '../pages/Home';
import Workouts from '../pages/Workouts';
import Exercises from '../pages/Exercises';
import Reminders from '../pages/Reminders';
import Evolution from '../pages/Evolution';
import Settings from '../pages/Settings';
import Supplements from '../pages/Supplements';

// Nebula Components
import NebulaParticles from './NebulaParticles';
import BottomTabNavigation from './BottomTabNavigation';

const pages = [
  { path: '/', component: Home, icon: '🏠', label: 'Home', color: '#6366f1' },
  { path: '/workouts', component: Workouts, icon: '💪', label: 'Treinos', color: '#10b981' },
  { path: '/exercises', component: Exercises, icon: '🏋️', label: 'Exercícios', color: '#f59e0b' },
  { path: '/reminders', component: Reminders, icon: '🔔', label: 'Lembretes', color: '#ef4444' },
  { path: '/evolution', component: Evolution, icon: '📈', label: 'Evolução', color: '#8b5cf6' },
  { path: '/supplements', component: Supplements, icon: '💊', label: 'Suplementos', color: '#06b6d4' },
  { path: '/settings', component: Settings, icon: '⚙️', label: 'Config', color: '#64748b' }
];

export default function NebulaNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => {
    return pages.findIndex(page => page.path === location.pathname) || 0;
  });

  useEffect(() => {
    const handleNavigation = () => {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 300);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname);
    if (index !== -1) {
      setCurrentIndex(index);
      // Reset scroll to top when navigating to Home
      if (index === 0) {
        const content = document.querySelector('.nebula-content');
        if (content) content.scrollTop = 0;
      }
    }
  }, [location.pathname]);

  const handleTabChange = (index) => {
    setCurrentIndex(index);
    navigate(pages[index].path);
    // Reset scroll to top when navigating to Home
    if (index === 0) {
      setTimeout(() => {
        const content = document.querySelector('.nebula-content');
        if (content) content.scrollTop = 0;
      }, 0);
    }
  };

  const pageVariants = {
    enter: {
      opacity: 0,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.98,
    },
  };

  const pageTransition = {
    duration: 0.2,
    ease: "easeInOut",
  };

  return (
    <div className="nebula-container">
      <NebulaParticles />
      <BottomTabNavigation pages={pages} currentIndex={currentIndex} onTabChange={handleTabChange} />

      {/* Navigation Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="navigation-feedback"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feedback-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`nebula-content ${currentIndex === 0 ? 'no-scroll' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="page-wrapper"
          >
            <Routes location={location}>
              {pages.map((page, index) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={<page.component />}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}