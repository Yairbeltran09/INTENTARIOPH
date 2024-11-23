import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FormularioEditarF from '../components/FormularioEditarF';




export const EditarFarmacia = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className='main' id='main'>
        <FormularioEditarF />
      </main>
      <Footer />
    </>
  )
}