import axiosInstance from './axiosInstance';

export const api = {
  // --- AUTHENTICATION ---
  login: async (email, password) => {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data.data;
  },
  register: async (userData) => {
    const response = await axiosInstance.post('/register', userData);
    return response.data.data;
  },

  // --- RESTAURANTS & MENU ---
  getRestaurants: async () => {
    const response = await axiosInstance.get('/restaurants');
    return response.data.data;
  },
  getRestaurantById: async (id) => {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data.data;
  },
  getMenuByRestaurant: async (restaurantId) => {
    const response = await axiosInstance.get(`/menu/${restaurantId}`);
    return response.data.data;
  },

  // --- CART ---
  getCart: async () => {
    const response = await axiosInstance.get('/cart/');
    return response.data.data;
  },
  addToCart: async (foodItemId, quantity = 1) => {
    const response = await axiosInstance.post('/cart/add', { food_item_id: foodItemId, quantity });
    return response.data.data;
  },
  updateCartItem: async (itemId, quantity) => {
    const response = await axiosInstance.put(`/cart/update/${itemId}`, { quantity });
    return response.data.data;
  },
  removeFromCart: async (itemId) => {
    const response = await axiosInstance.delete(`/cart/remove/${itemId}`);
    return response.data.data;
  },

  // --- ORDERS ---
  getOrders: async () => {
    const response = await axiosInstance.get('/orders');
    return response.data.data;
  },
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/order/create', orderData);
    return response.data.data;
  },

  // --- PAYMENT ---
  processPayment: async (paymentData) => {
    const response = await axiosInstance.post('/payment/process', paymentData);
    return response.data.data;
  },

  // --- ADMIN ---
  getAdminOrders: async () => {
    const response = await axiosInstance.get('/admin/orders');
    return response.data.data;
  },
  getCustomers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data.data;
  },
  deleteCustomer: async (id) => {
    const response = await axiosInstance.delete(`/admin/users/${id}`);
    return response.data;
  },
  addRestaurant: async (restaurantData) => {
    const response = await axiosInstance.post('/admin/restaurants/add', restaurantData);
    return response.data.data;
  },
  updateRestaurant: async (id, restaurantData) => {
    const response = await axiosInstance.put(`/admin/restaurants/${id}`, restaurantData);
    return response.data.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.url;
  }
};
