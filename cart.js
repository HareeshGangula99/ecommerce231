"use strict";
let cartItems = [];
// Load cart from localStorage
function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) {
        cartItems = JSON.parse(saved);
    }
    updateCartCount();
}
// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
}
// Update cart count display
function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const countElements = document.querySelectorAll("#cartCount");
    countElements.forEach(el => {
        if (el)
            el.textContent = totalItems.toString();
    });
}
// Add to cart function
function addToCart(id, title, price, image) {
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cartItems.push({
            id: id,
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
    }
    saveCart();
    alert(`${title.substring(0, 30)} added to cart!`);
    updateCartCount();
}
// Remove one quantity
function removeFromCart(id) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        }
        else {
            cartItems.splice(index, 1);
        }
        saveCart();
        displayCart();
    }
}
// Delete item completely
function deleteFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    saveCart();
    displayCart();
}
// Display cart items
function displayCart() {
    const cartContainer = document.getElementById("cartItems");
    const totalContainer = document.getElementById("cartTotal");
    if (!cartContainer)
        return;
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center;'>Your cart is empty</p>";
        if (totalContainer)
            totalContainer.innerHTML = "0";
        return;
    }
    cartContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" width="80" height="80" style="object-fit:contain;">
      <div style="flex:1;">
        <h4>${item.title.substring(0, 40)}</h4>
        <p>Price: $${item.price}</p>
        <div class="quantity-controls">
          <button onclick="removeFromCart(${item.id})">-</button>
          <span style="margin:0 10px;">${item.quantity}</span>
          <button onclick="addToCart(${item.id}, '${item.title.replace(/'/g, "\\'")}', ${item.price}, '${item.image}')">+</button>
          <button class="delete-btn" onclick="deleteFromCart(${item.id})">Delete</button>
        </div>
        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  `).join("");
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalContainer) {
        totalContainer.innerHTML = total.toFixed(2);
    }
}
// Get total price
function getTotalPrice() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
// Navigation functions
function goToCart() {
    window.location.href = "cart.html";
}
// function proceedToAddress() {
//   if (cartItems.length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }
//   window.location.href = "address.html";
// }
function proceedToAddress() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "address.html";
}
window.proceedToAddress = proceedToAddress;
function placeOrder() {
    const name = document.getElementById("name")?.value;
    const address = document.getElementById("address")?.value;
    const city = document.getElementById("city")?.value;
    const pincode = document.getElementById("pincode")?.value;
    const phone = document.getElementById("phone")?.value;
    if (!name || !address || !city || !pincode || !phone) {
        alert("Please fill all address fields");
        return;
    }
    const orderDetails = {
        name,
        address,
        city,
        pincode,
        phone,
        items: cartItems,
        total: getTotalPrice(),
        date: new Date().toISOString()
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    window.location.href = "payment.html";
}
function goToPayment() {
    window.open("https://razorpay.me/@gangulaharish", "_blank");
}
function confirmPayment() {
    localStorage.removeItem("cart");
    cartItems = [];
    alert("Payment successful! Thank you for your order!");
    window.location.href = "index.html";
}
// Make functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.deleteFromCart = deleteFromCart;
window.goToCart = goToCart;
window.proceedToAddress = proceedToAddress;
window.placeOrder = placeOrder;
window.goToPayment = goToPayment;
window.confirmPayment = confirmPayment;
// Initialize
loadCart();
