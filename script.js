// ANIMATIONS AU SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getComputedStyle(entry.target).animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les éléments animés
document.querySelectorAll('.award-card, .showcase-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// BUTTON CLICK EFFECTS
const buttons = document.querySelectorAll('.cta-button, .cta-button-large');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// PARALLAX EFFECT (optionnel - améliore l'expérience)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const batSignal = document.querySelector('.bat-signal');
    
    if (batSignal) {
        batSignal.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// HOVER EFFECTS SUR LES CARTES
const cards = document.querySelectorAll('.award-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// COMPTEUR ANIMÉ POUR LES STATS
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('K') ? 'K+' : counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent;
            }
        };

        observer.observe(counter, {
            threshold: 0.5
        });
    });
};

// Appeler la fonction quand le DOM est prêt
document.addEventListener('DOMContentLoaded', animateCounters);

// MOUSE GLOW EFFECT
document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.card-glow');
    
    glowElements.forEach(glow => {
        const rect = glow.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            glow.style.opacity = '1';
            glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
        } else {
            glow.style.opacity = '0.5';
        }
    });
});

console.log('🦇 Batman Awards Page loaded successfully!');
