import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) navigate('/login');
        else if (user.role === 'admin') navigate('/admin-dashboard');
        else navigate('/student-dashboard');
    }, [user, navigate]);

    return (
        <div>
            <h2>Welcome, {user?.username}</h2>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

export default Dashboard;
