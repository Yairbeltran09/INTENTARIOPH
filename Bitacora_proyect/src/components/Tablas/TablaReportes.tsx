import React, { useState, useEffect } from 'react';
import { Table, Badge, FormControl, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getReporte, deleteReporte } from '../../servicios/reportesService';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface iReporte {
  "id": number,
  "fecha": string,
  "ano": number,
  "mes": number,
  "radicado": string,
  "farmacia": {
    "id": number,
    "nombre": string,
    "coordenadas": string,
    "direccion": string,
    "anchoBAnda": string,
    "ciudad": {
      "id": number,
      "nombre_ciudad": string,
      "departamento": {
        "id": number,
        "name_departamento": string
      }
    },
    "departamento": {
      "id": number,
      "name_departamento": string
    },
    "pertenece": string,
    "proveedorInternet": {
      "id": number,
      "nombre": string,
      "nombre_contacto": string,
      "numero_contacto": number,
      "nit": number,
      "correo": string,
      "estado": string,
      "isDeleted": false,
      "observacion": null,
      "fecha_contratacion": null
    },
    "regente": null,
    "canalTransmision": {
      "id": number,
      "nombre": string
    },
    "proveedor": {
      "id": number,
      "nombre": string,
      "nombre_contacto": string,
      "numero_contacto": number,
      "nit": number,
      "correo": string,
      "estado": string,
      "isDeleted": boolean,
      "observacion": string,
      "fecha_contratacion": string
    }
  },
  "fecha_hora_inicio": string,
  "fecha_hora_fin": string,
  "duracion_incidente": string,
  "estado": string,
  "motivo": {
    "id": number,
    "motivo": string
  },
  "observacion": string
}

