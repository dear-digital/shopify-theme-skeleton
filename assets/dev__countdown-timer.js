function updateTimer() {
  const endDateElement = document.getElementById('end-date');
  const endDateString = endDateElement.getAttribute('data-end-date');
  const endDateTime = new Date(endDateString).getTime();

  let x = setInterval(function () {
    const now = new Date().getTime();
    const distance = endDateTime - now;

    if (distance <= 0) {
      clearInterval(x);
      document.querySelector('.timer').classList.add('timer--expired');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.js-timer-days').innerText = days < 10 ? '0' + days : days;
    document.querySelector('.js-timer-hours').innerText = hours < 10 ? '0' + hours : hours;
    document.querySelector('.js-timer-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.querySelector('.js-timer-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
  updateTimer();
});
