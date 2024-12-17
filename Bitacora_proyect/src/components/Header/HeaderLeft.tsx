
import { AlignLeft, ArrowRight } from 'react-feather';

const HeaderLeft = () => {
    return (
        <div className="d-flex align-items-center">
            <button
                className="navbar-toggler border-0 p-0 me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center">
                <button className="btn btn-link text-secondary p-2 me-2">
                    <AlignLeft size={20} />
                </button>
                <button className="btn btn-link text-secondary p-2 d-none">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default HeaderLeft;