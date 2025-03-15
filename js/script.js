// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link (for better UX)
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Testimonials Carousel
const testimonialsContainer = document.querySelector(".testimonial-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let scrollAmount = 0;
const scrollStep = 320; // Adjust according to card width

nextBtn.addEventListener("click", () => {
  testimonialsContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  testimonialsContainer.scrollBy({ left: -scrollStep, behavior: "smooth" });
});

// Newsletter Subscription (Fake Demo)
const newsletterForm = document.querySelector(".newsletter");
const emailInput = document.querySelector(".newsletter input");
const subscribeBtn = document.querySelector(".newsletter button");

subscribeBtn.addEventListener("click", () => {
  if (emailInput.value.includes("@") && emailInput.value.includes(".")) {
    alert("Thank you for subscribing!");
    emailInput.value = ""; // Clear input field after subscribing
  } else {
    alert("Please enter a valid email address.");
  }
});
