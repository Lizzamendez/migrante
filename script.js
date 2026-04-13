// ─── Tema ────────────────────────────────────────────────────────────────────

function updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    updateThemeButton(theme);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
}

// ─── Voltar ao Topo ───────────────────────────────────────────────────────────

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ─── Idiomas ──────────────────────────────────────────────────────────────────

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    const langCode = lang.split('-')[0]; // "pt-BR" → "pt"

    // Ocultar/mostrar via classe CSS em vez de style inline
    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        el.hidden = true;
    });
    document.querySelectorAll(`.lang-${langCode}`).forEach(el => {
        el.hidden = false;
    });

    // Atualizar botões (só aria-pressed; o CSS cuida do visual)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
    });
    document.querySelector(`.lang-btn[onclick*="${lang}"]`)
        ?.setAttribute('aria-pressed', 'true');
}

// ─── Inicialização ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initBackToTop();
    initContactForm();
    setLanguage(localStorage.getItem('lang') || 'pt-BR');
});

function initContactForm() {
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault(); // ✅ Evita recarregar a página
        // Aqui você pode enviar os dados via fetch() para um backend
        alert('Mensagem enviada! Obrigado pelo contato.');
        e.target.reset();
    });
}
