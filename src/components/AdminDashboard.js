import React, { useState } from 'react';
import Papa from 'papaparse'; // For parsing CSV files

const AdminDashboard = () => {
    const [showExportForm, setShowExportForm] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [activeStudentsCount, setActiveStudentsCount] = useState(0);
    const [blockedEmailsCount, setBlockedEmailsCount] = useState(0);
    const [showBlockButton, setShowBlockButton] = useState(false);
    const [showUnblockButton, setShowUnblockButton] = useState(false);
    const [logMessage, setLogMessage] = useState('');
    const [auditLogs, setAuditLogs] = useState([]);

    const handleProcessCSV = () => {
        const file = document.getElementById('csvFile').files[0];
        const logOutput = document.getElementById('logOutput');
        
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    const emails = result.data.map(row => row.email).filter(email => email);
                    setEmailList(emails);
                    setActiveStudentsCount(emails.length); // Assuming each email represents an active student
                    setBlockedEmailsCount(0); // Assuming blocked emails count is 0 initially
                    setShowBlockButton(true);
                    setShowUnblockButton(true);
                    setAuditLogs(prevLogs => [...prevLogs, 'CSV file processed successfully']);
                    setLogMessage('CSV file processed successfully.');
                },
                error: (error) => {
                    setLogMessage('Error processing CSV file.');
                }
            });
        } else {
            setLogMessage('Please upload a CSV file first.');
        }
    };

    const handleBlockEmails = () => {
        // Simulate blocking emails
        console.log('Blocking emails:', emailList);
        setBlockedEmailsCount(emailList.length); // Update blocked emails count
        setLogMessage('Emails blocked successfully!');
        setAuditLogs(prevLogs => [...prevLogs, 'Emails blocked successfully']);
    };

    const handleUnblockEmails = () => {
        // Simulate unblocking emails
        console.log('Unblocking emails:', emailList);
        setBlockedEmailsCount(0); // Update blocked emails count
        setLogMessage('Emails unblocked successfully!');
        setAuditLogs(prevLogs => [...prevLogs, 'Emails unblocked successfully']);
    };

    const handleExportLogs = () => setShowExportForm(!showExportForm);

    const handleExportSubmit = (e) => {
        e.preventDefault();
        alert('Logs exported successfully!');
        setShowExportForm(false);
    };

    const handleClearLogs = () => {
        setAuditLogs([]); // Clear all audit logs
        setLogMessage(''); // Clear the log message
    };

    return (
        <div id="adminDashboard" className="dashboard">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-content">
                <input type="file" id="csvFile" className="file-input" />
                <button id="processCSV" className="btn-primary" onClick={handleProcessCSV}>
                    Process CSV
                </button>
                <div id="logOutput" className="log-output">{logMessage}</div>
                {showBlockButton && (
                    <button id="blockEmails" className="btn-secondary" onClick={handleBlockEmails}>
                        Block Emails
                    </button>
                )}
                {showUnblockButton && (
                    <button id="unblockEmails" className="btn-secondary" onClick={handleUnblockEmails}>
                        Unblock Emails
                    </button>
                )}
                <button id="exportLogs" className="btn-secondary" onClick={handleExportLogs}>
                    Export Logs
                </button>
                <button id="clearLogs" className="btn-secondary" onClick={handleClearLogs}>
                    Clear Logs
                </button>
                <div id="exportForm" className={showExportForm ? 'export-form' : 'hidden'}>
                    <h3>Export Logs</h3>
                    <form id="exportLogsForm" onSubmit={handleExportSubmit}>
                        <label htmlFor="exportFormat">Format:</label>
                        <select id="exportFormat" name="exportFormat">
                            <option value="csv">CSV</option>
                            <option value="xlsx">Excel</option>
                        </select>
                        <button type="submit" className="btn-primary">Export</button>
                    </form>
                </div>
                <div className="dashboard-analytics">
                    <h3>Analytics</h3>
                    <p>Active Students: <span id="activeStudentsCount">{activeStudentsCount}</span></p>
                    <p>Blocked Emails: <span id="blockedEmailsCount">{blockedEmailsCount}</span></p>
                </div>
                <div className="audit-log-section">
                    <h3>Audit Logs</h3>
                    <div id="auditLogsOutput" className="log-output">
                        {auditLogs.map((log, index) => (
                            <p key={index}>{log}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
