document.addEventListener('DOMContentLoaded', function () {
  var goTopBtn = document.querySelector('.back-to-top-classes');
  if (!goTopBtn) return;

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = 300;
    if (scrolled > coords) {
      goTopBtn.classList.add('show');
    } else {
      goTopBtn.classList.remove('show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      requestAnimationFrame(backToTop);
    } else {
      goTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
});