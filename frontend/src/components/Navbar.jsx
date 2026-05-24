import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';
import { Button } from './Buttons';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navStyle = {
    backgroundColor: 'var(--white)',
    boxShadow: 'var(--shadow-sm)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'var(--primary-color)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const linksStyle = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  };

  const linkItemStyle = {
    fontWeight: '500',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'var(--transition)',
    color: 'var(--text-color)',
  };

  return (
    <nav style={navStyle}>
      <style>
        {`
          .nav-link:hover {
            color: var(--primary-color) !important;
          }
        `}
      </style>
      <div className="container" style={containerStyle}>
        <Link to="/" style={logoStyle}>
          Foodie<span style={{ color: 'var(--secondary-color)' }}>Hub</span>
        </Link>
        
        <div style={linksStyle}>
          {isAuthenticated ? (
            user?.role === 'admin' ? (
              <>
                <Link to="/admin" className="nav-link" style={linkItemStyle}>
                  Dashboard
                </Link>
                <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                  Admin Mode
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link" style={linkItemStyle}>
                  <FaSearch /> Search
                </Link>
                <Link to="/cart" className="nav-link" style={linkItemStyle}>
                  <FaShoppingBag /> Cart
                </Link>
                <Link to="/orders" className="nav-link" style={linkItemStyle}>
                  Orders
                </Link>
                <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )
          ) : (
            <>
              <Link to="/" className="nav-link" style={linkItemStyle}>
                <FaSearch /> Search
              </Link>
              <Link to="/cart" className="nav-link" style={linkItemStyle}>
                <FaShoppingBag /> Cart
              </Link>
              <Link to="/login" className="nav-link" style={linkItemStyle}>
                <FaUser /> Sign In
              </Link>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
