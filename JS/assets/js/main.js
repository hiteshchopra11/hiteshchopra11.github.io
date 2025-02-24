// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initializeNavigation();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Contact form handling
    initializeContactForm();
    
    // Initialize skills animations
    initializeSkillBadges();
});

function initializeNavigation() {
    const navbar = document.querySelector('nav');
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-white/95');
            navbar.classList.remove('bg-white');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95');
            navbar.classList.add('bg-white');
        }
    });
    
    // Mobile menu toggle
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuButton && mobileMenu && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold');
            link.classList.add('text-gray-500');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-500');
                link.classList.add('text-blue-600', 'font-semibold');
            }
        });
    });
}

function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-fade');
        observer.observe(section);
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            try {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<div class="loading mx-auto"></div>';
                submitButton.disabled = true;
                
                // Here you would typically send the data to your backend or a service like Formspree
                // For GitHub Pages, you can use Formspree (https://formspree.io) by adding your endpoint
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('Form submission error:', error);
                
                // Reset button
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }
}

function validateForm(data) {
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50 transition-all duration-300 transform translate-y-10 opacity-0`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function initializeSkillBadges() {
    const badges = document.querySelectorAll('.skill-badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.classList.add('scale-110');
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.classList.remove('scale-110');
        });
    });
}

// Add a typewriter effect to the hero text
function typeWriterEffect() {
    const headingElement = document.querySelector('#home h1');
    const originalText = headingElement.textContent;
    headingElement.textContent = '';
    
    let i = 0;
    const speed = 100; // typing speed in ms
    
    function type() {
        if (i < originalText.length) {
            headingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(() => {
        type();
    }, 500);
}

// Add special effects for the app section
function initializeAppSection() {
    const appSection = document.getElementById('app');
    
    if (appSection) {
        // Add animated entrance for app section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Phone animation
                    const phoneElement = appSection.querySelector('.bg-black');
                    if (phoneElement) {
                        phoneElement.classList.add('animate-phone');
                    }
                    
                    // Features animation
                    const features = appSection.querySelectorAll('li');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('fade-in-right');
                        }, 100 * index);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(appSection);
        
        // Add download button hover effect
        const downloadButton = appSection.querySelector('a[href*="play.google.com"]');
        if (downloadButton) {
            downloadButton.addEventListener('mouseenter', () => {
                downloadButton.classList.add('scale-button');
            });
            
            downloadButton.addEventListener('mouseleave', () => {
                downloadButton.classList.remove('scale-button');
            });
        }
    }
}

// Add this to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations...
    
    // Initialize app section effects
    initializeAppSection();
});

// Call this after the DOM is loaded
window.addEventListener('load', typeWriterEffect);