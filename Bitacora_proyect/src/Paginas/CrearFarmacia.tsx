import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FormularioCrearF from '../components/FormularioCrearF';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const CrearFarmacia = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <Container className='d-flex d-flex justify-content-end'>
          <Button size='sm' type="button" className="btn btn-secondary" onClick={() => navigate('/Farmacias')}><i className="bi bi-arrow-left ms-1"/> Volver</Button>
        </Container>
        <FormularioCrearF />
      </main>
      <Footer />
    </>
  )
}