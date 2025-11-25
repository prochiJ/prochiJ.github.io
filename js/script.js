document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const toTopButton = document.getElementById('to-top-button');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Scroll-to-top button visibility
    if (toTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                toTopButton.classList.remove('hidden');
            } else {
                toTopButton.classList.add('hidden');
            }
        });

        // Scroll-to-top button functionality
        toTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Intersection Observer for fade-in animations
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Contact Form Validation
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors and status
            form.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
            if (formStatus) formStatus.textContent = '';

            // Name validation
            const name = document.getElementById('name');
            if (name && name.value.trim() === '') {
                isValid = false;
                if (name.nextElementSibling) name.nextElementSibling.classList.remove('hidden');
            }

            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && (email.value.trim() === '' || !emailRegex.test(email.value))) {
                isValid = false;
                if (email.nextElementSibling) email.nextElementSibling.classList.remove('hidden');
            }

            // Message validation
            const message = document.getElementById('message');
            if (message && message.value.trim() === '') {
                isValid = false;
                if (message.nextElementSibling) message.nextElementSibling.classList.remove('hidden');
            }

            if (isValid) {
                // Simulate form submission
                if (formStatus) formStatus.textContent = 'Thank you for your message!';
                form.reset();
            } else {
                if (formStatus) formStatus.textContent = '';
            }
        });
    }
});