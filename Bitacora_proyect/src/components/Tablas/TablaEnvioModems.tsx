import React, { useState, useEffect } from 'react';
import { Badge, FormControl, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getEnvios, deleteEnvio } from '../../servicios/EnvioModemService';
import { format } from 'date-fns';

interface IEnvio {
  id: number;
  farmacia: {
    id: number;
    nombre: string;
  };
  modem: {
    id: number;
    marca: string;
    modelo: string;
    numero_serie: string;
  };
  fecha_envio: string;
  costo_envio: number;
  estado_envio: string;
}

const EnviosTable: React.FC = () => {
  const [envios, setEnvios] = useState<IEnvio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtros
  const [filterFarmacia, setFilterFarmacia] = useState<string>('');
  const [filterModem, setFilterModem] = useState<string>('');
  const [filterFecha, setFilterFecha] = useState<string>('');
  const [filterEstado, setFilterEstado] = useState<string>('');

  useEffect(() => {
    const loadEnvios = async () => {
      try {
        Swal.fire({
          title: 'Cargando tabla...',
          html: 'Por favor espera un momento.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const data = await getEnvios();
        setEnvios(data);
      } catch (error) {
        setError('Error al cargar el listado de envíos');
        console.error(error);
      } finally {
        setLoading(false);
        Swal.close();
      }
    };

    loadEnvios();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const filteredEnvios = envios.filter(envio => {
    const matchFarmacia = (envio?.farmacia?.nombre || '').toLowerCase().includes(filterFarmacia.toLowerCase());
    const matchModem = (envio?.modem?.numero_serie || '').toLowerCase().includes(filterModem.toLowerCase());
    const matchFecha = format(new Date(envio?.fecha_envio || new Date(0)), 'yyyy-MM-dd').includes(filterFecha);
    const matchEstado = (envio?.estado_envio || '').toLowerCase().includes(filterEstado.toLowerCase());

    return matchFarmacia && matchModem && matchFecha && matchEstado;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnvios = filteredEnvios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnvios.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setFilterFarmacia('');
    setFilterModem('');
    setFilterFecha('');
    setFilterEstado('');
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
        await deleteEnvio(id);
        setEnvios(envios.filter(envio => envio.id !== id));

        Swal.fire(
          '¡Eliminado!',
          'El envío ha sido eliminado.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el envío'
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
                    placeholder="Filtrar farmacia"
                    value={filterFarmacia}
                    onChange={(e) => setFilterFarmacia(e.target.value)}
                  />
                  FARMACIA
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="text"
                    placeholder="Filtrar módem"
                    value={filterModem}
                    onChange={(e) => setFilterModem(e.target.value)}
                  />
                  MÓDEM
                </th>
                <th>
                  <FormControl
                    size="sm"
                    type="date"
                    value={filterFecha}
                    onChange={(e) => setFilterFecha(e.target.value)}
                  />
                  FECHA ENVÍO
                </th>
                <th>COSTO ENVÍO</th>
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
              {currentEnvios.map((envio) => (
                <tr key={envio?.id || Math.random()}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <div>{envio?.farmacia?.nombre}</div>
                        <small className="text-muted">ID: {envio?.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{envio?.modem?.marca} - {envio?.modem?.modelo}</div>
                    <small className="text-muted">Serie: {envio?.modem?.numero_serie}</small>
                  </td>
                  <td>{envio?.fecha_envio ? format(new Date(envio.fecha_envio), 'dd/MM/yyyy') : 'N/A'}</td>
                  <td>${envio?.costo_envio ?? ''}</td>
                  <td>
                    <Badge bg={envio?.estado_envio === 'DEVUELTO' ? 'success' : 'warning'}>
                      {envio?.estado_envio || 'Desconocido'}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end btn-group">
                      <Link
                        to={`/EditarEnvio/${envio?.id}`}
                        className="btn btn-light btn-sm"
                        style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#ffb361", color: '#fff', borderColor: '#ffb361' }}
                        onClick={() => envio?.id && handleDelete(envio.id)}
                        disabled={!envio?.id}
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

export default EnviosTable;