import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
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
    operador: {
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
    numero: number;
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
    const [filterOperador, setOperador] = useState<string | null>(null);
    const [filterNumero, setNumero] = useState<string | null>(null);

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
            const IfFilterEstado = !filterEstado || modem.estado?.toString().toLowerCase().includes(filterEstado.toLowerCase());
            const IfFilterOperador = !filterOperador || modem.operador?.toString().toLowerCase().includes(filterOperador.toLowerCase());
            const IfFilterMarca = !filterMarca || modem.marca?.toString().toLowerCase().includes(filterMarca.toLowerCase());
            const IfFilterModelo = !filterModelo || modem.modelo?.toString().toLowerCase().includes(filterModelo.toLowerCase());
            const IfFilterNumeroSerie = !filterNumeroSerie || modem.numero_serie?.toString().toLowerCase().includes(filterNumeroSerie.toLowerCase());
            const IfFilterUbicacion = !filterUbicacion || modem.ubicacion?.toString().toLowerCase().includes(filterUbicacion.toLowerCase());
            const IfFilterNumero = !filterNumero || modem.numero?.toString().toLowerCase().includes(filterNumero.toLowerCase());

            return IfFilterEstado && IfFilterMarca && IfFilterModelo && IfFilterNumeroSerie && IfFilterUbicacion && IfFilterOperador && IfFilterNumero;
        });
        return [...filtered].reverse();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentModems = filteredModems().slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredModems().length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const clearFilters = () => {

        setFilterEstado('');
        setFilterMarca('');
        setFilterModelo('');
        setFilterNumeroSerie('');
        setFilterUbicacion('');
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
                await deleteModems(id);
                setModems(modems.filter(modem => modem.id !== id));

                Swal.fire(
                    '¡Eliminado!',
                    'El Modem ha sido eliminado.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el Modem'
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
                                        placeholder="Filtrar"
                                        value={filterMarca ?? ''}
                                        onChange={(e) => setFilterMarca(e.target.value)}
                                        className="form-control-sm"
                                    />
                                    MARCA
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar"
                                        value={filterModelo ?? ''}
                                        onChange={(e) => setFilterModelo(e.target.value)}
                                    />
                                    MODELO
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar"
                                        value={filterNumeroSerie ?? ''}
                                        onChange={(e) => setFilterNumeroSerie(e.target.value)}
                                    />
                                    SERIAL
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar"
                                        value={filterUbicacion ?? ''}
                                        onChange={(e) => setFilterUbicacion(e.target.value)}
                                    />
                                    UBICACION
                                </th>
                                <th>
                                    <FormControl
                                        size='sm'
                                        type='text'
                                        placeholder='Filtrar'
                                        value={filterOperador ?? ''}
                                        onChange={(e) => setOperador(e.target.value)}
                                    />
                                    OPERADOR
                                </th>
                                <th>
                                    <FormControl
                                        size='sm'
                                        type='number'
                                        placeholder='Filtrar'
                                        value={filterNumero ?? ''}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                    NUMERO
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar estado"
                                        value={filterEstado ?? ''}
                                        onChange={(e) => setFilterEstado(e.target.value)}
                                    />
                                    ESTADO
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
                            {currentModems.map((modem) => (
                                <tr key={modem.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div>{modem.marca}</div>
                                                <small className="text-muted">ID: {modem.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{modem.modelo}</div>
                                    </td>
                                    <td>
                                        <div>{modem.numero_serie}</div>

                                    </td>

                                    <td>
                                        <div>{modem.ubicacion?.nombre}</div>

                                    </td>
                                    <td>
                                        <div>{modem.operador?.nombre}</div>
                                    </td>
                                    <td>
                                        <div>{modem.numero}</div>
                                    </td>
                                    <td>
                                        <Badge bg={modem.estado === 'ACTIVO' ? 'success' : 'danger'} className="rounded-pill">
                                            {modem.estado}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end btn-group" role="group">

                                            <Link to={`/EditarModem/${modem.id}`} className="btn btn-light btn-sm" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(1)}>
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-sm"
                                                style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                                                onClick={() => handleDelete(modem.id)}
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

export default ModemsTable;

