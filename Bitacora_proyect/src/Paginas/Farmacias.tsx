import Header from '../components/Header';
import FarmaciaTabla from '../components/TablaFarmcia';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export const Farmacias =() => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
      <Container className='d-flex justify-content-end'>
        <Button size='sm' type='button' className='btn btn-secondary' onClick={() => navigate('/CrearFarmacia')}>Crear Farmacia<i className="bi bi-arrow-right ms-1"/>  </Button>
        </Container>
        <FarmaciaTabla />
      </main>
      <Footer />
    </>
  )
}