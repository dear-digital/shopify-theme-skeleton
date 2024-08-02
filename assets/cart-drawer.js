document.addEventListener('DOMContentLoaded', () => {
  const TRANSLATE_X_FULL = 'translate-x-full';
  const OPACITY_0 = 'opacity-0';
  const POINTER_EVENTS_NONE = 'pointer-events-none';
  const OVERFLOW_HIDDEN = 'overflow-hidden';
  const DRAWN = 'drawn';

  class CartDrawer {
    constructor() {
      this.drawer = document.querySelector('.drawer-cart');
      this.overlay = document.getElementById('cart-overlay');
      this.closeCartButton = document.getElementById('close-cart-button');
      this.openCartButtons = document.querySelectorAll('[data-action="open-cart"]');
      this.bindEvents();
    }

    bindEvents() {
      document.body.addEventListener('click', (event) => {
        if (event.target.closest('.close-cart-button')) {
          this.toggleCart();
        }
      });

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeCart());
      }

      this.openCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          this.toggleCart();
        });
      });
    }

    openCart() {
      this.drawer.classList.remove(TRANSLATE_X_FULL);
      this.overlay.classList.remove(OPACITY_0, POINTER_EVENTS_NONE);
      document.body.classList.add(OVERFLOW_HIDDEN);
    }

    checkIfCartOpen() {
      return !this.drawer.classList.contains(TRANSLATE_X_FULL);
    }

    closeCart() {
      this.drawer.classList.add(TRANSLATE_X_FULL);
      this.drawer.classList.remove(DRAWN);
      this.overlay.classList.add(OPACITY_0, POINTER_EVENTS_NONE);
      this.overlay.classList.remove(DRAWN);
      document.body.classList.remove(OVERFLOW_HIDDEN);
    }

    toggleCart() {
      if (this.checkIfCartOpen()) {
        this.closeCart();
      } else {
        this.openCart();
      }
    }
  }

  window.cartDrawer = new CartDrawer();
});
