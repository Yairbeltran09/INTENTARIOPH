import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import CoralLogo from '../../assets/icons8-controlar-100.png';
import { getCurrentUser } from "../../servicios/authServices";
import { logout } from "../../servicios/authServices";


const Sidebar: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState({ username: "", roleId: 0 });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  

  const getRoleName = (roleId: number) => {
    const roles: Record<number, string> = {
      1: "Administrador",
      2: "Tecnico",
    };
    return roles[roleId] || "Desconocido";
  };




  const sections = [
    {
      heading: "INTERNET",
      items: [
        {
          label: "Reportes",
          icon: "M12 9v4 M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z M12 16h.01",
          path: "/reportes",
          rolesAllowed: [1, 2],
        },
        {
          label: "Farmacias",
          icon: "M3 21l18 0 M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16 M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4 M10 9l4 0 M12 7l0 4",
          path: "/farmacias",
          rolesAllowed: [1],
        },
        {
          label: "Proveedores",
          icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85",
          path: "/proveedores",
        },
      ],
    },
    {
      heading: "CONTINGENCIA",
      items: [
        {
          label: "Modems",
          icon: "M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z M17 17l0 .01 M13 17l0 .01 M15 13l0 -2 M11.75 8.75a4 4 0 0 1 6.5 0 M8.5 6.5a8 8 0 0 1 13 0",
          path: "/modems",

        },
        {
          label: "Envios",
          icon: "M4 18v3h16v-14l-8 -4l-8 4v3 M4 14h9 M10 11l3 3l-3 3",
          path: "/EnvioModems",

        }
      ],
    },
    {
      heading: "INVENTARIO",
      items: [
        {
          label: "Personal",
          icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85",
          path: "/personal"
        },

        { label: "Portátiles", icon: "M3 19l18 0 M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z", path: "/portatiles" },
        { label: "Monitores", icon: "M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z M7 20h10 M9 16v4 M15 16v4", path: "/monitores" },
        { label: "Teclados", icon: "M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z M6 10l0 .01 M10 10l0 .01 M14 10l0 .01 M18 10l0 .01 M6 14l0 .01 M18 14l0 .01 M10 14l4 .01", path: "/teclados" },
        { label: "Mouse", icon: "M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z M12 3v7 M6 10h12", path: "/mouse" },
        { label: "Diademas", icon: "M4 14v-3a8 8 0 1 1 16 0v3 M18 19c0 1.657 -2.686 3 -6 3 M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z", path: "/diademas" },
        { label: "Base Refrigeradora", icon: "M12 9v13 M19 17.17l-5.98 4.485a1.7 1.7 0 0 1 -2.04 0l-5.98 -4.485a2.5 2.5 0 0 1 -1 -2v-11.17a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v11.17a2.5 2.5 0 0 1 -1 2z M4.3 3.3l6.655 5.186a1.7 1.7 0 0 0 2.09 0l6.655 -5.186", path: "/bases" },
      ],
    },
  ];

  return (
    <div className="sidebar col-lg-2 bg-white border-end d-flex flex-column p-0 vh-100" >
      <header className="d-flex align-items-center p-1  bg-white">
        <img src={CoralLogo} alt="Coral Logo" className="img-fluid" style={{ width: '50px', margin: '10px' }} />
        <h2 className="d-none d-md-block fw-semibold fs-5 ls-wide ms-2 mb-0">ControlTiC</h2>
      </header>
      <div className="flex-grow-1 overflow-auto">
        <div className="p-3">
          {sections.map((section, index) => (
            <div key={index} className="mb-4">
              <h6 className="text-muted text-uppercase small fw-bold mb-3">
                {section.heading}
              </h6>
              <ul className="nav flex-column">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="nav-item">
                    <Link
                      to={item.path}
                      className={` d-flex align-items-center gap-2 py-2 px-3 ${location.pathname === item.path
                        ? "text-white"
                        : "text-dark"}`}
                      style={{ borderRadius: "0.6rem", textDecoration: "none", backgroundColor: location.pathname === item.path ? "#f6952c" : "", color: location.pathname === item.path ? "white" : "" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="15"
                        height="15"
                        strokeWidth="2"
                      >
                        <path d={item.icon}></path>
                      </svg>
                      <span className="small">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="sticky-end p-3" style={{ backgroundColor: "#ffffff", position: "sticky", bottom: "0" }}>
        <div className="card bg-transparent border-0">
          <div style={{ backgroundColor: "#f8f9fa" }} className="card-body d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <svg
                className="me-1"
                style={{ color: "#f6952c" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="30"
                height="30"
                strokeWidth="2"
              >
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              <div className="ms-2 d-flex flex-column">
                <span className="fw-semibold small">{user.username || "NOMBRE USUARIO"}</span>
                <span className="fw-light small" style={{ fontSize: "10px" }}>
                  {getRoleName(user.roleId) || "ROL"}
                </span>
              </div>
            </div>
          <Link to="/login" >
            <Button
              className="d-flex align-items-center p-1"
              variant="link"
              style={{ color: "#f6952c" }}
              onClick={logout}

            >
              <i className="bi bi-box-arrow-right"></i>
            </Button>

          </Link> 

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
