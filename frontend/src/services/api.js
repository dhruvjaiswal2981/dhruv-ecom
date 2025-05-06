import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (profileData) => api.put('/auth/profile', profileData);


// Products API
export const getProducts = (params = {}) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductCategories = () => api.get('/products/categories');
export const createProduct = (productData) => {
  return api.post('/products', productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteProduct = (id) => api.delete(`/products/${id}`);


// Cart API
export const getCart = () => api.get('/cart')
  .then(res => res.data)
  .catch(err => {
    console.error('Error getting cart:', err);
    throw err;
  });
  export const addToCart = (cartItem) => api.post('/cart', cartItem)
  .then(res => res.data)
  .catch(err => {
    console.error('Error adding to cart:', err);
    throw err;
  });
export const updateCartItem = (id, updates) => api.put(`/cart/${id}`, updates);
export const removeFromCart = (id) => api.delete(`/cart/${id}`);
export const clearCart = () => api.delete('/cart');

// Orders API
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const getAllOrders = () => api.get('/orders/admin/all');
export const updateOrderStatus = (id, status) => api.put(`/orders/admin/${id}/status`, { status });

export default api;