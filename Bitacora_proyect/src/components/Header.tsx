import React from 'react';

const Header: React.FC = () => (
  <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center">
      <i className='bi bi-router m-2' style={{ color: 'black', fontSize: '40px' }} />
        <span className="d-none d-lg-block" style={{ color: 'black' }}>ConexionSegura</span>
      </a>
      <i id='sisdebarbuton' className="bi bi-list toggle-sidebar-btn"></i>
    </div>

    
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <li className="nav-item dropdown" >
          <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown" style={{ color: 'black' }}>
            <i className="bi bi-bell"></i>
            <span className="badge bg-secondary badge-number">5</span>
          </a>
        </li>

      </ul>
    </nav>
  </header>
);

export default Header;