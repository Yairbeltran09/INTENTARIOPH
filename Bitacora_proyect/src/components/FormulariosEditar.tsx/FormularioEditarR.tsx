"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Row, Col, Form, Button, Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import { getReporteById, updateReporte } from "../../servicios/reportesService"

interface IFormularioEditarRProps {
  reporteId: number
  onClose: () => void
  onSuccess: () => void
}

const FormularioEditarR: React.FC<IFormularioEditarRProps> = ({ reporteId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(true)
  const [reporte, setReporte] = useState<any>({
    id: "",
    fecha: "",
    farmacia: {
      id: 0,
      nombre: "",
      coordenadas: "",
      direccion: "",
      ciudad: { nombre_ciudad: "" },
      departamento: { name_departamento: "" },
      proveedorInternet: { nombre: "" },
      canalTransmision: { nombre: "" },
    },
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_incidente: "",
    motivo: { id: 0, motivo: "" },
    estado: "",
    observacion: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)

  // Función para formatear fechas y horas
  const formatearFecha = (fechaISO: string | null | undefined): string => {
    if (!fechaISO) return ""
    try {
      const fecha = new Date(fechaISO)
      return fecha.toISOString().split("T")[0]
    } catch (error) {
      console.error("Error al formatear fecha:", error)
      return ""
    }
  }

  const formatearHora = (fechaISO: string | null | undefined): string => {
    if (!fechaISO) return ""
    try {
      const fecha = new Date(fechaISO)
      return `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`
    } catch (error) {
      console.error("Error al formatear hora:", error)
      return ""
    }
  }

  useEffect(() => {
    const cargarReporte = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!reporteId) {
          throw new Error("ID no proporcionado")
        }

        const data = await getReporteById(reporteId)

        if (!data) {
          throw new Error("No se encontró el reporte")
        }

        // Formatear las fechas y horas antes de establecer el estado
        const reporteFormateado = {
          ...data,
          fecha: formatearFecha(data.fecha),
          fecha_hora_inicio: formatearHora(data.fecha_hora_inicio),
          fecha_hora_fin: formatearHora(data.fecha_hora_fin),
        }

        setReporte(reporteFormateado)
      } catch (error) {
        console.error("Error al cargar el reporte:", error)
        setError(error instanceof Error ? error.message : "Error al cargar el reporte")
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del reporte",
        })
      } finally {
        setLoading(false)
      }
    }

    cargarReporte()
  }, [reporteId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReporte((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      

      // Combinar fecha con hora para crear fechas ISO completas
      const fechaBase = new Date(reporte.fecha)

      let fechaHoraInicio = null
      if (reporte.fecha && reporte.fecha_hora_inicio) {
        const [horasInicio, minutosInicio] = reporte.fecha_hora_inicio.split(":")
        fechaHoraInicio = new Date(fechaBase)
        fechaHoraInicio.setHours(Number(horasInicio), Number(minutosInicio), 0, 0)
      }

      let fechaHoraFin = null
      if (reporte.fecha && reporte.fecha_hora_fin) {
        const [horasFin, minutosFin] = reporte.fecha_hora_fin.split(":")
        fechaHoraFin = new Date(fechaBase)
        fechaHoraFin.setHours(Number(horasFin), Number(minutosFin), 0, 0)
      }

      const reporteFormateado = {
        ...reporte,
        fecha: reporte.fecha ? new Date(reporte.fecha).toISOString() : null,
        fecha_hora_inicio: fechaHoraInicio ? fechaHoraInicio.toISOString() : null,
        fecha_hora_fin: fechaHoraFin ? fechaHoraFin.toISOString() : null,
      }

      await updateReporte(reporteId, reporteFormateado)

      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Reporte actualizado correctamente",
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error("Error al actualizar:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el reporte",
      })
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha*</Form.Label>
              <Form.Control type="date" name="fecha" value={reporte.fecha} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Inicio*</Form.Label>
              <Form.Control
                type="time"
                name="fecha_hora_inicio"
                value={reporte.fecha_hora_inicio}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Fin*</Form.Label>
              <Form.Control
                type="time"
                name="fecha_hora_fin"
                value={reporte.fecha_hora_fin}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Estado*</Form.Label>
              <Form.Select name="estado" value={reporte.estado} onChange={handleInputChange} required>
                <option value="">Seleccione...</option>
                <option value="ABIERTO">ABIERTO</option>
                <option value="CERRADO">CERRADO</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observacion"
                value={reporte.observacion}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="card-title mb-4">Información de la Farmacia</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Farmacia</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.nombre || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Coordenadas</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.coordenadas || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.direccion || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.ciudad?.nombre_ciudad || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Proveedor de Internet</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.proveedorInternet?.nombre || ""} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Canal de Transmisión</Form.Label>
              <Form.Control type="text" value={reporte.farmacia?.canalTransmision?.nombre || ""} disabled />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button
            style={{
              backgroundColor: "#f6952c",
              borderColor: "#f6952c",
              cursor: "pointer",
              background: isHovered2 ? "#ffff" : "#f6952c",
              color: isHovered2 ? "#f6952c" : "#ffff",
            }}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            type="submit"
            variant="secondary"
            className="me-2"
          >
            <i className="bi bi-check-circle me-2"></i>
            Actualizar
          </Button>
          <Button
            style={{
              backgroundColor: isHovered ? "#f6952c" : "#ffff",
              color: isHovered ? "#fff" : "#f6952c",
              borderColor: "#f6952c",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="button"
            onClick={onClose}
          >
            <i className="bi bi-x-circle me-2"></i>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormularioEditarR

