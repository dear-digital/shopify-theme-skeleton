// cart.js

// Immediately Invoked Function Expression (IIFE)
// Prevents the constants from conflicting with other scripts
(function() {

  const TRANSLATE_X_FULL = "translate-x-full";
  const OPACITY_0 = "opacity-0";
  const POINTER_EVENTS_NONE = "pointer-events-none";
  const OVERFLOW_HIDDEN = "overflow-hidden";

  class CartDrawer {
    constructor() {
      this.drawer = document.getElementById("cart-drawer");
      this.overlay = document.getElementById("cart-overlay");
      this.closeCartButton = document.getElementById("close-cart-button");
      this.openCartButtons = document.querySelectorAll('[data-action="open-cart"]');
      this.bindEvents();
    }

    bindEvents() {
      this.attachCloseButtonEvent();
      this.attachOverlayEvent();
      this.attachOpenCartEvents();
    }

    attachCloseButtonEvent() {
      if (this.closeCartButton) {
        this.closeCartButton.addEventListener("click", () => this.closeCart());
      }
    }

    attachOverlayEvent() {
      if (this.overlay) {
        this.overlay.addEventListener("click", () => this.closeCart());
      }
    }

    attachOpenCartEvents() {
      this.openCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          try {
            event.preventDefault();
            this.toggleCart();
          } catch (error) {
            console.error("Error toggling cart:", error);
          }
        });
      });
    }

    openCart() {
      try {
        this.drawer.classList.remove(TRANSLATE_X_FULL);
        this.overlay.classList.remove(OPACITY_0, POINTER_EVENTS_NONE);
        document.body.classList.add(OVERFLOW_HIDDEN);
      } catch (error) {
        console.error("Error opening cart:", error);
      }
    }

    checkIfCartOpen() {
      return !this.drawer.classList.contains(TRANSLATE_X_FULL);
    }

    closeCart() {
      try {
        this.drawer.classList.add(TRANSLATE_X_FULL);
        this.overlay.classList.add(OPACITY_0, POINTER_EVENTS_NONE);
        document.body.classList.remove(OVERFLOW_HIDDEN);
      } catch (error) {
        console.error("Error closing cart:", error);
      }
    }

    toggleCart() {
      if (this.checkIfCartOpen()) {
        this.closeCart();
      } else {
        this.openCart();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    try {
      window.cartDrawer = new CartDrawer();
    } catch (error) {
      console.error("Error initializing CartDrawer:", error);
    }
  });
})();
