import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch real cart on load if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await api.getCart();
      
      // Need to format the data to match frontend expectations
      // Ideally backend returns food_item details, but if not we assume they do.
      // Assuming schemas.py returns food_item details.
      const formattedItems = data.map(item => ({
        id: item.food_item_id, // frontend expects food id as id usually
        cartItemId: item.id, // the actual cart row id
        name: item.food_item ? item.food_item.name : 'Unknown Item',
        price: item.food_item ? item.food_item.price : 0,
        quantity: item.quantity,
        restaurantId: item.food_item ? item.food_item.restaurant_id : 0,
        image: item.food_item ? item.food_item.image : ''
      }));
      setCartItems(formattedItems);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodItem, restaurantId) => {
    if (!isAuthenticated) return alert("Please login to add items to cart!");
    
    try {
      await api.addToCart(foodItem.id, 1);
      await loadCart(); // reload from backend to get correct cartItemId
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const removeFromCart = async (foodItemId) => {
    const item = cartItems.find(i => i.id === foodItemId);
    if (!item) return;

    try {
      await api.removeFromCart(item.cartItemId);
      await loadCart();
    } catch (err) {
      console.error("Failed to remove", err);
    }
  };

  const updateQuantity = async (foodItemId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(foodItemId);
    
    const item = cartItems.find(i => i.id === foodItemId);
    if (!item) return;

    try {
      await api.updateCartItem(item.cartItemId, newQuantity);
      await loadCart();
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
