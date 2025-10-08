// Function to switch language
function setLanguage(lang) {
    // 1. Change the main body language attribute
    document.body.setAttribute('data-lang', lang);
    
    // 2. Change all text content based on data attributes
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // For links and non-input elements
            if (element.tagName === 'A' || element.tagName === 'SPAN' || element.tagName === 'BUTTON' || element.tagName === 'H2' || element.tagName === 'P') {
                element.textContent = text;
            }
            // For placeholders (if any) or other elements
        }
    });
}

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Hamburger button click
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked (on mobile)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });
});