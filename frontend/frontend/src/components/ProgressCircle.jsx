import React from 'react';
import { Droplet } from 'lucide-react';
import './ProgressCircle.css';

export default function ProgressCircle({ 
  percentage, 
  size = 200, 
  strokeWidth = 15,
  showLabel = true 
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (pct) => {
    if (pct >= 100) return '#10b981'; // green
    if (pct >= 75) return '#3b82f6'; // blue
    if (pct >= 50) return '#f59e0b'; // yellow
    return '#6366f1'; // purple
  };

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-circle-bar"
          style={{
            filter: `drop-shadow(0 0 10px ${getColor(percentage)})`
          }}
        />
      </svg>
      
      {showLabel && (
        <div className="progress-circle-content">
          <Droplet size={40} color={getColor(percentage)} />
          <div className="progress-circle-percentage">
            {Math.round(percentage)}%
          </div>
          <div className="progress-circle-label">
            {percentage >= 100 ? 'Meta atingida!' : 'da meta diária'}
          </div>
        </div>
      )}
    </div>
  );
}
