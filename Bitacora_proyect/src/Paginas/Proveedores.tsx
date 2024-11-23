import Header from '../components/Header';
import Proveedortable from '../components/TablaProveedor';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Proveedores = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <Container className='d-flex justify-content-end'>
        <Button size='sm' type='button' className='btn btn-secondary' onClick={() => navigate('/CrearProveedor')}>Crear Proveedor <i className="bi bi-arrow-right ms-1"/>  </Button>
        </Container>
        <Proveedortable/>
      </main>
      <Footer/>
    </>
  )
}