import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReporteById, updateReporte } from '../servicios/reportesService';
import Swal from 'sweetalert2';

interface IReporte {
  id: string;
  fecha: string;
  farmacia: string;
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  duracion_incidente: string;
  proveedor: string;
  motivo: string;
  estado: string;
  isDeleted: boolean;
}

const EditarReporte: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reporte, setReporte] = useState<IReporte>({
    id: '',
    fecha: '',
    farmacia: '',
    fecha_hora_inicio: '',
    fecha_hora_fin: '',
    duracion_incidente: '',
    proveedor: '',
    motivo: '',
    estado: '',
    isDeleted: false
  });

  useEffect(() => {
    const cargarReporte = async () => {
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

          const data = await getReporteById(Number(id));
          console.log(data);

          setReporte(data);
          setLoading(false);
          Swal.close();
        }
      } catch (error) {
        setLoading(false);
        console.error('Error al cargar el reporte:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del reporte'
        });
      }
    };

    cargarReporte();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReporte(prev => ({
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

      const reporteFormateado = {
        ...reporte,
        fecha: reporte.fecha || null,
        fecha_hora_inicio: reporte.fecha_hora_inicio ? new Date(reporte.fecha_hora_inicio).toISOString() : null,
        fecha_hora_fin: reporte.fecha_hora_fin ? new Date(reporte.fecha_hora_fin).toISOString() : null
      };

      await updateReporte(Number(id), reporteFormateado);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Reporte actualizado correctamente'
      });

      navigate('/Farmacias');
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el reporte'
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="card-body">
      <h5 className="card-title">Editar Reporte</h5>
      <hr />
      <h3>ID Reporte: {id}</h3>
      <br />

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="fecha" className="form-label">Fecha*</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={reporte.fecha}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="farmacia" className="form-label">Farmacia*</label>
          <input
            type="text"
            className="form-control"
            name="farmacia"
            value={reporte.farmacia}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="fecha_hora_inicio" className="form-label">Hora Inicio*</label>
          <input
            type="time"
            className="form-control"
            name="fecha_hora_inicio"
            value={reporte.fecha_hora_inicio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="fecha_hora_fin" className="form-label">Hora Fin*</label>
          <input
            type="time"
            className="form-control"
            name="fecha_hora_fin"
            value={reporte.fecha_hora_fin}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="proveedor" className="form-label">Proveedor*</label>
          <input
            type="text"
            className="form-control"
            name="proveedor"
            value={reporte.proveedor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="motivo" className="form-label">Motivo*</label>
          <input
            type="text"
            className="form-control"
            name="motivo"
            value={reporte.motivo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            name="estado"
            className="form-select"
            value={reporte.estado}
            onChange={handleInputChange}
            required
          >
            <option value="">--</option>
            <option value="EN SERVICIO">EN SERVICIO</option>
            <option value="NO ACTIVO">NO ACTIVO</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-secondary m-2">
            <i className="bi bi-box-arrow-up m-1" />ACTUALIZAR
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/Farmacias')}
          >
            <i className="bi bi-arrow-left m-1" />CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarReporte;