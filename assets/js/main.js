document.addEventListener('DOMContentLoaded', () => {

    // ── 0. PRELOADER ──
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('preloader-active');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
            }, 2200);
        });
    }

    // ── 1. THEME TOGGLE ──
    const themeToggleBtn = document.getElementById('theme-toggle');
    // Always default to dark for this HSE portfolio
    const savedTheme = localStorage.getItem('wj-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const updateThemeIcon = (theme) => {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('wj-theme', next);
            updateThemeIcon(next);
        });
    }

    // ── 2. NAVBAR SCROLL EFFECT ──
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── 3. HAMBURGER MENU ──
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

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

    // ── 4. TYPING EFFECT (hero tagline) ──
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const original = tagline.innerText;
        tagline.innerText = '';
        let i = 0;
        const type = () => {
            if (i < original.length) {
                tagline.innerText += original[i++];
                setTimeout(type, 32);
            }
        };
        setTimeout(type, 2600); // after preloader
    }

    // ── 5. SCROLL REVEAL (IntersectionObserver) ──
    const revealEls = document.querySelectorAll('.reveal, .reveal-left');
    const observer  = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // ── 6. ANIMATED STAT COUNTERS ──
    const statNumbers = document.querySelectorAll('.hero-stat-num');

    const animateCounter = (el) => {
        const raw    = el.innerText;
        const suffix = raw.replace(/[\d.]/g, '');   // e.g. "+", "%"
        const target = parseFloat(raw);
        const isFloat = raw.includes('.');
        const duration = 1800;
        const step = 16;
        const steps = Math.ceil(duration / step);
        let count = 0;

        const update = () => {
            count++;
            const value = (count / steps) * target;
            el.innerText = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
            if (count < steps) setTimeout(update, step);
            else el.innerText = raw; // snap to exact
        };
        update();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    // ── 7. BUTTON RIPPLE EFFECT ──
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const size   = Math.max(btn.offsetWidth, btn.offsetHeight);
            const rect   = btn.getBoundingClientRect();
            ripple.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top:  ${e.clientY - rect.top  - size / 2}px;
            `;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });

    // ── 8. ACTIVE NAV HIGHLIGHT (scroll spy) ──
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => a.classList.remove('active-nav'));
                const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (match) match.classList.add('active-nav');
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => spy.observe(s));

});
