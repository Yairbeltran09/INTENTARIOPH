
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FormularioCrearReporte from '../components/FormularioCrearR';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const CrearReporte = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <Container className='d-flex justify-content-end'>
          <Button 
            size='sm' 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/Reportes')}
          >
            <i className="bi bi-arrow-left ms-1"/> Volver
          </Button>
        </Container>
        <FormularioCrearReporte />
      </main>
      <Footer />
    </>
  );
};