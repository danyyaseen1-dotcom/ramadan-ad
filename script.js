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

    function createSparkle(x, y, isLantern = false) {
        const particle = document.createElement('div');

        // Randomly choose particle type
        const rand = Math.random();
        if (isLantern) {
            particle.className = 'sparkle lantern-particle';
        } else if (rand < 0.5) {
            particle.className = 'sparkle moon-particle';
        } else {
            particle.className = 'sparkle';
        }

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const size = (isLantern ? 0.8 : 3) + Math.random() * 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        if (isLantern) {
            // Floating dust logic for lanterns - Ultra-slow float
            const fallDuration = 10 + Math.random() * 10;
            const drift = (Math.random() - 0.5) * 100;
            const targetY = window.innerHeight - 20; // Bottom of viewport

            // Ensure they fade to 0 by the time they finish falling
            particle.style.opacity = '0.8';
            particle.style.transition = `transform ${fallDuration}s linear, opacity ${fallDuration}s ease-in`;
            document.body.appendChild(particle);

            // Trigger animation next frame
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${drift}px, ${targetY - y}px) rotate(${Math.random() * 720}deg)`;
                particle.style.opacity = '0'; // Fade to zero during the same duration
            });

            // Remove purely based on fall duration
            setTimeout(() => {
                particle.remove();
            }, fallDuration * 1000);
        } else {
            // Original mouse sparkle logic
            const tx = (Math.random() - 0.5) * 150;
            const ty = 150 + Math.random() * 150;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    // Drop sparkles from lanterns periodically
    setInterval(() => {
        const lights = document.querySelectorAll('.fanoos-light');
        lights.forEach(light => {
            const rect = light.getBoundingClientRect();
            // Only drop if lantern is somewhat visible
            if (rect.top > -100 && rect.top < window.innerHeight) {
                // Increased probability for visibility
                if (Math.random() > 0.4) {
                    createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                }
            }
        });
    }, 150);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        for (let i = 0; i < 4; i++) {
            if (Math.random() > 0.4) {
                createSparkle(x, y);
            }
        }
    });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        for (let i = 0; i < 6; i++) {
            createSparkle(touch.clientX, touch.clientY);
        }
    });
});
