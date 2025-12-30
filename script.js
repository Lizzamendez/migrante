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
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}
// Cargar idioma guardado
const savedLang = localStorage.getItem('lang');
if (savedLang) document.documentElement.lang = savedLang;