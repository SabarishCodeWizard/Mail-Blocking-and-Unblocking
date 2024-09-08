import React, { useState } from 'react';
import NavBar from './components/NavBar';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import DarkModeToggle from './components/DarkModeToggle';
import Login from './components/Login';

function App() {
    const [isStudentView, setIsStudentView] = useState(false);
    const [isAdminView, setIsAdminView] = useState(false);

    // Handle Google Login Success (Student)
    const handleStudentLogin = () => {
        setIsStudentView(true);
        setIsAdminView(false);
    };

    // Handle Username/Password Login Success (Admin)
    const handleAdminLogin = () => {
        setIsAdminView(true);
        setIsStudentView(false);
    };

    if (!isStudentView && !isAdminView) {
        return <Login onStudentLogin={handleStudentLogin} onAdminLogin={handleAdminLogin} />;
    }

    return (
        <div className="container">
            <NavBar />
            <DarkModeToggle />  
            {isStudentView && <StudentDashboard />}
            {isAdminView && <AdminDashboard />}
        </div>
    );
}

export default App;
