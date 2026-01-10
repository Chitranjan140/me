// Portfolio JavaScript - Enhanced with Perfect Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initSmoothScroll();
    initNavigation();
    initMobileMenu();
    initDynamicTitle();
    initCounters();
    initParticles();
    initScrollEffects();
    initRevealAnimations();
});

// Enhanced Smooth Scroll Implementation
function initSmoothScroll() {
    // Enhanced smooth scroll function with better easing
    function smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Smooth cubic easing function
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Apply to all navigation links with enhanced handling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                // Add active class immediately
                document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                smoothScrollTo(target);
                closeMenu();
            }
        }, { passive: false });
    });
    
    // Fallback CSS smooth scroll for other links
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Enhanced Navigation Management
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    
    // Throttled scroll handler for better performance
    let ticking = false;
    
    function updateNavigation() {
        const scrollY = window.pageYOffset;
        
        // Navbar scroll effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Enhanced active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link with smooth transition
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    }, { passive: true });
}

// Mobile Menu Management
function initMobileMenu() {
    window.toggleMenu = function() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    };
    
    window.closeMenu = function() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    };
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// Ultra Modern Dynamic Title with Multiple Effects
function initDynamicTitle() {
    const titles = [
        { text: 'IT Support Specialist', color: '#3b82f6' },
        { text: 'Software Developer', color: '#10b981' }, 
        { text: 'Frontend Developer', color: '#f59e0b' },
        { text: 'Problem Solver', color: '#8b5cf6' },
        { text: 'Tech Innovator', color: '#ef4444' }
    ];
    
    const titleElement = document.getElementById('dynamic-title');
    if (!titleElement) return;
    
    let currentIndex = 0;
    
    function modernTypeTitle() {
        const current = titles[currentIndex];
        let charIndex = 0;
        
        titleElement.innerHTML = '<span class="highlight typing-text"></span>';
        const spanElement = titleElement.querySelector('.highlight');
        spanElement.style.color = current.color;
        spanElement.style.textShadow = `0 0 10px ${current.color}40`;
        
        function typeWithEffect() {
            if (charIndex < current.text.length) {
                if (Math.random() < 0.1) {
                    spanElement.style.transform = `translateX(${Math.random() * 2 - 1}px)`;
                    setTimeout(() => spanElement.style.transform = 'translateX(0)', 50);
                }
                
                spanElement.textContent += current.text.charAt(charIndex);
                charIndex++;
                
                const speed = Math.random() * 100 + 50;
                setTimeout(typeWithEffect, speed);
            } else {
                spanElement.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    spanElement.style.animation = '';
                    setTimeout(modernEraseTitle, 2500);
                }, 500);
            }
        }
        
        function modernEraseTitle() {
            if (spanElement.textContent.length > 0) {
                if (Math.random() < 0.3) {
                    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                    const randomChar = chars[Math.floor(Math.random() * chars.length)];
                    spanElement.textContent = spanElement.textContent.slice(0, -1) + randomChar;
                    setTimeout(() => {
                        spanElement.textContent = spanElement.textContent.slice(0, -1);
                    }, 30);
                }
                spanElement.textContent = spanElement.textContent.slice(0, -1);
                setTimeout(modernEraseTitle, 30);
            } else {
                currentIndex = (currentIndex + 1) % titles.length;
                setTimeout(modernTypeTitle, 800);
            }
        }
        
        typeWithEffect();
    }
    
    modernTypeTitle();
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Particles System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Enhanced Scroll Effects with All Animations Preserved
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate', 'visible');
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = '0.2s';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .timeline-item, .skill-category, .project-card, .stat, .about-text p').forEach(el => {
        observer.observe(el);
    });
}

// Initialize Reveal Animations
function initRevealAnimations() {
    // Add reveal animation classes to elements
    const elementsToReveal = document.querySelectorAll('.service-card, .stat, .skill-category');
    elementsToReveal.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger animations on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elementsToReveal.forEach(el => revealObserver.observe(el));
}

// Theme Toggle (if needed)
window.toggleTheme = function() {
    document.body.classList.toggle('dark-theme');
};

// Enhanced scroll performance with preserved animations
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Clear existing timeout
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Set new timeout for scroll end detection
    scrollTimeout = setTimeout(() => {
        // Trigger any scroll-end animations here
        document.body.classList.remove('scrolling');
    }, 150);
    
    // Add scrolling class for potential animations
    document.body.classList.add('scrolling');
}, { passive: true });

// Utility function for debouncing (preserved)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}