document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");
  const offCanvasMenu = document.getElementById("off-canvas-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  const mobileCartButtons = document.querySelectorAll(
    '#off-canvas-menu [data-action="open-cart"]'
  );
  const body = document.body;

  function toggleMenu() {
    offCanvasMenu.classList.remove("-translate-x-full");
    menuOverlay.classList.toggle("opacity-0");
    menuOverlay.classList.toggle("pointer-events-none");
    body.classList.toggle("overflow-hidden");
    if (window.cartDrawer && window.cartDrawer.isOpen()) {
      window.cartDrawer.close();
    }
    console.log("Menu Toggle New");
  }

  function closeMenu() {
    offCanvasMenu.classList.add("-translate-x-full");
    menuOverlay.classList.add("opacity-0", "pointer-events-none");
    body.classList.remove("overflow-hidden");
    console.log("Menu Closed New");
  }

  function handleMobileCartClick(event) {
    event.preventDefault();
    closeMenu();
    setTimeout(() => {
      if (window.cartDrawer) {
        window.cartDrawer.open();
      }
    }, 300); // Adjust this delay as needed to match your menu closing animation
  }

  menuButton.addEventListener("click", toggleMenu);
  closeMenuButton.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);

  mobileCartButtons.forEach((button) => {
    button.addEventListener("click", handleMobileCartClick);
  });

  // Shopify editor events
  if (Shopify.designMode) {
    document.addEventListener("shopify:section:load", function (event) {

      if (event.target.contains(menuButton)) {
        menuButton.addEventListener("click", toggleMenu);
      }

      if (window.cartDrawer) {
        window.cartDrawer.bindEvents();
      }

      const newMobileCartButtons = event.target.querySelectorAll(
        '#off-canvas-menu [data-action="open-cart"]'
      );
      
      newMobileCartButtons.forEach((button) => {
        button.addEventListener("click", handleMobileCartClick);
      });
    });
  }
});
