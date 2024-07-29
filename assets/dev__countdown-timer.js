function updateTimer(endDateElement) {
  const endDateTime = new Date(endDateElement.getAttribute('data-end-date')).getTime();
  const update = () => {
    const now = Date.now();
    const distance = endDateTime - now;

    if (distance <= 0) {
      clearInterval(intervalId);
      endDateElement.querySelector('.timer').classList.add('timer--expired');
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    endDateElement.querySelector('.js-timer-days').innerText = String(days).padStart(2, '0');
    endDateElement.querySelector('.js-timer-hours').innerText = String(hours).padStart(2, '0');
    endDateElement.querySelector('.js-timer-minutes').innerText = String(minutes).padStart(2, '0');
    endDateElement.querySelector('.js-timer-seconds').innerText = String(seconds).padStart(2, '0');
  }; 
  const intervalId = setInterval(update, 1000);
  update();
} 
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.end-date').forEach(updateTimer);
});
