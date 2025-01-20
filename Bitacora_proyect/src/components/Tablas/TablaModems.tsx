import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getModems, deleteModems } from '../../servicios/modemService';

interface iModems {
    id: number;
    estado: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    ubicacion: {
        id: number;
        achobanda: string;
        coordenadas: string;
        direccion: string;
        nombre: string;
        pertenece: string;
        canal_transmision: {
            id: number;
            nombre: string;
        }
        ciudad: {
            id: number;
            nombre_ciudad: string;
            departamento: {
                id: number;
                nombre_departamento: string;
            }
        }
        proveedorInternet: {
            id: number;
            nombre: string;
            nombre_contacto: string;
            numero_contacto: number;
            nit: number;
            correo: string;
            estado: string;
            isDeleted: false;
            observacion: null;
            fecha_contratacion: null;
        }
        regente: null;
        canalTransmision: {
            id: number;
            nombre: string;
        }
    }
    observacion: string;
}


const ModemsTable: React.FC = () => {
    const [modems, setModems] = useState<iModems[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtros
    const [filterEstado, setFilterEstado] = useState<string | null>(null);
    const [filterMarca, setFilterMarca] = useState<string | null>(null);
    const [filterModelo, setFilterModelo] = useState<string | null>(null);
    const [filterNumeroSerie, setFilterNumeroSerie] = useState<string | null>(null);
    const [filterUbicacion, setFilterUbicacion] = useState<string | null>(null);

    useEffect(() => {
        const loadModems = async () => {
            try {
                Swal.fire({
                    title: 'Cargando tabla...',
                    html: 'Por favor espera un momento.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                const data = await getModems();
                setModems(data);
            } catch (error) {
                setError('Error al cargar el listado de Modems');
                console.error(error);
            } finally {
                setLoading(false);
                Swal.close();
            }
        };

        loadModems();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;


    const filteredModems = () => {
        const filtered = modems.filter(modem => {
            const IfFilterEstado = filterEstado === null || modem.estado.toLowerCase().includes(filterEstado.toLowerCase());
            const IfFilterMarca = filterMarca === null || modem.marca.toLowerCase().includes(filterMarca.toLowerCase());
            const IfFilterModelo = filterModelo === null || modem.modelo.toLowerCase().includes(filterModelo.toLowerCase());
            const IfFilterNumeroSerie = filterNumeroSerie === null || modem.numero_serie.toLowerCase().includes(filterNumeroSerie.toLowerCase());
            const IfFilterUbicacion = filterUbicacion === null || modem.ubicacion.toLowerCase().includes(filterUbicacion.toLowerCase());
            

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
            <div className='p-2' style={{ backgroundColor: '#ffff', borderBlockEndColor: '10px' }}>
                <div className='table-responsive hv-100' style={{ maxHeight: '50vh' }} >
                    <table className='table table-hover text-nowrap'>
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
                                    <button style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={clearFilters} type="button" className="btn btn-light btn-sm">
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
                                        <div className="d-flex justify-content-end btn-group" role="group">

                                            <Link to={`/EditarReporte/${reporte.id}`} className="btn btn-light btn-sm" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(1)}>
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-sm"
                                                style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                                                onClick={() => handleDelete(reporte.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Card.Footer style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#ffff', borderBottom: '20px' }}>
                <ul className="pagination pagination-sm" >
                    <li className={`m-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(1)}>
                            <i className="bi bi-chevron-double-left"></i>
                        </button>
                    </li>
                    <li className={`m-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(currentPage - 1)}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </li>
                    <li className=" m-1 page-item active">
                        <span className="page-link" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}>{currentPage}</span>
                    </li>
                    <li className={` m-1 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(currentPage + 1)}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </li>
                    <li className={` m-1 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(totalPages)}>
                            <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </li>
                </ul>
            </Card.Footer>

        </>
    );
};

export default ReporteTable;

