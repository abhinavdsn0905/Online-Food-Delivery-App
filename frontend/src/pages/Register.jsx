import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Buttons';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.register(formData);
      login(data.user, data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputStyle = { width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '500' };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--secondary-color)', textAlign: 'center' }}>Create Account</h2>
        
        {error && <div style={{ color: 'white', backgroundColor: 'var(--danger-color, #DC3545)', padding: '10px', borderRadius: '4px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" required onChange={handleChange} style={inputStyle} placeholder="John Doe" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" name="email" required onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Phone Number</label>
            <input type="tel" name="phone" required onChange={handleChange} style={inputStyle} placeholder="1234567890" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Password</label>
            <input type="password" name="password" required onChange={handleChange} style={inputStyle} placeholder="Create a password" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Delivery Address</label>
            <input type="text" name="address" required onChange={handleChange} style={inputStyle} placeholder="123 Main St, City" />
          </div>

          <Button type="submit" fullWidth variant="primary" style={{ marginBottom: '20px' }}>
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>

          <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
