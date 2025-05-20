"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createEnvio } from "../../servicios/EnvioModemService"
import { getModems, updateModemStatus } from "../../servicios/modemService"
import Swal from "sweetalert2"
import { Form, Button, Spinner, Row, Col } from "react-bootstrap"

interface IModem {
  id: number
  marca: string
  modelo: string
  numero_serie: string
  estado: string
  proveedorInternet: {
    id: number
    nombre: string
  }
}

interface IEnvio {
  farmacia: any
  modemPrincipal: any
  modemSecundario?: any
  fecha_envio: string
  costo_envio: number
  estado_envio: string
}

interface Props {
  farmacia: any
  onClose?: () => void
}

const FormularioEnvioM: React.FC<Props> = ({ farmacia, onClose }) => {
  const [modems, setModems] = useState<IModem[]>([])
  const [isHovered2, setIsHovered2] = useState(false)
  const [loading, setLoading] = useState(false)

  const [envio, setEnvio] = useState<IEnvio>({
    farmacia: farmacia,
    modemPrincipal: null,
    fecha_envio: new Date().toISOString(),
    costo_envio: 0,
    estado_envio: "PENDIENTE",
  })

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        Swal.fire({
          title: "Cargando módems...",
          html: "Por favor espera un momento.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        const modemsData = await getModems()
        setModems(modemsData.filter((modem) => modem.estado === "DISPONIBLE"))
        Swal.close()
      } catch (error) {
        console.error("Error al cargar datos:", error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al cargar los módems disponibles",
        })
      }
    }

    cargarDatos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "modemPrincipal") {
      const modemSeleccionado = modems.find((m) => m.id === Number.parseInt(value))
      setEnvio((prev) => ({
        ...prev,
        modemPrincipal: modemSeleccionado,
      }))
    } else if (name === "modemSecundario") {
      if (value === "") {
        // Si se selecciona la opción vacía, establecer modemSecundario como null
        setEnvio((prev) => ({
          ...prev,
          modemSecundario: null,
        }))
      } else {
        const modemSeleccionado = modems.find((m) => m.id === Number.parseInt(value))
        setEnvio((prev) => ({
          ...prev,
          modemSecundario: modemSeleccionado,
        }))
      }
    } else {
      setEnvio((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!envio.modemPrincipal) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe seleccionar al menos un módem principal",
      })
      return
    }

    try {
      setLoading(true)
      Swal.fire({
        title: "Creando envío...",
        text: "Por favor espere",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Crear el envío
      const envioCreado = await createEnvio(envio)

      // Actualizar el estado del módem principal a "EN USO"
      if (envio.modemPrincipal?.id) {
        await updateModemStatus(envio.modemPrincipal.id, "EN USO")
      }

      // Actualizar el estado del módem secundario a "EN USO" si existe
      if (envio.modemSecundario?.id) {
        await updateModemStatus(envio.modemSecundario.id, "EN USO")
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Envío creado correctamente y módem(s) actualizado(s)",
      })

      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error("Error al crear el envío:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el envío",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="p-3"
      style={{
        color: "black",
        backgroundColor: "white",
        borderRadius: "0.6rem",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Farmacia Destino</Form.Label>
              <Form.Control type="text" value={farmacia?.nombre || ""} disabled readOnly className="bg-light" />
              <Form.Text className="text-muted">
                {farmacia?.direccion || ""} - {farmacia?.ciudad?.nombre_ciudad || ""}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label htmlFor="modemPrincipal" className="form-label">
                Módem Principal*
              </Form.Label>
              <Form.Select
                name="modemPrincipal"
                value={envio.modemPrincipal?.id || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un módem</option>
                {modems.map((modem) => (
                  <option key={modem.id} value={modem.id}>
                    {modem.marca} - {modem.modelo} (Serie: {modem.numero_serie}) - {modem.proveedorInternet.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label htmlFor="modemSecundario" className="form-label">
                Módem Secundario (Opcional)
              </Form.Label>
              <Form.Select name="modemSecundario" value={envio.modemSecundario?.id || ""} onChange={handleInputChange}>
                <option value="">Ninguno</option>
                {modems
                  .filter((modem) => modem.id !== envio.modemPrincipal?.id)
                  .map((modem) => (
                    <option key={modem.id} value={modem.id}>
                      {modem.marca} - {modem.modelo} (Serie: {modem.numero_serie}) - {modem.proveedorInternet.nombre}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fecha de Envío*</Form.Label>
              <Form.Control
                type="date"
                name="fecha_envio"
                value={envio.fecha_envio ? new Date(envio.fecha_envio).toISOString().split("T")[0] : ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Costo de Envío*</Form.Label>
              <div className="input-group">
                <div className="input-group-text">$</div>
                <Form.Control
                  type="number"
                  name="costo_envio"
                  value={envio.costo_envio}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Estado del Envío*</Form.Label>
              <Form.Select name="estado_envio" value={envio.estado_envio} onChange={handleInputChange} required>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN CAMINO">EN CAMINO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="DEVUELTO">DEVUELTO</option>
              </Form.Select>
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
            className="btn btn-secondary m-2 p-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Procesando...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>
                ENVIAR
              </>
            )}
          </Button>
          <Button
            style={{
              backgroundColor: "#ffff",
              color: "#f6952c",
              borderColor: "#f6952c",
              cursor: "pointer",
            }}
            type="button"
            className="m-2 p-2"
            onClick={onClose}
            disabled={loading}
          >
            <i className="bi bi-x-circle me-2"></i>
            CANCELAR
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormularioEnvioM
