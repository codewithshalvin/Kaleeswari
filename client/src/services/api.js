import axios from 'axios';

// API base URL configuration for production & local dev
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.origin.includes('localhost:5173') 
    ? 'http://localhost:5000' 
    : '');

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
