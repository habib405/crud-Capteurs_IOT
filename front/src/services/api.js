import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://51.20.79.39:8080';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
