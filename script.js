document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp configuration
    const phoneNumber = "967773003434";
    const baseMessage = "أهلاً رقائق بلال العقاب، أريد طلب: ";

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle Order Buttons
    const orderButtons = document.querySelectorAll('.btn-order, .btn-primary');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseMessage + "طلب سمبوسة مقرمشة")}`;
            window.open(url, '_blank');
        });
    });

    // Interactive Product Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h4').innerText;

            // Visual feedback
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
                card.style.transform = "scale(1.05)";
            }, 100);

            // Ask to order specific item
            if (confirm(`هل تريد طلب ${productName} عبر الواتساب؟`)) {
                const message = `أهلاً، أريد طلب: ${productName}`;
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
            }
        });
    });

    // Simple visual interaction for the floating samosa
    const heroSamosa = document.querySelector('.samosa-3d');
    if (heroSamosa) {
        heroSamosa.addEventListener('click', () => {
            heroSamosa.style.animation = 'none';
            heroSamosa.offsetHeight; // trigger reflow
            heroSamosa.style.animation = 'float 0.5s ease-in-out';

            // Add a temporary glow
            const glow = document.querySelector('.glow');
            glow.style.background = 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)';
            setTimeout(() => {
                glow.style.background = 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)';
            }, 500);
        });
    }

    function createSparkle(x, y) {
        const particle = document.createElement('div');

        // Randomly choose particle type (Moons more frequent, lanterns occasional)
        const rand = Math.random();
        if (rand < 0.5) {
            particle.className = 'sparkle moon-particle';
        } else if (rand < 0.7) {
            particle.className = 'sparkle lantern-particle';
        } else {
            particle.className = 'sparkle';
        }

        // Random fall direction
        const tx = (Math.random() - 0.5) * 150;
        const ty = 150 + Math.random() * 150;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Randomize size slightly
        const size = 5 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        document.body.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Create several particles per move
        for (let i = 0; i < 4; i++) {
            if (Math.random() > 0.4) {
                createSparkle(x, y);
            }
        }
    });

    // Touch support for mobile
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 6; i++) {
            createSparkle(touch.clientX, touch.clientY);
        }
    });
});
