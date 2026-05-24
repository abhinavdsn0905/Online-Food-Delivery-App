import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Buttons';
import { CartItemCard } from '../components/Cards';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const deliveryFee = cartTotal > 0 ? 2.99 : 0;
  const total = cartTotal + deliveryFee;

  const handleProceed = () => {
    if (!isAuthenticated) {
      alert("Please login to proceed with payment.");
      navigate('/login');
      return;
    }
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>You can go to home page to view more restaurants</p>
        <Button variant="primary" onClick={() => navigate('/')}>SEE RESTAURANTS NEAR YOU</Button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>Secure Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Item(s) in Cart</h3>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            {cartItems.map(item => (
              <CartItemCard 
                key={item.id} 
                item={item} 
                onUpdate={updateQuantity} 
                onRemove={removeFromCart} 
              />
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Bill Details</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Item Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed var(--border-color)', paddingTop: '16px', marginTop: '16px', fontWeight: '700', fontSize: '1.2rem' }}>
            <span>To Pay</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <Button fullWidth variant="primary" style={{ marginTop: '24px', padding: '14px' }} onClick={handleProceed}>
            PROCEED TO PAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
