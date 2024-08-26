

# Admin Dashboard Project

## Overview

This project is an Admin Dashboard application built with React. It includes features for processing CSV files, blocking and unblocking email addresses, exporting logs, and managing notification preferences. The project also supports dark mode and responsive design.

## Features

- **CSV Processing:** Upload and process CSV files to extract and manage email addresses.
- **Email Management:** Block and unblock email addresses based on CSV content.
- **Export Logs:** Export logs in CSV or Excel format.
- **Notification Preferences:** Manage notification settings.
- **Analytics:** View active students and blocked emails.
- **Audit Logs:** Track actions performed in the dashboard.
- **Dark Mode:** Switch between light and dark themes.
- **Responsive Design:** Adapt layout for different screen sizes.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Clone the Repository


### Install Dependencies


### Start the Development Server


The application will be accessible at `http://localhost:3000`.

## File Structure

- `src/`
  - `components/`
    - `AdminDashboard.js` - Admin dashboard with features for managing emails and logs.
    - `DarkModeToggle.js` - Component to toggle dark mode.
    - `Login.js` - Login page component.
    - `NavBar.js` - Navigation bar component.
    - `NotificationPreferences.js` - Manage notification preferences.
    - `StudentDashboard.js` - Student dashboard page.
  - `App.js` - Main application component.
  - `index.js` - Entry point for React application.
- `public/` - Public assets and index.html.
- `package.json` - Project metadata and dependencies.
- `.gitignore` - Files and directories to ignore in version control.
- `README.md` - Project documentation.

## Configuration

### Backend

Ensure your backend server is running and accessible at `http://localhost:5000`. This server handles login authentication and CSV processing.

### Environment Variables

Create a `.env` file in the root directory with the following content:

```
REACT_APP_API_URL=http://localhost:5000
```

## Usage

### Login

1. Open the application.
2. Navigate to the login page.
3. Enter the username `sabarish` and password `1234`.
4. Click "Login" to access the dashboard.

### Admin Dashboard

- **Process CSV:** Upload a CSV file and click "Process CSV" to parse the file.
- **Block Emails:** Click "Block Emails" to block all emails listed in the CSV.
- **Unblock Emails:** Click "Unblock Emails" to unblock all emails listed in the CSV.
- **Export Logs:** Click "Export Logs" to export logs in CSV or Excel format.
- **Clear Logs:** Click "Clear Logs" to remove all logs from the audit log section.

### Notification Preferences

Manage your notification settings by checking or unchecking the respective boxes.

### Dark Mode

Toggle dark mode using the Dark Mode button.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes.
4. Commit your changes and push to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [your email](mailto:youremail@example.com).

---

Feel free to adjust the content, such as repository URLs, contact information, or any other specific details based on your project's needs.