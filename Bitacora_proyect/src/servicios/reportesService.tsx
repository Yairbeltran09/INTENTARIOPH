import axios from "axios"

const API_URL = "http://localhost:8080/api" // Asegúrate de que esta URL sea correcta

export const getReporte = async () => {
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

export const updateReporte = async (id: number, cambios: any) => {
  try {
    console.log("Cambios solicitados:", JSON.stringify(cambios, null, 2))

    // Obtener el reporte original primero
    const reporteOriginal = await getReporteById(id)
    console.log("Reporte original del servidor:", JSON.stringify(reporteOriginal, null, 2))

    // Crear una copia exacta del reporte original
    const reporteActualizado = JSON.parse(JSON.stringify(reporteOriginal))

    // Actualizar el estado explícitamente
    if (cambios.estado) {
      reporteActualizado.estado = cambios.estado
      console.log(`Actualizando estado a: ${cambios.estado}`)
    }

    // Actualizar observación si está presente
    if (cambios.observacion !== undefined) {
      reporteActualizado.observacion = cambios.observacion
    }

    // Si el estado cambia a CERRADO y tenemos fecha y hora fin, establecerlas
    if (cambios.estado === "CERRADO" && cambios.fecha_cierre && cambios.hora_fin) {
      // Convertir la fecha y hora a un formato válido para Timestamp
      const [year, month, day] = cambios.fecha_cierre.split("-").map(Number)
      const [hours, minutes] = cambios.hora_fin.split(":").map(Number)

      // Crear una fecha con la fecha de cierre y la hora fin
      const fechaCierre = new Date(year, month - 1, day, hours, minutes, 0, 0)

      // Formatear como string ISO que el backend pueda procesar
      reporteActualizado.fecha_hora_fin = fechaCierre.toISOString()

      // Actualizar también la fecha de cierre en formato Date
      reporteActualizado.fecha_cierre = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

      // Calcular la duración como objeto Time (HH:MM:SS)
      // Usamos la fecha del reporte original para el cálculo
      const fechaInicio = new Date(reporteOriginal.fecha_hora_inicio)

      // Verificar si la fecha de cierre es posterior a la fecha de inicio
      if (fechaCierre.getTime() <= fechaInicio.getTime()) {
        console.warn("La fecha de cierre es anterior a la fecha de inicio. Ajustando para permitir el cierre.")
        // En lugar de lanzar un error, ajustamos la fecha de cierre para que sea al menos 1 minuto después de la fecha de inicio
        fechaCierre.setTime(fechaInicio.getTime() + 60000) // Añadir 1 minuto
        reporteActualizado.fecha_hora_fin = fechaCierre.toISOString()
      }

      const diffMs = fechaCierre.getTime() - fechaInicio.getTime()
      const diffSecs = Math.floor(diffMs / 1000)

      // Para duraciones mayores a 24 horas, necesitamos un formato especial
      // Calculamos el total de horas, no solo las horas dentro de un día
      const totalHours = Math.floor(diffSecs / 3600)
      const diffMinutes = Math.floor((diffSecs % 3600) / 60)
      const diffSeconds = diffSecs % 60

      // Formato HH:MM:SS para el campo TIME en la base de datos
      // Para duraciones mayores a 24 horas, usamos el total de horas
      reporteActualizado.duracion_incidente = `${totalHours.toString().padStart(2, "0")}:${diffMinutes.toString().padStart(2, "0")}:${diffSeconds.toString().padStart(2, "0")}`

      console.log(
        `Duración calculada: ${reporteActualizado.duracion_incidente} (${totalHours} horas, ${diffMinutes} minutos, ${diffSeconds} segundos)`,
      )
    }

    console.log("Datos finales para el backend:", JSON.stringify(reporteActualizado, null, 2))

    // Asegurarnos de que el estado se envía correctamente
    console.log(`Estado final enviado al backend: ${reporteActualizado.estado}`)

    // Usar directamente axios para tener más control
    const response = await axios({
      method: "put",
      url: `${API_URL}/reporte/${id}`,
      data: reporteActualizado,
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("Respuesta del servidor:", response.data)
    return response.data
  } catch (error) {
    console.error("Error updating reporte:", error)
    if (axios.isAxiosError(error) && error.response) {
      console.error("Respuesta del servidor:", error.response.data)
      console.error("Status:", error.response.status)
      console.error("Headers:", error.response.headers)
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
