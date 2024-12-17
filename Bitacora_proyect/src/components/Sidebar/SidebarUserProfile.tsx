
import { Button } from 'react-bootstrap';

interface SidebarUserProfileProps {
    username: string;
    onLogout: () => void;
}

const SidebarUserProfile = ({ username, onLogout }: SidebarUserProfileProps) => {
    return (
        <div className="border-top p-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    <span className="fw-bold">{username}</span>
                </div>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={onLogout}
                    className="d-flex align-items-center"
                >
                    <i className="bi bi-box-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
};

export default SidebarUserProfile;