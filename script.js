// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(5px)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Menu category filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const menuItems = document.querySelectorAll('[data-category]');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = '';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize Flatpickr for date and time inputs
if (document.getElementById('date')) {
    flatpickr("#date", {
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date().fp_incr(30) // Allow booking up to 30 days in advance
    });
}

if (document.getElementById('time')) {
    flatpickr("#time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        minTime: "11:30",
        maxTime: "22:00",
        minuteIncrement: 30
    });
}

// Reservation form validation and submission
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // If validation passes, show success message
        alert('Thank you! Your reservation has been submitted. We will confirm shortly.');
        this.reset();
    });
}

// Add to cart animation with counter
let cartCount = 0;
const cartCounterElement = document.createElement('div');
cartCounterElement.className = 'cart-counter';
cartCounterElement.style.display = 'none';
document.body.appendChild(cartCounterElement);

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Add to Cart')) {
            cartCount++;
            const originalText = this.textContent;
            
            // Button animation
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.backgroundColor = '#4ecdc4';
            
            // Cart counter animation
            cartCounterElement.textContent = cartCount;
            cartCounterElement.style.display = 'block';
            cartCounterElement.style.animation = 'none';
            cartCounterElement.offsetHeight; // Trigger reflow
            cartCounterElement.style.animation = 'popIn 0.3s ease-out';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        }
    });
});

// Blog search functionality
const blogSearchForm = document.querySelector('.search-widget form');
if (blogSearchForm) {
    blogSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input').value.toLowerCase();
        
        // Simple client-side search
        document.querySelectorAll('.blog-post').forEach(post => {
            const title = post.querySelector('h2, h3').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchInput) || content.includes(searchInput)) {
                post.style.display = '';
                post.style.opacity = '1';
            } else {
                post.style.opacity = '0';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .cart-counter {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        z-index: 1000;
    }
`;
document.head.appendChild(style);
