import React from 'react';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  const containerStyle = {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    padding: '10px 0',
    scrollbarWidth: 'none', // For Firefox
  };

  const btnStyle = (isActive) => ({
    padding: '8px 20px',
    borderRadius: '20px',
    border: `1px solid ${isActive ? 'var(--primary-color)' : 'var(--border-color)'}`,
    backgroundColor: isActive ? 'var(--primary-color)' : 'var(--white)',
    color: isActive ? 'var(--white)' : 'var(--text-color)',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'var(--transition)',
  });

  return (
    <div style={containerStyle} className="hide-scrollbar">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <button 
        style={btnStyle(activeCategory === 'All')} 
        onClick={() => onSelectCategory('All')}
      >
        All
      </button>
      {categories.map((cat, idx) => (
        <button 
          key={idx} 
          style={btnStyle(activeCategory === cat)} 
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
