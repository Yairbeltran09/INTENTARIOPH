import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../servicios/authServices';
import { AlertTriangle, Home, Users } from 'react-feather';

import SidebarMenuItem from './SidebarMenuItem';
import SidebarUserProfile from './SidebarUserProfile';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeMenus, setActiveMenus] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSubmenu = (menuId: string) => {
    setActiveMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <nav className="bg-white h-100 border-end position-fixed" style={{ width: "280px" }}>
      <div className="d-flex flex-column h-100">
        <div className="flex-grow-1 overflow-auto py-2">
          <ul className="nav flex-column">
            <li className="nav-item px-3 py-2">
              <small className="text-muted text-uppercase">Navegación</small>
            </li>

            <SidebarMenuItem
              icon={<AlertTriangle size={18} />}
              title="Reportes"
              isActive={activeMenus.includes('reportes')}
              onClick={() => toggleSubmenu('reportes')}
            >
              <li className="nav-item">
                <a href="/reportes/ventas" className="nav-link text-dark">Reporte de Ventas</a>
              </li>
              <li className="nav-item">
                <a href="/reportes/inventario" className="nav-link text-dark">Reporte de Inventario</a>
              </li>
            </SidebarMenuItem>

            {user?.roleId === 1 && (
              <>
                <SidebarMenuItem
                  icon={<Home size={18} />}
                  title="Farmacias"
                  isActive={activeMenus.includes('farmacias')}
                  onClick={() => toggleSubmenu('farmacias')}
                >
                  <li className="nav-item">
                    <a href="/farmacias/lista" className="nav-link text-dark">Lista de Farmacias</a>
                  </li>
                  <li className="nav-item">
                    <a href="/farmacias/nueva" className="nav-link text-dark">Nueva Farmacia</a>
                  </li>
                </SidebarMenuItem>

                <SidebarMenuItem
                  icon={<Users size={18} />}
                  title="Proveedores"
                  isActive={activeMenus.includes('proveedores')}
                  onClick={() => toggleSubmenu('proveedores')}
                >
                  <li className="nav-item">
                    <a href="/proveedores/lista" className="nav-link text-dark">Lista de Proveedores</a>
                  </li>
                  <li className="nav-item">
                    <a href="/proveedores/nuevo" className="nav-link text-dark">Nuevo Proveedor</a>
                  </li>
                </SidebarMenuItem>
              </>
            )}
          </ul>
        </div>

        <SidebarUserProfile
          username={user?.username || ''}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Sidebar;