
import { Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import FarmaciaTabla from "../components/Tablas/TablaFarmcia";
import { Link } from "react-router-dom";


export const Farmacias = () => {
  return (
    <Layout>

      <div className="d-flex align-items-center" style={{ color: 'black' }}>
        <div className="pagetitle">
          <h1>Farmacias</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Inicio</li>

              <li className="breadcrumb-item active">
                <a className="text-decoration-none" href="/Proveedores">Proveedores</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="ms-auto">
          <Link to="/CrearFarmacia">
            <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}>
              <i className="bi bi-plus-circle-fill me-2"></i> Agregar Farmacia
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <FarmaciaTabla />
      </div>
    </Layout>
  );
};

export default Farmacias;