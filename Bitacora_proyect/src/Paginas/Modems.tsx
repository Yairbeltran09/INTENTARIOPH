
import Layout from "../components/Layout/Layout";
import ModemsTable from "../components/Tablas/TablaModems";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Modems = () => {
    return (
        <Layout>
            <div className="d-flex align-items-center" style={{ color: 'black' }}>
                <div className="pagetitle">
                    <h1>Modems</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Inicio</li>

                            <li className="breadcrumb-item active">
                                <a className="text-decoration-none" href="/Proveedores">Envios</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="ms-auto">
                    <Link to="/CrearFarmacia">
                        <Button className="btn" style={{ backgroundColor: '#f6952c', borderColor: '#f6952c' }}>
                            <i className="bi bi-plus-circle-fill me-2"></i> Agregar Modem
                        </Button>
                    </Link>
                </div>
            </div>
            <ModemsTable />
        </Layout>
    );
}