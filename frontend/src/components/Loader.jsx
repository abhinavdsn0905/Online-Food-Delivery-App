import React from 'react';
// Actually, let's keep everything scoped or use inline styles/standard CSS to keep it beginner-friendly.

const Loader = () => {
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: 'var(--bg-color)',
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid var(--border-color)',
    borderTop: '5px solid var(--primary-color)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={loaderStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
