"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Row, Col, Form, Button, Spinner, Card } from "react-bootstrap"
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
    fecha_fin: "", // Fecha de fin separada
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
    comentarios: [], // Array para almacenar comentarios
  })
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)
  const [duracionCalculada, setDuracionCalculada] = useState("")
  const [nuevoComentario, setNuevoComentario] = useState("")

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

  // Calcular duración cuando cambian las fechas u horas
  useEffect(() => {
    if (reporte.fecha && reporte.fecha_hora_inicio && reporte.fecha_fin && reporte.fecha_hora_fin) {
      try {
        // Crear fechas completas combinando fecha y hora
        const fechaInicio = new Date(reporte.fecha)
        const [horasInicio, minutosInicio] = reporte.fecha_hora_inicio.split(":")
        fechaInicio.setHours(Number.parseInt(horasInicio, 10), Number.parseInt(minutosInicio, 10), 0, 0)

        const fechaFin = new Date(reporte.fecha_fin)
        const [horasFin, minutosFin] = reporte.fecha_hora_fin.split(":")
        fechaFin.setHours(Number.parseInt(horasFin, 10), Number.parseInt(minutosFin, 10), 0, 0)

        if (fechaFin > fechaInicio) {
          // Calcular diferencia en milisegundos
          const diffMs = fechaFin.getTime() - fechaInicio.getTime()

          // Convertir a días, horas y minutos
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
          const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

          // Formatear la duración según si hay días o no
          let duracion = ""
          if (diffDays > 0) {
            duracion = `${diffDays}d ${diffHrs}h ${diffMins}m`
          } else {
            duracion = `${diffHrs}h ${diffMins}m`
          }

          setDuracionCalculada(duracion)

          // Actualizar el campo de duración en el reporte
          setReporte((prev: any) => ({
            ...prev,
            duracion_incidente: duracion,
          }))
        } else {
          setDuracionCalculada("La fecha/hora de fin debe ser posterior a la de inicio")
        }
      } catch (error) {
        console.error("Error al calcular duración:", error)
        setDuracionCalculada("Error al calcular duración")
      }
    } else {
      setDuracionCalculada("")
    }
  }, [reporte.fecha, reporte.fecha_hora_inicio, reporte.fecha_fin, reporte.fecha_hora_fin])

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

        // Formatear las fechas y horas antes de establecer el estado
        const reporteFormateado = {
          ...data,
          fecha: formatearFecha(data.fecha),
          fecha_fin: formatearFecha(data.fecha_fin) || formatearFecha(data.fecha), // Usar fecha de apertura como default
          fecha_hora_inicio: formatearHora(data.fecha_hora_inicio),
          fecha_hora_fin: formatearHora(data.fecha_hora_fin),
          comentarios: data.comentarios || [], // Asegurarse de que comentarios sea un array
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

  const handleAgregarComentario = () => {
    if (!nuevoComentario.trim()) return

    const ahora = new Date()
    const comentario = {
      id: Date.now(), // ID temporal
      texto: nuevoComentario,
      fecha: ahora.toISOString(),
      usuario: "Usuario Actual", // Idealmente esto vendría de un contexto de autenticación
    }

    setReporte((prev: any) => ({
      ...prev,
      comentarios: [...prev.comentarios, comentario],
    }))

    setNuevoComentario("")
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

    // Validar que si el estado es CERRADO, debe tener fecha y hora de fin
    if (reporte.estado === "CERRADO" && (!reporte.fecha_fin || !reporte.fecha_hora_fin)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Para cerrar un caso, debe especificar la fecha y hora de fin",
      })
      return
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

      // Combinar fecha con hora para crear fechas ISO completas
      const fechaInicio = new Date(reporte.fecha)
      const [horasInicio, minutosInicio] = reporte.fecha_hora_inicio.split(":")
      fechaInicio.setHours(Number.parseInt(horasInicio, 10), Number.parseInt(minutosInicio, 10), 0, 0)

      let fechaFin = null
      if (reporte.fecha_fin && reporte.fecha_hora_fin) {
        fechaFin = new Date(reporte.fecha_fin)
        const [horasFin, minutosFin] = reporte.fecha_hora_fin.split(":")
        fechaFin.setHours(Number.parseInt(horasFin, 10), Number.parseInt(minutosFin, 10), 0, 0)
      }

      // Asegurarse de que la duración esté calculada si el caso está cerrado
      let duracion = reporte.duracion_incidente
      if (reporte.estado === "CERRADO" && fechaFin) {
        const diffMs = fechaFin.getTime() - fechaInicio.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

        if (diffDays > 0) {
          duracion = `${diffDays}d ${diffHrs}h ${diffMins}m`
        } else {
          duracion = `${diffHrs}h ${diffMins}m`
        }
      }

      const reporteFormateado = {
        ...reporte,
        fecha: reporte.fecha ? new Date(reporte.fecha).toISOString() : null,
        fecha_fin: reporte.fecha_fin ? new Date(reporte.fecha_fin).toISOString() : null,
        fecha_hora_inicio: fechaInicio.toISOString(),
        fecha_hora_fin: fechaFin ? fechaFin.toISOString() : null,
        duracion_incidente: duracion,
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
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Apertura*</Form.Label>
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
              <Form.Label>Fecha de Fin {reporte.estado === "CERRADO" && "*"}</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                value={reporte.fecha_fin}
                onChange={handleInputChange}
                required={reporte.estado === "CERRADO"}
              />
              {reporte.fecha_fin && reporte.fecha_fin !== reporte.fecha && (
                <Form.Text className="text-muted">La fecha de fin es diferente a la fecha de apertura</Form.Text>
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
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Duración del Incidente</Form.Label>
              <Form.Control
                type="text"
                value={duracionCalculada || reporte.duracion_incidente || "No calculada"}
                disabled
                readOnly
                className="bg-light"
              />
              {reporte.fecha && reporte.fecha_hora_inicio && reporte.fecha_fin && reporte.fecha_hora_fin && (
                <Form.Text className="text-success">Duración calculada automáticamente</Form.Text>
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

        {/* Sección de comentarios/actualizaciones */}
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Seguimiento del Caso</h5>
            <span className="badge bg-secondary">{reporte.comentarios.length} actualizaciones</span>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <Form.Group>
                <Form.Label>Agregar actualización</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={nuevoComentario}
                    onChange={(e) => setNuevoComentario(e.target.value)}
                    placeholder="Escriba una actualización sobre el estado del caso..."
                  />
                  <Button
                    className="ms-2"
                    style={{ backgroundColor: "#f6952c", borderColor: "#f6952c" }}
                    onClick={handleAgregarComentario}
                    disabled={!nuevoComentario.trim()}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </Button>
                </div>
              </Form.Group>
            </div>

            <div
              className="comentarios-container"
              style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #dee2e6", borderRadius: "0.25rem" }}
            >
              {reporte.comentarios.length === 0 ? (
                <div className="text-center p-3 text-muted">No hay actualizaciones registradas</div>
              ) : (
                <div className="list-group list-group-flush">
                  {reporte.comentarios
                    .slice()
                    .reverse()
                    .map((comentario: any) => (
                      <div key={comentario.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-primary">{comentario.usuario}</small>
                          <small className="text-muted">
                            {new Date(comentario.fecha).toLocaleString("es-CO", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </small>
                        </div>
                        <p className="mb-0">{comentario.texto}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
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
