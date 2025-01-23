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
    farmacia: {
        id: number;
        nombre: string;
    };
    proveedorInternet: {
        id: number;
        nombre: string;
    };
    numero: number;
    isDeleted: boolean;
}

const ModemsTable: React.FC = () => {
    const [modems, setModems] = useState<iModems[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtros
    const [filterEstado, setFilterEstado] = useState<string>('');
    const [filterMarca, setFilterMarca] = useState<string>('');
    const [filterModelo, setFilterModelo] = useState<string>('');
    const [filterNumeroSerie, setFilterNumeroSerie] = useState<string>('');
    const [filterUbicacion, setFilterUbicacion] = useState<string>('');
    const [filterOperador, setFilterOperador] = useState<string>('');
    const [filterNumero, setFilterNumero] = useState<string>('');

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
                setError('Error al cargar el listado de Módems');
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

    const filteredModems = modems.filter(modem => {
        const matchEstado = modem.estado?.toLowerCase().includes(filterEstado.toLowerCase());
        const matchOperador = modem.proveedorInternet?.nombre.toLowerCase().includes(filterOperador.toLowerCase());
        const matchMarca = modem.marca?.toLowerCase().includes(filterMarca.toLowerCase());
        const matchModelo = modem.modelo?.toLowerCase().includes(filterModelo.toLowerCase());
        const matchNumeroSerie = modem.numero_serie?.toLowerCase().includes(filterNumeroSerie.toLowerCase());
        const matchUbicacion = modem.farmacia?.nombre.toLowerCase().includes(filterUbicacion.toLowerCase());
        const matchNumero = modem.numero?.toString().includes(filterNumero);

        return matchEstado && matchOperador && matchMarca && matchModelo && 
            matchNumeroSerie && matchUbicacion && matchNumero;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentModems = filteredModems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredModems.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const clearFilters = () => {
        setFilterEstado('');
        setFilterMarca('');
        setFilterModelo('');
        setFilterNumeroSerie('');
        setFilterUbicacion('');
        setFilterOperador('');
        setFilterNumero('');
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
                setModems(prevModems => prevModems.filter(modem => modem.id !== id));

                Swal.fire(
                    '¡Eliminado!',
                    'El Módem ha sido eliminado.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el Módem'
            });
        }
    };

    return (
        <>
            <div className='p-2' style={{ backgroundColor: '#ffff' }}>
                <div className='table-responsive' style={{ maxHeight: '50vh' }}>
                    <table className='table table-hover text-nowrap'>
                        <thead>
                            <tr>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar marca"
                                        value={filterMarca}
                                        onChange={(e) => setFilterMarca(e.target.value)}
                                    />
                                    MARCA
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar modelo"
                                        value={filterModelo}
                                        onChange={(e) => setFilterModelo(e.target.value)}
                                    />
                                    MODELO
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar serial"
                                        value={filterNumeroSerie}
                                        onChange={(e) => setFilterNumeroSerie(e.target.value)}
                                    />
                                    SERIAL
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar ubicación"
                                        value={filterUbicacion}
                                        onChange={(e) => setFilterUbicacion(e.target.value)}
                                    />
                                    UBICACIÓN
                                </th>
                                <th>
                                    <FormControl
                                        size='sm'
                                        type='text'
                                        placeholder='Filtrar operador'
                                        value={filterOperador}
                                        onChange={(e) => setFilterOperador(e.target.value)}
                                    />
                                    OPERADOR
                                </th>
                                <th>
                                    <FormControl
                                        size='sm'
                                        type='text'
                                        placeholder='Filtrar número'
                                        value={filterNumero}
                                        onChange={(e) => setFilterNumero(e.target.value)}
                                    />
                                    NÚMERO
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar estado"
                                        value={filterEstado}
                                        onChange={(e) => setFilterEstado(e.target.value)}
                                    />
                                    ESTADO
                                </th>
                                <th className="text-center">
                                    <button 
                                        className="btn btn-light btn-sm"
                                        style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} 
                                        onClick={clearFilters}
                                    >
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
                                    <td>{modem.modelo}</td>
                                    <td>{modem.numero_serie}</td>
                                    <td>{modem.farmacia?.nombre}</td>
                                    <td>{modem.proveedorInternet?.nombre}</td>
                                    <td>{modem.numero}</td>
                                    <td>
                                        <Badge bg={modem.estado === 'DISPONIBLE' ? 'success' : 'danger'}>
                                            {modem.estado}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end btn-group">
                                            <Link 
                                                to={`/EditarModem/${modem.id}`} 
                                                className="btn btn-light btn-sm"
                                                style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                                            >
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
            <Card.Footer style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#ffff' }}>
                <ul className="pagination pagination-sm">
                    <li className={`m-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                            onClick={() => handlePageChange(1)}
                        >
                            <i className="bi bi-chevron-double-left"></i>
                        </button>
                    </li>
                    <li className={`m-1 page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </li>
                    <li className="m-1 page-item active">
                        <span 
                            className="page-link" 
                            style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                        >
                            {currentPage}
                        </span>
                    </li>
                    <li className={`m-1 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </li>
                    <li className={`m-1 page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                            onClick={() => handlePageChange(totalPages)}
                        >
                            <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </li>
                </ul>
            </Card.Footer>
        </>
    );
};

export default ModemsTable;