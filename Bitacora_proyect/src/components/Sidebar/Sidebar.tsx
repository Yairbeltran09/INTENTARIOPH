import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

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
      heading: "CONTINGENCIA",
      items: [
        {
          label: "Modems",
          icon: "M3 13m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z M17 17l0 .01 M13 17l0 .01 M15 13l0 -2 M11.75 8.75a4 4 0 0 1 6.5 0 M8.5 6.5a8 8 0 0 1 13 0",
          path: "",
        },
        {
          label: "Envio de Modems",
          icon: "M3 7h3 M3 11h2 M9.02 8.801l-.6 6a2 2 0 0 0 1.99 2.199h7.98a2 2 0 0 0 1.99 -1.801l.6 -6a2 2 0 0 0 -1.99 -2.199h-7.98a2 2 0 0 0 -1.99 1.801z ",
          path: "",
        },
      ],
    },
    {
      heading: "INVENTARIO",
      items: [
        {
          label: "Personal",
          icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85 M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982 M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982",
          path: "#",
        },
        {
          label: "Portatiles",
          icon: "M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z M3 19l18 0",
          path: "#",
        },
        {
          label: "Monitores",
          icon: "M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z M7 20h10 M9 16v4 M15 16v4",
          path: "#",
        },
        {
          label: "Teclados",
          icon: "M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z M6 10l0 .01 M10 10l0 .01 M14 10l0 .01 M18 10l0 .01 M6 14l0 .01 M18 14l0 .01 M10 14l4 .01",
          path: "#",
        },
        {
          label: "Mouse",
          icon: "M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z M12 3v7 M6 10h12",
          path: "#",
        },
        {
          label: "Diademas",
          icon: "M4 14v-3a8 8 0 1 1 16 0v3 M18 19c0 1.657 -2.686 3 -6 3 M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z",
          path: "#",
        },
        {
          label: "Base Refrigeradora",
          icon: "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z M16 16l3.3 3.3 M16 8l3.3 -3.3 M8 8l-3.3 -3.3 M8 16l-3.3 3.3",
          path: "#",
        },
      ],
    },
  ];

  return (
    <div style={{ width: "230px", display: "block" }}>
      <aside className="overflow-auto" style={{ height: "80vh", width: "230px" }}>
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
                      style={{
                        "--bs-warning-rgb": "246, 149, 44",
                        "--bs-warning-bg-subtle": "rgba(246, 149, 44, 0.1)",
                        borderRadius: "0.6rem",
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f6952c";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          location.pathname === item.path ? "#f6952c" : "";
                      }}
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

        <div className="p-3 d-block mt-0">
          <div className="card bg-mb-0" style={{ backgroundColor: "rgba(246, 149, 44, 0.1)", border: "none" }}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <svg className="me-1" style={{ color: "#f6952c" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="30" height="30" strokeWidth="2">
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
                <div className="d-flex row">
                  <span className="fw-semibold small">RROJAS</span>
                  <span className="fw-semibold small">ROL</span>
                </div>
              </div>
              <Button className="d-flex align-items-center p-1" variant="link" style={{ color: "#f6952c" }}>
                <i className="bi bi-box-arrow-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;