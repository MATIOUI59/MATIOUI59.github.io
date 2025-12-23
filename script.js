// main.js

// This uses the Intersection Observer API to trigger animations
// only when elements scroll into view.

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('.hidden-section');
sections.forEach(section => {
    observer.observe(section);
});
