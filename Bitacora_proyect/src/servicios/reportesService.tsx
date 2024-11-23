import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reporte';

export const getReporte = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reporte:', error);
    throw error;
  }
};

export const getReporteById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reporte by id:', error);
    throw error;
  }
};

export const createReporte = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating reporte:', error);
    throw error;
  }
};

export const updateReporte = async (id: number, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating reporte:', error);
    throw error;
  }
};

export const deleteReporte = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reporte:', error);
    throw error;
  }
};

export const getReportesById = async (id: number) => {
  const response = await axios.get(`http://localhost:8080/api/reporte/${id}`);
  return response.data;
};

export const updateReportes = async (id: number, reportesData: any) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/reporte${id}`, reportesData);
    return response.data;
  } catch (error) {
    console.error('Error updating reporte:', error);
    throw error; 
  }
}