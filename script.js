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

    // --- STEAM EFFECT ENGINE ---
    setInterval(() => {
        const samosa = document.querySelector('.samosa-3d');
        if (samosa) {
            const rect = samosa.getBoundingClientRect();
            createSteam(rect.left + rect.width / 2 + (Math.random() - 0.5) * 50, rect.top + 50);
        }
    }, 400);

    function createSteam(x, y) {
        const steam = document.createElement('div');
        steam.className = 'steam';
        steam.style.left = `${x}px`;
        steam.style.top = `${y}px`;
        // Random drift
        steam.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`);
        document.body.appendChild(steam);
        setTimeout(() => steam.remove(), 3000);
    }

    // --- INTERACTIVE CRUNCH FEATURE ---
    const heroSamosa = document.querySelector('.samosa-3d');
    if (heroSamosa) {
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

    // --- PARALLAX ENGINE ---
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        // Apply varying intensities
        const moon = document.querySelector('.moon-container');
        if (moon) moon.style.transform = `translate(${moveX * 3}px, ${moveY * 3}px)`;

        const lanterns = document.querySelector('.lanterns');
        if (lanterns) lanterns.style.transform = `translate(${moveX * -2}px, ${moveY * -1}px)`;

        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) heroVisual.style.transform = `translate(${moveX * 5}px, ${moveY * 5}px)`;
    });

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

    // --- GREETING CARD GENERATOR ---
    const generateBtn = document.getElementById('generate-btn');
    const nameInput = document.getElementById('user-name');
    const canvas = document.getElementById('card-canvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('download-link');

    generateBtn.addEventListener('click', () => {
        const userName = nameInput.value.trim();
        if (!userName) {
            alert("يرجى كتابة اسمك أولاً!");
            return;
        }

        canvas.style.display = 'block';
        drawGreetingCard(userName);
    });

    function drawGreetingCard(name) {
        // Background
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#1A1A1A');
        grad.addColorStop(1, '#3D2B1F');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative Border
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 15;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        // Ornament dots
        ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 100; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Title text
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.font = 'bold 60px Amiri';
        ctx.fillText('كل عام وأنتم بخير', canvas.width / 2, 250);

        // Main Greeting
        ctx.font = '70px Amiri';
        ctx.fillText('رمضان كريم', canvas.width / 2, 400);

        // User Name
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 80px Amiri';
        ctx.fillText(name, canvas.width / 2, 550);

        // Subtext
        ctx.fillStyle = '#FFD700';
        ctx.font = '30px Tajawal';
        ctx.fillText('من عائلة رقائق بلال العقاب', canvas.width / 2, 700);

        // Logo text at bottom
        ctx.font = '900 40px Tajawal';
        ctx.fillText('بلال العقاب', canvas.width / 2, 850);

        // Show download link
        downloadLink.style.display = 'inline-block';
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `Ramadan_Kareem_${name}.png`;

        // Scroll to preview
        canvas.scrollIntoView({ behavior: 'smooth' });
    }
});
