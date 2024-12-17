import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../footer/Footer';
import Footer from '../Sidebar/Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Header />
            <Sidebar />
            <main className="main-content">
                <div className="content-wrapper">
                    {children}
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default MainLayout;