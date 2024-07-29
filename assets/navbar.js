// navbar.js

// Immediately Invoked Function Expression (IIFE)
// Prevents the constants from conflicting with other scripts
(function() {
  const MINUS_TRANSLATE_X_FULL = "-translate-x-full";
  const OPACITY_0 = "opacity-0";
  const POINTER_EVENTS_NONE = "pointer-events-none";
  const OVERFLOW_HIDDEN = "overflow-hidden";

  document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-button");
    const closeMenuButton = document.getElementById("close-menu-button");
    const offCanvasMenu = document.getElementById("off-canvas-menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const body = document.body;

    function toggleMenuVisibility() {
      offCanvasMenu.classList.toggle(MINUS_TRANSLATE_X_FULL);
    }

    function toggleOverlay() {
      menuOverlay.classList.toggle(OPACITY_0);
      menuOverlay.classList.toggle(POINTER_EVENTS_NONE);
    }

    function toggleBodyScroll() {
      body.classList.toggle(OVERFLOW_HIDDEN);
    }

    function closeCartIfOpen() {
      if (window.cartDrawer && window.cartDrawer.checkIfCartOpen()) {
        window.cartDrawer.closeCart();
      }
    }

    function toggleMenu() {
      try {
        toggleMenuVisibility();
        toggleOverlay();
        toggleBodyScroll();
        closeCartIfOpen();
      } catch (error) {
        console.error("Error toggling menu:", error);
      }
    }

    function closeMenu() {
      try {
        offCanvasMenu.classList.add(MINUS_TRANSLATE_X_FULL);
        menuOverlay.classList.add(OPACITY_0, POINTER_EVENTS_NONE);
        body.classList.remove(OVERFLOW_HIDDEN);
      } catch (error) {
        console.error("Error closing menu:", error);
      }
    }

    menuButton.addEventListener("click", toggleMenu);
    closeMenuButton.addEventListener("click", closeMenu);
    menuOverlay.addEventListener("click", closeMenu);

    if (Shopify.designMode) {
      document.addEventListener("shopify:section:load", function(event) {
        try {
          if (event.target.contains(menuButton)) {
            menuButton.addEventListener("click", toggleMenu);
          }

          if (window.cartDrawer) {
            window.cartDrawer.bindEvents();
          }
        } catch (error) {
          console.error("Error in Shopify editor event:", error);
        }
      });
    }
  });
})();
