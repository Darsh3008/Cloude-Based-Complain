import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloude-based-complain.onrender.com',
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('complainthub_user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch {
      localStorage.removeItem('complainthub_user');
    }
  }
  return config;
});

export default api;
