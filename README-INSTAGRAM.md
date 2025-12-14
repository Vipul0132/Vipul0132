# Instagram Login Page with Backend

A fully functional Instagram login page clone with backend server to capture and process login details.

## Features

- 🎨 Authentic Instagram UI design
- 📱 Fully responsive layout
- ✅ Form validation
- 🔐 Backend API to capture login details
- 📊 API endpoint to view all login attempts
- 🚀 Built with Node.js and Express

## Project Structure

```
.
├── server.js           # Express backend server
├── package.json        # Node.js dependencies
├── public/
│   ├── index.html     # Instagram login page UI
│   ├── style.css      # Styling
│   └── script.js      # Frontend JavaScript for form handling
└── README-INSTAGRAM.md # This file
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Vipul0132/Vipul0132.git
cd Vipul0132
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Backend API Endpoints

### POST /api/login
Submit login credentials to the backend.

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login details received",
  "data": {
    "username": "user@example.com",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### GET /api/login-attempts
View all captured login attempts.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "attempts": [
    {
      "username": "user@example.com",
      "password": "password123",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "ipAddress": "::1"
    }
  ]
}
```

## How It Works

1. **Frontend**: The user opens `http://localhost:3000` and sees the Instagram login page
2. **Form Validation**: JavaScript validates the form inputs in real-time
3. **Form Submission**: When the user submits the form, the data is sent to the backend via POST request
4. **Backend Processing**: 
   - The Express server receives the login details
   - Logs them to the console
   - Stores them in memory (array)
   - Returns a success response
5. **User Feedback**: The frontend displays a success message to the user

## Backend Console Output

When a user submits the login form, you'll see the following in the console:

```
Login attempt received:
Username: user@example.com
Password: password123
Timestamp: 2024-01-01T12:00:00.000Z
-------------------
```

## Viewing Captured Data

While the server is running, you can view all captured login attempts by visiting:
```
http://localhost:3000/api/login-attempts
```

Or using curl:
```bash
curl http://localhost:3000/api/login-attempts
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with Instagram-inspired design

## Security Note

⚠️ **CRITICAL - EDUCATIONAL PURPOSE ONLY**: This is a demonstration project for educational purposes only. 

**Known Security Issues:**
- ❌ Stores passwords in plain text (never do this in production!)
- ❌ Logs passwords to console (security risk)
- ❌ No rate limiting (vulnerable to brute force attacks)
- ❌ No HTTPS (credentials transmitted in plain text)
- ❌ Public endpoint exposes all login attempts without authentication
- ❌ In-memory storage (data lost on restart)
- ❌ No CSRF protection
- ❌ No input sanitization beyond basic validation

**In a production environment, you MUST:**
- ✅ Use HTTPS exclusively
- ✅ Hash and salt passwords (use bcrypt or argon2)
- ✅ Store data in a secure database
- ✅ Implement proper authentication and authorization
- ✅ Add rate limiting to prevent brute force attacks
- ✅ Implement CSRF protection
- ✅ Sanitize and validate all inputs
- ✅ Never log sensitive information
- ✅ Use secure session management
- ✅ Implement multi-factor authentication

## Development

To modify the project:

- **Frontend UI**: Edit `public/index.html` and `public/style.css`
- **Frontend Logic**: Edit `public/script.js`
- **Backend Logic**: Edit `server.js`

## License

MIT License - Educational purposes only

## Disclaimer

This project is created for educational purposes to demonstrate full-stack development. It is not affiliated with Instagram or Meta Platforms, Inc.
