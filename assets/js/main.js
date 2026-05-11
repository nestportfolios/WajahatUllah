document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('preloader-active');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
            }, 2000); // Cinematic delay
        });
    }

    // 1. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggleBtn) {
        const updateIcon = (theme) => {
            const icon = themeToggleBtn.querySelector('i');
            if (theme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        };

        updateIcon(currentTheme);

        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let targetTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateIcon(targetTheme);
        });
    }

    // 2. Typing Effect
    const typingText = document.querySelector('.hero h2');
    if (typingText) {
        const text = typingText.innerText;
        typingText.innerText = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                typingText.innerText += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        setTimeout(type, 1000);
    }

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 5. Magnetic Buttons Effect
    const magneticElements = document.querySelectorAll('.btn, .nav-links li a, .theme-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const pos = el.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    // 6. Cinematic Star Animation
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let stars = [];

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars();
        });

        function initStars() {
            stars = [];
            const numStars = Math.floor(width * height / 15000); 
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.2 + 0.2,
                    opacity: Math.random(),
                    speed: Math.random() * 0.02 + 0.005
                });
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? '#fff' : '#000';

            stars.forEach(star => {
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
                ctx.globalAlpha = Math.abs(star.opacity);
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animateStars);
        }

        initStars();
        animateStars();
    }

    // 7. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
