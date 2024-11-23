import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FormularioEditar from '../components/FormularioEditarP';



export const EditarProveedor = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <FormularioEditar />
      </main>
      <Footer />
    </>
  )
}