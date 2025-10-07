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

    const eventDetail = document.querySelector('.event-detail');
    if (eventDetail) {
        const description = eventDetail.querySelector('.event-detail__placeholder');
        if (description) {
            const hasMedia = Boolean(eventDetail.querySelector('img, figure, picture'));
            description.classList.toggle('event-detail__placeholder--wrap', hasMedia);
        }
    }

    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
        const statusMessage = contactForm.querySelector('[data-form-status]');
        const contactEmail = (contactForm.dataset.contactEmail || '').trim();

        const updateStatus = (message, tone = 'info') => {
            if (!statusMessage) {
                return;
            }

            statusMessage.textContent = message;
            statusMessage.classList.remove('form-status--success', 'form-status--error');

            if (tone === 'success') {
                statusMessage.classList.add('form-status--success');
            } else if (tone === 'error') {
                statusMessage.classList.add('form-status--error');
            }
        };

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!contactEmail) {
                updateStatus('The email service is not configured yet. Please try again soon.', 'error');
                return;
            }

            const formData = new FormData(contactForm);
            const getValue = (field) => {
                const value = formData.get(field);
                return value ? String(value).trim() : '';
            };

            const name = getValue('name');
            const email = getValue('email');
            const organization = getValue('organization');
            const message = getValue('message');

            const emailLines = [
                'You have received a new contact request from the AWARENET website.',
                '',
                `Name: ${name || 'Not provided'}`,
                `Email: ${email || 'Not provided'}`,
                `Organization: ${organization || 'Not provided'}`,
                '',
                'Message:',
                message || 'No message provided.'
            ];

            const subject = encodeURIComponent(`New contact request from ${name || 'AWARENET website'}`);
            const body = encodeURIComponent(emailLines.join('\n'));
            const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
            updateStatus('We have opened your email client to finalize the request. Please press send to complete your message.', 'success');
            contactForm.reset();
        });
    }
});
