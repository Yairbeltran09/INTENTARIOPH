import React from 'react';
import { ChevronRight } from 'react-feather';

interface SidebarMenuItemProps {
    icon: React.ReactNode;
    title: string;
    isActive: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

const SidebarMenuItem = ({ icon, title, isActive, onClick, children }: SidebarMenuItemProps) => {
    return (
        <li className="nav-item">
            <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                {icon}
                <span className="flex-grow-1 ms-2">{title}</span>
                <ChevronRight size={16} className={isActive ? 'rotate-90' : ''} />
            </a>
            {isActive && children && (
                <ul className="nav flex-column ms-4">
                    {children}
                </ul>
            )}
        </li>
    );
};

export default SidebarMenuItem;