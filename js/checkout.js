// Checkout Page - Order Processing

document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    setupDeliveryOptions();
    updateAuthLink();
});

// Load order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryItems = document.getElementById('summaryItems');
    
    if (cart.length === 0) {
        window.location.href = 'products.html';
        return;
    }
    
    let subtotal = 0;
    summaryItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="summary-item">
                <div>
                    <div class="summary-item-name">${item.title}</div>
                    <div class="summary-item-name" style="font-size: 12px; color: #999;">x${item.quantity}</div>
                </div>
                <div class="summary-item-price">$${itemTotal}</div>
            </div>
        `;
    }).join('');
    
    updateOrderTotal(subtotal);
}

// Setup delivery options
function setupDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            updateOrderTotal(subtotal);
        });
    });
}

// Update order total
function updateOrderTotal(subtotal) {
    const deliveryValue = document.querySelector('input[name="delivery"]:checked').value;
    let deliveryFee = 0;
    let deliveryText = 'FREE';
    
    if (deliveryValue === 'express') {
        deliveryFee = 50;
        deliveryText = '$50';
    } else if (deliveryValue === 'overnight') {
        deliveryFee = 100;
        deliveryText = '$100';
    }
    
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotalPrice').textContent = `$${subtotal}`;
    document.getElementById('deliveryPrice').textContent = deliveryText;
    document.getElementById('totalPrice').textContent = `$${total}`;
}

// Handle checkout submission
function handleCheckout(event) {
    event.preventDefault();
    
    // Validate user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Please login first to complete checkout');
        window.location.href = 'login.html';
        return;
    }
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        country: document.getElementById('country').value.trim(),
        delivery: document.querySelector('input[name="delivery"]:checked').value
    };
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
        !formData.address || !formData.city || !formData.state || !formData.zip || !formData.country) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Validate ZIP
    if (formData.zip.length < 3) {
        alert('Please enter a valid ZIP code');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing (no actual payment gateway)
    setTimeout(() => {
        // Create order
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const deliveryFee = formData.delivery === 'express' ? 50 : formData.delivery === 'overnight' ? 100 : 0;
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + deliveryFee;
        
        const order = {
            orderId: 'ORD' + Date.now(),
            userId: user.id,
            userName: user.username,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            shippingInfo: formData,
            items: cart,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            total: total,
            status: 'Order Confirmed'
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success modal
        showSuccessModal(order);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Show success modal
function showSuccessModal(order) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <div class="success-message">
                <h2>Order Confirmed!</h2>
                <p>Thank you for your purchase!</p>
                <p style="font-size: 12px; color: #999;">
                    Order ID: <strong>${order.orderId}</strong>
                </p>
                <p style="font-size: 14px; margin: 15px 0; color: #333;">
                    Total Amount: <strong>$${order.total}</strong>
                </p>
                <p style="color: #666; font-size: 13px; margin-bottom: 20px;">
                    A confirmation email has been sent to ${order.shippingInfo.email}
                </p>
                <button class="success-button" onclick="location.href='index.html'">Return to Home</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Scroll to modal
    window.scrollTo(0, 0);
}

// Update auth link
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
    } else if (!user) {
        // Redirect to login if not logged in
        setTimeout(() => {
            alert('Please login to complete checkout');
            window.location.href = 'login.html';
        }, 500);
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
