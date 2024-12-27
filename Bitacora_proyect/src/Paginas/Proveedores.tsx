
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export const Proveedores = () => {
  return (
    <>
    <div className="fixed-top bg-light shadow-sm p-3 px-5 d-flex justify-content-between">
    <Header />
    </div>
    <div className="layout gap-4">
  <main className="layout-main">
  </main>
  <aside className="layout-sidebar border-end" style={{"width": "240px"}}>
    <Sidebar />
  </aside>
</div>    </>
  );
};
