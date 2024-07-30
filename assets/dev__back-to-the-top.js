document.addEventListener('DOMContentLoaded', () => {
  const goTopBtn = document.querySelector('.back-to-top-classes');
  if (!goTopBtn) return;
  const coords = 300;
  const scrollSpeed = 80;
  
  const trackScroll = () => {
    goTopBtn.classList.toggle('show', window.pageYOffset > coords);
  };

  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -scrollSpeed);
      requestAnimationFrame(backToTop);
    } else {
      goTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
});
