document.addEventListener('DOMContentLoaded', function () {
    var goTopBtn = document.querySelector('.back-to-top-classes');
    if (!goTopBtn) return; // Check if button exists

    function trackScroll() {
      var scrolled = window.pageYOffset;
      var coords = 300;
      if (scrolled > coords) {
        goTopBtn.classList.add('show'); // Use CSS class for showing/hiding
      } else {
        goTopBtn.classList.remove('show');
      }
    }

    function backToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        requestAnimationFrame(backToTop); // Smooth scrolling
      } else {
        goTopBtn.classList.remove('show'); // Ensure it's hidden after reaching the top
      }
    }

    window.addEventListener('scroll', trackScroll); // Consider debouncing this
    goTopBtn.addEventListener('click', backToTop);
  });