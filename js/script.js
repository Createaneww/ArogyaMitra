// Testimonials Carousel Functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });
}

// Show the first testimonial initially
showTestimonial(currentTestimonial);

document.querySelector(".prev").addEventListener("click", function () {
  currentTestimonial =
    (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
  showTestimonial(currentTestimonial);
});

document.querySelector(".next").addEventListener("click", function () {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
  showTestimonial(currentTestimonial);
});

// Newsletter Subscription (Simple Validation)
document
  .querySelector(".newsletter button")
  .addEventListener("click", function () {
    const emailInput = document.querySelector(".newsletter input");
    const email = emailInput.value.trim();

    if (email === "") {
      alert("Please enter a valid email address.");
    } else {
      alert("Thank you for subscribing!");
      emailInput.value = ""; // Clear the input field
    }
  });
