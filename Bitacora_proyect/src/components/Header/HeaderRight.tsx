import { useState } from 'react';
import { Clock, Maximize, Minimize } from 'react-feather';

const HeaderRight = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);



    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    return (
        <div className="d-flex align-items-center">


            <button className="btn btn-link text-secondary p-2 me-3 d-none d-sm-block" onClick={toggleFullScreen}>
                {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>


            <div className="dropdown me-3">
                <button className="btn btn-link text-secondary p-2" data-bs-toggle="dropdown">
                    <Clock size={20} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        2
                    </span>
                </button>
            </div>
        </div>
    );
};

export default HeaderRight;