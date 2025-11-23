// ===== SIDEBAR TOGGLE (MOBILE) =====
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}

// ===== ACTIVE NAV ON SCROLL =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

function updateActiveNav() {
    let currentId = "";
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentId = "#" + section.id;
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === currentId);
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
            // Close sidebar on mobile
            sidebar?.classList.remove("open");
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
    if (!scrollBtn) return;
    if (window.scrollY > 400) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== TYPING EFFECT IN HERO =====
const typingSpan = document.querySelector(".typing");

if (typingSpan) {
    const texts = JSON.parse(typingSpan.getAttribute("data-text") || "[]");
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const currentWord = texts[wordIndex] || "";
        const visibleText = currentWord.substring(0, charIndex);
        typingSpan.textContent = visibleText;

        if (!deleting && charIndex < currentWord.length) {
            charIndex++;
        } else if (deleting && charIndex > 0) {
            charIndex--;
        } else {
            if (!deleting) {
                deleting = true;
                setTimeout(type, 1000);
                return;
            } else {
                deleting = false;
                wordIndex = (wordIndex + 1) % texts.length;
            }
        }

        const speed = deleting ? 60 : 120;
        setTimeout(type, speed);
    }

    if (texts.length > 0) {
        type();
    }
}

// ===== YEAR IN FOOTER =====
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
