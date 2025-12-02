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

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

// ===============================
// INLINE SEARCH FUNCTIONALITY
// ===============================

document.querySelector(".search-btn").addEventListener("click", function () {
    const jobInput = document.getElementById("what").value.trim().toLowerCase();
    const locationInput = document.getElementById("where").value.trim().toLowerCase();

    // All available job data (from your page)
    const jobs = [
        {
            title: "Software Developer",
            location: "Amravati",
            salary: "2.5-5 Lpa",
            img: "PIC/sd.png",
        },
        {
            title: "Operation Specialist",
            location: "Amravati",
            salary: "3-4.5 Lpa",
            img: "PIC/os.png",
        },
        {
            title: "Customer Relationship Executive",
            location: "Nagpur",
            salary: "3.6-4 Lpa",
            img: "PIC/cr.png",
        },
        {
            title: "HRBP",
            location: "Amravati",
            salary: "1.8-2.5 Lpa",
            img: "PIC/hr.png",
        }
    ];

    // Filter logic
    const filteredJobs = jobs.filter(job => {
        return (
            (jobInput === "" || job.title.toLowerCase().includes(jobInput)) &&
            (locationInput === "" || job.location.toLowerCase().includes(locationInput))
        );
    });

    const resultDiv = document.getElementById("searchResults");
    resultDiv.innerHTML = ""; // clear old results

    if (filteredJobs.length === 0) {
        resultDiv.innerHTML = `<p style="font-size:18px; font-weight:600;">❌ No jobs found.</p>`;
        resultDiv.style.display = "block";
        return;
    }

    // Show filtered jobs
    filteredJobs.forEach(job => {
        resultDiv.innerHTML += `
            <div class="job-card">
                <div class="job-left">
                    <img src="${job.img}" class="job-logo">
                </div>

                <div class="job-right">
                    <div class="job-header">
                        <h3>${job.title}</h3>

                        <div class="job-buttons">
                            <button class="apply-btn" onclick="window.location.href='jobapply.html'">Apply</button>
                            <button class="type-btn full-time">Full Time</button>
                        </div>
                    </div>

                    <p class="job-desc">Matching job based on your search.</p>

                    <div class="job-tags">
                        <span class="tag"><i class=""></i>${job.salary}</span>
                        <span class="tag"><i class="fas fa-map-marker-alt"></i>&nbsp;${job.location}</span>
                    </div>
                </div>
            </div>
        `;
    });

    resultDiv.style.display = "block";
});
