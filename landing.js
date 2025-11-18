
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".course-btn");
  const courses = document.querySelectorAll(".course-item");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove("course-active"));
      button.classList.add("course-active");

      const filter = button.textContent.toLowerCase(); // all / beginner / intermediate / advanced

      courses.forEach(course => {
        const tag = course.querySelector(".course-tag").textContent.toLowerCase();

        // First hide all
        course.style.display = "none";
        course.style.opacity = "0";

        if (filter === "all" || tag === filter) {
          // Smooth fade in
          setTimeout(() => {
            course.style.display = "flex"; // keep flex layout
            setTimeout(() => {
              course.style.opacity = "1";
              course.style.transition = "opacity 0.4s ease-in-out";
            }, 10);
          }, 100);
        }
      });
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const duration = 2000; // total animation time in ms (2 sec)
  const interval = 20;   // update every 20ms
  const steps = duration / interval;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / steps;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, interval);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
});
const container = document.getElementById('particle-container');
const particleCount = 70; // Total number of particles (adjust as needed)

// Array of colors for variety, similar to the video (dark blue, teal, magenta, light pink)
const colors = [
    'rgba(100, 150, 200, 0.6)', 
    'rgba(150, 200, 250, 0.6)',
    'rgba(200, 100, 150, 0.6)',
    'rgba(255, 255, 255, 0.9)' // Smaller "star" particles
];

const particles = [];

// --- 1. Create Particles ---
for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size, position, and color
    const size = i < 15 ? 8 + Math.random() * 10 : 1 + Math.random() * 3; // Make some larger "orbs" and more small "stars"
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Assign a color
    const colorIndex = Math.floor(Math.random() * colors.length);
    particle.style.backgroundColor = colors[colorIndex];

    // Initial random position
    particle.x = Math.random() * window.innerWidth;
    particle.y = Math.random() * window.innerHeight;
    
    particle.style.left = `${particle.x}px`;
    particle.style.top = `${particle.y}px`;

    // Random motion properties
    particle.vx = (Math.random() - 0.5) * 0.2; // Velocity X (slow)
    particle.vy = (Math.random() - 0.5) * 0.2; // Velocity Y (slow)

    container.appendChild(particle);
    particles.push(particle);
}

// --- 2. Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    particles.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary Check: Wrap particles around if they go off-screen
        if (p.x < -20) p.x = window.innerWidth;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight;
        if (p.y > window.innerHeight + 20) p.y = -20;

        // Apply new position
        p.style.transform = `translate(${p.x}px, ${p.y}px)`;
    });
}

// Start the animation
animate();

