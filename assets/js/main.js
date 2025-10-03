const toggleButton = document.querySelector('.navbar__toggle');
const navigation = document.querySelector('#primary-navigation');

if (toggleButton && navigation) {
    toggleButton.addEventListener('click', () => {
        const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
        toggleButton.setAttribute('aria-expanded', String(!expanded));
        navigation.classList.toggle('navbar__menu--open');
    });

    navigation.querySelectorAll('.navbar__link').forEach((link) => {
        link.addEventListener('click', () => {
            navigation.classList.remove('navbar__menu--open');
            toggleButton.setAttribute('aria-expanded', 'false');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
