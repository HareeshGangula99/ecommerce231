window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("details");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        container.innerHTML = "<h2>No Product Found</h2>";
        return;
    }
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then((product) => {
        container.innerHTML = `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.title}">
          <h2>${product.title}</h2>
          <h3>Price: $${product.price}</h3>
          <p>${product.description}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
            Add to Cart
          </button>
          <button class="view-cart-btn" onclick="goToCart()">
            View Cart
          </button>
        </div>
      `;
    })
        .catch(error => {
        console.error("Error:", error);
        container.innerHTML = "<h2>Error loading product</h2>";
    });
});
function goToCart() {
    window.location.href = "cart.html";
}
window.goToCart = goToCart;
export {};
