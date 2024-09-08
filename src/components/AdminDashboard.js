import React, { useState } from 'react';
import Papa from 'papaparse';

const AdminDashboard = () => {
    const [showExportForm, setShowExportForm] = useState(false);
    const [emailList, setEmailList] = useState([]);
    const [activeStudentsCount, setActiveStudentsCount] = useState(0);
    const [blockedEmailsCount, setBlockedEmailsCount] = useState(0);
    const [showBlockButton, setShowBlockButton] = useState(false);
    const [showUnblockButton, setShowUnblockButton] = useState(false);
    const [logMessage, setLogMessage] = useState('');
    const [auditLogs, setAuditLogs] = useState([]);
    const [filterDomain, setFilterDomain] = useState('');
    const [errorLogs, setErrorLogs] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const handleProcessCSV = () => {
        const file = document.getElementById('csvFile').files[0];
        const logOutput = document.getElementById('logOutput');

        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    const emails = result.data
                        .map(row => row.email)
                        .filter(email => email && (!filterDomain || email.endsWith(filterDomain)));
                    
                    setEmailList(emails);
                    setActiveStudentsCount(emails.length);
                    setBlockedEmailsCount(0);
                    setShowBlockButton(true);
                    setShowUnblockButton(true);
                    setAuditLogs(prevLogs => [...prevLogs, 'CSV file processed successfully']);
                    setLogMessage('CSV file processed successfully.');
                },
                error: (error) => {
                    setErrorLogs(prevErrors => [...prevErrors, error.message]);
                    setLogMessage('Error processing CSV file.');
                }
            });
        } else {
            setLogMessage('Please upload a CSV file first.');
        }
    };

    const handleBlockEmails = () => {
        console.log('Blocking emails:', emailList);
        setBlockedEmailsCount(emailList.length);
        setLogMessage('Emails blocked successfully!');
        setAuditLogs(prevLogs => [...prevLogs, 'Emails blocked successfully']);
    };

    const handleUnblockEmails = () => {
        console.log('Unblocking emails:', emailList);
        setBlockedEmailsCount(0);
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
        setAuditLogs([]);
        setLogMessage('');
    };

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div id="adminDashboard" className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
            <h2>Admin Dashboard</h2>
            <div className="dashboard-content">
                <label htmlFor="domainFilter">Filter by domain:</label>
                <input
                    type="text"
                    id="domainFilter"
                    placeholder="@example.com"
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                />
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
                <button id="toggleDarkMode" className="btn-secondary" onClick={handleToggleDarkMode}>
                    Toggle Dark Mode
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
                    <h3>Error Logs</h3>
                    <div id="errorLogsOutput" className="log-output">
                        {errorLogs.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
