import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEnvio } from "../../servicios/EnvioModemService";
import { getFarmacias } from "../../servicios/farmaciaService";
import { getModems } from "../../servicios/modemService";
import Swal from "sweetalert2";

interface IFarmacia {
  id: number;
  nombre: string;
}

interface IModem {
  id: number;
  marca: string;
  modelo: string;
  numero_serie: string;
  estado: string;
  proveedorInternet: {
    id: number;
    nombre: string;
  };
}

interface IEnvio {
  farmacia: any;
  modem: any;
  fecha_envio: string;
  costo_envio: number;
  estado_envio: string;
}

const CrearEnvio: React.FC = () => {
  const navigate = useNavigate();
  const [farmacias, setFarmacias] = useState<IFarmacia[]>([]);
  const [modems, setModems] = useState<IModem[]>([]);
  const [isHovered2, setIsHovered2] = useState(false);

  const [envio, setEnvio] = useState<IEnvio>({
    farmacia: null,
    modem: null,
    fecha_envio: new Date().toISOString(),
    costo_envio: 0,
    estado_envio: "PENDIENTE",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [farmaciasData, modemsData] = await Promise.all([
          getFarmacias(),
          getModems(),
        ]);
        setFarmacias(farmaciasData);
        setModems(modemsData.filter((modem) => modem.estado === "DISPONIBLE"));
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al cargar los datos necesarios",
        });
      }
    };

    cargarDatos();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "farmacia") {
      const farmaciaSeleccionada = farmacias.find(
        (f) => f.id === parseInt(value)
      );
      setEnvio((prev) => ({
        ...prev,
        farmacia: farmaciaSeleccionada,
      }));
    } else if (name === "modem") {
      const modemSeleccionado = modems.find((m) => m.id === parseInt(value));
      setEnvio((prev) => ({
        ...prev,
        modem: modemSeleccionado,
      }));
    } else {
      setEnvio((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Creando envío...",
        text: "Por favor espere",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await createEnvio(envio);

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Envío creado correctamente",
      });

      navigate("/Envios");
    } catch (error) {
      console.error("Error al crear el envío:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el envío",
      });
    }
  };

  return (
    <div
      className="p-3 "
      style={{
        color: "black",
        backgroundColor: "white",
        borderRadius: "0.6rem",
      }}
    >
      <br />
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="farmacia" className="form-label">
            Farmacia*
          </label>
          <select
            className="form-select"
            name="farmacia"
            value={envio.farmacia?.id || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una farmacia</option>
            {farmacias.map((farmacia) => (
              <option key={farmacia.id} value={farmacia.id}>
                {farmacia.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="modem" className="form-label">
            Módem Disponible*
          </label>
          <select
            className="form-select"
            name="modem"
            value={envio.modem?.id || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un módem</option>
            {modems.map((modem) => (
              <option key={modem.id} value={modem.id}>
                {modem.marca} - {modem.modelo} (Serie: {modem.numero_serie}) -{" "}
                {modem.proveedorInternet.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-6">
    <label className="form-label" >Costo de Envío*</label>
    <div className="input-group">
      <div className="input-group-text">$</div>
      <input
            type="number"
            className="form-control"
            name="costo_envio"
            value={envio.costo_envio}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
          />
    </div>
  </div>

        <div className="text-center">
          <button
            style={{
              backgroundColor: "#f6952c",
              borderColor: "#f6952c",
              cursor: "pointer",
              background: isHovered2 ? "#ffff" : "#f6952c",
              color: isHovered2 ? "#f6952c" : "#ffff",
            }}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            type="submit"
            className="btn btn-secondary m-2 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
              stroke-width="2"
            >
              <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z"></path>
            </svg>
            ENVIAR
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              width="24"
              height="24"
              stroke-width="2"
            >
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearEnvio;
