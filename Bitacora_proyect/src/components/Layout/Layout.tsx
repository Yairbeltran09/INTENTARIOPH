import { Fragment } from "react/jsx-runtime";
import Sidebar from "../Sidebar/Sidebar";
import CoralLogo from '../../assets/icons8-coral-100.png';
import HeaderLeft from "../Header/HeaderLeft";
import HeaderRight from "../Header/HeaderRight";

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

export const Layout = (props: LayoutProps) => {
    return (
        <Fragment>
            <header className="navbar sticky-top bg-dark flex-md-nowrap p-3 shadow navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
                <a href="#" className="navbar-brand d-inline-flex align-items-center m-0 p-0 me-lg-6 me-xl-9 p-1 rounded text-reset">
                    <img src={CoralLogo} alt="Coral Logo" className="img-fluid" style={{ width: '50px' }} />
                    <h2 className="d-none d-md-block fw-semibold fs-5 ls-wide ms-2 mb-0">CORAL</h2>
                </a>
                <div className="container-fluid px-4">
                    <HeaderLeft />
                    <HeaderRight />
                </div>
            </header>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">{props.title}</h1>
                        </div>
                        {props.children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
}