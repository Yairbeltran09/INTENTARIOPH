import React, { useState, useEffect } from 'react';
import { Table, Badge, FormControl, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getFarmacias, deleteFarmacia} from '../servicios/farmaciaService';
import { TitlePage } from './TitlePage';
import { Link } from 'react-router-dom';

const FarmaciaTabla: React.FC = () => {
  const [farmacias, setFarmacias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [filterNombre, setFilterNombre] = useState('');
  const [filterDireccion, setFilterDireccion] = useState('');
  const [filterCiudad, setFilterCiudad] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('');
  const [filterProveedor, setFilterProveedor] = useState('');
  const [filterPertenece, setFilterPertenece] = useState('');

  useEffect(() => {
    const loadFarmacia = async () => {
      try {
        Swal.fire({
          title: 'Cargando tabla...',
          html: 'Por favor espera un momento.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const data = await getFarmacias();
        setFarmacias(data);
      } catch (error) {
        setError('Error al cargar el listado de farmacias');
        console.error(error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    loadFarmacia();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const filteredFarmacias = farmacias.filter(farmacia => {
    return (
      farmacia.nombre?.toLowerCase().includes(filterNombre.toLowerCase()) &&
      farmacia.direccion?.toLowerCase().includes(filterDireccion.toLowerCase()) &&
      (farmacia.ciudad?.nombre_ciudad.toLowerCase() || '').includes(filterCiudad.toLowerCase()) &&
      (farmacia.departamento?.name_departamento.toLowerCase() || '').includes(filterDepartamento.toLowerCase()) &&
      farmacia.proveedor?.nombre.toLowerCase().includes(filterProveedor.toLowerCase()) &&
      farmacia.pertenece.toLowerCase().includes(filterPertenece.toLowerCase())
    );
  });

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
        await deleteFarmacia(id);
        

        setFarmacias((prev) => prev.filter((farmacia) => farmacia.id !== id));
        
        Swal.fire('¡Eliminado!', 'La farmacia ha sido eliminado.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la famacia. Por favor, intente nuevamente.',
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFarmacias = filteredFarmacias.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFarmacias.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setFilterNombre('');
    setFilterDireccion('');
    setFilterCiudad('');
    setFilterDepartamento('');
    setFilterProveedor('');
    setFilterPertenece('');

  };

  return (
    <>
      <TitlePage name="Farmacias" />
      <section className='section'>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Table className="table table-hover text-center" style={{ fontSize: '13px' }}>
                  <thead className='text-center'>
                    <tr>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterNombre}
                          onChange={(e) => setFilterNombre(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Nombre
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterDireccion}
                          onChange={(e) => setFilterDireccion(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Dirección
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterCiudad}
                          onChange={(e) => setFilterCiudad(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Ciudad
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterDepartamento}
                          onChange={(e) => setFilterDepartamento(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Departamento
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterProveedor}
                          onChange={(e) => setFilterProveedor(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Proveedor
                      </th>
                      <th>
                        <FormControl
                          size='sm'
                          type="text"
                          placeholder="Filtrar"
                          value={filterPertenece}
                          onChange={(e) => setFilterPertenece(e.target.value)}
                          style={{ fontSize: '12px' }}
                          className="text-center"
                        />
                        Pertenece
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
                    {currentFarmacias.map((farmacia) => (
                      <tr key={farmacia.id}>
                        <td className='text-center'>{farmacia.nombre}</td>
                        <td className='text-center'>{farmacia.direccion}</td>
                        <td className='text-center'>{farmacia.ciudad?.nombre_ciudad}</td>
                        <td className='text-center'>{farmacia.departamento?.name_departamento}</td>
                        <td className='text-center'>{farmacia.proveedor?.nombre}</td>
                        <td className='text-center'>
                          <Badge bg={farmacia.pertenece === 'PHARMASER' ? 'warning' : 'primary'}>
                            {farmacia.pertenece}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ fontSize: '12px' }}
                              onClick={() => handleDelete(farmacia.id)}
                            >
                              <i className='bi bi-trash-fill' />
                            </button>
                            <button type="button" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                              <Link to={`/EditarFarmacia/${farmacia.id}`}>
                                <i className='bi bi-pencil-square' style={{ color: 'white' }} />
                              </Link>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>

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
      </section>
    </>
  );
};

export default FarmaciaTabla;
