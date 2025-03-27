"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge, FormControl, Card, Modal, Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { getReporte } from "../../servicios/reportesService"
import FormularioCrearR from "../FormulariosCrear/FormularioCrearR"
import FormularioEditarR from "../FormulariosEditar.tsx/FormularioEditarR"
import FormularioEnvioM from "../FormulariosCrear/FormularioEnvioM"
import { format } from "date-fns"

const ReporteTable: React.FC = () => {
  const [reportes, setReportes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtros
  const [filterFecha, setFilterFecha] = useState<string | null>(null)
  const [filterFarmacia, setFilterFarmacia] = useState<string | null>(null)
  const [filterFechaHoraInicio, setFilterFechaHoraInicio] = useState<string | null>(null)
  const [filterFechaHoraFin, setFilterFechaHoraFin] = useState<string | null>(null)
  const [filterDuracionIncidente, setFilterDuracionIncidente] = useState<string | null>(null)
  const [filterProveedor, setFilterProveedor] = useState<string | null>(null)
  const [filterMotivo, setFilterMotivo] = useState<string | null>(null)
  const [filterEstado, setFilterEstado] = useState<string | null>(null)

  // Modales
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [showEnvioModal, setShowEnvioModal] = useState(false)
  const [selectedReporteId, setSelectedReporteId] = useState<number | null>(null)

  const handleShow = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleShow2 = () => setShowModal2(true)
  const handleClose2 = () => setShowModal2(false)

  const handleShowEnvio = () => setShowEnvioModal(true)
  const handleCloseEnvio = () => setShowEnvioModal(false)

  useEffect(() => {
    const loadReportes = async () => {
      try {
        Swal.fire({
          title: "Cargando tabla...",
          html: "Por favor espera un momento.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        const data = await getReporte()
        setReportes(data)
      } catch (error) {
        setError("Error al cargar el listado de reportes")
        console.error(error)
      } finally {
        setLoading(false)
        Swal.close()
      }
    }

    loadReportes()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>

  // Filtrar reportes
  const filteredReportes = () => {
    // Normalizamos los filtros para evitar múltiples llamadas a toLowerCase()
    const normalizedFilterFecha = filterFecha?.toLowerCase() || '';
    const normalizedFilterFarmacia = filterFarmacia?.toLowerCase() || '';
    const normalizedFilterFechaHoraInicio = filterFechaHoraInicio?.toLowerCase() || '';
    const normalizedFilterFechaHoraFin = filterFechaHoraFin?.toLowerCase() || '';
    const normalizedFilterDuracionIncidente = filterDuracionIncidente?.toLowerCase() || '';
    const normalizedFilterProveedor = filterProveedor?.toLowerCase() || '';
    const normalizedFilterMotivo = filterMotivo?.toLowerCase() || '';
    const normalizedFilterEstado = filterEstado?.toLowerCase() || '';

    const filtered = reportes.filter((reporte) => {
        if (
            (filterFecha && !reporte?.fecha?.toLowerCase().includes(normalizedFilterFecha)) ||
            (filterFarmacia && !reporte?.farmacia?.nombre?.toLowerCase().includes(normalizedFilterFarmacia)) ||
            (filterFechaHoraInicio && !reporte?.fecha_hora_inicio?.toLowerCase().includes(normalizedFilterFechaHoraInicio)) ||
            (filterFechaHoraFin && !reporte?.fecha_hora_fin?.toLowerCase().includes(normalizedFilterFechaHoraFin)) ||
            (filterDuracionIncidente && !reporte?.duracion_incidente?.toLowerCase().includes(normalizedFilterDuracionIncidente)) ||
            (filterProveedor && !reporte?.farmacia?.proveedor?.nombre?.toLowerCase().includes(normalizedFilterProveedor)) ||
            (filterMotivo && !reporte?.motivo?.motivo?.toLowerCase().includes(normalizedFilterMotivo)) ||
            (filterEstado && !reporte?.estado?.toLowerCase().includes(normalizedFilterEstado))
        ) {
            return false;
        }
        return true;
    });

    return filtered.reverse();
};


  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentReportes = filteredReportes().slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredReportes().length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const clearFilters = () => {
    setFilterDuracionIncidente('');
    setFilterEstado('');
    setFilterFarmacia('');
    setFilterFecha('');
    setFilterFechaHoraFin('');
    setFilterFechaHoraInicio('');
    setFilterMotivo('');
    setFilterProveedor('');
  }



  return (
    <>
      {/* Modal para Crear Reporte */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioCrearR />
        </Modal.Body>
      </Modal>

      {/* Modal para Editar Reporte */}
      <Modal show={showModal2} onHide={handleClose2} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Editar Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReporteId && (
            <FormularioEditarR
              reporteId={selectedReporteId}
              onClose={handleClose2}
              onSuccess={() => {
                const loadReportes = async () => {
                  try {
                    const data = await getReporte()
                    setReportes(data)
                  } catch (error) {
                    console.error("Error al recargar reportes:", error)
                  }
                }
                loadReportes()
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Modal para Enviar Modem */}
      <Modal show={showEnvioModal} onHide={handleCloseEnvio} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Enviar Modem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReporteId && (
            <FormularioEnvioM
              farmacia={reportes.find((r) => r.id === selectedReporteId)?.farmacia}
              onClose={handleCloseEnvio}
            />
          )}
        </Modal.Body>
      </Modal>

      <div className="d-flex align-items-center" style={{ color: "black" }}>
        <div className="pagetitle">
          <h1>Reportes</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Inicio</li>
              <li className="breadcrumb-item active">Farmacias</li>
            </ol>
          </nav>
        </div>
        <div className="ms-auto">
          <Button title="crear nuevo reporte" onClick={handleShow} className="btn" style={{ backgroundColor: "#f6952c", borderColor: "#f6952c" }}>
            <i className="bi bi-plus-circle-fill me-2"></i> Nuevo Reporte
          </Button>
        </div>
      </div>

      <div className="p-2" style={{ backgroundColor: "#ffff", borderBlockEndColor: "10px" }}>
        <div className="table-responsive hv-100" style={{ maxHeight: "50vh" }}>
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>
                  <FormControl
                    size="sm"
                    type="date"
                    placeholder="Filtrar fecha"
                    value={filterFecha ?? ""}
                    onChange={(e) => setFilterFecha(e.target.value)}
                    className="form-control-sm"
                  />
                  Fecha
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar farmacia"
                    value={filterFarmacia ?? ""}
                    onChange={(e) => setFilterFarmacia(e.target.value)}
                  />
                  Farmacia
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar inicio"
                    value={filterFechaHoraInicio ?? ""}
                    onChange={(e) => setFilterFechaHoraInicio(e.target.value)}
                  />
                  Fecha/Hora Inicio
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar fin"
                    value={filterFechaHoraFin ?? ""}
                    onChange={(e) => setFilterFechaHoraFin(e.target.value)}
                  />
                  Fecha/Hora Fin
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar duración"
                    value={filterDuracionIncidente ?? ""}
                    onChange={(e) => setFilterDuracionIncidente(e.target.value)}
                  />
                  Duración
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar proveedor"
                    value={filterProveedor ?? ""}
                    onChange={(e) => setFilterProveedor(e.target.value)}
                  />
                  Proveedor
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar motivo"
                    value={filterMotivo ?? ""}
                    onChange={(e) => setFilterMotivo(e.target.value)}
                  />
                  Motivo
                </th>
                <th>
                  <select
                    className="form-select"
                    id="pertenece"
                    className="form-select"
                    required
                    value={filterEstado ?? ""}
                    onChange={(e) => setFilterEstado(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="PHARMASER">ABIERTO</option>
                    <option value="CONSORCIO">CERRADO</option>
                  </select>
                  Estado
                </th>
                <th className="text-center">
                  <button
                    title="Limpiar filtros"
                    style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
                    onClick={clearFilters}
                    type="button"
                    className="btn btn-light btn-sm"
                  >
                    <i className="bi bi-brush" />
                  </button>
                  <span style={{ display: "block", marginTop: "4px", paddingBottom: "10px" }}></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentReportes.map((reporte) => (
                <tr key={reporte.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <div>{reporte.fecha}</div>
                        <small className="text-muted">ID: {reporte.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{reporte.farmacia.nombre}</div>
                  </td>
                  <td>
                    <div>{format(new Date(reporte.fecha_hora_inicio), "yyyy-MM-dd")}</div>
                    <small className="text-muted">{format(new Date(reporte.fecha_hora_inicio), "HH:mm:ss")}</small>
                  </td>
                  <td>
                    <div>{format(new Date(reporte.fecha_hora_fin), "yyyy-MM-dd")}</div>
                    <small className="text-muted">{format(new Date(reporte.fecha_hora_fin), "HH:mm:ss")}</small>
                  </td>
                  <td>{reporte.duracion_incidente}</td>
                  <td>
                    <div>{reporte.farmacia.proveedor.nombre}</div>
                    <small className="text-muted">NIT: {reporte.farmacia.proveedor.nit}</small>
                  </td>
                  <td>{reporte.motivo?.motivo || "Sin motivo"}</td>
                  <td>
                    <Badge bg={reporte.estado === "ABIERTO" ? "success" : "danger"} className="rounded-pill">
                      {reporte.estado}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end btn-group" role="group">
                      <button
                        title="Ver reporte"
                        className="btn btn-light btn-sm"
                        style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
                        onClick={() => {
                          setSelectedReporteId(reporte.id)
                          handleShow2()
                        }}
                      >
                        <i className="bi bi-search"></i>
                      </button>
                      <button
                        title="Enviar Modem"
                        className="btn btn-sm"

                        style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
                        onClick={() => {
                          setSelectedReporteId(reporte.id)
                          handleShowEnvio()
                        }}
                      >

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-router"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                          <path d="M17 17l0 .01" />
                          <path d="M13 17l0 .01" />
                          <path d="M15 13l0 -2" />
                          <path d="M11.75 8.75a4 4 0 0 1 6.5 0" />
                          <path d="M8.5 6.5a8 8 0 0 1 13 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Card.Footer
        style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "#ffff", borderBottom: "20px" }}
      >
        <ul className="pagination pagination-sm">
          <li className={`m-1 page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
              onClick={() => handlePageChange(1)}
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>
          <li className={`m-1 page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
          <li className=" m-1 page-item active">
            <span className="page-link" style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}>
              {currentPage}
            </span>
          </li>
          <li className={` m-1 page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
          <li className={` m-1 page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{ backgroundColor: "#ffb361", color: "#fff", borderColor: "#ffb361" }}
              onClick={() => handlePageChange(totalPages)}
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>
        </ul>
      </Card.Footer>
    </>
  )
}

export default ReporteTable

