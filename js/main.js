// LabLink — Main JS

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initNav();
    initFAQ();
    initReveal();
    initForm();
});

// ---------- Navigation ----------
function initNav() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Sticky shadow
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }
}

// ---------- FAQ ----------
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close others
            document.querySelectorAll('.faq-item.open').forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            item.classList.toggle('open');
            answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
        });
    });
}

// ---------- Reveal on scroll ----------
function initReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- Contact Form (Web3Forms) ----------
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const lang = () => document.documentElement.lang || 'de';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusEl.className = 'form-status';
        statusEl.textContent = '';

        const originalLabel = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const data = new FormData(form);
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            const json = await res.json().catch(() => ({}));
            if (res.ok && json.success !== false) {
                statusEl.className = 'form-status success';
                statusEl.textContent = translations[lang()]['contact.form.success'];
                form.reset();
            } else {
                throw new Error('Network');
            }
        } catch {
            statusEl.className = 'form-status error';
            statusEl.textContent = translations[lang()]['contact.form.error'];
        } finally {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            submitBtn.textContent = originalLabel;
            // Scroll status into view
            statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}
