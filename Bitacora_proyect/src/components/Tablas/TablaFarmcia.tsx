import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getFarmacias, deleteFarmacia } from '../../servicios/farmaciaService';

import { Link } from 'react-router-dom';

const FarmaciaTabla: React.FC = () => {
  const [farmacias, setFarmacias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      (farmacia?.nombre || '').toLowerCase().includes(filterNombre.toLowerCase()) &&
      (farmacia?.direccion || '').toLowerCase().includes(filterDireccion.toLowerCase()) &&
      (farmacia?.ciudad?.nombre_ciudad || '').toLowerCase().includes(filterCiudad.toLowerCase()) &&
      (farmacia?.ciudad?.departamento?.nombre || '').toLowerCase().includes(filterDepartamento.toLowerCase()) &&
      (farmacia?.proveedor?.nombre || '').toLowerCase().includes(filterProveedor.toLowerCase()) &&
      (farmacia?.pertenece || '').toLowerCase().includes(filterPertenece.toLowerCase())
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
        Swal.fire('¡Eliminado!', 'La farmacia ha sido eliminada.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la farmacia. Por favor, intente nuevamente.',
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
      <div className='p-2' style={{ backgroundColor: '#ffff', borderBlockEndColor: '10px' }}>
        <div className="table-responsive hv-100" style={{ maxHeight: '50vh' }}>
          <table className="table table-hover text-nowrap" >
            <thead>
              <tr>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar nombre"
                    value={filterNombre}
                    onChange={(e) => setFilterNombre(e.target.value)}
                  />
                  NOMBRE
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar dirección"
                    value={filterDireccion}
                    onChange={(e) => setFilterDireccion(e.target.value)}
                  />
                  DIRECCIÓN
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar ciudad"
                    value={filterCiudad}
                    onChange={(e) => setFilterCiudad(e.target.value)}
                  />
                  CIUDAD
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar departamento"
                    value={filterDepartamento}
                    onChange={(e) => setFilterDepartamento(e.target.value)}
                  />
                  DEPARTAMENTO
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar proveedor"
                    value={filterProveedor}
                    onChange={(e) => setFilterProveedor(e.target.value)}
                  />
                  PROVEEDOR
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar pertenece"
                    value={filterPertenece}
                    onChange={(e) => setFilterPertenece(e.target.value)}
                  />
                  PERTENECE
                </th>
                <th className="text-center">
                  <button style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={clearFilters} type="button" className="btn btn-sm">
                    <i className='bi bi-brush' />
                  </button>
                  <span style={{ display: 'block', marginTop: '4px' }}>
                    ACCIONES
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFarmacias.map((farmacia) => (
                <tr key={farmacia.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <div>{farmacia?.nombre || '-'}</div>
                        <small className="text-muted">ID: {farmacia.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{farmacia?.direccion || '-'}</td>
                  <td>
                    <div>{farmacia?.ciudad?.nombre_ciudad || '-'}</div>
                  </td>
                  <td>{farmacia?.ciudad?.departamento?.name_departamento || '-'}</td>
                  <td>
                    <div>{farmacia?.proveedor?.nombre || '-'}</div>
                    <small className="text-muted">NIT: {farmacia?.proveedor?.nit || '-'}</small>
                  </td>
                  <td>
                    <Badge bg={farmacia?.pertenece === 'PHARMASER' ? 'warning' : 'primary'} className="rounded-pill">
                      {farmacia?.pertenece || '-'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end btn-group" role="group">

                      <Link to={`/EditarFarmacia/${farmacia.id}`} className="btn btn-light btn-sm" style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }} onClick={() => handlePageChange(1)}>
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                        onClick={() => handleDelete(farmacia.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      </div >

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

export default FarmaciaTabla;