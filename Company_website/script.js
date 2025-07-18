document.addEventListener('DOMContentLoaded', function() {
    // Exercise Tabs Functionality
    setupExerciseTabs();
    
    // Setup Exercise Preview Click Events
    setupExercisePreviewClicks();
    
    // Smooth Scrolling for Anchor Links
    setupSmoothScrolling();
    
    // Testimonial Slider
    setupTestimonialSlider();
    
    // Appointment Form Validation
    setupAppointmentFormValidation();
    
    // Package Button Selection
    setupPackageButtons();
    
    // Payment Methods Setup
    setupPaymentMethods();
    
    // Animation on Scroll
    animateOnScroll();
    
    // Add JavaScript-dependent styles
    addJsStyles();
    
    // Setup View All Button
    setupViewAllButton();
    
    // Setup FAQ Toggle
    setupFaqToggle();
});

// Setup Exercise Preview Click Events
function setupExercisePreviewClicks() {
    const exercisePreviews = document.querySelectorAll('.exercise-preview');
    
    // Map exercise previews to their corresponding pages
    const exercisePageMap = {
        'teenager-exercise': 'teenagers-exercises.html',
        'young-adult-exercise': 'young-adults-exercises.html',
        'middle-age-exercise': 'middle-age-exercises.html',
        'senior-middle-age-exercise': 'senior-middle-age-exercises.html',
        'senior-exercise': 'senior-exercises.html'
    };
    
    exercisePreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            // Find which category this preview belongs to
            let categoryClass = '';
            for (const className of this.classList) {
                if (exercisePageMap[className]) {
                    categoryClass = className;
                    break;
                }
            }
            
            // Navigate to the corresponding exercise page
            if (categoryClass && exercisePageMap[categoryClass]) {
                window.location.href = exercisePageMap[categoryClass];
            }
        });
    });
}

// Setup Exercise Tabs
function setupExerciseTabs() {
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const exercisePreviews = document.querySelectorAll('.exercise-preview');
    
    // Function to show only the relevant exercise previews
    function showExercisesForCategory(category) {
        // Map category names to their corresponding class names
        const categoryClassMap = {
            'TEENAGERS': 'teenager-exercise',
            'YOUNG ADULTS': 'young-adult-exercise',
            'MIDDLE AGE': 'middle-age-exercise',
            'SENIOR MIDDLE AGE': 'senior-middle-age-exercise',
          'SENIOR': 'senior-exercise'
        };
        
        const targetClass = categoryClassMap[category];
        
        // Show all exercise previews by default
        exercisePreviews.forEach(preview => {
            preview.style.display = 'block';
        });
    }
    
    // Show all exercises initially
    exercisePreviews.forEach(preview => {
        preview.style.display = 'block';
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Map tab text to corresponding pages
            const tabPageMap = {
                'TEENAGERS': 'teenagers-exercises.html',
                'YOUNG ADULTS': 'young-adults-exercises.html',
                'MIDDLE AGE': 'middle-age-exercises.html',
                'SENIOR MIDDLE AGE': 'senior-middle-age-exercises.html',
                'SENIOR': 'senior-exercises.html'
            };

            // Navigate to the corresponding exercise page
            const tabText = this.textContent.trim();
            if (tabPageMap[tabText]) {
                window.location.href = tabPageMap[tabText];
            }
            
            // Show exercises for the selected category
            showExercisesForCategory(this.textContent);
        });
    });
}

// Setup Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup Testimonial Slider
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Create dots for navigation
    const testimonialsSection = document.querySelector('.testimonials-section');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    testimonialsSection.appendChild(dotsContainer);
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Setup Appointment Form Validation
function setupAppointmentFormValidation() {
    const appointmentForm = document.querySelector('.appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    markInvalid(input, 'This field is required');
                    isValid = false;
                } else if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        markInvalid(input, 'Please enter a valid email address');
                        isValid = false;
                    } else {
                        markValid(input);
                    }
                } else if (input.type === 'tel' && input.value.trim()) {
                    const phonePattern = /^\d{10}$/;
                    if (!phonePattern.test(input.value.replace(/\D/g, ''))) {
                        markInvalid(input, 'Please enter a valid 10-digit phone number');
                        isValid = false;
                    } else {
                        markValid(input);
                    }
                } else {
                    markValid(input);
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Appointment booked successfully! We will contact you shortly.';
                
                // Remove any existing success message
                const existingMessage = appointmentForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                appointmentForm.appendChild(successMessage);
                
                // Reset form
                appointmentForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Add input event listeners to clear error messages when user types
        appointmentForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                markValid(this);
            });
        });
    }
}

// Mark form field as invalid
function markInvalid(input, message) {
    input.classList.add('error');
    
    // Create or update error message
    let errorMessage = input.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    errorMessage.textContent = message;
}

// Mark form field as valid
function markValid(input) {
    input.classList.remove('error');
    
    // Remove error message if it exists
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

// Setup Package Buttons
function setupPackageButtons() {
    const packageButtons = document.querySelectorAll('.package-btn');
    const packagePreviews = document.querySelectorAll('.package-preview');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            packageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all package previews
            packagePreviews.forEach(preview => {
                preview.classList.remove('active');
            });
            
            // Show the corresponding package preview
            const packageType = this.textContent.trim().toLowerCase();
            const targetPreview = document.querySelector(`.${packageType.replace(' ', '-')}-package`);
            if (targetPreview) {
                targetPreview.classList.add('active');
            }
            
            console.log('Selected package:', this.textContent);
        });
    });
    
    // Activate the first package button by default
    if (packageButtons.length > 0) {
        packageButtons[0].click();
    }
}

