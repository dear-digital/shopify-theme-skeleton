function toggleModal(show) {
  const overlay = document.querySelector('.modal-dark-overlay');
  const modalContainer = document.querySelector('.modal-container');
  const displayStyle = show ? 'block' : 'none';
  overlay.style.display = displayStyle;
  modalContainer.style.display = displayStyle;
}

document.addEventListener('DOMContentLoaded', () => toggleModal(true));
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-container')) {
    toggleModal(false);
  }
});
