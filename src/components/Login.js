import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import './Login.css'; // Import the CSS file

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCGxYuVK8K5CYQAhbYbHf9VCkSfCdvEQSw",
    authDomain: "mail-dc436.firebaseapp.com",
    projectId: "mail-dc436",
    storageBucket: "mail-dc436.appspot.com",
    messagingSenderId: "34622970017",
    appId: "1:34622970017:web:a92267616e006ae63078e0",
    measurementId: "G-JYG2W6RKBN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = ({ onStudentLogin, onAdminLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle Username/Password Login (Admin Login)
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            localStorage.setItem('authToken', response.data.token);
            onAdminLogin(); // Call the admin login handler
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    // Handle Google Login (Student Login)
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            localStorage.setItem('authToken', token);
            onStudentLogin(); // Call the student login handler
        } catch (err) {
            setError('Google authentication failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login as Admin</button>
            </form>
            <div className="google-container">
                <button onClick={handleGoogleLogin} className="google">
                    Sign in with Google (Student)
                </button>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
