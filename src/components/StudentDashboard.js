// src/components/StudentDashboard.js
import React, { useState } from 'react';
import NotificationPreferences from './NotificationPreferences';
import './StudentDashboard.css';  // Import the CSS file


const StudentDashboard = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [lastLogin, setLastLogin] = useState('September 7, 2024 10:00 AM');

    const handleCheckHistory = () => setShowHistory(!showHistory);
    const handleUpdateProfile = () => setShowProfileForm(!showProfileForm);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        setShowProfileForm(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    return (
        <div id="studentDashboard" className="dashboard">
            <h2>Student Dashboard</h2>
            <div className="dashboard-content">
                <p>Status: <span id="emailStatus" className="status active">Active</span></p>
                <p>Last Login: <span id="lastLogin" className="login-time">{lastLogin}</span></p>

                <button id="checkHistory" className="btn-primary" onClick={handleCheckHistory}>
                    View Action History
                </button>
                <div id="actionHistory" className={showHistory ? 'history-list' : 'hidden'}>
                    <p>Action History: This is where action history will be displayed.</p>
                </div>

                <button id="updateProfile" className="btn-secondary" onClick={handleUpdateProfile}>
                    Update Profile
                </button>
                <div id="profileForm" className={showProfileForm ? 'profile-form' : 'hidden'}>
                    <h3>Update Profile</h3>
                    <form id="updateProfileForm" onSubmit={handleProfileSubmit}>
                        <label htmlFor="studentName">Name:</label>
                        <input type="text" id="studentName" name="studentName" required />

                        <label htmlFor="studentEmail">Email:</label>
                        <input type="email" id="studentEmail" name="studentEmail" required />

                        <label htmlFor="profileImage">Profile Image:</label>
                        <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
                        {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}

                        <button type="submit" className="btn-primary">Save Changes</button>
                    </form>
                </div>

                <NotificationPreferences />

                <div className="notifications-toggle">
                    <label htmlFor="notificationsToggle">Enable Notifications:</label>
                    <input
                        type="checkbox"
                        id="notificationsToggle"
                        checked={notificationsEnabled}
                        onChange={toggleNotifications}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
