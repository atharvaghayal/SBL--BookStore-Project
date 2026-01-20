# Turning Pages - Online Book Store

## Project Overview

Turning Pages is a fully functional, responsive online book store web application built with HTML5, CSS3, and vanilla JavaScript. It provides a complete shopping experience with user authentication, product browsing, shopping cart management, and checkout functionality.

## Features

### ✨ Core Features

#### 1. **User Authentication**
- User registration with validation
- User login system
- Session management using localStorage
- User logout functionality
- Protected checkout (requires login)

#### 2. **Product Browsing**
- Display of books organized by categories (Adventure, Thriller, Romantic, Comedy)
- Product filtering by category
- Price range filtering
- Sorting options (Price: Low to High, High to Low, Rating)
- Responsive product grid layout
- Product ratings and prices

#### 3. **Shopping Cart**
- Add/remove items from cart
- Quantity adjustment
- Real-time cart count display
- Cart totals calculation
- Persistent cart storage (localStorage)

#### 4. **Checkout System**
- Shipping information form
- Multiple delivery options (Standard, Express, Overnight)
- Order summary with itemized breakdown
- Total amount calculation with shipping fees
- Order confirmation page
- Order history storage

#### 5. **Responsive Design**
- Mobile-first approach
- Breakpoints for all screen sizes (480px, 768px, 1024px, 1200px+)
- Hamburger menu for mobile navigation
- Flexible grid layouts
- Touch-friendly buttons and inputs

## 🎨 UI/UX Features

### Design Highlights
- Modern gradient color scheme (Purple & Blue)
- Smooth animations and transitions
- Hover effects on interactive elements
- Clean and intuitive navigation
- Professional typography
- Consistent branding throughout

### Responsive Breakpoints
- **Mobile (≤480px)**: Single column layouts, optimized touch targets
- **Tablet (481-768px)**: Two column grids, adjusted spacing
- **Desktop (769-1024px)**: Three column grids, full features
- **Large Desktop (>1024px)**: Full-featured experience

## 📁 Project Structure

```
Book-Store/
├── index.html              # Home page
├── products.html           # Products/Catalog page
├── login.html             # Login page
├── Register.html          # Registration page
├── checkout.html          # Checkout page
├── About.html            # About page (new design)
├── About-new.html        # Updated About page
│
├── css/
│   ├── style.css         # Main/Home page styles
│   ├── product_style.css # Products page styles
│   ├── login.css         # Login/Register styles
│   ├── checkout.css      # Checkout page styles
│   └── about.css         # About page styles
│
├── js/
│   ├── main.js           # Core app logic, product management
│   ├── products.js       # Product filtering and sorting
│   ├── cart.js           # Cart utilities
│   ├── auth.js           # Authentication logic
│   └── checkout.js       # Checkout processing
│
└── images/
    ├── Adv1.jfif - Adv5.jfif     # Adventure books
    ├── th1.jfif - th8.jfif        # Thriller books
    ├── r1.jfif - r8.jfif          # Romantic books
    ├── c1.jfif - c8.jfif          # Comedy books
    └── p1.jfif - p6.jfif          # Team member photos
```

## 🚀 Key JavaScript Functions

### Authentication (auth.js)
- `handleLogin(event)` - Process user login
- `handleRegister(event)` - Process user registration
- `updateAuthLink()` - Update navbar based on login status
- `showAuthMessage(message, type)` - Display notifications

### Product Management (main.js)
- `loadFeaturedBooks()` - Load featured products on homepage
- `addToCart(id, title, price)` - Add product to cart
- `loadCartCount()` - Update cart count badge

### Shopping Cart (cart.js & main.js)
- `openCart(event)` - Open cart modal
- `closeCart()` - Close cart modal
- `updateQuantity(id, change)` - Adjust item quantity
- `removeFromCart(id)` - Remove item from cart
- `displayCartItems()` - Render cart contents

