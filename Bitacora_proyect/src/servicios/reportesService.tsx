import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getReportes = async () => {
  try {
    const response = await axios.get(`${API_URL}/reporte`)
    return response.data
  } catch (error) {
    console.error("Error fetching reportes:", error)
    throw error
  }
}

export const getReporteById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/reporte/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching reporte with id ${id}:`, error)
    throw error
  }
}

export const createReporte = async (reporte: any) => {
  try {
    const response = await axios.post(`${API_URL}/reporte`, reporte)
    return response.data
  } catch (error) {
    console.error("Error creating reporte:", error)
    throw error
  }
}

export const updateReporte = async (id: number, reporte: any) => {
  try {
    console.log("Enviando datos al backend:", JSON.stringify(reporte, null, 2))
    const response = await axios.put(`${API_URL}/reporte/${id}`, reporte)
    return response.data
  } catch (error) {
    console.error("Error updating reporte:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta del servidor:", error.response.data)
    }
    throw error
  }
}

export const deleteReporte = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/reporte/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting reporte with id ${id}:`, error)
    throw error
  }
}
