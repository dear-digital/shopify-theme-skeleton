document.addEventListener('DOMContentLoaded', () => {
    const slideImages = document.querySelectorAll('.hero-slide');
    let current = 0;
    let interval = setInterval(nextSlide, 4000);

    const sliderContainer = document.getElementById('sliderContainer');
    const slideCurrent = document.getElementById('slideCurrent');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const slideTotal = document.getElementById('slideTotal');

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    function reset() {
        for (let i = 0; i < slideImages.length; i++) {
            slideImages[i].classList.remove('slide-active');
        }
    }

    function updateSlideCurrent() {
        slideCurrent.textContent = current + 1;
    }

    function slideLeft() {
        reset();
        slideImages[current - 1].classList.add('slide-active');
        current--;
        updateSlideCurrent();
    }

    function slideRight() {
        reset();
        slideImages[current + 1].classList.add('slide-active');
        current++;
        updateSlideCurrent();
    }

    function nextSlide() {
        if (current === slideImages.length - 1) {
            current = -1;
        }
        slideRight();
    }

    prevButton.addEventListener('click', () => {
        if (current === 0) {
            current = slideImages.length;
        }
        slideLeft();
    });

    nextButton.addEventListener('click', nextSlide);

    slideTotal.textContent = slideImages.length;

    function startSlide() {
        reset();
        slideImages[0].classList.add('slide-active');
        updateSlideCurrent();
    }

    startSlide();
});
