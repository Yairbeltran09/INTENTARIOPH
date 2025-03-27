"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createReporte } from "../../servicios/reportesService"
import { getFarmacias } from "../../servicios/farmaciaService"
import { getMotivos } from "../../servicios/motivoreporteService"
import Swal from "sweetalert2"

interface IFarmacia {
  id: number
  nombre: string
  proveedor: {
    id: number
    nombre: string
  }
}

interface IMotivo {
  id: number
  motivo: string
}

interface IReporte {
  fecha: string
  farmacia: any
  fecha_hora_inicio: string
  duracion_incidente: string
  proveedor: string
  motivo: any
  estado: string
  observacion: string
  isDeleted: boolean
}

const CrearReporte: React.FC = () => {
  const navigate = useNavigate()
  const [farmacias, setFarmacias] = useState<IFarmacia[]>([])
  const [motivos, setMotivos] = useState<IMotivo[]>([])
  const [filterFarmacia, setFilterFarmacia] = useState("")
  const [filterMotivo, setFilterMotivo] = useState("")
  const [showFarmacias, setShowFarmacias] = useState(false)
  const [showMotivos, setShowMotivos] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)

  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const [reporte, setReporte] = useState<IReporte>({
    fecha: new Date().toISOString().split("T")[0],
    farmacia: null,
    fecha_hora_inicio: getCurrentDateTime(),
    duracion_incidente: "",
    proveedor: "",
    motivo: null,
    estado: "ABIERTO",
    observacion: "",
    isDeleted: false,
  })

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [farmaciasData, motivosData] = await Promise.all([getFarmacias(), getMotivos()])
        setFarmacias(farmaciasData)
        setMotivos(motivosData)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al cargar los datos necesarios",
        })
      }
    }
    cargarDatos()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "farmacia") {
      const farmaciaSeleccionada = farmacias.find((f) => f.id === Number.parseInt(value))
      setReporte((prev) => ({
        ...prev,
        farmacia: farmaciaSeleccionada,
        proveedor: farmaciaSeleccionada?.proveedor?.nombre || "",
      }))
    } else if (name === "motivo") {
      const motivoSeleccionado = motivos.find((m) => m.id === Number.parseInt(value))
      setReporte((prev) => ({
        ...prev,
        motivo: motivoSeleccionado,
      }))
    } else {
      setReporte((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const filteredFarmacias = farmacias.filter((farmacia) =>
    farmacia.nombre.toLowerCase().includes(filterFarmacia.toLowerCase()),
  )

  const filteredMotivos = motivos.filter((motivo) => motivo.motivo.toLowerCase().includes(filterMotivo.toLowerCase()))

  const handleSelectFarmacia = (farmaciaId, farmaciaNombre) => {
    handleInputChange({ target: { name: "farmacia", value: farmaciaId } })
    setFilterFarmacia(farmaciaNombre)
    setShowFarmacias(false)
  }

  const handleSelectMotivo = (motivoId, motivoNombre) => {
    handleInputChange({ target: { name: "motivo", value: motivoId } })
    setFilterMotivo(motivoNombre)
    setShowMotivos(false)
  }

  const handleReset = () => {
    setReporte({
      fecha: new Date().toISOString().split("T")[0],
      farmacia: null,
      fecha_hora_inicio: getCurrentDateTime(),
      duracion_incidente: "",
      proveedor: "",
      motivo: null,
      estado: "ABIERTO",
      observacion: "",
      isDeleted: false,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reporte.farmacia || !reporte.motivo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, seleccione una farmacia y un motivo",
      })
      return
    }

    try {
      // Actualiza la fecha y hora justo antes de enviar
      const reporteActualizado = {
        ...reporte,
        fecha: new Date().toISOString().split("T")[0],
        fecha_hora_inicio: getCurrentDateTime(),
      }

      await createReporte(reporteActualizado)
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Reporte creado correctamente",
      }).then(() => {
        // Actualiza la página después de cerrar el mensaje de éxito
        window.location.reload()
      })

      // No es necesario el handleReset ni el navigate ya que vamos a recargar la página
    } catch (error) {
      console.error("Error al crear reporte:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al crear el reporte",
      })
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
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Farmacia Selector */}
        <div className="col-md-6">
          <label htmlFor="farmacia" className="form-label">
            Farmacia*
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Seleccione una farmacia..."
            value={filterFarmacia}
            onChange={(e) => setFilterFarmacia(e.target.value)}
            onFocus={() => setShowFarmacias(true)}
            onBlur={() => setTimeout(() => setShowFarmacias(false), 200)}
          />
          {showFarmacias && (
            <ul
              className="list-group mt-1 position-absolute"
              style={{
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
                width: "auto",
              }}
            >
              {filteredFarmacias.map((farmacia) => (
                <li
                  key={farmacia.id}
                  className="list-group-item list-group-item-action border-0"
                  onClick={() => handleSelectFarmacia(farmacia.id, farmacia.nombre)}
                  style={{ cursor: "pointer" }}
                >
                  {farmacia.nombre}
                </li>
              ))}
              {filteredFarmacias.length === 0 && (
                <li className="list-group-item text-muted">No se encontraron farmacias</li>
              )}
            </ul>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="proveedor" className="form-label">
            Proveedor
          </label>
          <input type="text" className="form-control" name="proveedor" value={reporte.proveedor} disabled />
        </div>

        {/* Motivo Selector */}
        <div className="col-md-6">
          <label htmlFor="motivo" className="form-label">
            Motivo*
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Seleccione un motivo..."
            value={filterMotivo}
            onChange={(e) => setFilterMotivo(e.target.value)}
            onFocus={() => setShowMotivos(true)}
            onBlur={() => setTimeout(() => setShowMotivos(false), 200)}
          />
          {showMotivos && (
            <ul
              className="list-group mt-1 position-absolute"
              style={{
                zIndex: 10,
                maxHeight: "auto",
                overflowY: "auto",
                width: "auto",
              }}
            >
              {filteredMotivos.map((motivo) => (
                <li
                  key={motivo.id}
                  className="list-group-item list-group-item-action border-0"
                  onClick={() => handleSelectMotivo(motivo.id, motivo.motivo)}
                  style={{ cursor: "pointer" }}
                >
                  {motivo.motivo}
                </li>
              ))}
              {filteredMotivos.length === 0 && (
                <li className="list-group-item text-muted">No se encontraron motivos</li>
              )}
            </ul>
          )}
        </div>

        {/* Observación */}
        <div className="col-12">
          <label htmlFor="observacion" className="form-label">
            Observación
          </label>
          <textarea
            className="form-control"
            id="observacion"
            name="observacion"
            value={reporte.observacion}
            onChange={handleInputChange}
          />
        </div>

        <div className="text-center">
          <button
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
            className="btn btn-secondary m-2"
          >
            <i className="bi bi-floppy m-1" />
            GUARDAR
          </button>
          <button
            style={{
              backgroundColor: isHovered ? "#f6952c" : "#ffff",
              color: isHovered ? "#fff" : "#f6952c",
              borderColor: "#f6952c",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            <i className="bi bi-trash-fill m-1" />
            LIMPIAR
          </button>
        </div>
      </form>
    </div>
  )
}

export default CrearReporte

