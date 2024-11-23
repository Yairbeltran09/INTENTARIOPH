
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FormularioEditarReporte from '../components/FormularioEditarR';

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