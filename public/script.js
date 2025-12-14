document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Form validation
    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username && password) {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
        }
    }
    
    // Add input listeners for validation
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    
    // Initial validation
    validateForm();
    
    // Handle form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validate inputs
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Disable button and show loading state
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
        
        try {
            // Send login data to backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Login details submitted successfully!', 'success');
                console.log('Backend response:', data);
                
                // Clear form after successful submission
                setTimeout(() => {
                    loginForm.reset();
                    validateForm();
                }, 2000);
            } else {
                showMessage('Login failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please try again.', 'error');
        } finally {
            // Re-enable button
            loginBtn.disabled = false;
            loginBtn.textContent = 'Log In';
        }
    });
    
    // Function to show messages
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        // Insert message before form
        const loginBox = document.querySelector('.login-box');
        const form = document.getElementById('loginForm');
        loginBox.insertBefore(messageDiv, form);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            // Check if element still exists before removing
            if (messageDiv && messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});
