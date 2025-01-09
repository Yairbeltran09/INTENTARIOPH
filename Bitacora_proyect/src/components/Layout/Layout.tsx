import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="">
                <Header />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3 overflow-auto p-3" >
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Layout;