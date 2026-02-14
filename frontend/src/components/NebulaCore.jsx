import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './NebulaCore.css';

export default function NebulaCore({ pages, currentIndex }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  const handlePageClick = (index) => {
    navigate(pages[index].path);
  };

  return (
    <div className="nebula-core">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="nebula-particle"
          animate={{
            x: [particle.x + '%', (particle.x + 10) + '%'],
            y: [particle.y + '%', (particle.y - 5) + '%'],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x + '%',
            top: particle.y + '%',
          }}
        />
      ))}

      {/* Central orb */}
      <motion.div
        className="central-orb"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="orb-glow" />
        <div className="orb-core" />
      </motion.div>

      {/* Navigation orbs */}
      <div className="navigation-ring">
        {pages.map((page, index) => {
          const angle = (index / pages.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = index === currentIndex;
          const isHovered = hoveredIndex === index;

          return (
            <motion.button
              key={page.path}
              className={`nav-orb ${isActive ? 'active' : ''}`}
              onClick={() => handlePageClick(index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                x,
                y,
                scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                background: `linear-gradient(135deg, ${page.color}40, ${page.color}80)`,
                boxShadow: isActive
                  ? `0 0 30px ${page.color}60, inset 0 0 20px ${page.color}40`
                  : `0 0 15px ${page.color}30`,
              }}
            >
              <span className="orb-icon">{page.icon}</span>
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    className="orb-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {page.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}