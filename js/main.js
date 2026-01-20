// Book Store - Main JavaScript File
// This file contains core functionality for the book store

// Book Database
const bookDatabase = [
    { id: 1, title: "Adventure Quest", category: "Adventure", price: 200, rating: 4.5, image: "./images/Adv1.jfif" },
    { id: 2, title: "Mountain Explorer", category: "Adventure", price: 250, rating: 4.8, image: "./images/Adv2.jfif" },
    { id: 3, title: "Lost Wilderness", category: "Adventure", price: 180, rating: 4.3, image: "./images/Adv3.jfif" },
    { id: 4, title: "Desert Journey", category: "Adventure", price: 460, rating: 4.6, image: "./images/Adv4.jfif" },
    { id: 5, title: "Ocean Depths", category: "Adventure", price: 390, rating: 4.7, image: "./images/Adv5.jfif" },
    { id: 6, title: "Midnight Mystery", category: "Thriller", price: 220, rating: 4.4, image: "./images/th1.jfif" },
    { id: 7, title: "Dark Secrets", category: "Thriller", price: 240, rating: 4.5, image: "./images/th2.jfif" },
    { id: 8, title: "Twisted Tales", category: "Thriller", price: 210, rating: 4.2, image: "./images/th3.jfif" },
    { id: 9, title: "Silent Killer", category: "Thriller", price: 275, rating: 4.7, image: "./images/th4.jfif" },
    { id: 10, title: "Revenge", category: "Thriller", price: 255, rating: 4.4, image: "./images/th5.jfif" },
    { id: 11, title: "Hearts Entwined", category: "Romantic", price: 190, rating: 4.6, image: "./images/r1.jfif" },
    { id: 12, title: "Love Unbound", category: "Romantic", price: 210, rating: 4.5, image: "./images/r2.jfif" },
    { id: 13, title: "Eternal Romance", category: "Romantic", price: 230, rating: 4.7, image: "./images/r3.jfif" },
    { id: 14, title: "Second Chance", category: "Romantic", price: 200, rating: 4.3, image: "./images/r4.jfif" },
    { id: 15, title: "Fate's Plan", category: "Romantic", price: 220, rating: 4.6, image: "./images/r5.jfif" },
    { id: 16, title: "Laugh Out Loud", category: "Comedy", price: 150, rating: 4.2, image: "./images/c1.jfif" },
    { id: 17, title: "Funny Business", category: "Comedy", price: 170, rating: 4.4, image: "./images/c2.jfif" },
    { id: 18, title: "Hilarious Tales", category: "Comedy", price: 160, rating: 4.1, image: "./images/c3.jfif" },
    { id: 19, title: "Comic Relief", category: "Comedy", price: 180, rating: 4.3, image: "./images/c4.jfif" },
    { id: 20, title: "Laughter Therapy", category: "Comedy", price: 140, rating: 4.5, image: "./images/c5.jfif" }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedBooks();
    updateAuthLink();
    loadCartCount();
});

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    
    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Load featured books on homepage
function loadFeaturedBooks() {
    const featuredBooks = document.getElementById('featuredBooks');
    if (!featuredBooks) return;
    
    // Display first 8 books as featured
    const featured = bookDatabase.slice(0, 8);
    
    featuredBooks.innerHTML = featured.map(book => `
        <div class="image-holder">
            <img src="${book.image}" alt="${book.title}">
            <div class="desc">
                <div class="book-title">${book.title}</div>
                <div class="book-rating">${'★'.repeat(Math.floor(book.rating))} (${book.rating})</div>
                <div class="book-price">$${book.price}</div>
                <button onclick="addToCart(${book.id}, '${book.title}', ${book.price})">
                    <i class="fa fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartCount();
    
    // Show notification
    showNotification(`${title} added to cart!`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load cart count
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Open cart modal
function openCart(e) {
    e.preventDefault();
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    displayCartItems();
}

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
}

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>Price: $${item.price}</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <p>Subtotal: $${itemTotal}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa fa-trash"></i> Remove
                </button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total;
}

// Update quantity
function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        loadCartCount();
    }
}

// Remove from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    loadCartCount();
    showNotification('Item removed from cart');
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Please login to continue checkout');
        window.location.href = 'login.html';
        return;
    }
    
    // Redirect to checkout
    window.location.href = 'checkout.html';
}

// Update auth link based on login status
function updateAuthLink() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('authLink');
    
    if (user && authLink) {
        authLink.innerHTML = `<i class="fa fa-user"></i> ${user.username}`;
        authLink.href = '#';
        authLink.onclick = function(e) {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        };
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
