import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReporte } from '../../servicios/reportesService';
import { getFarmacias } from '../../servicios/farmaciaService';
import { getMotivos } from '../../servicios/motivoreporteService';
import Swal from 'sweetalert2';

interface IFarmacia {
  id: number;
  nombre: string;
  proveedor: {
    id: number;
    nombre: string;
  };
}

interface IMotivo {
  id: number;
  motivo: string;
}

interface IReporte {
  fecha: string;
  farmacia: any;
  fecha_hora_inicio: string;
  duracion_incidente: string;
  proveedor: string;
  motivo: any;
  estado: string;
  observacion: string;
  isDeleted: boolean;
}

const CrearReporte: React.FC = () => {
  const navigate = useNavigate();
  const [farmacias, setFarmacias] = useState<IFarmacia[]>([]);
  const [motivos, setMotivos] = useState<IMotivo[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const [reporte, setReporte] = useState<IReporte>({
    fecha: new Date().toISOString().split('T')[0],
    farmacia: null,
    fecha_hora_inicio: getCurrentDateTime(),
    duracion_incidente: '',
    proveedor: '',
    motivo: null,
    estado: 'ABIERTO',
    observacion: '',
    isDeleted: false
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [farmaciasData, motivosData] = await Promise.all([
          getFarmacias(),
          getMotivos()
        ]);
        setFarmacias(farmaciasData);
        setMotivos(motivosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los datos necesarios'
        });
      }
    };

    cargarDatos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'farmacia') {
      const farmaciaSeleccionada = farmacias.find(f => f.id === parseInt(value));
      setReporte(prev => ({
        ...prev,
        farmacia: farmaciaSeleccionada,
        proveedor: farmaciaSeleccionada?.proveedor?.nombre || ''
      }));
    } else if (name === 'motivo') {
      const motivoSeleccionado = motivos.find(m => m.id === parseInt(value));
      setReporte(prev => ({
        ...prev,
        motivo: motivoSeleccionado
      }));
    } else {
      setReporte(prev => ({
        ...prev,
        [name]: value
      }));
    }
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

      await createReporte(reporte);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Reporte creado correctamente'
      });

      navigate('/Reportes');
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
      fecha: new Date().toISOString().split('T')[0],
      farmacia: null,
      fecha_hora_inicio: getCurrentDateTime(),
      duracion_incidente: '',
      proveedor: '',
      motivo: null,
      estado: 'ABIERTO',
      observacion: '',
      isDeleted: false
    });
  };

  return (
    <div className="p-3 border" style={{ color: 'black', backgroundColor: 'white', borderRadius: '0.6rem' }}>
      <h5 className="card-title">Nuevo Reporte</h5>
      <br />
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="farmacia" className="form-label">Farmacia*</label>
          <select
            className="form-select"
            name="farmacia"
            value={reporte.farmacia?.id || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una farmacia</option>
            {farmacias.map(farmacia => (
              <option key={farmacia.id} value={farmacia.id}>
                {farmacia.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="proveedor" className="form-label">Proveedor</label>
          <input
            type="text"
            className="form-control"
            name="proveedor"
            value={reporte.proveedor}
            disabled
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="motivo" className="form-label">Motivo*</label>
          <select
            className="form-select"
            name="motivo"
            value={reporte.motivo?.id || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un motivo</option>
            {motivos.map(motivo => (
              <option key={motivo.id} value={motivo.id}>
                {motivo.motivo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="observacion" className="form-label">Observación</label>
          <textarea
            className="form-control"
            id="observacion"
            name="observacion"
            value={reporte.observacion}
            onChange={handleInputChange}
          />
        </div>

        <div className="text-center">
          <button
            style={{
              backgroundColor: '#f6952c', borderColor: '#f6952c',
              cursor: 'pointer',
              background: isHovered2 ? '#ffff' : '#f6952c',

              color: isHovered2 ? '#f6952c' : '#ffff',

            }}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            type="submit" className="btn btn-secondary m-2">
            <i className="bi bi-floppy m-1" />GUARDAR
          </button>
          <button
            style={{
              backgroundColor: isHovered ? '#f6952c' : '#ffff',
              color: isHovered ? '#fff' : '#f6952c',
              borderColor: '#f6952c',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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