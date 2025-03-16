// Shopify API Credentials
const SHOPIFY_API_KEY = "YOUR_SHOPIFY_API_KEY";
const SHOPIFY_ADMIN_TOKEN = "YOUR_ADMIN_API_ACCESS_TOKEN";
const SHOPIFY_STORE_DOMAIN = "YOUR_STORE_NAME.myshopify.com"; // Example: arogya-demo.myshopify.com
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // For AI recommendations

let cart = [];

// Fetch Products from Shopify
async function fetchProducts() {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/products.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display Products on Page
function displayProducts(products) {
  const productContainer = document.getElementById("products");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    let productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.setAttribute("data-category", product.product_type);

    productElement.innerHTML = `
      <img src="${product.images[0]?.src || "placeholder.jpg"}" alt="${
      product.title
    }">
      <h3>${product.title}</h3>
      <p>₹${product.variants[0].price}</p>
      <button onclick="addToCart('${product.id}', '${product.title}', '${
      product.variants[0].price
    }')">
        Add to Cart
      </button>
    `;

    productContainer.appendChild(productElement);
  });
}

// Add Product to Cart
function addToCart(productId, productTitle, productPrice) {
  let item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id: productId,
      title: productTitle,
      price: productPrice,
      quantity: 1,
    });
  }
  updateCartUI();
}

// Update Cart UI
function updateCartUI() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `<p><b>${item.title}</b> - ₹${item.price} x ${item.quantity}</p>`;
    cartContainer.appendChild(cartItem);
  });

  document.getElementById("checkout-btn").style.display = cart.length
    ? "block"
    : "none";
}

// Proceed to Shopify Checkout
function proceedToCheckout() {
  let checkoutUrl = `https://${SHOPIFY_STORE_DOMAIN}/cart/`;
  cart.forEach((item) => {
    checkoutUrl += `${item.id}:${item.quantity},`;
  });
  window.location.href = checkoutUrl;
}

// Filter Products
function filterProducts(category) {
  let allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product) => {
    product.style.display =
      product.getAttribute("data-category") === category || category === "all"
        ? "block"
        : "none";
  });
}

// Search Products
function searchProducts() {
  let query = document.getElementById("search-box").value.toLowerCase();
  let allProducts = document.querySelectorAll(".product");
  allProducts.forEach((product) => {
    let title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(query) ? "block" : "none";
  });
}

// AI Recommendations (Uses OpenAI API)
async function getAIRecommendations(userInput) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI that suggests Ayurvedic products.",
          },
          { role: "user", content: `Recommend products for: ${userInput}` },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch AI response");

    const data = await response.json();
    document.getElementById(
      "recommendation-output"
    ).innerHTML = `<p>${data.choices[0].message.content}</p>`;
    document.getElementById("recommendation-output").style.display = "block";
  } catch (error) {
    console.error("Error with AI recommendation:", error);
  }
}

// Show AI Recommendations
function showRecommendations() {
  let userInput = prompt("What are you looking for?");
  if (userInput) getAIRecommendations(userInput);
}

// Load products when page loads
fetchProducts();
