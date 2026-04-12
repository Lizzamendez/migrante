const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.textContent = '☀️ Modo Claro';
}

toggleButton.addEventListener('click', () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleButton.textContent = '☀️ Modo Claro';
        theme = 'dark';
    } else {
        document.documentElement.removeAttribute('data-theme');
        toggleButton.textContent = '🌙 Modo Escuro';
    }
    localStorage.setItem('theme', theme);
});

// Lógica do botão Voltar ao Topo
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Mostrar el botón si bajamos más de 300px
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lógica de Idiomas
function setLanguage(lang) {
    // Actualizar atributo lang del HTML
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    
    // Ocultar todos los elementos de idioma
    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        el.style.display = 'none';
    });
    
    // Mostrar solo los del idioma seleccionado
    const langCode = lang.split('-')[0]; // pt-BR → pt
    document.querySelectorAll(`.lang-${langCode}`).forEach(el => {
        el.style.display = ''; // Mostrar (resetear display)
    });
    
    // Actualizar estado visual de los botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.style.opacity = '0.7';
    });
    const activeBtn = document.querySelector(`.lang-btn[onclick*="${lang}"]`);
    if (activeBtn) {
        activeBtn.setAttribute('aria-pressed', 'true');
        activeBtn.style.opacity = '1';
        activeBtn.style.fontWeight = 'bold';
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'pt-BR';
    setLanguage(savedLang);
});
