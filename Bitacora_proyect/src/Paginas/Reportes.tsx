
import { Button } from "react-bootstrap";
import  Layout from "../components/Layout/Layout";
import ReportesTable from "../components/Tablas/TablaReportes";

export const Reportes = () => {
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
          <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}>
            <i className="bi bi-plus-circle-fill me-2"></i> Agregar Reporte
          </Button>
        </div>
      </div>
      <div>
        <ReportesTable />
      </div>
    </Layout>
  );
};
