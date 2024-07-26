let typingTimer;
const typingDelay = 1200;

function closeSearch() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function handleSearchInput() {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(performSearch, typingDelay);
}

function performSearch() {
  document.querySelector('form').submit();
}

document.getElementById('searchInput').addEventListener('input', handleSearchInput);