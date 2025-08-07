document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    let menu = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        
        // Reveal elements on scroll
        revealElements();
        
        // Update active navigation based on scroll position
        updateActiveNavLink();
    };

    // Smooth scroll for navigation links
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animated background elements
    createAnimatedBackground();
    
    // Initialize scroll reveal animation
    initScrollReveal();
    
    // Initialize typing animation
    initTypingEffect();
});

// Create floating elements in background for futuristic effect
function createAnimatedBackground() {
    const particles = 15;
    const body = document.querySelector('body');
    
    for (let i = 0; i < particles; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styling
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.width = Math.random() * 10 + 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.2 + 0.1;
        particle.style.animation = `float ${Math.random() * 20 + 15}s linear infinite`;
        particle.style.animationDelay = `-${Math.random() * 10}s`;
        
        body.appendChild(particle);
    }
    
    // Add styles for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: fixed;
            background: linear-gradient(45deg, #00c3ff, #4e44ce);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0);
            }
            50% {
                transform: translateY(-100vh) rotate(180deg);
            }
            100% {
                transform: translateY(-200vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Reveal elements as they come into view
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.box, .heading, .content, .image');
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Add styles for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Initial check for elements in viewport
    revealElements();
}

function revealElements() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Typing animation for the highlight text
function initTypingEffect() {
    const textElement = document.querySelector('.highlight');
    const originalText = textElement.innerText;
    textElement.innerText = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            textElement.innerText += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            
            // Add blinking cursor effect after typing
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            textElement.appendChild(cursor);
            
            const cursorStyle = document.createElement('style');
            cursorStyle.textContent = `
                .cursor {
                    display: inline-block;
                    width: 3px;
                    height: 42px;
                    background-color: #00c3ff;
                    margin-left: 5px;
                    animation: blink 1s infinite;
                    vertical-align: middle;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(cursorStyle);
        }
    }, 100);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.scrollY >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}
