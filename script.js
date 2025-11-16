// Scroll animation for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Parallax effect for floating boxes
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-box');
    const speed = 0.5;
    
    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform += ` translateY(${yPos}px)`;
    });
});

// Mobile navigation toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (navMenu && navToggle && navContainer) {
        if (!navContainer.contains(event.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }
});

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (12 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.stat, .project-card, .service-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationPlayState = 'running';
        }
    });
}

// Stagger animations for elements
function staggerAnimations() {
    const stats = document.querySelectorAll('.stat');
    const projects = document.querySelectorAll('.project-card');
    const services = document.querySelectorAll('.service-card');
    const contacts = document.querySelectorAll('.contact-item');
    
    [stats, projects, services, contacts].forEach(collection => {
        collection.forEach((element, index) => {
            element.style.animationDelay = (index * 0.2) + 's';
        });
    });
}

// Typewriter Effect for H2
function typewriterEffect() {
    const titles = [
        'IT Support Specialist & Frontend Developer',
        'Problem Solver & Tech Innovator',
        'System Administrator & Web Designer',
        'Technical Support Expert & UI/UX Designer',
        'Network Specialist & React Developer',
        'Help Desk Professional & JavaScript Expert',
        'IT Consultant & Full Stack Developer'
    ];
    
    let currentIndex = 0;
    const titleElement = document.getElementById('dynamic-title');
    
    if (!titleElement) return;
    
    function typeText(text, callback) {
        titleElement.textContent = '';
        let i = 0;
        
        const typing = setInterval(() => {
            titleElement.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typing);
                setTimeout(callback, 2000);
            }
        }, 100);
    }
    
    function eraseText(callback) {
        const currentText = titleElement.textContent;
        let i = currentText.length;
        
        const erasing = setInterval(() => {
            titleElement.textContent = currentText.substring(0, i);
            i--;
            
            if (i < 0) {
                clearInterval(erasing);
                setTimeout(callback, 500);
            }
        }, 50);
    }
    
    function nextTitle() {
        eraseText(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            typeText(titles[currentIndex], nextTitle);
        });
    }
    
    // Start with first title
    typeText(titles[0], nextTitle);
}

// Enhanced Hero Animations
function addHeroInteractivity() {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!heroSection || !heroContent) return;
    
    // Mouse move parallax effect
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'translate(0, 0)';
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    staggerAnimations();
    handleScrollAnimations();
    setTimeout(typewriterEffect, 2000);
    addHeroInteractivity();
    animateStats();
});

// Animate Statistics Counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        
        setTimeout(() => {
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 30);
        }, 3000);
    });
}

// Theme Toggle
function toggleTheme() {
    const themes = [
        { primary: '#1a365d', accent: '#38a169', gold: '#d69e2e' },
        { primary: '#2d1b69', accent: '#9f7aea', gold: '#f6ad55' },
        { primary: '#1a202c', accent: '#4fd1c7', gold: '#fbb6ce' },
        { primary: '#744210', accent: '#f6e05e', gold: '#fc8181' }
    ];
    
    const currentTheme = Math.floor(Math.random() * themes.length);
    const theme = themes[currentTheme];
    
    document.documentElement.style.setProperty('--job-primary', theme.primary);
    document.documentElement.style.setProperty('--job-accent', theme.accent);
    document.documentElement.style.setProperty('--job-gold', theme.gold);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${theme.accent};
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        z-index: 10003;
        font-weight: 600;
        animation: slideDown 0.5s ease-out;
    `;
    notification.textContent = '🎨 Theme Changed!';
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
}

window.addEventListener('scroll', handleScrollAnimations);