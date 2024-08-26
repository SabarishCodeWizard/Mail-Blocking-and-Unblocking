import React, { useState } from 'react';
import NavBar from './components/NavBar';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';

function App() {
    const [isStudentView, setIsStudentView] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleStudentClick = () => setIsStudentView(true);
    const handleAdminClick = () => setIsStudentView(false);

    const handleLoginSuccess = () => setIsAuthenticated(true);

    if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="container">
            <NavBar onStudentClick={handleStudentClick} onAdminClick={handleAdminClick} />
            <DarkModeToggle />
            {isStudentView ? <StudentDashboard /> : <AdminDashboard />}
        </div>
    );
}

export default App;
