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

    // --- GOLDEN CRESCENT PARTICLES ON MOUSEMOVE (ENTIRE PAGE) ---
    document.addEventListener('mousemove', (e) => {
        // Create golden crescent particles anywhere on page
        if (Math.random() > 0.8) { // 20% chance per mousemove (lower than before for better performance)
            createGoldenCrescent(e.clientX, e.clientY);
        }
    });

    // --- CRUNCH EFFECT ON SAMOSA CLICK ---
    const heroSamosa = document.querySelector('.samosa-3d');
    if (heroSamosa) {
        // Crunch effect on click
        heroSamosa.addEventListener('click', (e) => {
            // Explode crumbs
            for (let i = 0; i < 15; i++) {
                createCrumb(e.clientX, e.clientY);
            }

            // Visual bounce
            heroSamosa.style.transform = "scale(0.9) rotate(15deg)";
            setTimeout(() => {
                heroSamosa.style.transform = "scale(1) rotate(15deg)";
            }, 100);
        });
    }

    // Helper function to create golden crescent particles
    function createGoldenCrescent(x, y) {
        const crescent = document.createElement('div');
        crescent.className = 'golden-crescent';
        crescent.style.left = `${x}px`;
        crescent.style.top = `${y}px`;

        // Random fall trajectory
        const tx = (Math.random() - 0.5) * 100;
        const ty = Math.random() * 300 + 100;
        crescent.style.setProperty('--tx', `${tx}px`);
        crescent.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(crescent);
        setTimeout(() => crescent.remove(), 2000);
    }

    // --- LANTERN GOLDEN DUST EFFECT ---
    setInterval(() => {
        const lanterns = document.querySelectorAll('.lantern');
        lanterns.forEach(lantern => {
            if (Math.random() > 0.5) { // 50% chance per interval
                const rect = lantern.getBoundingClientRect();
                createGoldenDust(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 20,
                    rect.bottom - 20
                );
            }
        });
    }, 200);

    // Helper function to create golden dust from lanterns
    function createGoldenDust(x, y) {
        const dust = document.createElement('div');
        dust.className = 'golden-dust';
        dust.style.left = `${x}px`;
        dust.style.top = `${y}px`;

        // Random fall trajectory
        const tx = (Math.random() - 0.5) * 30;
        const ty = Math.random() * 200 + 100;
        dust.style.setProperty('--tx', `${tx}px`);
        dust.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(dust);
        setTimeout(() => dust.remove(), 3000);
    }

    // Helper function to create crumbs on click
    function createCrumb(x, y) {

        const crumb = document.createElement('div');
        crumb.className = 'crumb';
        crumb.style.left = `${x}px`;
        crumb.style.top = `${y}px`;

        const ex = (Math.random() - 0.5) * 200;
        const ey = (Math.random() - 0.5) * 200;
        crumb.style.setProperty('--ex', `${ex}px`);
        crumb.style.setProperty('--ey', `${ey}px`);

        document.body.appendChild(crumb);
        setTimeout(() => crumb.remove(), 800);
    }



    // --- SMART countdown LOGIC ---
    function updateCountdown() {
        const now = new Date();
        const yemenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Aden' }));

        // Mocking Ramadan Maghrib (roughly 6:15 PM)
        const target = new Date(yemenTime);
        target.setHours(18, 15, 0);

        if (yemenTime > target) {
            // If passed, target next day or Suhur (3:00 AM)
            target.setDate(target.getDate() + 1);
            document.getElementById('timer-label').innerText = "الوقت المتبقي للسحور";
            target.setHours(3, 0, 0);
        } else {
            document.getElementById('timer-label').innerText = "الوقت المتبقي للإفطار";
        }

        const diff = target - yemenTime;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


});
