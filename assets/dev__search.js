let typingTimer;
const typingDelay = 1200;

const closeSearch = () => {
  const container = document.querySelector('.container');
  const overlay = document.getElementById('overlay'); 
  if (container) container.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
};

const handleSearchInput = () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(performSearch, typingDelay);
};

const performSearch = () => {
  const form = document.querySelector('form');
  if (form) form.submit();
};

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }
});
