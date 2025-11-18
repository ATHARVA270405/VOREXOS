// Select elements
const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".nav-links");

// Toggle menu open/close
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("is-open"); // icon rotation
});

// Close menu if clicking outside
document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("is-open");
    }
});

// Close menu when clicking any link inside it
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("is-open");
    });
});
// STICKY NAVBAR SHADOW ON SCROLL
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.getElementById("resumeInput").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        document.getElementById("fileName").innerHTML = 
            "Selected File: " + file.name;
    }
});
// RESUME SUCCESS MESSAGE
document.getElementById("resumeInput").addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        document.getElementById("fileName").innerHTML =
            "Selected File: " + file.name;

        // Add success message
        const successDiv = document.getElementById("uploadSuccess");
        successDiv.innerHTML = "✅ Resume uploaded successfully!";
        successDiv.style.display = "block";
    }
});


