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

async function enhanceHeroAnimation() {
    const mediaContainer = document.querySelector('.hero-media[data-animation]');
    if (!mediaContainer) {
        return;
    }

    if (mediaContainer.dataset.enhanced === 'true') {
        return;
    }

    const source = mediaContainer.getAttribute('data-animation');
    if (!source || typeof ImageDecoder === 'undefined' || typeof createImageBitmap === 'undefined') {
        return;
    }

    try {
        const response = await fetch(source);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        const type = source.endsWith('.webp') ? 'image/webp' : 'image/gif';
        const decoder = new ImageDecoder({ data: buffer, type });
        await decoder.tracks.ready;
        const track = decoder.tracks.selected;
        const frames = [];

        for (let frameIndex = 0; frameIndex < track.frameCount; frameIndex += 1) {
            const { image, duration } = await decoder.decode({ frameIndex });
            const bitmap = await createImageBitmap(image);
            image.close();

            const fallbackDuration = track.recommendedFrameDuration || 16666;
            frames.push({
                bitmap,
                duration: Math.max(16, Math.round((duration || fallbackDuration) / 1000)),
            });
        }

        if (!frames.length) {
            return;
        }

        decoder.close();

        const mirrored = frames.length > 2 ? frames.slice(1, -1).reverse() : frames.slice(0, -1).reverse();
        const sequence = frames.concat(mirrored);
        const canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        mediaContainer.dataset.enhanced = 'true';
        mediaContainer.innerHTML = '';
        mediaContainer.appendChild(canvas);
        const dpr = window.devicePixelRatio || 1;

        const resizeCanvas = () => {
            const rect = mediaContainer.getBoundingClientRect();
            canvas.width = Math.max(1, Math.round(rect.width * dpr));
            canvas.height = Math.max(1, Math.round(rect.height * dpr));
        };

        resizeCanvas();

        window.addEventListener('resize', () => {
            resizeCanvas();
        }, { passive: true });

        let framePointer = 0;
        let lastTimestamp = performance.now();
        let animationFrameId;

        const drawFrame = (bitmap) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
            const drawWidth = bitmap.width * scale;
            const drawHeight = bitmap.height * scale;
            const offsetX = (canvas.width - drawWidth) / 2;
            const offsetY = (canvas.height - drawHeight) / 2;
            ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);
        };

        const render = (timestamp) => {
            const frame = sequence[framePointer];
            if (frame) {
                drawFrame(frame.bitmap);
                if (timestamp - lastTimestamp >= frame.duration) {
                    lastTimestamp = timestamp;
                    framePointer = (framePointer + 1) % sequence.length;
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const startLoop = () => {
            animationFrameId = requestAnimationFrame((timestamp) => {
                lastTimestamp = timestamp;
                render(timestamp);
            });
        };

        const stopLoop = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = undefined;
            }
        };

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopLoop();
            } else {
                lastTimestamp = performance.now();
                startLoop();
            }
        });

        startLoop();
    } catch (error) {
        console.warn('Hero animation enhancement failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    enhanceHeroAnimation();
});
