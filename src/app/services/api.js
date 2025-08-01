import axios from 'axios';

// URL base da sua API do backend
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar post com ID ${id}:`, error);
    return null;
  }
};

// Nova função para fazer login
export const loginAdmin = async (username, password) => {
  try {
    const response = await api.post('/users/login', { username, password });
    return response.data;
  } catch (error) {
    // Lança o erro para ser tratado no componente de login
    throw new Error(error.response?.data?.message || 'Erro desconhecido ao fazer login');
  }
};