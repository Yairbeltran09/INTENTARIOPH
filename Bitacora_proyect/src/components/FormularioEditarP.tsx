import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProveedorInternetById, updateProveedorInternet } from '../servicios/ProveedoresService';
import Swal from 'sweetalert2';

const EditarProveedor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [proveedor, setProveedor] = useState({
    id: '',
    nombre: '',
    nit: '',
    nombre_contacto: '',
    numero_contacto: '',
    correo: '',
    fecha_contratacion: '',
    estado: '',
    observacion: '',
    isDeleted: false
  });

  useEffect(() => {
    const cargarProveedor = async () => {
      try {
        if (id) {
          setLoading(true);
          Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const data = await getProveedorInternetById(Number(id));
          console.log(data);

          setProveedor(data);
          setLoading(false);
          Swal.close();
        }
      } catch (error) {
        setLoading(false);
        console.error('Error al cargar el proveedor:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del proveedor'
        });
      }
    };

    cargarProveedor();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProveedor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: 'Actualizando...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await updateProveedorInternet(Number(id), proveedor);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Proveedor actualizado correctamente'
      });

      navigate('/proveedores');
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el proveedor'
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card-body">
      <h5 className="card-title">Editar Proveedor</h5>
      <hr />
      <h3>ID Proveedor: {id}</h3>
      <br />

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre*</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={proveedor.nombre}
            onChange={handleInputChange}
            required
            min="0"
            max="99999999999"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="nit" className="form-label">Nit*</label>
          <input
            type="text"
            className="form-control"
            name="nit"
            value={proveedor.nit}
            onChange={handleInputChange}
            required
            min="0"
            max="99999999999"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="nombre_contacto" className="form-label">Nombre de la persona encargada*</label>
          <input
            type="text"
            className="form-control"
            name="nombre_contacto"
            value={proveedor.nombre_contacto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="numero_contacto" className="form-label">Número de contacto*</label>
          <input
            type="text"
            className="form-control"
            name="numero_contacto"
            value={proveedor.numero_contacto}
            onChange={handleInputChange}
            required
            min="0"
            max="99999999999"
          />
        </div>
        <div className="col-6">
          <label htmlFor="correo" className="form-label">Correo*</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={proveedor.correo}
            onChange={handleInputChange}
            required
            min="0"
            max="99999999999"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="fecha_contratacion" className="form-label">Fecha de contratación*</label>
          <input
            type="date"
            className="form-control"
            name="fecha_contratacion"
            value={proveedor.fecha_contratacion}
            onChange={handleInputChange}
            required
            min="0"
            max="99999999999"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            name="estado"
            className="form-select"
            value={proveedor.estado}
            onChange={handleInputChange}
            required
          >
            <option value="">--</option>
            <option value="EN SERVICIO">EN SERVICIO</option>
            <option value="NO ACTIVO">NO ACTIVO</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="observacion" className="form-label">Observación</label>
          <textarea
            className="form-control"
            name="observacion"
            value={proveedor.observacion}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-secondary m-2"
          onClick={() => navigate('/proveedores')}
          >
            <i className="bi bi-box-arrow-up m-1" />ACTUALIZAR

          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/proveedores')}
          >
            <i className="bi bi-arrow-left m-1" />CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProveedor;