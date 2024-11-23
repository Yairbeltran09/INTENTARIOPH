import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getProveedor_internet, deleteProveedor } from '../servicios/ProveedoresService';  // Importa la función de eliminación
import { TitlePage } from './TitlePage';
import '../Estilos_CSS/PasaPagina.css';
import { Link } from 'react-router-dom';

const ProveedorTable: React.FC = () => {
  const [Proveedor_internet, setProveedor_internet] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [filterNombre, setFilterNombre] = useState('');
  const [filterCorreo, setFilterCorreo] = useState('');
  const [filterNombreContacto, setFilterNombreContacto] = useState('');
  const [filterNumeroContacto, setFilterNumeroContacto] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  useEffect(() => {
    const loadProveedor_internet = async () => {
      try {
        Swal.fire({
          title: 'Cargando tabla...',
          html: 'Por favor espera un momento.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const data = await getProveedor_internet();
        setProveedor_internet(data);
      } catch (error) {
        setError('Error al cargar el listado de proveedores');
        console.error(error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    loadProveedor_internet();
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
        await deleteProveedor(id);
        

        setProveedor_internet((prev) => prev.filter((proveedor) => proveedor.id !== id));
        
        Swal.fire('¡Eliminado!', 'El proveedor ha sido eliminado.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el proveedor. Por favor, intente nuevamente.',
      });
    }
  };

  const filteredProveedor_internet = Proveedor_internet.filter((proveedor) => {
    return (
      (proveedor.nombre?.toLowerCase().includes(filterNombre.toLowerCase()) || !filterNombre) &&
      (proveedor.correo?.toLowerCase().includes(filterCorreo.toLowerCase()) || !filterCorreo) &&
      (proveedor.nombreContacto?.toLowerCase().includes(filterNombreContacto.toLowerCase()) || !filterNombreContacto) &&
      (proveedor.numeroContacto?.toLowerCase().includes(filterNumeroContacto.toLowerCase()) || !filterNumeroContacto) &&
      (proveedor.estado?.toLowerCase().includes(filterEstado.toLowerCase()) || !filterEstado)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProveedor_internet = filteredProveedor_internet.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProveedor_internet.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setFilterNombre('');
    setFilterCorreo('');
    setFilterNombreContacto('');
    setFilterNumeroContacto('');
    setFilterEstado('');
  };

  return (
    <>
      <TitlePage name="Proveedores" />
      <section className='section'>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body table-responsive">
                <table className='table table-hover' style={{ fontSize: '13px' }}>
                  <thead className='text-center'>
                    <tr>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterNombre}
                          onChange={(e) => setFilterNombre(e.target.value)}
                          className="text-center"
                        />
                        Nombre
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterCorreo}
                          onChange={(e) => setFilterCorreo(e.target.value)}
                          className="text-center"
                        />
                        Correo
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterNombreContacto}
                          onChange={(e) => setFilterNombreContacto(e.target.value)}
                          className="text-center"
                        />
                        Contacto
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterNumeroContacto}
                          onChange={(e) => setFilterNumeroContacto(e.target.value)}
                          className="text-center"
                        />
                        Número
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterEstado}
                          onChange={(e) => setFilterEstado(e.target.value)}
                          className="text-center"
                        />
                        Estado
                      </th>
                      <th className="text-center">
                        <button onClick={clearFilters} type="button" className="btn btn-sm btn-secondary me-2">
                          <i className='bi bi-brush' />
                        </button>
                        <span style={{ display: 'block', marginTop: '4px' }}>Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProveedor_internet.map((proveedor) => (
                      <tr key={proveedor.id}>
                        <td className="text-center">{proveedor.nombre}</td>
                        <td className="text-center">{proveedor.correo}</td>
                        <td className="text-center">{proveedor.nombre_contacto}</td>
                        <td className="text-center">{proveedor.numero_contacto}</td>
                        <td className="text-center">
                          <Badge bg={proveedor.estado === 'NO ACTIVO' ? 'danger' : 'success'}>
                            {proveedor.estado}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ fontSize: '12px' }}
                              onClick={() => handleDelete(proveedor.id)}
                            >
                              <i className='bi bi-trash-fill' />
                            </button>
                            <button type="button" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                              <Link to={`/EditarProveedor/${proveedor.id}`}>
                                <i className='bi bi-pencil-square' style={{ color: 'white' }} />
                              </Link>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pagination className="custom-pagination bg-light">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </>
  );
};

export default ProveedorTable;
