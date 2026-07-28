if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        document.body.style.visibility = 'visible';
    }, 300);
});

setTimeout(() => {
    document.html.style.visibility = 'visible';
}, 1000);


const frontHill = document.querySelector('.frontHill');
const backHill = document.querySelector('.backHill');

const frontSpeed = 1.2;
const backSpeed = 0.3;

const EFFECT_DISTANCE = 500;

let maxScroll = 0;
let ticking = false;

function calculateMaxScroll() {
    maxScroll = document.body.scrollHeight - window.innerHeight;
}

function updateParallax() {
    const scrolledUp = maxScroll - window.scrollY; // 0 at bottom, grows as user scrolls up
    const progress = Math.min(Math.max(scrolledUp / EFFECT_DISTANCE, 0), 1);
    const eased = Math.pow(progress, 1.8);

    frontHill.style.transform = `translateY(${eased * 900}px)`;
    backHill.style.transform = `translateY(${eased * 300}px)`;

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

window.addEventListener('resize', calculateMaxScroll);

window.addEventListener('load', () => {
    calculateMaxScroll();
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        updateParallax();
    }, 350);
});

function updateMovingCloudsArea() {
    const clouds = document.querySelectorAll(
        '.cloudl1, .cloudl2, .cloudl3, .cloudl4, .cloudl5, .cloudR1, .cloudR2, .cloudR3, .cloudR4, .cloudR5'
    );
    const movingClouds = document.querySelector('.movingClouds');

    let minTop = Infinity;
    let maxBottom = -Infinity;

    clouds.forEach(cloud => {
        const top = cloud.offsetTop;
        const bottom = top + cloud.offsetHeight;
        if (top < minTop) minTop = top;
        if (bottom > maxBottom) maxBottom = bottom;
    });

    movingClouds.style.top = minTop + 'px';
    movingClouds.style.height = (maxBottom - minTop) + 'px';
}

window.addEventListener('load', updateMovingCloudsArea);
window.addEventListener('resize', updateMovingCloudsArea);
