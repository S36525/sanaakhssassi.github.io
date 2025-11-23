document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();

    // Initialize scroll-to-top button
    initScrollToTop();

    // Initialize active navigation item based on scroll
    initActiveNav();
});

// Function to handle smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to handle scroll-to-top button
function initScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.pointerEvents = 'auto';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.pointerEvents = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function to update active navigation item based on scroll position
function initActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset as needed
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}