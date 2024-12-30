import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Sidebar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems1 = [
    {
      label: "Reportes",
      icon: "M12 9v4 M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z M12 16h.01",
    },
    {
      label: "Farmacias",
      icon: "M3 21l18 0 M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16 M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4 M10 9l4 0 M12 7l0 4",
    },
    {
      label: "Proveedores",
      icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85",
    },
  ];

  const navItems2 = [
    {
      label: "Personal",
      icon: "M12 9v4 M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z M12 16h.01",
    },
    {
      label: "Farmacias",
      icon: "M3 21l18 0 M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16 M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4 M10 9l4 0 M12 7l0 4",
    },
    {
      label: "Proveedores",
      icon: "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85",
    },
  ];

  return (
    <div className="sidebar c col-lg-2 col-md-3 col-12 navbar-light bg-white border-end">
      <div className="offcanvas-md offcanvas-end navbar-light bg-white">
        <div className="offcanvas-header"></div>
        <div className="offcanvas-body d-md-flex flex-column p-3 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <div className="sidebar__section-heading d-block my-2 fw-semibold text-capitalize ls-wider fs-sm">
              INTERNET
            </div>

            {navItems1.map((item, index) => (
              <li className="nav-item" key={index}>
                <a
                  href="#"
                  className="nav-link d-flex align-items-center gap-2 py-2"
                  style={{
                    color: hoveredIndex === index ? "orange" : "black",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                    strokeWidth="2"
                  >
                    <path d={item.icon}></path>
                  </svg>
                  {item.label}
                </a>
              </li>
            ))}
            <br />
            <div className="sidebar__section-heading d-block my-2 fw-semibold text-capitalize ls-wider fs-sm">
              INVENTARIO
            </div>

            {navItems2.map((item, index) => (
              <li className="nav-item" key={index}>
                <a
                  href="#"
                  className="nav-link d-flex align-items-center gap-2 py-2"
                  style={{
                    color: hoveredIndex === index ? "orange" : "black",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                    strokeWidth="2"
                  >
                    <path d={item.icon}></path>
                  </svg>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <br />
          <div className="p-3 bottom-0 w-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-4 me-2"></i>
                <span className="fw-bold">rafa</span>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center"
              >
                <i className="bi bi-box-arrow-right"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
