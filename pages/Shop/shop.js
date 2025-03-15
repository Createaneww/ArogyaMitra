let cart = [];

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
  let checkoutUrl = "https://YOUR_STORE_DOMAIN.myshopify.com/cart/";
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

// AI Recommendations
async function getAIRecommendations(userInput) {
  const apiKey = "YOUR_OPENAI_API_KEY";
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
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
    }),
  });

  const data = await response.json();
  document.getElementById(
    "recommendation-output"
  ).innerHTML = `<p>${data.choices[0].message.content}</p>`;
  document.getElementById("recommendation-output").style.display = "block";
}

function showRecommendations() {
  let userInput = prompt("What are you looking for?");
  if (userInput) getAIRecommendations(userInput);
}