// Function to setup payment methods
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelector('.payment-forms');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const paymentSuccess = document.querySelector('.payment-success');
    
    if (!paymentMethods.length) return; // Exit if no payment methods found
    
    // Hide subscribe button when a payment method is clicked
    function hideSubscribeButton() {
        if (subscribeBtn) {
            subscribeBtn.style.display = 'none';
        }
    }
    
    // Show payment forms container
    function showPaymentForms() {
        if (paymentForms) {
            paymentForms.style.display = 'block';
        }
    }
    
    // Handle payment method click
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            // Get the payment method type
            const methodType = this.getAttribute('data-method');
            
            // Hide all payment forms
            document.querySelectorAll('.payment-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show the selected payment form
            const selectedForm = document.getElementById(`${methodType}-form`);
            if (selectedForm) {
                selectedForm.classList.add('active');
                hideSubscribeButton();
                showPaymentForms();
            }
        });
    });
    
    // Handle payment form submissions
    document.querySelectorAll('.payment-form form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate payment processing
            const loadingBtn = this.querySelector('.payment-submit-btn');
            const originalBtnText = loadingBtn.textContent;
            
            loadingBtn.textContent = 'Processing...';
            loadingBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Hide payment forms
                paymentForms.style.display = 'none';
                
                // Show success message
                if (paymentSuccess) {
                    paymentSuccess.style.display = 'block';
                    
                    // Set expiry date (1 month, 6 months, or 1 year from now)
                    const expiryDateSpan = paymentSuccess.querySelector('.expiry-date');
                    if (expiryDateSpan) {
                        const now = new Date();
                        let expiryDate;
                        
                        // Determine package type from page URL
                        if (window.location.href.includes('monthly')) {
                            expiryDate = new Date(now.setMonth(now.getMonth() + 1));
                        } else if (window.location.href.includes('half-yearly')) {
                            expiryDate = new Date(now.setMonth(now.getMonth() + 6));
                        } else if (window.location.href.includes('yearly')) {
                            expiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
                        } else {
                            expiryDate = new Date(now.setMonth(now.getMonth() + 1)); // Default to 1 month
                        }
                        
                        expiryDateSpan.textContent = expiryDate.toLocaleDateString();
                    }
                }
                
                // Reset button state
                loadingBtn.textContent = originalBtnText;
                loadingBtn.disabled = false;
                
                // Store subscription in localStorage
                storeSubscription();
            }, 2000); // 2 second delay to simulate payment processing
        });
    });
    
    // Handle subscribe button click
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // If payment methods exist, show the first one
            if (paymentMethods.length > 0) {
                paymentMethods[0].click();
            }
        });
    }
}

// Function to store subscription in localStorage
function storeSubscription() {
    // Get user email from the form that was submitted
    let userEmail = '';
    const activeForm = document.querySelector('.payment-form.active');
    if (activeForm) {
        const emailInput = activeForm.querySelector('input[type="email"]');
        if (emailInput) {
            userEmail = emailInput.value;
        }
    }
    
    if (!userEmail) return;
    
    // Determine subscription type from page URL
    let subscriptionType = 'monthly'; // Default
    if (window.location.href.includes('monthly')) {
        subscriptionType = 'monthly';
    } else if (window.location.href.includes('half-yearly')) {
        subscriptionType = 'half-yearly';
    } else if (window.location.href.includes('yearly')) {
        subscriptionType = 'yearly';
    }
    
    // Calculate expiry date
    const now = new Date();
    let expiryDate;
    
    if (subscriptionType === 'monthly') {
        expiryDate = new Date(now.setMonth(now.getMonth() + 1));
    } else if (subscriptionType === 'half-yearly') {
        expiryDate = new Date(now.setMonth(now.getMonth() + 6));
    } else if (subscriptionType === 'yearly') {
        expiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
    }
    
    // Create subscription object
    const subscription = {
        email: userEmail,
        type: subscriptionType,
        startDate: new Date().toISOString(),
        expiryDate: expiryDate.toISOString(),
        active: true
    };
    
    // Store in localStorage
    localStorage.setItem('userSubscription', JSON.stringify(subscription));
    console.log('Subscription stored:', subscription);
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.exercise-preview, .package-btn, .testimonial, .tab');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add JavaScript-dependent styles
function addJsStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Testimonial Dots */
        .testimonial-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            background-color: #ddd;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .dot.active {
            background-color: #333;
        }
        
        /* Animation Classes */
        .exercise-preview, .package-btn, .testimonial, .tab {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .exercise-preview.animate, .package-btn.animate, .testimonial.animate, .tab.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Form Validation Styles */
        input.error, select.error, textarea.error {
            border-color: #ff3860;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: #23d160;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-top: 15px;
            text-align: center;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Setup View All Button
function setupViewAllButton() {
    const viewAllButton = document.querySelector('.view-all');
    
    if (viewAllButton) {
        // Set the View All button to point to All_exercises.html
        viewAllButton.href = 'all-exercise.html';
        viewAllButton.textContent = 'View All Exercises';
    }
}

// Setup FAQ Toggle
function setupFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class on the faq-item
                item.classList.toggle('active');
                
                // Update the toggle symbol
                if (toggle) {
                    toggle.textContent = item.classList.contains('active') ? '-' : '+';
                }
            });
        }
    });
}