/**
 * Bhopal Food Delivery Analysis - Interactivity Script
 * Handles animations, smooth scrolling, and dynamic interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Fade-in Animations
    // Selects elements with .animate-fade-in or .section (if we want to animate sections)
    
    const observerOptions = {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all findings cards, visualizations, and stats
    const animateElements = document.querySelectorAll('.finding-card, .visualization, .stat-card, .abstract-box, section h2');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add 'visible' class style behavior dynamically or assume it's handled here
    // Since style.css doesn't have .visible, we can add inline styles upon intersection
    // OR better, update style.css. But let's handle it in JS to avoid modifying CSS again if possible.
    // Actually, modifying CSS is cleaner. But let's do it in JS for simplicity in this step.
    
    // We already set initial styles above. Now we modify them on intersection.
    // The previous observer loop just adds a class. Let's fix the observer logic.
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animateElements.forEach(el => revealObserver.observe(el));


    // 2. Smooth Scrolling for TOC links (for older browsers compatibility + custom ease)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 60; // Offset for sticky header if we had one, or just breathing room
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Dynamic "Back to Top" visibility (Optional)
    // We can add a floating button if we want, but sticking to the design.
});
