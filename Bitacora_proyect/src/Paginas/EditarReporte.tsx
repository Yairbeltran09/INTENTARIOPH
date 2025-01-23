
import Layout from "../components/Layout/Layout";
import EditarReportes from "../components/FormulariosEditar.tsx/FormularioEditarR";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const EditarReporte = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center" style={{ color: 'black' }}>
        <div className="pagetitle">
          <h1>Reportes</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Inicio</li>
              <li className="breadcrumb-item active">Farmacias</li>
            </ol>
          </nav>
        </div>           
        <div className="ms-auto">
          <Link to="/EnvioModem">
            <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c', textAlign: 'center' }}>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-router"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M17 17l0 .01" /><path d="M13 17l0 .01" /><path d="M15 13l0 -2" /><path d="M11.75 8.75a4 4 0 0 1 6.5 0" /><path d="M8.5 6.5a8 8 0 0 1 13 0" /></svg>
            </Button>
          </Link>
        </div>                                     
      </div>  

      <EditarReportes />
    </Layout>
  );
};
