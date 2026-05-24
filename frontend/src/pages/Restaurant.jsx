import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FoodCard } from '../components/Cards';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [restData, menuData] = await Promise.all([
          api.getRestaurantById(id),
          api.getMenuByRestaurant(id)
        ]);
        setRestaurant(restData);
        setMenu(menuData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item, restaurant.id);
    toast.success(`Added ${item.name} to cart!`, {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
      },
      iconTheme: {
        primary: 'var(--primary-color)',
        secondary: '#fff',
      },
    });
  };

  if (loading) return <Loader />;
  if (!restaurant) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Restaurant not found.</div>;

  return (
    <div>
      <div style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--white)', padding: '40px 0', marginBottom: '32px' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{restaurant.name}</h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '1rem', color: '#dddddd' }}>
            <span>{restaurant.cuisine}</span>
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
          Menu Items
        </h2>
        <div style={{ maxWidth: '800px' }}>
          {menu.length === 0 ? (
            <p>No menu items available currently.</p>
          ) : (
            menu.map(item => (
              <FoodCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
