import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloude-based-complain-git-main-darshkanani326-5720s-projects.vercel.app/api',
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
