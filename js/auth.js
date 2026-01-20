// Authentication Module - Login and Registration

// Initialize function on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthLink();
    loadCartCount();
});

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Basic validation
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Get all registered users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        showAuthMessage('Invalid username or password', 'error');
        return;
    }
    
    // Login successful
    localStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        email: user.email,
        id: user.id
    }));
    
    showAuthMessage('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirmPassword = document.getElementById('reg-confirm').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    // Validation
    if (!username || !email || !password || !confirmPassword || !gender) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (username.length < 3) {
        showAuthMessage('Username must be at least 3 characters', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthMessage('Passwords do not match', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        showAuthMessage('Username already taken', 'error');
        return;
    }
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showAuthMessage('Email already registered', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        gender,
        registeredDate: new Date().toLocaleDateString()
    };
    
    // Add user to database
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after registration
    localStorage.setItem('currentUser', JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        id: newUser.id
    }));
    
    showAuthMessage('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show auth message
function showAuthMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 2000;
        font-weight: 600;
        animation: slideDown 0.3s ease;
        ${type === 'error' ? 'background: linear-gradient(135deg, #ff4757 0%, #ff3838 100%);' : 'background: linear-gradient(135deg, #2ed573 0%, #26de81 100%);'}
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Update auth link based on login status
function updateAuthLink() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('authLink');
    
    if (user && authLink) {
        authLink.innerHTML = `<i class="fa fa-user"></i> ${user.username}`;
        authLink.href = '#';
        authLink.onclick = function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        };
    }
}

// Load cart count
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}
