const themeSelector = document.querySelector('#theme-select');
const body = document.querySelector('body');
const logo = document.querySelector('#logo');

themeSelector.addEventListener('change', () => {
    if (themeSelector.value === 'dark') {
        body.classList.add('dark');
        logo.setAttribute('src', 'images/byui-logo-white.png');
    } else {
        body.classList.remove('dark');
        logo.setAttribute('src', 'images/byui-logo-blue.webp');
    }
});