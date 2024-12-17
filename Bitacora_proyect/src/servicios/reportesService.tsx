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

export const createReporte = async (data: any) => {
  try {
  
    const reporteFormateado = {
      fecha: data.fecha ? new Date(data.fecha) : null,
      farmacia: data.farmacia,
      fecha_hora_inicio: data.fecha_hora_inicio ? new Date(data.fecha_hora_inicio) : null,
      fecha_hora_fin: null,
      duracion_incidente: data.duracion_incidente || null,
      estado: data.estado || 'ABIERTO',
      motivo: data.motivo,
      observacion: data.observacion || '',
      isDeleted: false
    };

    const response = await axios.post(API_URL, reporteFormateado);
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

export const getReporteById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reporte by id:', error);
    throw error;
  }
};