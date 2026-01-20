// Cart Management - Additional cart functions
// This file contains cart-related utilities

const cart = {
    // Get cart from localStorage
    getCart: function() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },
    
    // Save cart to localStorage
    saveCart: function(cartData) {
        localStorage.setItem('cart', JSON.stringify(cartData));
    },
    
    // Get cart total
    getTotal: function() {
        const cartData = this.getCart();
        return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    // Get cart item count
    getItemCount: function() {
        const cartData = this.getCart();
        return cartData.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    // Clear cart
    clearCart: function() {
        localStorage.removeItem('cart');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cart;
}
