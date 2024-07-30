// Carousel Custom Element
class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }
  connectedCallback() {
    const template = document.getElementById("carousel-template");
    const content = template.content.cloneNode(true);

    // Move existing children into a temporary container
    const tempContainer = document.createElement("div");
    while (this.firstChild) {
      tempContainer.appendChild(this.firstChild);
    }

    // Append the template content
    this.appendChild(content);

    // Apply classes from data attributes
    this.querySelector(".combination-products").classList.add(
      ...this.dataset.productsClass.split(" ")
    );
    this.querySelector(".combination-prev").classList.add(
      ...this.dataset.prevClass.split(" ")
    );
    this.querySelector(".carousel-container").classList.add(
      ...this.dataset.containerClass.split(" ")
    );
    this.querySelector(".carousel-track").classList.add(
      ...this.dataset.trackClass.split(" ")
    );
    this.querySelector(".combination-next").classList.add(
      ...this.dataset.nextClass.split(" ")
    );

    // Set up the carousel
    this.track = this.querySelector(".carousel-track");
    this.container = this.querySelector(".carousel-container");
    this.items = Array.from(tempContainer.children);
    this.items.forEach((item) => this.track.appendChild(item));

    this.prevButton = this.querySelector(".combination-prev");
    this.nextButton = this.querySelector(".combination-next");

    this.itemWidth = this.items[0]?.offsetWidth || 0;
    this.gap = 16; // Define gap size
    this.totalWidth =
      this.items.length * (this.itemWidth + this.gap) - this.gap;

    this.updateCarousel();
    this.setupEventListeners();
  }

  updateCarousel() {
    const containerWidth = this.container.offsetWidth;
    this.itemsPerView = Math.floor(
      containerWidth / (this.itemWidth + this.gap)
    );
    const totalWidth =
      this.items.length * (this.itemWidth + this.gap) - this.gap;

    // Calculate the maximum number of items that can be scrolled
    const maxScrollableItems = Math.max(
      0,
      this.items.length - this.itemsPerView
    );

    // Calculate the maximum scroll position
    const maxScrollPosition = maxScrollableItems * (this.itemWidth + this.gap);

    let scrollPosition = this.currentIndex * (this.itemWidth + this.gap);

    // Adjust scroll position if we're at the end
    if (scrollPosition > maxScrollPosition) {
      scrollPosition = maxScrollPosition;
      this.currentIndex = Math.floor(
        scrollPosition / (this.itemWidth + this.gap)
      );
    }

    this.track.style.transform = `translateX(-${scrollPosition}px)`;

    // Update button states
    this.prevButton.disabled = this.currentIndex === 0;
    this.nextButton.disabled = this.currentIndex >= maxScrollableItems;

    // Update button styles
    this.prevButton.style.opacity = this.prevButton.disabled ? "0.5" : "1";
    this.nextButton.style.opacity = this.nextButton.disabled ? "0.5" : "1";
  }

  moveCarousel(direction) {
    if (direction === "next" && !this.nextButton.disabled) {
      this.currentIndex++;
    } else if (direction === "prev" && !this.prevButton.disabled) {
      this.currentIndex--;
    }
    this.updateCarousel();
  }

  setupEventListeners() {
    window.addEventListener("resize", () => this.updateCarousel());
    this.prevButton.addEventListener("click", () => this.moveCarousel("prev"));
    this.nextButton.addEventListener("click", () => this.moveCarousel("next"));
  }
}

customElements.define("carousel-component", CarouselComponent);

// Quantity Controls Custom Element
class QuantityControls extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("quantity-controls-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  connectedCallback() {
    // Apply classes from data attributes
    this.querySelector(".quantity-controls").classList.add(
      ...this.dataset.controlsClass.split(" ")
    );
    this.querySelectorAll(".quantity-button").forEach((button) =>
      button.classList.add(...this.dataset.buttonClass.split(" "))
    );
    this.querySelector(".quantity-input").classList.add(
      ...this.dataset.inputClass.split(" ")
    );

    // Apply classes to SVG icons
    this.querySelectorAll(".quantity-button svg").forEach((svg) =>
      svg.classList.add(...this.dataset.buttonClass.split(" "))
    );

    this.quantityInput = this.querySelector('input[type="number"]');
    this.decreaseButton = this.querySelector(".quantity-decrease");
    this.increaseButton = this.querySelector(".quantity-increase");
    this.decreaseButton.addEventListener("click", () =>
      this.updateQuantity(-1)
    );
    this.increaseButton.addEventListener("click", () => this.updateQuantity(1));
    this.quantityInput.addEventListener("change", () => this.validateInput());
  }

  updateQuantity(change) {
    let currentValue = parseInt(this.quantityInput.value);
    let newValue = currentValue + change;
    newValue = Math.max(1, newValue);
    this.quantityInput.value = newValue;
  }

  validateInput() {
    let value = parseInt(this.quantityInput.value);
    if (isNaN(value) || value < 1) {
      this.quantityInput.value = 1;
    } else {
      this.quantityInput.value = value;
    }
  }
}

customElements.define("quantity-controls", QuantityControls);
