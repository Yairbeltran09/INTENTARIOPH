"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Row, Col, Form, Button, Spinner, Card, Alert } from "react-bootstrap"
import Swal from "sweetalert2"
import { getReporteById, updateReporte } from "../../servicios/reportesService"

interface IFormularioEditarRProps {
  reporteId: number
  onClose: () => void
  onSuccess: () => void
}

const FormularioEditarR: React.FC<IFormularioEditarRProps> = ({ reporteId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(true)
  const [reporteOriginal, setReporteOriginal] = useState<any>(null)
  const [reporte, setReporte] = useState<any>({
    id: "",
    fecha: "",
    fecha_cierre: "",
    farmacia: {
      id: 0,
    },
    fecha_hora_inicio: "",
    fecha_hora_fin: "",
    duracion_incidente: "",
    motivo: {
      id: 0,
    },
    estado: "",
    observacion: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)
  const [duracionCalculada, setDuracionCalculada] = useState("")
  const [fechaInconsistente, setFechaInconsistente] = useState(false)
  const [estadoOriginal, setEstadoOriginal] = useState("")

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

  // Calcular duración cuando cambian las horas o fechas
  useEffect(() => {
    if (reporte.fecha_hora_inicio && reporte.fecha_hora_fin && reporte.fecha && reporte.fecha_cierre) {
      try {
        // Crear objetos Date para inicio y fin
        const fechaInicio = new Date(reporte.fecha)
        const fechaFin = new Date(reporte.fecha_cierre)

        // Extraer horas y minutos
        const [horasInicio, minutosInicio] = reporte.fecha_hora_inicio.split(":").map(Number)
        const [horasFin, minutosFin] = reporte.fecha_hora_fin.split(":").map(Number)

        // Establecer horas y minutos
        fechaInicio.setHours(horasInicio, minutosInicio, 0, 0)
        fechaFin.setHours(horasFin, minutosFin, 0, 0)

        // Calcular diferencia en milisegundos
        const diffMs = fechaFin.getTime() - fechaInicio.getTime()

        // Si la duración es negativa, mostrar error
        if (diffMs < 0) {
          setDuracionCalculada("Error: La fecha y hora de fin debe ser posterior a la fecha y hora de inicio")
          return
        }

        // Convertir a días, horas y minutos
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        // Formatear la duración
        let duracion = ""
        if (diffDays > 0) {
          duracion += `${diffDays}d `
        }
        duracion += `${diffHrs}h ${diffMins}m`

        // Calcular el total de horas para mostrar también
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
        const totalMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        setDuracionCalculada(`${duracion} (Total: ${totalHours}h ${totalMinutes}m)`)
      } catch (error) {
        console.error("Error al calcular duración:", error)
        setDuracionCalculada("")
      }
    } else {
      setDuracionCalculada("")
    }
  }, [reporte.fecha_hora_inicio, reporte.fecha_hora_fin, reporte.fecha, reporte.fecha_cierre])

  useEffect(() => {
    const cargarReporte = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!reporteId) {
          throw new Error("ID no proporcionado")
        }

        Swal.fire({
          title: "Cargando reporte...",
          html: "Por favor espera un momento.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        const data = await getReporteById(reporteId)

        if (!data) {
          throw new Error("No se encontró el reporte")
        }

        // Guardar el reporte original y su estado
        setReporteOriginal(data)
        setEstadoOriginal(data.estado)

        // Verificar si hay inconsistencia entre fecha y fecha_hora_inicio
        const fechaReporte = new Date(data.fecha)
        const fechaHoraInicio = new Date(data.fecha_hora_inicio)

        if (fechaReporte.toISOString().split("T")[0] !== fechaHoraInicio.toISOString().split("T")[0]) {
          setFechaInconsistente(true)
          console.warn("Inconsistencia detectada: La fecha del reporte no coincide con la fecha de fecha_hora_inicio")
        }

        // Formatear las fechas y horas antes de establecer el estado
        const reporteFormateado = {
          ...data,
          fecha: formatearFecha(data.fecha),
          fecha_cierre: formatearFecha(data.fecha_cierre) || formatearFecha(data.fecha), // Usar fecha de apertura como default
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
        Swal.close()
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

    if (!reporte.fecha || !reporte.fecha_hora_inicio) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete los campos obligatorios",
      })
      return
    }

    // Validar que la fecha y hora fin sean posteriores a la fecha y hora inicio si el estado es CERRADO
    if (reporte.estado === "CERRADO") {
      if (!reporte.fecha_hora_fin || !reporte.fecha_cierre) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor ingrese la fecha y hora de fin para cerrar el reporte",
        })
        return
      }

      // Si hay inconsistencia en las fechas, mostrar una advertencia pero permitir continuar
      if (fechaInconsistente && duracionCalculada.includes("Error")) {
        const result = await Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "Hay una inconsistencia en las fechas. ¿Desea continuar de todos modos?",
          showCancelButton: true,
          confirmButtonText: "Sí, continuar",
          cancelButtonText: "No, revisar",
        })

        if (!result.isConfirmed) {
          return
        }
      } else if (duracionCalculada.includes("Error")) {
        // Si no hay inconsistencia pero la duración es negativa, mostrar error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio",
        })
        return
      }
    }

    try {
      setLoading(true)

      Swal.fire({
        title: "Actualizando reporte...",
        html: "Por favor espera un momento.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Crear un objeto con los campos que queremos actualizar
      const cambios = {
        estado: reporte.estado,
        observacion: reporte.observacion,
      }

      // Solo si el estado es CERRADO, incluimos fecha y hora de cierre
      if (reporte.estado === "CERRADO") {
        cambios.fecha_cierre = reporte.fecha_cierre
        cambios.hora_fin = reporte.fecha_hora_fin
      }

      // Imprimir el objeto para depuración
      console.log("Enviando cambios:", cambios)
      console.log(`Estado original: ${estadoOriginal}, Nuevo estado: ${reporte.estado}`)

      await updateReporte(reporteId, cambios)

      await Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Reporte actualizado correctamente",
      })

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error("Error al actualizar:", error)
      if (error.response) {
        console.error("Detalles del error:", error.response.data)
      }
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.message ||
          "No se pudo actualizar el reporte. Por favor, intente nuevamente o contacte al administrador.",
        footer: '<a href="#">¿Necesita ayuda?</a>',
      })
    } finally {
      setLoading(false)
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
      {fechaInconsistente && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Advertencia: Inconsistencia en fechas</Alert.Heading>
          <p>
            Se ha detectado una inconsistencia entre la fecha del reporte y la fecha de inicio. Esto puede causar
            problemas al calcular la duración. Se recomienda verificar las fechas antes de guardar.
          </p>
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Apertura*</Form.Label>
              <Form.Control type="date" name="fecha" value={reporte.fecha} onChange={handleInputChange} disabled />
              <Form.Text className="text-muted">La fecha de apertura no se puede modificar</Form.Text>
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
                disabled
              />
              <Form.Text className="text-muted">La hora de inicio no se puede modificar</Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Cierre {reporte.estado === "CERRADO" && "*"}</Form.Label>
              <Form.Control
                type="date"
                name="fecha_cierre"
                value={reporte.fecha_cierre}
                onChange={handleInputChange}
                required={reporte.estado === "CERRADO"}
                min={reporte.fecha} // La fecha de cierre no puede ser anterior a la fecha de apertura
              />
              {reporte.fecha_cierre && reporte.fecha_cierre !== reporte.fecha && (
                <Form.Text className="text-muted">La fecha de cierre es diferente a la fecha de apertura</Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hora Fin {reporte.estado === "CERRADO" && "*"}</Form.Label>
              <Form.Control
                type="time"
                name="fecha_hora_fin"
                value={reporte.fecha_hora_fin}
                onChange={handleInputChange}
                required={reporte.estado === "CERRADO"}
              />
              {duracionCalculada && (
                <Form.Text className={duracionCalculada.includes("Error") ? "text-danger" : "text-muted"}>
                  {duracionCalculada}
                </Form.Text>
              )}
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
              {reporte.estado === "CERRADO" && (
                <Form.Text className="text-muted">
                  Al cerrar un caso, asegúrese de completar la fecha y hora de fin
                </Form.Text>
              )}
              {reporte.estado !== estadoOriginal && (
                <Form.Text className="text-warning">
                  El estado cambiará de {estadoOriginal} a {reporte.estado}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Motivo*</Form.Label>
              <Form.Control type="text" value={reporte.motivo?.motivo || ""} disabled readOnly className="bg-light" />
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
                placeholder="Observaciones generales del caso..."
              />
            </Form.Group>
          </Col>
        </Row>

        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Información de la Farmacia</h5>
          </Card.Header>
          <Card.Body>
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
          </Card.Body>
        </Card>

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
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Actualizando...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Actualizar
              </>
            )}
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
            disabled={loading}
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
