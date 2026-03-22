(function () {
    'use strict';

    // Theme
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
    });

    navLinks.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
        })
    );

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function setActive() {
        const y = window.scrollY + 100;
        sections.forEach(s => {
            if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
                const id = s.getAttribute('id');
                navItems.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    // Mobile: 1st tap = show overlay, 2nd tap = open link
    let activeCard = null;

    document.querySelectorAll('.p-card.has-overlay').forEach(card => {
        card.addEventListener('click', (e) => {
            if (activeCard === card) {
                // 2nd tap — link varsa açılsın
                if (card.tagName === 'A') return;
                activeCard.classList.remove('touch-hover');
                activeCard = null;
                return;
            }

            // 1st tap — overlay göstər, linki blokla
            e.preventDefault();
            if (activeCard) activeCard.classList.remove('touch-hover');
            card.classList.add('touch-hover');
            activeCard = card;
        });
    });

    // Kənara tap — overlay bağla
    document.addEventListener('click', (e) => {
        if (activeCard && !activeCard.contains(e.target)) {
            activeCard.classList.remove('touch-hover');
            activeCard = null;
        }
    });

    // Fade-in
    const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.exp-row, .p-card, .skill-group, .cert-row, .award-row')
        .forEach(el => { el.classList.add('fade-in'); obs.observe(el); });
})();
