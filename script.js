// === ANIMACIÓN DEL SLOGAN ===
document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector(".slogan-text");
    const text = textElement.textContent.trim();
    textElement.innerHTML = "";

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        textElement.appendChild(span);
    });

    // === PARTÍCULAS DE SOMBRA Y LUZ ===
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.size = Math.random() * 3 + 1;
            this.speedY = -Math.random() * 2 - 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.life = 0;
            this.maxLife = Math.random() * 100 + 100;
            this.color = Math.random() > 0.7 ? "rgba(255, 255, 255, 0.8)" : "rgba(106, 8, 8, 0.6)";
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.life++;
            this.speedY *= 0.99;
        }

        draw() {
            const opacity = 1 - this.life / this.maxLife;
            ctx.globalAlpha = opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const createParticles = () => {
        if (particles.length < 50) {
            particles.push(new Particle());
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createParticles();

        particles = particles.filter(p => p.life < p.maxLife);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // === CARRUSEL ===
    class Carousel {
        constructor() {
            this.currentSlide = 0;
            this.slidesContainer = document.getElementById('carouselImages');
            this.images = this.slidesContainer.querySelectorAll('img');
            this.totalSlides = this.images.length;
            this.imageWidth = 200;
            this.init();
        }

        init() {
            this.showSlide();
            setInterval(() => this.nextSlide(), 5000);
        }

        showSlide() {
            const translateX = -this.currentSlide * this.imageWidth;
            this.slidesContainer.style.transform = `translateX(${translateX}px)`;
        }

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.showSlide();
        }

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.showSlide();
        }
    }

    const carousel = new Carousel();
    window.nextSlide = () => carousel.nextSlide();
    window.prevSlide = () => carousel.prevSlide();

    // === FORMULARIO ===
    document.querySelector('.form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Subscribed! Thank you for joining the NSK family.');
    });
});