const ReporteTable: React.FC = () => {
  const [reportes, setReportes] = useState<iReporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filtros
  const [filterFecha, setFilterFecha] = useState<string | null>(null);
  const [filterFarmacia, setFilterFarmacia] = useState<string | null>(null);
  const [filterFechaHoraInicio, setFilterFechaHoraInicio] = useState<string | null>(null);
  const [filterFechaHoraFin, setFilterFechaHoraFin] = useState<string | null>(null);
  const [filterDuracionIncidente, setFilterDuracionIncidente] = useState<string | null>(null);
  const [filterProveedor, setFilterProveedor] = useState<string | null>(null);
  const [filterMotivo, setFilterMotivo] = useState<string | null>(null);
  const [filterEstado, setFilterEstado] = useState<string | null>(null);

  useEffect(() => {
    const loadReportes = async () => {
      try {
        Swal.fire({
          title: 'Cargando tabla...',
          html: 'Por favor espera un momento.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const data = await getReporte();
        setReportes(data);
      } catch (error) {
        setError('Error al cargar el listado de reportes');
        console.error(error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    loadReportes();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Filtrar reportes
  const filteredReportes = () => {
    const filtered = reportes.filter(reporte => {
      const IfFilterFecha = filterFecha === null || reporte.fecha.toLowerCase().includes(filterFecha.toLowerCase());
      const IfFilterFarmacia = filterFarmacia === null || reporte.farmacia.nombre.toLowerCase().includes(filterFarmacia.toLowerCase());
      const IfFilterFechaHoraInicio = filterFechaHoraInicio === null || reporte.fecha_hora_inicio.toLowerCase().includes(filterFechaHoraInicio.toLowerCase());
      const IfFilterFechaHoraFin = filterFechaHoraFin === null || reporte.fecha_hora_fin.toLowerCase().includes(filterFechaHoraFin.toLowerCase());
      const IfFilterDuracionIncidente = filterDuracionIncidente === null || reporte.duracion_incidente.toLowerCase().includes(filterDuracionIncidente.toLowerCase());
      const IfFilterProveedor = filterProveedor === null || reporte.farmacia.proveedor.nombre.toLowerCase().includes(filterProveedor.toLowerCase());
      const IfFilterMotivo = filterMotivo === null || reporte.motivo.motivo.toLowerCase().includes(filterMotivo.toLowerCase());
      const IfFilterEstado = filterEstado === null || reporte.estado.toLowerCase().includes(filterEstado.toLowerCase());

      return IfFilterFecha && IfFilterFarmacia && IfFilterFechaHoraInicio && IfFilterFechaHoraFin && IfFilterDuracionIncidente && IfFilterProveedor && IfFilterMotivo && IfFilterEstado;
    });
    return filtered.reverse();
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReportes = filteredReportes().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReportes().length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setFilterDuracionIncidente('');
    setFilterEstado('');
    setFilterFarmacia('');
    setFilterFecha('');
    setFilterFechaHoraFin('');
    setFilterFechaHoraInicio('');
    setFilterMotivo('');
    setFilterProveedor('');
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await deleteReporte(id);
        setReportes(reportes.filter(reporte => reporte.id !== id));

        Swal.fire(
          '¡Eliminado!',
          'El reporte ha sido eliminado.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el reporte'
      });
    }
  };

  return (
    <>

      <div className="col-lg-12">
        <Card className="stretch stretch-full">
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead>
                  <tr>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar fecha"
                        value={filterFecha ?? ''}
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
                        value={filterFarmacia ?? ''}
                        onChange={(e) => setFilterFarmacia(e.target.value)}
                      />
                      Farmacia
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar inicio"
                        value={filterFechaHoraInicio ?? ''}
                        onChange={(e) => setFilterFechaHoraInicio(e.target.value)}
                      />
                      Fecha/Hora Inicio
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar fin"
                        value={filterFechaHoraFin ?? ''}
                        onChange={(e) => setFilterFechaHoraFin(e.target.value)}
                      />
                      Fecha/Hora Fin
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar duración"
                        value={filterDuracionIncidente ?? ''}
                        onChange={(e) => setFilterDuracionIncidente(e.target.value)}
                      />
                      Duración
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar proveedor"
                        value={filterProveedor ?? ''}
                        onChange={(e) => setFilterProveedor(e.target.value)}
                      />
                      Proveedor
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar motivo"
                        value={filterMotivo ?? ''}
                        onChange={(e) => setFilterMotivo(e.target.value)}
                      />
                      Motivo
                    </th>
                    <th>
                      <FormControl
                        size="sm"
                        type="text"
                        placeholder="Filtrar estado"
                        value={filterEstado ?? ''}
                        onChange={(e) => setFilterEstado(e.target.value)}
                      />
                      Estado
                    </th>
                    <th className="text-center">
                      <button onClick={clearFilters} type="button" className="btn btn-light btn-sm">
                        <i className='bi bi-brush' />
                      </button>
                      <span style={{ display: 'block', marginTop: '4px' }}>
                        Acciones
                      </span>
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
                        <div>{format(new Date(reporte.fecha_hora_inicio), 'yyyy-MM-dd')}</div>
                        <small className="text-muted">{format(new Date(reporte.fecha_hora_inicio), 'HH:mm:ss')}</small>
                      </td>
                      <td>
                        <div>{format(new Date(reporte.fecha_hora_fin), 'yyyy-MM-dd')}</div>
                        <small className="text-muted">{format(new Date(reporte.fecha_hora_fin), 'HH:mm:ss')}</small>
                      </td>
                      <td>{reporte.duracion_incidente}</td>
                      <td>
                        <div>{reporte.farmacia.proveedor.nombre}</div>
                        <small className="text-muted">NIT: {reporte.farmacia.proveedor.nit}</small>
                      </td>
                      <td>{reporte.motivo?.motivo || "Sin motivo"}</td>
                      <td>
                        <Badge bg={reporte.estado === 'ABIERTO' ? 'success' : 'danger'} className="rounded-pill">
                          {reporte.estado}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <Link to={`/EditarReporte/${reporte.id}`} className="btn btn-light btn-sm">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => handleDelete(reporte.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
          <Card.Footer>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link text-dark bg-white border-secondary" onClick={() => handlePageChange(1)}>
                  <i className="bi bi-chevron-double-left"></i>
                </button>
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link text-dark bg-white border-secondary" onClick={() => handlePageChange(currentPage - 1)}>
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link text-dark bg-light border-secondary">{currentPage}</span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link text-dark bg-white border-secondary" onClick={() => handlePageChange(currentPage + 1)}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link text-dark bg-white border-secondary" onClick={() => handlePageChange(totalPages)}>
                  <i className="bi bi-chevron-double-right"></i>
                </button>
              </li>
            </ul>
          </Card.Footer>

        </Card>
      </div>
    </>
  );
};

export default ReporteTable;