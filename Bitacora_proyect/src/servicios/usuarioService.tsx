import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; 


export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    throw error;
  }
};

export const getUsuariosById = async (id: number) => {
  const response = await axios.get(`http://localhost:8080/api/users/${id}`);
  return response.data;
};

