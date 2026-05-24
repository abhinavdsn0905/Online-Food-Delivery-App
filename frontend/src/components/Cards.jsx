import React from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';

// ----------------------
// RESTAURANT CARD
// ----------------------
export const RestaurantCard = ({ id, name, image, deliveryTime, cuisine }) => {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition)',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={cardStyle} className="hover-card" onClick={() => navigate(`/restaurant/${id}`)}>
      <style>
        {`
          .hover-card:hover {
            box-shadow: var(--shadow-lg);
            transform: translateY(-5px);
          }
          .hover-card:hover img {
            transform: scale(1.05);
          }
        `}
      </style>
      <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>{name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{deliveryTime}</div>
        </div>
        <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: 'auto' }}>{cuisine}</div>
      </div>
    </div>
  );
};

import { useCart } from '../context/CartContext';

// ----------------------
// FOOD ITEM CARD
// ----------------------
export const FoodCard = ({ item, onAdd }) => {
  const { name, description, price, image } = item;
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  
  const cartItem = cartItems.find(c => c.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>{name}</h4>
        <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '8px', color: 'var(--primary-color)' }}>₹{price.toFixed(2)}</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.5' }}>{description}</p>
      </div>
      <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
        <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', width: '80%' }}>
          {quantity === 0 ? (
            <Button variant="primary" style={{ padding: '5px 10px', fontSize: '0.9rem', width: '100%', boxShadow: 'var(--shadow-md)' }} onClick={() => onAdd(item)}>
              ADD
            </Button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--primary-color)', overflow: 'hidden' }}>
              <button style={{ padding: '6px 10px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, quantity - 1)}>-</button>
              <span style={{ fontWeight: '600', color: 'var(--primary-color)', fontSize: '0.9rem' }}>{quantity}</span>
              <button style={{ padding: '6px 10px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold' }} onClick={() => updateQuantity(item.id, quantity + 1)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------
// CART ITEM CARD
// ----------------------
export const CartItemCard = ({ item, onUpdate, onRemove }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
        <div style={{ color: 'var(--primary-color)', fontWeight: '600' }}>₹{(item.price * item.quantity).toFixed(2)}</div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <button style={{ padding: '4px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => onUpdate(item.id, -1)}>-</button>
          <span style={{ padding: '4px 8px', fontWeight: '500' }}>{item.quantity}</span>
          <button style={{ padding: '4px 12px', border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => onUpdate(item.id, 1)}>+</button>
        </div>
        <button onClick={() => onRemove(item.id)} style={{ color: '#DC3545', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

// ----------------------
// ORDER CARD
// ----------------------
export const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'var(--success-color, #28A745)';
      case 'preparing': return '#FFC107';
      case 'cancelled': return 'var(--danger-color, #DC3545)';
      default: return 'var(--primary-color)';
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Order #{order.id}</h3>
          <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>₹{order.total_amount.toFixed(2)}</div>
          <div style={{ color: getStatusColor(order.status), fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>
            {order.status}
          </div>
        </div>
      </div>
      <div>
        {order.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '4px' }}>
            <span>{item.quantity}x {item.name}</span>
            <span>₹{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
