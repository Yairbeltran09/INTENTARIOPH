
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";


interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
    return (
        <>
            <div >
                <Header />
            </div>
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3 overflow-auto p-3" style={{ maxHeight: '100vh' }}>
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}