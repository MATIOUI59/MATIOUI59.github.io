// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections with the hidden-section class
const sections = document.querySelectorAll('.hidden-section');
sections.forEach(section => {
    observer.observe(section);
});

// Add active state to navigation based on scroll position
const navLinks = document.querySelectorAll('.nav-menu a');
const observedSections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    rootMargin: '-50% 0px -50% 0px'
});

observedSections.forEach(section => {
    navObserver.observe(section);
});

// Navbar background change on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.7)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '2px solid var(--highlight)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

console.log('🔒 Portfolio loaded successfully - Mouad Matioui');
