let typingTimer; // Timer identifier
const typingDelay = 1200; // Delay in milliseconds before performing the search action

function closeSearch() {
  // Hide the search results container or perform any other actions to close the search
  document.querySelector('.container').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Function to handle the search input
function handleSearchInput(event) {
  clearTimeout(typingTimer); // Clear the previous timer
  typingTimer = setTimeout(performSearch, typingDelay); // Set a new timer
}

// Function to perform the search action
function performSearch() {
  document.querySelector('form').submit(); // Submit the search form
}

// Add event listener for the search input
document.getElementById('searchInput').addEventListener('input', handleSearchInput);
