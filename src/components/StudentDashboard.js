// src/components/StudentDashboard.js
import React, { useState } from 'react';
import NotificationPreferences from './NotificationPreferences';

const StudentDashboard = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);

    const handleCheckHistory = () => setShowHistory(!showHistory);
    const handleUpdateProfile = () => setShowProfileForm(!showProfileForm);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        setShowProfileForm(false);
    };

    return (
        <div id="studentDashboard" className="dashboard">
            <h2>Student Dashboard</h2>
            <div className="dashboard-content">
                <p>Status: <span id="emailStatus" className="status active">Active</span></p>
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
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </form>
                </div>
                <NotificationPreferences />
            </div>
        </div>
    );
};

export default StudentDashboard;