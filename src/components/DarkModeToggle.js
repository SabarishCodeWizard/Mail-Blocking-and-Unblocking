// src/components/DarkModeToggle.js
import React, { useState } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
            Toggle Dark Mode
        </button>
    );
};

export default DarkModeToggle;