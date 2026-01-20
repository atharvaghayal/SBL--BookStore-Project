// Products Page - Filter and Display Logic

let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateAuthLink();
    loadCartCount();
});

// Load and display all products
function loadProducts() {
    // Use the bookDatabase from main.js
    allProducts = bookDatabase;
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
}

// Display products in the gallery
function displayProducts(products) {
    const gallery = document.getElementById('productsGallery');
    const productCount = document.getElementById('productCount');
    
    if (products.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
        productCount.textContent = 'No books found';
        return;
    }
    
    gallery.innerHTML = products.map(product => `
        <div class="image-holder">
            <img src="${product.image}" alt="${product.title}">
            <div class="desc">
                <div class="book-title">${product.title}</div>
                <div class="book-category">${product.category}</div>
                <div class="book-rating">${'★'.repeat(Math.floor(product.rating))} (${product.rating})</div>
                <div class="book-price">$${product.price}</div>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">
                    <i class="fa fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    productCount.textContent = `Showing ${products.length} book${products.length !== 1 ? 's' : ''}`;
}

// Filter products based on categories and price
function filterProducts() {
    const selectedCategories = getSelectedCategories();
    const priceRange = getSelectedPriceRange();
    
    filteredProducts = allProducts.filter(product => {
        // Category filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        // Price filter
        let priceMatch = true;
        if (priceRange) {
            const price = product.price;
            if (priceRange === '0-150') priceMatch = price >= 0 && price <= 150;
            else if (priceRange === '150-250') priceMatch = price > 150 && price <= 250;
            else if (priceRange === '250-400') priceMatch = price > 250 && price <= 400;
            else if (priceRange === '400+') priceMatch = price > 400;
        }
        
        return categoryMatch && priceMatch;
    });
    
    sortProducts();
}

// Get selected categories
function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('.category-filter:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Get selected price range
function getSelectedPriceRange() {
    const radios = document.querySelectorAll('input[name="price"]:checked');
    return radios.length > 0 ? radios[0].value : '';
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    
    if (sortValue === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    
    displayProducts(filteredProducts);
}

// Clear all filters
function clearFilters() {
    // Clear checkboxes
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    
    // Clear radio buttons
    document.querySelectorAll('input[name="price"]').forEach(rb => rb.checked = false);
    
    // Clear sort
    document.getElementById('sortSelect').value = '';
    
    // Reset display
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
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
