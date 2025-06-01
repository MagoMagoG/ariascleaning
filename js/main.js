/**
 * ARIAS CLEANING SERVICES
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initMobileMenu();
    initSmoothScrolling();
    initServiceCardAnimations();
    initFormHighlightEffects();
    initScrollAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Service Card Animations
 */
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

/**
 * Form Highlight Effects and Validation
 */
function initFormHighlightEffects() {
    const quoteForm = document.getElementById('quote-form');
    const formInputs = document.querySelectorAll('input, select, textarea');
    const formSuccess = document.getElementById('form-success');
    
    // Highlight form when arriving from CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary');
    ctaButtons.forEach(btn => {
        if (btn.getAttribute('href') === '#contact') {
            btn.addEventListener('click', function() {
                setTimeout(() => {
                    quoteForm.classList.add('highlight');
                    setTimeout(() => {
                        quoteForm.classList.remove('highlight');
                    }, 1500);
                }, 800);
            });
        }
    });
    
    // Input focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.textContent = '';
    field.classList.remove('error');
    
    // Skip validation if field is not required and empty
    if (!field.hasAttribute('required') && !field.value.trim()) {
        return;
    }
    
    // Validate based on field type
    switch(field.type) {
        case 'text':
            if (field.hasAttribute('required') && !field.value.trim()) {
                errorElement.textContent = 'This field is required';
                field.classList.add('error');
            }
            break;
            
        case 'email':
            if (field.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    errorElement.textContent = 'Please enter a valid email address';
                    field.classList.add('error');
                }
            } else if (field.hasAttribute('required')) {
                errorElement.textContent = 'Email address is required';
                field.classList.add('error');
            }
            break;
            
        case 'tel':
            if (field.value.trim()) {
                const phonePattern = /^[0-9\s\(\)\+\-]{10,15}$/;
                if (!phonePattern.test(field.value)) {
                    errorElement.textContent = 'Please enter a valid phone number';
                    field.classList.add('error');
                }
            } else if (field.hasAttribute('required')) {
                errorElement.textContent = 'Phone number is required';
                field.classList.add('error');
            }
            break;
            
        case 'select-one':
            if (field.hasAttribute('required') && field.value === '') {
                errorElement.textContent = 'Please select an option';
                field.classList.add('error');
            }
            break;
            
        case 'checkbox':
            if (field.hasAttribute('required') && !field.checked) {
                errorElement.textContent = 'You must agree to continue';
                field.classList.add('error');
            }
            break;
    }
}

/**
 * Validate entire form on submission
 */
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formFields = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Validate all fields
    formFields.forEach(field => {
        validateField(field);
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement && errorElement.textContent) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show success message
        form.classList.add('submitted');
        const formSuccess = document.getElementById('form-success');
        const formElements = form.querySelectorAll('.form-group, button');
        
        // Hide form elements
        formElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        setTimeout(() => {
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // In a real implementation, you would submit the form data to a server here
        console.log('Form submitted successfully');
        
        // For demo purposes only - reset form after 5 seconds
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show form elements again
            formElements.forEach(el => {
                el.style.display = '';
            });
            
            // Hide success message
            formSuccess.style.display = 'none';
            
            form.classList.remove('submitted');
        }, 5000);
    }
    
    return false;
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    // Add fade-in animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.section-header, .service-card, .feature-card, .testimonial-card');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .highlight {
        animation: highlight-pulse 1.5s ease;
    }
    
    @keyframes highlight-pulse {
        0% { box-shadow: 0 0 0 0 rgba(30, 115, 190, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(30, 115, 190, 0); }
        100% { box-shadow: 0 0 0 0 rgba(30, 115, 190, 0); }
    }
    
    .form-success {
        text-align: center;
        padding: 3rem 2rem;
    }
    
    .success-icon {
        font-size: 4rem;
        color: #4CAF50;
        margin-bottom: 1.5rem;
    }
    
    .form-success h3 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }
    
    .error {
        border-color: #ff3860 !important;
    }
    
    .focused {
        position: relative;
    }
    
    .focused label {
        color: var(--primary-blue);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
`;
document.head.appendChild(style);