### Product Filtering (products.js)
- `filterProducts()` - Apply filters to products
- `sortProducts()` - Sort products by selected criteria
- `clearFilters()` - Reset all filters

### Checkout (checkout.js)
- `loadOrderSummary()` - Display order details
- `handleCheckout(event)` - Process checkout form
- `showSuccessModal(order)` - Show order confirmation

## 💾 Data Storage

All data is stored in browser's localStorage:
- `cart` - Current shopping cart items
- `users` - Registered user accounts
- `currentUser` - Logged-in user information
- `orders` - Order history

## 🔒 Security Features

- Email validation
- Password validation (minimum 6 characters)
- Confirm password matching
- Phone number validation
- ZIP code validation
- Duplicate username/email prevention
- Session-based authentication

## 🎯 Navigation Flow

```
Home (index.html)
  ├── Products (products.html)
  │   ├── Browse by category
  │   ├── Filter & sort
  │   └── Add to cart
  │
  ├── Login (login.html)
  │   └── Proceed to checkout
  │
  ├── Register (Register.html)
  │   └── Create account
  │
  ├── About (About.html)
  │   └── Learn about us
  │
  └── Checkout (checkout.html)
      ├── Shipping info
      ├── Delivery method
      └── Order confirmation
```

## 📱 Device Compatibility

- ✅ Mobile phones (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Large screens (1200px+)
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)

## 🎨 Color Scheme

- **Primary Gradient**: #667eea to #764ba2
- **Secondary**: #f8f9fa
- **Text**: #333
- **Accent Gold**: #ffd700
- **Success Green**: #2ed573
- **Error Red**: #ff4757

## 📦 Book Categories

1. **Adventure**: Thrilling stories of exploration and discovery
2. **Thriller**: Suspenseful tales that keep you on edge
3. **Romantic**: Heartwarming love stories
4. **Comedy**: Humorous and entertaining reads

## 🛒 Shopping Features

- Browse 20+ books across 4 categories
- Real-time cart updates
- Quantity management
- Multiple delivery options
- Order tracking (orders saved in browser)
- Comprehensive checkout process

## 📋 Form Validations

### Login/Register
- Username (3+ characters)
- Email (valid format)
- Password (6+ characters)
- Confirm password matching
- Gender selection

### Checkout
- Name fields required
- Valid email format
- Valid phone number
- Complete address
- Valid ZIP code

## 🎬 Animation Effects

- Fade-in animations
- Slide transitions
- Hover scale effects
- Cart notification animations
- Button elevation on hover
- Smooth page transitions

## 🔄 Order Processing Flow

1. User adds books to cart
2. Views cart and proceeds to checkout
3. Logs in (if not already)
4. Fills shipping information
5. Selects delivery method
6. Reviews order summary
7. Completes checkout
8. Order confirmation displayed
9. Order saved to localStorage

## 🎓 Learning Outcomes

This project demonstrates:
- HTML5 semantic markup
- CSS3 responsive design
- Vanilla JavaScript (no frameworks)
- LocalStorage API usage
- Form validation
- Event handling
- DOM manipulation
- ES6+ features (arrow functions, template literals, destructuring)
- Responsive design patterns
- UX best practices

## 🚀 Future Enhancements

Potential additions:
- Backend integration with Node.js/Express
- Real payment gateway integration
- User profiles and order history
- Book reviews and ratings
- Wishlist functionality
- Search functionality
- Admin dashboard
- Email notifications
- Multi-language support

## 📝 Notes

- This is a **front-end only** application
- No actual payment processing occurs
- All data is stored locally in the browser
- Perfect for learning and demonstration purposes
- Can be easily extended with backend integration

## 👨‍💻 Team

- **Atharva Ghayal** - Founder & CEO
- **Arihant Kamble** - Creative Director
- **Himanshu Jain** - Lead Developer

## 📄 License

This project is for educational purposes.

---

**Enjoy exploring Turning Pages! 📚✨**
