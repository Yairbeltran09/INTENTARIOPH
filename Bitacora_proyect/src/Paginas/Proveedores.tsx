
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProveedorTable from "../components/Tablas/TablaProveedor";
import { Button } from "react-bootstrap";

export const Proveedores = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center" style={{ color: 'black' }}>
        <div className="pagetitle">
          <h1>Proveedores</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Inicio</li>
              <li className="breadcrumb-item active">Farmacias</li>
            </ol>
          </nav>
        </div>
        <div className="ms-auto">
          <Link to="/CrearProveedor">
            <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}>
              <i className="bi bi-plus-circle-fill me-2"></i> Agregar Proveedor
            </Button>
          </Link>
        </div>
      </div>
      <ProveedorTable />
    </Layout>
  );
};
