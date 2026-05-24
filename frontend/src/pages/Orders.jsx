import React, { useEffect, useState } from 'react';
import { OrderCard } from '../components/Cards';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await api.getOrders(user.id);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate, user]);

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>Past Orders</h1>
      
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map(order => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
