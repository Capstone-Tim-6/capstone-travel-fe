import axios from 'axios';

// Konfigurasi Dasar
const API_URL = "https://travbe.vercel.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper Token
export const getToken = () => localStorage.getItem('travsecure_token');
export const setToken = (token) => localStorage.setItem('travsecure_token', token);
export const clearToken = () => localStorage.removeItem('travsecure_token');

// Interceptor: Otomatis tempel token di setiap request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor: Normalisasi Error
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || err?.message || 'Gagal terhubung ke server';
    return Promise.reject({ ...err, friendlyMessage: msg });
  }
);

// ==========================================
// SEMUA ENDPOINT API
// ==========================================

// Auth
export const loginUser = (data) => api.post('/api/auth/login', data);
export const signupUser = (data) => api.post('/api/auth/signup', data);

// Destinasi
export const getDestinations = () => api.get('/api/destinations');
export const searchDestination = (name) => api.get(`/api/destinations/search?name=${name}`);
export const getDestinationDetail = (id) => api.get(`/api/destinations/${id}`);

// Safety & Reviews
export const getNotifications = () => api.get('/api/notifications');
export const getReviews = () => api.get('/api/destinations/review');

// UNTUK KIRIM LAPORAN: 
// Jika /api/reports error 404, coba ganti ke /api/destinations/review
export const postReport = (data) => api.post('/api/reports', data); 

export default api;