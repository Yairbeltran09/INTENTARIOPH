import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Card, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getBaseRefrigeradora, deleteBaseRefrigeradora } from '../../servicios/BaseRefrigeradoraService';
import FormularioEditarP from '../FormulariosEditar.tsx/FormularioEditarP';

const TablaBaseRefrigeradora: React.FC = () => {
    const [BaseRefrigeradora, setBaseRefrigeradora] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [filterDescripcion, setFilterDescripcion] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterFechaCompra, setFilterFechaCompra] = useState('');
    const [filterMarca, setFilterMarca] = useState('');
    const [filterModelo, setFilterModelo] = useState('');
    const [filterSerial, setFilterSerial] = useState('');

    const handleClose2 = () => setShowModal2(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedBaseRefrigeradoraId, setSelectedBaseRefrigeradoraId] = useState<number | null>(null);

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    useEffect(() => {
        const loadBaseRefrigeradora = async () => {
            try {
                Swal.fire({
                    title: 'Cargando tabla...',
                    html: 'Por favor espera un momento.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });

                const data = await getBaseRefrigeradora();
                setBaseRefrigeradora(data);
            } catch (error) {
                setError('Error al cargar el listado de Bases');
                console.error(error);
            } finally {
                setLoading(false);
                Swal.close();
            }
        };

        loadBaseRefrigeradora();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    const handleDelete = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Este cambio no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
            });

            if (result.isConfirmed) {
                await deleteBaseRefrigeradora(id);
                setBaseRefrigeradora((prev) => prev.filter((BaseRefrigeradora) => BaseRefrigeradora.id !== id));
                Swal.fire('¡Eliminado!', 'El Activo ha sido eliminado.', 'success');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar este objeto. Por favor, intente nuevamente.',
            });
        }
    };

    const filteredBaseRefrigeradora = BaseRefrigeradora.filter((BaseRefrigeradora) => {
        return (
            (BaseRefrigeradora.descripcion?.toLowerCase().includes(filterDescripcion.toLowerCase()) || !filterDescripcion) &&
            (BaseRefrigeradora.fecha_compra?.toLowerCase().includes(filterFechaCompra.toLowerCase()) || !filterFechaCompra) &&
            (BaseRefrigeradora.marca?.toLowerCase().includes(filterMarca.toLowerCase()) || !filterMarca) &&
            (BaseRefrigeradora.modelo?.toLowerCase().includes(filterModelo.toLowerCase()) || !filterModelo) &&
            (BaseRefrigeradora.estado?.toLowerCase().includes(filterEstado.toLowerCase()) || !filterEstado) &&
            (BaseRefrigeradora.serial?.toLowerCase().includes(filterSerial.toLowerCase()) || !filterSerial)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBaseRefrigeradora = filteredBaseRefrigeradora.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBaseRefrigeradora.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    const clearFilters = () => {
        setFilterMarca('');
        setFilterModelo('');
        setFilterFechaCompra('');
        setFilterDescripcion('');
        setFilterEstado('');
    };

    return (
        <>

            <Modal show={showModal} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Base Refrigeradora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>

                    </>
                </Modal.Body>
            </Modal>

            <div className="d-flex align-items-center" style={{ color: 'black' }}>
                <div className="pagetitle">
                    <h1>Bases Refrigeradoras</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Inicio</li>
                            <li className="breadcrumb-item active">Entrega de Activos</li>
                        </ol>
                    </nav>
                </div>
                <div className="ms-auto">

                    <Button onClick={handleShow} className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}
                    >
                        <i className="bi bi-plus-circle-fill me-2"></i> Nueva Base Refrigeradora
                    </Button>

                </div>
            </div>

            <div className='p-2' style={{ backgroundColor: '#ffff', borderBlockEndColor: '10px' }}>
                <div className="table-responsive hv-100" style={{ maxHeight: '50vh' }}>
                    <table className='table table-hover text-nowarp'>
                        <thead>
                            <tr>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="date"
                                        placeholder="Filtrar"
                                        value={filterSerial}
                                        onChange={(e) => setFilterSerial(e.target.value)}
                                    />
                                    SERIAL
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar correo"
                                        value={filterMarca}
                                        onChange={(e) => setFilterMarca(e.target.value)}
                                    />
                                    MARCA
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar contacto"
                                        value={filterModelo}
                                        onChange={(e) => setFilterModelo(e.target.value)}
                                    />
                                    MODELO
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="date"
                                        placeholder="Filtrar número"
                                        value={filterFechaCompra}
                                        onChange={(e) => setFilterFechaCompra(e.target.value)}
                                    />
                                    FECHA DE COMPRA
                                </th>
                                <th>
                                    <FormControl
                                        size="sm"
                                        type="text"
                                        placeholder="Filtrar número"
                                        value={filterDescripcion}
                                        onChange={(e) => setFilterDescripcion(e.target.value)}
                                    />
                                    DESCRIPCIÓN
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
                                    <button style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={clearFilters} type="button" className="btn btn-light btn-sm">
                                        <i className='bi bi-brush' />
                                    </button>
                                    <span style={{ display: 'block', marginTop: '4px' }}>
                                        ACCIONES
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBaseRefrigeradora.map((baseRefrigeradora) => (
                                <tr key={baseRefrigeradora.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <div >{baseRefrigeradora.serial}</div>
                                                <small className="text-muted">ID: {baseRefrigeradora.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{baseRefrigeradora.marca}</td>
                                    <td>
                                        <div >{baseRefrigeradora.modelo}</div>
                                    </td>
                                    <td>{baseRefrigeradora.fecha_compra}</td>
                                    <td>
                                        <Badge bg={baseRefrigeradora.estado === 'ASIGNADO' ? 'danger' : 'success'} className="rounded-pill">
                                            {baseRefrigeradora.estado}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-end btn-group" role="group">
                                            <button
                                                className="btn btn-light btn-sm"
                                                style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                                                onClick={() => {
                                                    setSelectedBaseRefrigeradoraId(baseRefrigeradora.id);
                                                    setShowModal2(true);
                                                }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm"
                                                style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                                                onClick={() => handleDelete(baseRefrigeradora.id)}
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


            <Modal show={showModal2} onHide={handleClose2} centered size="lg">
                <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
                    <Modal.Title>
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar Base Refrigeradora
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBaseRefrigeradoraId && (
                        <FormularioEditarP
                            baseRefrigeradoraId={setSelectedBaseRefrigeradoraId}
                            onClose={handleClose2}
                            onSuccess={() => {
                                const loadBaseRefrigeradora = async () => {
                                    try {
                                        const data = await getBaseRefrigeradora();
                                        setBaseRefrigeradora(data);
                                        handleClose2();
                                        Swal.fire({
                                            icon: 'success',
                                            title: '¡Actualizado!',
                                            text: 'El proveedor ha sido actualizado exitosamente',
                                            timer: 1500
                                        });
                                    } catch (error) {
                                        console.error('Error al recargar proveedores:', error);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'No se pudieron recargar los proveedores'
                                        });
                                    }
                                };
                                loadBaseRefrigeradora();
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>


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

export default TablaBaseRefrigeradora;