
import Layout from "../components/Layout/Layout";
import EditarReportes from "../components/FormulariosEditar.tsx/FormularioEditarR";

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
      </div>
      <EditarReportes />
    </Layout>
  );
};
