import React, { useState } from 'react';
import './NotificationPreferences.css'; // Import the CSS file for styles

const NotificationPreferences = () => {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [appNotifications, setAppNotifications] = useState(false);
    const [notificationFrequency, setNotificationFrequency] = useState('daily');
    const [successMessage, setSuccessMessage] = useState('');

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'Email') {
            setEmailNotifications(checked);
        } else if (name === 'In-App') {
            setAppNotifications(checked);
        }
        setSuccessMessage('');
    };

    const handleFrequencyChange = (e) => {
        setNotificationFrequency(e.target.value);
    };

    const handleSavePreferences = () => {
        // Here, you can save preferences to local storage, an API, etc.
        setSuccessMessage('Preferences saved successfully!');
    };

    const handleResetPreferences = () => {
        setEmailNotifications(false);
        setAppNotifications(false);
        setNotificationFrequency('daily');
        setSuccessMessage('Preferences reset to default.');
    };

    return (
        <div className="notification-section">
            <h3>Notification Preferences</h3>
            <div className="notification-options">
                <label>
                    <input 
                        type="checkbox" 
                        id="emailNotifications" 
                        name="Email" 
                        checked={emailNotifications} 
                        onChange={handleNotificationChange} 
                    />
                    Email Notifications
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        id="appNotifications" 
                        name="In-App" 
                        checked={appNotifications} 
                        onChange={handleNotificationChange} 
                    />
                    In-App Notifications
                </label>
            </div>
            <div className="notification-frequency">
                <h4>Notification Frequency</h4>
                <label>
                    <input 
                        type="radio" 
                        value="daily" 
                        checked={notificationFrequency === 'daily'} 
                        onChange={handleFrequencyChange} 
                    />
                    Daily
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="weekly" 
                        checked={notificationFrequency === 'weekly'} 
                        onChange={handleFrequencyChange} 
                    />
                    Weekly
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="monthly" 
                        checked={notificationFrequency === 'monthly'} 
                        onChange={handleFrequencyChange} 
                    />
                    Monthly
                </label>
            </div>
            <button onClick={handleSavePreferences} className="btn-primary">Save Preferences</button>
            <button onClick={handleResetPreferences} className="btn-secondary">Reset to Default</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default NotificationPreferences;
