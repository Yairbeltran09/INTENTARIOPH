import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import CoralLogo from '../../assets/icons8-controlar-100.png';
import { logout } from "../../servicios/authServices";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const sections = [
    {
      heading: "INTERNET",
      items: [
        {
          label: "Reportes",
          icon: "M12 9v4 M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z M12 16h.01",
          path: "/reportes",
        },
        {
          label: "Farmacias",
          icon: "M3 21l18 0 M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16 M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4 M10 9l4 0 M12 7l0 4",
          path: "/farmacias",
        },
        {
          label: "Proveedores",
          icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85",
          path: "/proveedores",
        },
      ],
    },
    {
      heading: "INVENTARIO",
      items: [
        {
          label: "Personal",
          icon: "M9 7m-4...",
          path: "/personal"
        },

        { label: "Portátiles", icon: "M5 6m0...", path: "/portatiles" },
        { label: "Monitores", icon: "M3 5a1...", path: "/monitores" },
        { label: "Teclados", icon: "M2 6m0...", path: "/teclados" },
        { label: "Mouse", icon: "M6 3m0...", path: "/mouse" },
        { label: "Diademas", icon: "M4 14v...", path: "/diademas" },
        { label: "Base Refrigeradora", icon: "M4 4m0...", path: "/bases" },
      ],
    },
  ];

  return (
    <div className="sidebar col-lg-2 bg-white border-end d-flex flex-column p-0 vh-100" >
      <header className="d-flex align-items-center p-1 border-bottom bg-white">
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
                      className={`nav-link d-flex align-items-center gap-2 py-2 px-3 ${location.pathname === item.path
                        ? "bg-warning-subtle text-warning"
                        : "text-dark"
                        }`}
                      style={{ borderRadius: "0.6rem" }}
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
          <div className="card-body d-flex justify-content-between align-items-center">
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
              <div className="ms-2">
                <span className="fw-semibold small">RROJAS</span>
                <br />
                <span className="fw-light small">ROL</span>
              </div>
            </div>
            <Button
              className="d-flex align-items-center p-1"
              variant="link"
              style={{ color: "#f6952c" }}
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
