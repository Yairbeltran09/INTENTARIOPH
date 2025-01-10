import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="d-flex">
                <Sidebar />
                <main className='p-3'>
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;