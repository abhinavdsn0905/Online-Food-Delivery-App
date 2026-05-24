import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', style = {}, fullWidth = false }) => {
  const baseStyle = {
    padding: '10px 24px',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'var(--transition)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--white)',
    },
    secondary: {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--white)',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid var(--primary-color)',
      color: 'var(--primary-color)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-color)',
    }
  };

  // Merge styles
  const mergedStyle = {
    ...baseStyle,
    ...variants[variant],
    ...style,
  };

  return (
    <button type={type} onClick={onClick} style={mergedStyle} className={`btn-${variant}`}>
      <style>
        {`
          .btn-primary:hover { background-color: var(--primary-hover) !important; }
          .btn-secondary:hover { background-color: #1a1a1a !important; }
          .btn-outline:hover { background-color: var(--primary-color) !important; color: var(--white) !important; }
          .btn-ghost:hover { background-color: var(--border-color) !important; }
        `}
      </style>
      {children}
    </button>
  );
};
