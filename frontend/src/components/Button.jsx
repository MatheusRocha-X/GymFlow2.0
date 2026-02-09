import React from 'react';
import { Dumbbell } from 'lucide-react';
import './Button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  fullWidth = false,
  loading = false,
  ...props 
}) {
  const Icon = icon;
  
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="btn-spinner"></div>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
}