// Handle window resizing to keep particles contained
window.addEventListener('resize', () => {
    particles.forEach(p => {
        // Ensure position is within the new viewport bounds
        if (p.x > window.innerWidth) p.x = window.innerWidth;
        if (p.y > window.innerHeight) p.y = window.innerHeight;
    });
});


 // Store the currently selected course details globally
        let selectedCourse = {};

        // DOM Elements for Modal 1 (Course Details)
        const courseEnrollButtons = document.querySelectorAll('.course-enroll-btn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const projectModal = document.getElementById('projectModal');
        const modal1Content = document.getElementById('modal1Content');
        const openPurchaseModalBtn = document.getElementById('openPurchaseModalBtn');

        // Dynamic content elements for Modal 1
        const courseTitleEl = document.getElementById('courseTitle');
        const courseDescriptionEl = document.getElementById('courseDescription');
        const courseDurationEl = document.getElementById('courseDuration');
        const courseLevelEl = document.getElementById('courseLevel');
        const courseTechEl = document.getElementById('courseTech');
        const coursePriceEl = document.getElementById('coursePrice');
        const courseFeaturesListEl = document.getElementById('courseFeaturesList');
        const purchaseBtnPriceEl = document.getElementById('purchaseBtnPrice');

        // DOM Elements for Modal 2 (Purchase Confirmation)
        const purchaseModal = document.getElementById('purchaseModal');
        const closePurchaseModalBtn = document.getElementById('closePurchaseModalBtn');
        const modal2Content = document.getElementById('modal2Content');
        
        // Dynamic content elements for Modal 2
        const paymentButtons = document.querySelectorAll('.payment-method-btn');
        const summaryCourseTitleEl = document.getElementById('summaryCourseTitle');
        const summaryCourseDescEl = document.getElementById('summaryCourseDesc');
        const summarySubtotalEl = document.getElementById('summarySubtotal');
        const summaryTaxEl = document.getElementById('summaryTax');
        const summaryTotalEl = document.getElementById('summaryTotal');

        // DOM Elements for Modal 3 (Payment Details Pop-up)
        const detailsModal = document.getElementById('detailsModal');
        const modal3Content = document.getElementById('modal3Content');
        const closeDetailsModalBtn = document.getElementById('closeDetailsModalBtn');
        const dynamicPaymentDetailsContent = document.getElementById('dynamicPaymentDetailsContent');
        
        // DOM Elements for Modal 4 (Contact Us Pop-up - NEW)
        const contactModal = document.getElementById('contactModal');
        const modal4Content = document.getElementById('modal4Content');
        const closeContactModalBtn = document.getElementById('closeContactModalBtn');


        // --- IMPORTANT: This is where you set your QR code image source. ---
        // Using an existing uploaded image (buy2.jpg) as a placeholder for the QR code.
        const upiQrCodeUrl = "PIC/qr code.png"; 
        // ------------------------------------------------------------------

        // Price formatting utility
        function formatPrice(amount) {
            // Uses Intl.NumberFormat for clean rupee formatting
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount);
        }

        /* --- UTILITY FUNCTIONS --- */

        // Copy content to clipboard
        window.copyToClipboard = function(textToCopy, elementId) {
            const tempInput = document.createElement('textarea');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            
            try {
                // Use execCommand for broader compatibility in sandboxed environments
                document.execCommand('copy');
                
                const copyTextElement = document.getElementById(elementId + 'CopyText');
                if (copyTextElement) {
                    const originalText = copyTextElement.textContent;
                    copyTextElement.textContent = 'Copied!';
                    setTimeout(() => {
                        copyTextElement.textContent = originalText;
                    }, 1500);
                }
            } catch (err) {
                console.error('Could not copy text: ', err);
            }
            
            document.body.removeChild(tempInput);
        }

        /**
         * Attaches the click listener to the dynamically created Card payment button.
         * This MUST be called immediately after Modal 3 is opened if the 'card' method was selected.
         */
        function setupCardPaymentListener() {
            const btn = document.getElementById('openContactUsBtn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Open Modal 4 (Contact Us)
                    openContactModal(); 
                });
            }
        }

        // Function to handle payment method click and open Modal 3
        function handlePaymentMethodClick(method) {
            // Dynamic UPI/Bank details for reference based on Course ID
            const courseId = selectedCourse.id || 1; 
            const upiId = `7775843729@ptsbi`;
            const accNo = `34280260997`;
            const ifscCode = `SBIN0000311`;

            // Define payment contents dynamically
            let paymentTitle = '';
            let paymentContent = '';

            if (method === 'upi') {
                paymentTitle = `<h4 style="font-size: 1.5rem; font-weight: 800; color: #10b981; margin-bottom: 1rem; text-align: center;">Scan & Pay via UPI</h4>`;
                paymentContent = `
                    <div style="padding: 0.5rem; width: 100%; text-align: center;">
                        <img src="${upiQrCodeUrl}" alt="UPI QR Code" onerror="this.onerror=null; this.src='https://placehold.co/160x160/374151/FFFFFF?text=QR+Code+Placeholder'" style="width: 10rem; height: 10rem; margin: 0 auto 1.5rem auto; border-radius: 0.5rem; border: 3px solid #10b981; padding: 5px; background: white;">
                        
                        <p style="font-size: 1.1rem; font-weight: 600; color: #e5e7eb; word-break: break-all; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center;">
                            UPI ID: 
                            <span id="upiId" style="margin-left: 0.5rem; font-weight: 400; color: #fff;">${upiId}</span>
                            <button onclick="copyToClipboard('${upiId}', 'upiId')" class="copy-link-btn">
                                <span id="upiIdCopyText">Copy</span>
                            </button>
                        </p>
                        <p style="font-size: 0.875rem; color: #9ca3af; margin-top: 1rem;">Open your UPI app (GPay, PhonePe, Paytm, etc.) to scan this QR.</p>
                    </div>
                `;
            } else if (method === 'bank') {
                paymentTitle = `<h4 style="font-size: 1.5rem; font-weight: 800; color: #4f46e5; margin-bottom: 1rem; text-align: center;">Bank Transfer Details</h4>`;
                paymentContent = `
                    <div style="padding: 0.5rem; width: 100%; text-align: left;">
                        <p style="font-size: 0.95rem; color: #e5e7eb; line-height: 2;">
                            <span class="bank-detail-span" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #374151; padding-bottom: 0.5rem;">
                                <strong>Account Name:</strong> 
                                <span style="font-weight: 400;">Akshay Pardhi</span>
                            </span>
                            <span class="bank-detail-span" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #374151; padding: 0.5rem 0;">
                                <strong>Bank Name:</strong> 
                                <span style="font-weight: 400;">State Bank of India</span>
                            </span>
                            <span class="bank-detail-span" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #374151; padding: 0.5rem 0;">
                                <strong>Account No.:</strong> 
                                <span><span id="accNo" style="font-weight: 400;">${accNo}</span> 
                                <button onclick="copyToClipboard('${accNo}', 'accNo')" class="copy-link-btn">
                                    <span id="accNoCopyText">Copy</span>
                                </button></span>
                            </span>
                            <span class="bank-detail-span" style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem;">
                                <strong>IFSC Code:</strong> 
                                <span><span id="ifscCode" style="font-weight: 400;">${ifscCode}</span> 
                                <button onclick="copyToClipboard('${ifscCode}', 'ifscCode')" class="copy-link-btn">
                                    <span id="ifscCodeCopyText">Copy</span>
                                </button></span>
                            </span>
                        </p>
                        <p style="font-size: 0.75rem; color: #fbbf24; padding-top: 1.5rem; text-align: center;">**IMPORTANT:** Include Course ID (${courseId}) in the transaction notes.</p>
                    </div>
                `;
            } else if (method === 'card') {
                // UPDATED CONTENT FOR CARD PAYMENT
                paymentTitle = `<h4 style="font-size: 1.5rem; font-weight: 800; color: #f97316; margin-bottom: 1rem; text-align: center;">Credit/Debit Card</h4>`;
                paymentContent = `
                    <div style="padding: 0.5rem; width: 100%; text-align: center;">
                        <p style="font-size: 1rem; color: #ccc; margin-bottom: 1.5rem;">Card payments are currently handled offline. Please contact us for a payment link.</p>
                        <button id="openContactUsBtn" class="purchase-footer-btn" style="background: linear-gradient(to right, #f97316, #ea580c); color: #fff; box-shadow: 0 5px 10px rgba(249, 115, 22, 0.5); width: auto; padding: 0.75rem 2rem; font-size: 1rem; margin-top: 0;">
                            Go to Contact Support
                        </button>
                        <p style="font-size: 0.875rem; color: #9ca3af; margin-top: 1.5rem;">Clicking the button will open a pop-up with our contact details.</p>
                    </div>
                `;
            } else {
                paymentTitle = `<h4 style="font-size: 1.5rem; font-weight: 800; color: #ef4444; margin-bottom: 1rem; text-align: center;">Error</h4>`;
                paymentContent = `<p style="text-align: center; color: #9ca3af;">Invalid payment method selected.</p>`;
            }


            // Inject content into Modal 3
            dynamicPaymentDetailsContent.innerHTML = paymentTitle + paymentContent;

            // Re-initialize Lucide icons (needed if new SVGs were injected)
            if (window.lucide) {
                lucide.createIcons();
            }

            // Open Modal 3
            openDetailsModal();
            
            // Setup listener for the new button if the card method was selected
            if (method === 'card') {
                setupCardPaymentListener();
            }
        }

        // Function to populate Modal 1 with course data
        function populateCourseModal(course) {
            const coursePriceNumeric = parseInt(course.price, 10) || 0;
            const formattedPrice = formatPrice(coursePriceNumeric);
            const taxAmount = 0; // Keeping tax/fees at 0 for simplicity

            // Update Modal 1 (Course Details)
            courseTitleEl.textContent = course.title;
            courseDescriptionEl.textContent = course.desc;
            courseDurationEl.textContent = course.duration;
            courseLevelEl.textContent = course.level; // Using 'level' for 'Category'
            courseTechEl.textContent = course.tech;
            coursePriceEl.textContent = formattedPrice;
            purchaseBtnPriceEl.textContent = formattedPrice;

            // Update Modal 2 Summary (Purchase Confirmation)
            summaryCourseTitleEl.textContent = course.title;
            summaryCourseDescEl.textContent = course.desc;
            summarySubtotalEl.textContent = formattedPrice;
            summaryTaxEl.textContent = formatPrice(taxAmount);
            summaryTotalEl.textContent = formattedPrice;

            // Features List
            courseFeaturesListEl.innerHTML = ''; // Clear existing list
            try {
                const features = JSON.parse(course.features);
                features.forEach(feature => {
                    // Simple logic to bold text enclosed in **...**
                    const parts = feature.split(/(\*\*.*?\*\*)/).filter(p => p); 
                    const li = document.createElement('li');
                    
                    // Create content span
                    const span = document.createElement('span');
                    parts.forEach(part => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            const boldText = part.substring(2, part.length - 2);
                            const strong = document.createElement('strong');
                            strong.textContent = boldText;
                            span.appendChild(strong);
                        } else {
                            span.appendChild(document.createTextNode(part));
                        }
                    });

                    // Add icon and text
                    li.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    `;
                    li.appendChild(span);
                    courseFeaturesListEl.appendChild(li);
                });
            } catch (e) {
                console.error("Failed to parse course features:", e);
                courseFeaturesListEl.innerHTML = '<li><span style="color: #ef4444; margin-left: 1.5rem;">Features failed to load.</span></li>';
            }

            // Store for use in Modal 2
            selectedCourse = course;
            
            // Re-initialize Lucide icons in the new content
            if (window.lucide) {
                lucide.createIcons();
            }
        }

        // Event listener setup for course cards
        courseEnrollButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // Find the parent course-item element
                const courseItem = event.target.closest('.course-item');
                if (!courseItem) return;

                // Extract data attributes - This is the primary source of all content and money details
                const courseData = {
                    id: courseItem.getAttribute('data-id'),
                    title: courseItem.getAttribute('data-title'),
                    desc: courseItem.getAttribute('data-desc'),
                    duration: courseItem.getAttribute('data-duration'),
                    level: courseItem.getAttribute('data-level'),
                    price: courseItem.getAttribute('data-price'), // Stored as raw number
                    features: courseItem.getAttribute('data-features'),
                    tech: courseItem.getAttribute('data-tech'),
                };
                
                populateCourseModal(courseData);
                openProjectModal();
            });
        });


        /* --- MODAL CONTROL (JS) --- */

        // Function to show the modal (Generic)
        function showModal(modalElement, contentElement) {
            modalElement.style.display = 'flex';
            setTimeout(() => {
                modalElement.classList.add('show');
                contentElement.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        // Function to hide the modal (Generic)
        function hideModal(modalElement, contentElement, restoreScroll = true) {
            modalElement.classList.remove('show');
            contentElement.classList.remove('show');
            
            setTimeout(() => {
                modalElement.style.display = 'none';
                // Only restore scroll if ALL modals are closed
                if (restoreScroll && purchaseModal.style.display !== 'flex' && projectModal.style.display !== 'flex' && detailsModal.style.display !== 'flex' && contactModal.style.display !== 'flex') {
                    document.body.style.overflow = '';
                }
            }, 300);
        }
        
        // Modal 1 Functions
        function openProjectModal() {
            showModal(projectModal, modal1Content);
        }
        function closeProjectModal() {
            hideModal(projectModal, modal1Content);
        }

        // Modal 2 Functions
        function openPurchaseModal() {
            hideModal(projectModal, modal1Content, false); 
            showModal(purchaseModal, modal2Content);
        }
        window.closePurchaseModal = function() { // Expose globally for simplicity
            hideModal(purchaseModal, modal2Content, true);
        }

        // Modal 3 Functions
        function openDetailsModal() {
            // Modal 2 is still open, so only hide Modal 3 on closing
            showModal(detailsModal, modal3Content);
        }
        window.closeDetailsModal = function() { // Expose globally for simplicity
            hideModal(detailsModal, modal3Content, false); 
        }
        
        // Modal 4 Functions (NEW)
        window.openContactModal = function() {
            // Modal 3 is still open
            showModal(contactModal, modal4Content);
        }
        window.closeContactModal = function() { // Expose globally for simplicity
            // Modal 3 remains open when Modal 4 closes
            hideModal(contactModal, modal4Content, false); 
        }


        /* --- GLOBAL LISTENERS --- */

        // Modal 1 Listeners
        closeModalBtn.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) {
                closeProjectModal();
            }
        });
        openPurchaseModalBtn.addEventListener('click', openPurchaseModal);
        
        // Modal 2 Listeners (Purchase Flow)
        closePurchaseModalBtn.addEventListener('click', closePurchaseModal);
        purchaseModal.addEventListener('click', (event) => {
            if (event.target === purchaseModal) {
                closePurchaseModal();
            }
        });

        // Payment Buttons (Now trigger Modal 3)
        paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const method = button.getAttribute('data-method');
                handlePaymentMethodClick(method);
            });
        });
        
        // Modal 3 Listeners (Payment Details)
        closeDetailsModalBtn.addEventListener('click', closeDetailsModal);
        detailsModal.addEventListener('click', (event) => {
            if (event.target === detailsModal) {
                closeDetailsModal();
            }
        });
        
        // Modal 4 Listeners (Contact Us - NEW)
        closeContactModalBtn.addEventListener('click', closeContactModal);
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                closeContactModal();
            }
        });

        // Global Escape Key Listener (closes the currently open modal in reverse order)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                if (contactModal.classList.contains('show')) {
                    closeContactModal();
                } else if (detailsModal.classList.contains('show')) {
                    closeDetailsModal();
                } else if (purchaseModal.classList.contains('show')) {
                    closePurchaseModal();
                } else if (projectModal.classList.contains('show')) {
                    closeProjectModal();
                }
            }
        });

        // Initialize Lucide icons on load
        window.onload = function() {
            if (window.lucide) {
                lucide.createIcons(); 
            }
        };

        const floatingIcon = document.getElementById('floating-icon');
        const contactOverlay = document.getElementById('contact-modal-overlay');
        const formPanel = document.getElementById('contact-form-panel');
        const contactForm = document.getElementById('contact-form');
        const formContent = document.getElementById('form-content');
        const successMessage = document.getElementById('success-message');
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const spinner = document.getElementById('spinner');
        const iconOpen = document.getElementById('icon-open');
        const iconClose = document.getElementById('icon-close');
        let isFormOpen = false;

        /**
         * Simulates an API call with exponential backoff.
         */
        async function exponentialBackoffFetch(retries = 3, delay = 1000) {
            for (let i = 0; i < retries; i++) {
                try {
                    // Simulate a successful network request delay for UX
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    return { ok: true, json: async () => ({ status: 'success' }) };
                } catch (error) {
                    console.error(`Attempt ${i + 1} failed.`, error);
                    if (i === retries - 1) throw error;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                }
            }
        }

        /**
         * Opens the contact form modal with animation.
         */
        function openForm() {
            if (isFormOpen) return;
            isFormOpen = true;

            // Reset UI state
            contactForm.reset();
            formPanel.classList.remove('cw-panel-closing');
            formContent.style.opacity = 1;
            
            // CRITICAL FIX: Ensure success message is hidden and pointer-events: none is applied.
            // Changed from successMessage.classList.remove('cw-success-show') to remove('show').
            successMessage.classList.remove('show'); 
            formContent.classList.remove('hidden');

            // 1. Show the overlay and form container
            contactOverlay.classList.add('active');

            // 2. Animate the panel into view
            setTimeout(() => {
                formPanel.classList.add('active'); // This refers to .cw-panel.active
            }, 10);

            // 3. Update the icon
            iconOpen.style.opacity = 0;
            iconClose.style.opacity = 1;
        }

        /**
         * Closes the contact form modal with animation.
         */
        function closeForm() {
            if (!isFormOpen) return;
            isFormOpen = false;

            // 1. Animate the panel back into the icon position
            formPanel.classList.remove('active');
            formPanel.classList.add('closing'); // This refers to .cw-panel.closing

            // 2. Hide the overlay after the animation completes.
            setTimeout(() => {
                contactOverlay.classList.remove('active');
                formPanel.classList.remove('closing');
                
                // Reset content visibility for next open
                formContent.classList.remove('hidden');
                formContent.style.opacity = 1;
            }, 1000);

            // 3. Update the icon
            iconOpen.style.opacity = 1;
            iconClose.style.opacity = 0;
        }

        /**
         * Handles form submission logic.
         */
        async function handleSubmit() {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form data submitted:', data);

            // Disable button and show spinner
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            spinner.classList.remove('hidden');

            try {
                await exponentialBackoffFetch();

                // 1. Hide the form content and show success message
                formContent.style.opacity = 0;
                setTimeout(() => {
                    formContent.classList.add('hidden');
                    successMessage.classList.add('show'); // This refers to .cw-success.show
                }, 300);

                // 2. Start the closing animation after a delay (to let the user read the message)
                setTimeout(() => {
                    closeForm();
                }, 2500); 

            } catch (error) {
                console.error('Submission failed. Please check your network connection.');
                closeForm();
            } finally {
                // Re-enable button and hide spinner
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                spinner.classList.add('hidden');
            }
        }

        // --- Event Listeners ---

        // Toggle the form open/close when clicking the floating icon
        floatingIcon.addEventListener('click', () => {
            if (contactOverlay.classList.contains('active')) {
                // Only allow closing if a submission is not currently in progress
                if (submitBtn.disabled === false) {
                    closeForm();
                }
            } else {
                openForm();
            }
        });

        // Close the form if the user clicks the dark background overlay
        contactOverlay.addEventListener('click', (e) => {
            if (e.target === contactOverlay) {
                if (submitBtn.disabled === false) {
                    closeForm();
                }
            }
        });

        // Initial setup for the close icon state
        iconClose.style.opacity = 0;
