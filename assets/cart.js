// cart.js

class CartDrawer {
  constructor() {
    this.drawer = document.getElementById("cart-drawer");
    this.overlay = document.getElementById("cart-overlay");
    this.closeCartButton = document.getElementById("close-cart-button");
    this.openCart = document.querySelectorAll(
      '[data-action="open-cart"]'
    );
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeCartButton) {
      this.closeCartButton.addEventListener("click", () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.close());
    }
    
    this.openCart.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.toggle();
        // console.log("Open for Desktop 3");
      });
    });
  }

  open() {
    this.drawer.classList.remove("translate-x-full");
    this.overlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    // console.log("Cart Drawer Opened New");
  }

  isOpen() {
    return !this.drawer.classList.contains("translate-x-full");
  }

  close() {
    this.drawer.classList.add("translate-x-full");
    this.overlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    // console.log("Cart Drawer Closed New");
  }

  toggle() {
    if (this.drawer.classList.contains("translate-x-full")) {
      this.open();
    } else {
      this.close();
    }
  }
}

// Initialize the cart drawer when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.cartDrawer = new CartDrawer();
});
