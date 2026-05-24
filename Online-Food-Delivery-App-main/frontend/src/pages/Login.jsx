import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Buttons';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    setError('');
    if (newTab === 'admin') {
      setEmail('admin@foodiehub.com');
      setPassword('admin123');
    } else {
      setEmail('testuser@gmail.com');
      setPassword('password123');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login(email, password);
      login(data.user, data.access_token);
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' };
  const activeTabStyle = { flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', borderBottom: '3px solid var(--primary-color)', fontWeight: '600', color: 'var(--primary-color)' };
  const inactiveTabStyle = { flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', borderBottom: '3px solid var(--border-color)', fontWeight: '500', color: 'var(--text-light)' };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '420px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--secondary-color)', textAlign: 'center' }}>Welcome Back</h2>
        
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <div style={tab === 'user' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabSwitch('user')}>
            User Login
          </div>
          <div style={tab === 'admin' ? activeTabStyle : inactiveTabStyle} onClick={() => handleTabSwitch('admin')}>
            Admin Login
          </div>
        </div>

        {error && <div style={{ color: 'white', backgroundColor: 'var(--danger-color, #DC3545)', padding: '10px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} placeholder="john@example.com" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle} placeholder="Enter your password" />
          </div>
          
          <Button type="submit" fullWidth variant="primary" style={{ marginBottom: '20px' }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
