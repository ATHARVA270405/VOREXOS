// Toggle hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
// === SCROLL ANIMATION EFFECT ===
const containers = document.querySelectorAll(".container-1, .container-2, .container-3");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animate once
      }
    });
  },
  { threshold: 0.3 } // Trigger when 30% visible
);

containers.forEach((container) => {
  observer.observe(container);
});

  window.addEventListener('DOMContentLoaded', () => {
    const heroHeading = document.querySelector('.hero h1');
    setTimeout(() => {
      heroHeading.classList.add('show');
    }, 300); // slight delay for smooth effect
  });


const hero = document.querySelector('.hero h1');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY; // amount scrolled
    const maxScroll = window.innerHeight; // full hero height
    const blurAmount = Math.min(scrollY / 50, 10); // max blur 10px
    const scaleAmount = Math.max(1 - scrollY / 2000, 0.85); // slightly scale down
    hero.style.filter = `blur(${blurAmount}px)`;
    hero.style.transform = `scale(${scaleAmount}) translateY(${scrollY / 5}px)`;
});
const tabs = document.querySelectorAll('.portfolio-tab');
const items = document.querySelectorAll('.portfolio-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all
    tabs.forEach(t => t.classList.remove('active'));
    items.forEach(i => i.classList.remove('active'));

    // Activate clicked tab and content
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

//contact form
document.getElementById("projectForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const project = document.getElementById("projectName").value.trim();
  const tech = document.getElementById("technologies").value.trim();
  const desc = document.getElementById("description").value.trim();
  const msg = document.getElementById("formMessage");

  if (name && phone && project && desc && tech) {
    msg.style.display = "block";
    msg.textContent = `✅ Thank you, ${name}! Your project "${project}" using (${tech}) has been submitted successfully. We’ll contact you soon!`;
    msg.style.color = "#00ffd0";
    this.reset();

    setTimeout(() => {
      msg.style.display = "none";
    }, 5000);
  } else {
    msg.style.display = "block";
    msg.textContent = "⚠️ Please fill in all the required fields.";
    msg.style.color = "#ff8080";
  }
});
