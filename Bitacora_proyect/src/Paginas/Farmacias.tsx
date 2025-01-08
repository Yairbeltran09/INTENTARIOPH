
import { Button } from "react-bootstrap";
import { Layout } from "../components/Layout/Layout";
import FarmaciasTable from "../components/Tablas/TablaFarmcia";


export const Farmacias = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center" style={{ color: 'black', backgroundColor: 'white' }}>
        <div className="pagetitle">
          <h1>Farmacias</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">Inicio</li>
              <li className="breadcrumb-item active">Proveedores</li>
            </ol>
          </nav>
        </div>
        <div className="ms-auto">
          <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}>
            <i className="bi bi-plus-circle-fill me-2"></i> Agregar Farmacia
          </Button>
        </div>
      </div>
      <FarmaciasTable />
    </Layout>
  );
};
