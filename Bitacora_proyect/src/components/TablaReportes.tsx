import React, { useState, useEffect } from 'react';
import { Table, Badge, FormControl, Pagination, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { TitlePage } from './TitlePage';
import { getReporte, deleteReporte} from '../servicios/reportesService'; // Asegúrate de que la ruta sea correcta
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
  const [reportes, setReportes] = useState<iReporte[]>([]); // Cambia 'any' por el tipo adecuado si tienes uno
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
    return reportes.filter(reporte => {    
      const IfFilterFecha = filterFecha === null || reporte.fecha.toLowerCase().includes(filterFecha.toLowerCase());
      const IfFilterFarmacia = filterFarmacia === null || reporte.farmacia.nombre.toLowerCase().includes(filterFarmacia.toLowerCase());
      const IfFilterFechaHoraInicio = filterFechaHoraInicio === null || reporte.fecha_hora_inicio.toLowerCase().includes(filterFechaHoraInicio.toLowerCase());
      const IfFilterFechaHoraFin = filterFechaHoraFin === null || reporte.fecha_hora_fin.toLowerCase().includes(filterFechaHoraFin.toLowerCase());
      const IfFilterDuracionIncidente = filterDuracionIncidente === null || reporte.duracion_incidente.toLowerCase().includes(filterDuracionIncidente.toLowerCase());
      const IfFilterProveedor = filterProveedor === null || reporte.farmacia.proveedor.nombre.toLowerCase().includes(filterProveedor.toLowerCase());
      const IfFilterMotivo = filterMotivo === null || reporte.motivo.motivo.toLowerCase().includes(filterMotivo.toLowerCase());
      const IfFilterEstado = filterEstado === null || reporte.estado.toLowerCase().includes(filterEstado.toLowerCase());

      return IfFilterFecha && IfFilterFarmacia && IfFilterFechaHoraInicio && IfFilterFechaHoraFin && IfFilterDuracionIncidente && IfFilterProveedor && IfFilterMotivo && IfFilterEstado
    })
  }

  // Paginación
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
      <TitlePage name="Reportes" />
      <section className='section'>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body style={{ overflowX: 'auto'}}>

              <Table className="table-hover text-center table-sm" style={{ fontSize: '13px', maxWidth: '100%' }}>
                  <thead className='text-center'>
                    <tr className='small'>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFecha ?? ''}
                          onChange={(e) => setFilterFecha(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        FECHA
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFarmacia ?? ''}
                          onChange={(e) => setFilterFarmacia(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        FARMACIA
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFechaHoraInicio ?? ''}
                          onChange={(e) => setFilterFechaHoraInicio(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        FECHA INICIO
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFechaHoraFin ?? ''}
                          onChange={(e) => setFilterFechaHoraFin(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        HORA INICIO
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFechaHoraInicio ?? ''}
                          onChange={(e) => setFilterFechaHoraInicio(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        FECHA FIN
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterFechaHoraFin ?? ''}
                          onChange={(e) => setFilterFechaHoraFin(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        HORA FIN
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterDuracionIncidente ?? ''}
                          onChange={(e) => setFilterDuracionIncidente(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        DURACIÓN
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterProveedor ?? ''}
                          onChange={(e) => setFilterProveedor(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        PROVEEDOR
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterMotivo ?? ''}
                          onChange={(e) => setFilterMotivo(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        MOTIVO
                      </th>
                      <th style={{ minWidth: "100px" }}>
                        <FormControl
                          type="text"
                          placeholder="Filtrar"
                          value={filterEstado ?? ''}
                          onChange={(e) => setFilterEstado(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                          size='sm'
                        />
                        ESTADO
                      </th>
                      <th className="text-center">
                        <button onClick={clearFilters} type="button" className="btn btn-sm btn-secondary me-2">
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
                        <td>{reporte.fecha}</td>
                        <td>{reporte.farmacia.nombre}</td>
                        <td>{format(reporte.fecha_hora_inicio, 'yyyy-MM-dd')}</td>
                        <td>{format(reporte.fecha_hora_inicio, 'HH:mm:ss')}</td>
                        <td>{format(reporte.fecha_hora_fin, 'yyyy-MM-dd')}</td>
                        <td>{format(reporte.fecha_hora_fin, 'HH:mm:ss')}</td>
                        <td>{reporte.duracion_incidente}</td>
                        <td>{reporte.farmacia.proveedor.nombre}</td>
                        <td>{reporte.motivo?.motivo || "Sin motivo"}</td>
                        <td>
                          <Badge bg={reporte.estado === 'ABIERTO' ? 'success' : 'danger'}>
                            {reporte.estado}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ fontSize: '12px' }}
                              onClick={() => handleDelete(reporte.id)}
                            >
                              <i className='bi bi-trash-fill' />
                            </button>
                            <button type="button" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                              <Link to={`/EditarReporte/${reporte.id}`}>
                                <i className='bi bi-pencil-square' style={{ color: 'white' }} />
                              </Link>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Paginación */}
      <Pagination className="custom-pagination">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </>
  );
};

export default ReporteTable;
