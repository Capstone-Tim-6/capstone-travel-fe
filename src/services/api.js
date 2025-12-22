// api.js - TIDAK ada JSX di sini, murni JavaScript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://travbe.vercel.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Auth token helpers =====
const TOKEN_KEY = 'travsecure_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// ===== Axios interceptors =====
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalisasi error agar UI enak dipakai
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'Request failed';
    return Promise.reject({ ...error, friendlyMessage: message });
  }
);

export default api;