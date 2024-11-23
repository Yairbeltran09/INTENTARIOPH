import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReporte } from '../servicios/reportesService';
import Swal from 'sweetalert2';

interface IReporte {
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

const CrearReporte: React.FC = () => {
  const navigate = useNavigate();
  const [reporte, setReporte] = useState<IReporte>({
    fecha: '',
    farmacia: '',
    fecha_hora_inicio: '',
    fecha_hora_fin: '',
    duracion_incidente: '',
    proveedor: '',
    motivo: '',
    estado: 'EN SERVICIO',
    isDeleted: false
  });

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
        title: 'Creando reporte...',
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

      await createReporte(reporteFormateado);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Reporte creado correctamente'
      });

      navigate('/Farmacias');
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el reporte'
      });
    }
  };

  const handleReset = () => {
    setReporte({
      fecha: '',
      farmacia: '',
      fecha_hora_inicio: '',
      fecha_hora_fin: '',
      duracion_incidente: '',
      proveedor: '',
      motivo: '',
      estado: 'EN SERVICIO',
      isDeleted: false
    });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Nuevo Reporte</h5>
      <hr />
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
          <label htmlFor="duracion_incidente" className="form-label">Duración del Incidente*</label>
          <input
            type="text"
            className="form-control"
            name="duracion_incidente"
            value={reporte.duracion_incidente}
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
            <i className="bi bi-floppy m-1" />GUARDAR
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            <i className="bi bi-trash-fill m-1" />LIMPIAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearReporte;