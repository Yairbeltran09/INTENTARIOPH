import CoralLogo from '../../assets/icons8-coral-100.png';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

const Header = () => {
  return (
    <header className="p-3 navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm"> 
      <div className="container-fluid">
        <div className="d-flex align-items-center flex-grow-1">
          <a href="#" className="navbar-brand d-inline-flex align-items-center m-0 p-0 me-lg-6 me-xl-9 p-1 rounded text-reset">
            <img src={CoralLogo} alt="Coral Logo" className="img-fluid" style={{ width: '50px' }} />
            <h2 className="d-none d-md-block fw-semibold fs-5 ls-wide ms-2 mb-0">CORAL</h2>
          </a>
        </div>
      </div>
      <div className="container-fluid px-4">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
