import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch, placeholder = "Search for restaurants or dishes..." }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 16px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: 'var(--shadow-sm)',
  };

  const inputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '8px',
    fontSize: '1rem',
    color: 'var(--text-color)',
  };

  const iconStyle = {
    color: 'var(--text-light)',
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}>
      <FaSearch style={iconStyle} />
      <input 
        type="text" 
        style={inputStyle} 
        placeholder={placeholder} 
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
