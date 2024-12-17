import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import FormularioEditarF from '../components/FormulariosEditar.tsx/FormularioEditarF';




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