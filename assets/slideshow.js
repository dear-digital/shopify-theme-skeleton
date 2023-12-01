document.addEventListener('DOMContentLoaded', function () {
    var slideImages = document.querySelectorAll('.hero-slide');
    var current = 0;
    var interval = setInterval(nextSlide, 4000);

    var sliderContainer = document.getElementById('sliderContainer');

    sliderContainer.addEventListener('mouseenter', function () {
        clearInterval(interval);
    });

    function reset() {
        for (var i = 0; i < slideImages.length; i++) {
            slideImages[i].classList.remove('slide-active');
        }
    }

    function startSlide() {
        reset();
        slideImages[0].classList.add('slide-active');
        document.getElementById('slideCurrent').textContent = current + 1;
    }

    function slideLeft() {
        reset();
        slideImages[current - 1].classList.add('slide-active');
        current--;
    }

    document.getElementById('prev').addEventListener('click', function () {
        if (current === 0) {
            current = slideImages.length;
        }
        slideLeft();
        document.getElementById('slideCurrent').textContent = current + 1;
    });

    function slideRight() {
        reset();
        slideImages[current + 1].classList.add('slide-active');
        current++;
    }

    function nextSlide() {
        if (current === slideImages.length - 1) {
            current = -1;
        }
        slideRight();
        document.getElementById('slideCurrent').textContent = current + 1;
    }

    document.getElementById('next').addEventListener('click', function () {
        nextSlide();
    });

    document.getElementById('slideTotal').textContent = slideImages.length;

    startSlide();
});