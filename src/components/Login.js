import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [error, setError] = useState('');

    // Set up Recaptcha
    const setUpRecaptcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        // reCAPTCHA solved - allow user to proceed with phone sign-in.
                        handlePhoneLogin();
                    },
                    'expired-callback': () => {
                        // Handle expired reCAPTCHA
                        setError('Recaptcha expired, please try again');
                    }
                },
                auth // Ensure you pass the `auth` object here
            );
        } catch (error) {
            console.error("Error setting up RecaptchaVerifier", error);
            setError("Failed to set up RecaptchaVerifier");
        }
    };
    

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

    // Handle Phone Login (Student Login)
    const handlePhoneLogin = async (e) => {
        e.preventDefault();
        setUpRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
        } catch (err) {
            setError('Phone authentication failed');
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        try {
            const credential = await auth.PhoneAuthProvider.credential(verificationId, otp);
            await auth.signInWithCredential(credential);
            const token = await auth.currentUser.getIdToken();
            localStorage.setItem('authToken', token);
            onStudentLogin(); // Call the student login handler
        } catch (err) {
            setError('Invalid OTP');
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

            <div className="phone-container">
                <form onSubmit={handlePhoneLogin}>
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <button type="submit">Send OTP</button>
                </form>
                {verificationId && (
                    <form onSubmit={handleVerifyOtp}>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                )}
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Login;
