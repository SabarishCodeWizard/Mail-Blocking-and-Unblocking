import React from 'react';

const NavBar = ({ onStudentClick, onAdminClick, theme, onThemeChange }) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" onClick={onStudentClick} className="nav-link">Student Dashboard</a>
                <a href="#" onClick={onAdminClick} className="nav-link">Admin Dashboard</a>
                <button className="theme-toggle" onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}>
                    Toggle Theme
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
