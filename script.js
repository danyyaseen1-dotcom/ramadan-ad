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

    // --- GOLDEN CRESCENT PARTICLES ON SAMOSA HOVER & CRUNCH ON CLICK ---
    const heroSamosa = document.querySelector('.samosa-3d');
    if (heroSamosa) {
        // Golden crescent particles on mousemove
        heroSamosa.addEventListener('mousemove', (e) => {
            // Create golden crescent particles
            if (Math.random() > 0.7) { // 30% chance per mousemove
                createGoldenCrescent(e.clientX, e.clientY);
            }
        });

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
        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#1A1A1A');
        grad.addColorStop(0.5, '#2D1B14');
        grad.addColorStop(1, '#3D2B1F');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Decorative golden border with pattern
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 20;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Inner decorative border
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 3;
        ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

        // Golden ornamental dots/stars overlay
        ctx.fillStyle = '#FFD700';
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Decorative crescents (hilal) in corners
        const drawCrescent = (x, y, size, rotation) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#2D1B14';
            ctx.beginPath();
            ctx.arc(size * 0.5, size * 0.5, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        drawCrescent(120, 120, 40, -Math.PI / 4);
        drawCrescent(canvas.width - 120, 120, 40, Math.PI / 4);
        drawCrescent(120, canvas.height - 120, 40, -Math.PI * 3 / 4);
        drawCrescent(canvas.width - 120, canvas.height - 120, 40, Math.PI * 3 / 4);

        // Main title - "كل عام وأنتم بخير"
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 55px Arial, sans-serif';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
        ctx.shadowBlur = 15;
        ctx.fillText('كل عام وأنتم بخير', canvas.width / 2, 220);

        // Main greeting - "رمضان كريم"
        ctx.font = 'bold 85px Arial, sans-serif';
        ctx.shadowBlur = 20;
        const gradient = ctx.createLinearGradient(0, 350, 0, 420);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FFF');
        gradient.addColorStop(1, '#FFD700');
        ctx.fillStyle = gradient;
        ctx.fillText('رمضان كريم', canvas.width / 2, 380);

        // User name with a decorative underline
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 95px Arial, sans-serif';
        ctx.fillText(name, canvas.width / 2, 550);

        // Decorative line under name
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 180, 600);
        ctx.lineTo(canvas.width / 2 + 180, 600);
        ctx.stroke();

        // Small decorative stars on the line
        ctx.fillStyle = '#FFD700';
        ctx.font = '30px Arial';
        ctx.fillText('✦', canvas.width / 2 - 200, 600);
        ctx.fillText('✦', canvas.width / 2 + 200, 600);

        // Subtext - brand message
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#FFD700';
        ctx.font = '32px Arial, sans-serif';
        ctx.fillText('من عائلة رقائق بلال العقاب', canvas.width / 2, 720);

        // Brand logo text at bottom with emphasis
        ctx.shadowBlur = 15;
        ctx.font = 'bold 50px Arial, sans-serif';
        const logoGrad = ctx.createLinearGradient(0, 830, 0, 880);
        logoGrad.addColorStop(0, '#FFD700');
        logoGrad.addColorStop(1, '#B8860B');
        ctx.fillStyle = logoGrad;
        ctx.fillText('بلال العقاب', canvas.width / 2, 860);

        // Small decorative element below brand
        ctx.font = '25px Arial';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
        ctx.fillText('❖ ❖ ❖', canvas.width / 2, 920);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Show download link
        downloadLink.style.display = 'inline-block';
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `Ramadan_Kareem_${name}.png`;

        // Scroll to preview with smooth behavior
        canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

});
