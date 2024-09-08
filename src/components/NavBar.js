import React from 'react';

const NavBar = ({ onStudentClick, onAdminClick, theme, onThemeChange }) => {
    return (
        <nav>
            <div className="nav-wrapper">
                
                <a href="#" onClick={onAdminClick} className="nav-link">BIT MAIL MANAGEMENT SYSTEM</a>
                
            </div>
        </nav>
    );
};

export default NavBar;
