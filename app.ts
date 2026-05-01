interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// Add navbar HTML
const navbar = `
  <div class="navbar">
    <h1>Products List</h1>
    <div class="cart-icon" onclick="goToCart()">
      🛒 Cart (<span id="cartCount">0</span>)
    </div>
  </div>
`;

document.body.insertAdjacentHTML('afterbegin', navbar);

// Load products
const container = document.getElementById("products") as HTMLElement;

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then((data: Product[]) => {
    const cards = data.map(product => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title.substring(0, 30)}</h3>
        <p><strong>$${product.price}</strong></p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
          Add to Cart
        </button>
      </div>
    `).join("");
    container.innerHTML = cards;
  })
  .catch(error => {
    console.error("Error loading products:", error);
    container.innerHTML = "<p>Error loading products</p>";
  });

function goToDetails(id: number) {
  window.location.href = `details.html?id=${id}`;
}

(window as any).goToDetails = goToDetails;
export {};