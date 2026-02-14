import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './NebulaParticles.css';

export default function NebulaParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 240}, 70%, ${Math.random() * 30 + 50}%)`,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="nebula-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Nebula clouds */}
      <motion.div
        className="nebula-cloud cloud-1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="nebula-cloud cloud-2"
        animate={{
          scale: [1.1, 0.9, 1.1],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="nebula-cloud cloud-3"
        animate={{
          scale: [0.8, 1.3, 0.8],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

    </div>
  );
}