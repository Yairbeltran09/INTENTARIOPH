import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import FormularioEditar from '../components/FormulariosEditar.tsx/FormularioEditarP';



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