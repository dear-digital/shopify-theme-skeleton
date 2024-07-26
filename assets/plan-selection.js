(function() {

  function setupQuantityControls() {
    const decrementButton = document.querySelector('.decrement');
    const incrementButton = document.querySelector('.increment');
    const quantityInput = document.querySelector('input[type="number"]');

    if (!decrementButton || !incrementButton || !quantityInput) return;

    decrementButton.addEventListener('click', () => {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

    incrementButton.addEventListener('click', () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });
  }

  // Run on initial load
  document.addEventListener('DOMContentLoaded', setupQuantityControls);

  // Re-run when Shopify section is reloaded in theme editor
  if (Shopify.designMode) {
    document.addEventListener('shopify:section:load', setupQuantityControls);
  }
})();