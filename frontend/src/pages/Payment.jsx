import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Buttons';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [method, setMethod] = useState('card'); // card, upi, cod
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      // Simulate fake payment transaction
      const success = Math.random() > 0.1; // 90% success rate
      if (!success) {
        alert('Payment Failed! Please try again.');
        setProcessing(false);
        return;
      }

      // If success, create order
      const orderData = {
        user_id: user.id,
        restaurant_id: cartItems[0]?.restaurantId || 0,
        total_amount: cartTotal + 2.99, // adding delivery fee
        payment_status: method === 'cod' ? 'Pending' : 'Paid',
        items: cartItems.map(item => ({
          food_item_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.createOrder(orderData);
      clearCart();
      alert(`Payment Successful! Transaction ID: TXN${Math.floor(Math.random() * 1000000)}`);
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert('An error occurred during payment.');
    } finally {
      setProcessing(false);
    }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '500' };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>Checkout</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Button variant={method === 'card' ? 'primary' : 'outline'} onClick={() => setMethod('card')} fullWidth>Card</Button>
          <Button variant={method === 'upi' ? 'primary' : 'outline'} onClick={() => setMethod('upi')} fullWidth>UPI</Button>
          <Button variant={method === 'cod' ? 'primary' : 'outline'} onClick={() => setMethod('cod')} fullWidth>COD</Button>
        </div>

        <form onSubmit={handlePayment}>
          {method === 'card' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Card Number</label>
                <input type="text" required style={inputStyle} placeholder="XXXX XXXX XXXX XXXX" maxLength="16" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div><label style={labelStyle}>Expiry</label><input type="text" required style={inputStyle} placeholder="MM/YY" /></div>
                <div><label style={labelStyle}>CVV</label><input type="password" required style={inputStyle} placeholder="XXX" /></div>
              </div>
            </>
          )}

          {method === 'upi' && (
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>UPI ID</label>
              <input type="text" required style={inputStyle} placeholder="username@upi" />
            </div>
          )}

          {method === 'cod' && (
            <div style={{ marginBottom: '32px', textAlign: 'center', color: 'var(--text-light)' }}>
              You will pay ₹{(cartTotal + 2.99).toFixed(2)} on delivery.
            </div>
          )}

          <Button type="submit" fullWidth variant="primary" style={{ padding: '14px' }}>
            {processing ? 'Processing...' : `Pay ₹${(cartTotal + 2.99).toFixed(2)}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
