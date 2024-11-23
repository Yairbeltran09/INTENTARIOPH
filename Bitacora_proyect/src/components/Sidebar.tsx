import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos_CSS/Sidebar.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate()
    const sections = [
        {
            title: "Reportes",
            icon: "bi bi-exclamation-diamond",
            link: "/Reportes",
        },
        {
            title: "Farmacias",
            icon: "bi bi-buildings",
            link: "/Farmacias",
        },
        { 
            title: "Proveedores",
            icon: "bi bi-people-fill",
            link: "/Proveedores"
        },
    ];

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav">
                {sections.map((section, index) => (
                    <li className="nav-item" key={index}>
                        <a className="nav-link" href={`${section.link}`} style={{color:"black"}}>
                            <i className={section.icon} style={{color:"black"}}></i>
                            <span >{section.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <hr />
            <div className='d-flex justify-content-center'>
            <Button size='sm' type='button' className='btn btn-secondary' onClick={() => navigate('/Login')}>Cerrar Sesión</Button>
            </div>
        </aside>
    );
};

export default Sidebar;
