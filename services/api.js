import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com';

// axios
export const fetchTodosAxios = async (delay = 0) => {
  const response = await axios.get(`${API_URL}/todos?_limit=10`);
  if (delay) await new Promise((r) => setTimeout(r, delay));
  return response.data;
};

// fetch
export const fetchTodosFetch = async (delay = 0) => {
  const response = await fetch(`${API_URL}/todos?_limit=10`);
  if (!response.ok) {
    throw new Error('Erreur serveur');
  }
  if (delay) await new Promise((r) => setTimeout(r, delay));
  return response.json();
};
