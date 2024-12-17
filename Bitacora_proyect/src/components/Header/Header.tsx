
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

const Header = () => {
  return (
    <header className="p-3 navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom">
      <div className="container-fluid px-4">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;