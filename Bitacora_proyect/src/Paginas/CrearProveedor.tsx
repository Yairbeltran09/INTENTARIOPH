import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import FormularioCrear from '../components/FormulariosCrear/FormularioCrear';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const CrearProveedor = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <Container className='d-flex d-flex justify-content-end'>
          <Button size='sm' type="button" className="btn btn-secondary" onClick={() => navigate('/Proveedores')}><i className="bi bi-arrow-left ms-1" /> Volver</Button>
        </Container>
        <FormularioCrear />
      </main>
      <Footer />
    </>
  )
}