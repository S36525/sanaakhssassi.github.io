// ====== Year in sidebar footer ======
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ====== Smooth scroll & active nav ======
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

function smoothScroll(event) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();

    const target = document.querySelector(href);
    if (target) {
        const topOffset = 24; // small offset
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - topOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
}

navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

function highlightNavOnScroll() {
    let currentId = "";

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        if (window.scrollY + 120 >= offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", highlightNavOnScroll);
highlightNavOnScroll();

// ====== Scroll to top button ======
const scrollBtn = document.getElementById("scrollToTop");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ====== Reveal on scroll (IntersectionObserver) ======
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    revealElements.forEach((el) => observer.observe(el));
} else {
    // Fallback: just show them
    revealElements.forEach((el) => el.classList.add("visible"));
}

// ====== Simple typing effect for hero title ======
const typingSpan = document.querySelector(".typing");
if (typingSpan) {
    const texts = JSON.parse(typingSpan.getAttribute("data-text") || "[]");
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = texts[wordIndex] || "";
        const visibleText = currentWord.substring(0, charIndex);
        typingSpan.textContent = visibleText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        } else {
            if (!isDeleting) {
                // pause at end
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % texts.length;
            }
        }
        const typingSpeed = isDeleting ? 60 : 120;
        setTimeout(type, typingSpeed);
    }

    if (texts.length > 0) {
        type();
    }
}
