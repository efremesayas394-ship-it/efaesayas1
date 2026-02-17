document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const contactForm = document.getElementById('contactForm');

    // Page Navigation
    function switchPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.add('active');
        }

        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation links
        const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Navigation Link Click Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Mobile Navigation Link Click Handler
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchPage(pageId);
            
            // Reset hamburger icon
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showMessage('Please fill all fields!', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter correct email!', 'error');
            return;
        }
        
        // ማስረከቢያ አሳይ
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> በመላክ ላይ...';
        submitBtn.disabled = true;
        
        try {
            // FormData ፍጠር
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            
            // ወደ PHP ሰርቨር ላክ
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message, 'success');
                contactForm.reset();
            } else {
                showMessage(data.message, 'error');
            }
            
        } catch (error) {
            showMessage('ስህተት: ' + error.message, 'error');
            console.error('Error:', error);
        } finally {
            // አዝራሩን ወደ መጀመሪያ ሁኔታ መልስ
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Show message function
    function showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        // Insert message after contact form
        if (contactForm) {
            contactForm.insertBefore(messageDiv, contactForm.firstChild);
            
            // Auto-remove message after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Initialize with home page
    switchPage('home');

    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-category, .about-content, .education-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            const icon = document.querySelector('#hamburger i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});