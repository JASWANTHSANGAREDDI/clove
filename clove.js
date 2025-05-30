// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForm();
    initializeCaptcha();
    initializeMobileMenu();
    initializeFeatureToggles();
    initializeFAQToggles();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeCounterAnimations();
    initializeFormValidation();
});

// Appointment Form Functionality
function initializeAppointmentForm() {
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const name = bookingForm.querySelector('input[placeholder="Name"]').value;
            const mobile = bookingForm.querySelector('input[placeholder="Mobile Number"]').value;
            const captcha = bookingForm.querySelector('input[placeholder="Captcha"]').value;
            const captchaCode = document.getElementById('captchaCode').textContent;

            if (validateForm(name, mobile, captcha, captchaCode)) {
                showLoadingState(bookingForm);

                // Simulate form submission
                setTimeout(() => {
                    hideLoadingState(bookingForm);
                    showSuccessMessage();
                    bookingForm.reset();
                    generateNewCaptcha();
                }, 2000);
            }
        });
    }
}

// Form Validation
function validateForm(name, mobile, captcha, captchaCode) {
    hideErrorMessage();

    // Name validation
    if (!name || name.trim().length < 2) {
        showErrorMessage('Please enter a valid name (minimum 2 characters)');
        return false;
    }

    // Mobile validation - Indian format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        showErrorMessage('Please enter a valid 10-digit mobile number starting with 6-9');
        return false;
    }

    // Captcha validation
    if (!captcha || captcha !== captchaCode) {
        showErrorMessage('Please enter the correct captcha code');
        return false;
    }

    return true;
}

// Show/Hide Messages
function showErrorMessage(message) {
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        const form = document.querySelector('.appointment-form');
        form.insertBefore(errorElement, document.querySelector('#bookingForm'));
    }

    errorElement.textContent = message;
    errorElement.style.display = 'block';

    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

function hideErrorMessage() {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showSuccessMessage() {
    let successElement = document.querySelector('.success-message');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        const form = document.querySelector('.appointment-form');
        form.insertBefore(successElement, document.querySelector('#bookingForm'));
    }

    successElement.textContent = 'Thank you! Your appointment request has been submitted successfully. We will contact you soon.';
    successElement.style.display = 'block';

    setTimeout(() => {
        successElement.style.display = 'none';
    }, 8000);
}

// Loading States
function showLoadingState(form) {
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.textContent = 'Book a Free Consultation';
    submitBtn.disabled = false;
}

// Captcha Functionality
function initializeCaptcha() {
    generateNewCaptcha();

    const captchaCode = document.getElementById('captchaCode');
    if (captchaCode) {
        captchaCode.addEventListener('click', generateNewCaptcha);
        captchaCode.style.cursor = 'pointer';
        captchaCode.title = 'Click to refresh captcha';
    }
}

function generateNewCaptcha() {
    const captcha = Math.floor(1000 + Math.random() * 9000);
    const captchaDisplay = document.getElementById('captchaCode');
    if (captchaDisplay) {
        captchaDisplay.textContent = captcha;
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const headerRight = document.querySelector('.header-right');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            // Simple mobile menu toggle (can be enhanced)
            alert('Mobile menu clicked - implement navigation menu here');
        });
    }
}

// Feature Toggles
function initializeFeatureToggles() {
    const featureItems = document.querySelectorAll('.feature-item');

    // Auto-open first feature