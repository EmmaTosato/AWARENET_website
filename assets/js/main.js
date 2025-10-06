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

    const eventTitleTarget = document.querySelector('[data-event-title]');
    if (eventTitleTarget) {
        const params = new URLSearchParams(window.location.search);
        const rawTitle = params.get('title');

        if (rawTitle) {
            const cleanedTitle = rawTitle.trim();
            if (cleanedTitle.length > 0) {
                eventTitleTarget.textContent = cleanedTitle;
                document.title = `${cleanedTitle} | AWARENET`;
            }
        }
    }
});
