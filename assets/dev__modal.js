function toggleModal(show) {
  const overlay = document.querySelector('.modal-dark-overlay');
  const modalContainer = document.querySelector('.modal-container');

  if (show) {
    overlay.style.display = 'block';
    modalContainer.style.display = 'block';
  } else {
    overlay.style.display = 'none';
    modalContainer.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  toggleModal(true)
})

window.onclick = function (e) {
  const modalContainer = document.querySelector('.modal-container')
  if (e.target === modalContainer) {
    toggleModal(false)
  }
}