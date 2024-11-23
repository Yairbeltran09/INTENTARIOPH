import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReporteTable from '../components/TablaReportes';
import Footer from '../components/Footer';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Reportes = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <Container className='d-flex justify-content-end'>
          <Button 
            size='sm' 
            type='button' 
            className='btn btn-secondary' 
            onClick={() => navigate('/CrearReporte')}
          >
            Crear Reporte <i className="bi bi-arrow-right ms-1"/>
          </Button>
        </Container>
        <ReporteTable />
      </main>
      <Footer />
    </>
  );
};