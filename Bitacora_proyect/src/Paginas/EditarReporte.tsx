
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import FormularioEditarReporte from '../components/FormulariosEditar.tsx/FormularioEditarR';

export const EditarReporte = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <FormularioEditarReporte />
      </main>
      <Footer />
    </>
  );
};