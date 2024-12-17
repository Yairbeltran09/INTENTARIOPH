

const SidebarHeader = () => {
    return (
        <div className="p-3 border-bottom">
            <a href="/" className="d-flex align-items-center text-decoration-none">
                <img src="/logo.png" alt="Logo" height="35" className="d-none d-lg-block" />
                <img src="/logo-sm.png" alt="Logo" height="35" className="d-lg-none" />
            </a>
        </div>
    );
};

export default SidebarHeader;