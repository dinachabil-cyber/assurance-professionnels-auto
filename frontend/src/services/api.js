import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add auth token interceptor if needed
apiClient.interceptors.request.use((config) => {
  // If auth token exists in localStorage, add it
  const token = localStorage.getItem('aksam_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      // Validation error
      const messages = Object.values(error.response.data.errors || {}).flat();
      throw new Error(messages[0] || 'Erreur de validation');
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('aksam_token');
      window.location.href = '/';
    }
    throw new Error(error.response?.data?.message || 'Erreur de connexion');
  }
);

export default apiClient;