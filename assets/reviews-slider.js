class ReviewsSlider extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
    this.startX = null;
    this.moveX = null;
  }

  connectedCallback() {
    this.slides = this.querySelectorAll(".review-slide");
    this.prevButton = this.querySelector("#reviewsPrevButton");
    this.nextButton = this.querySelector("#reviewsNextButton");
    this.paginationDots = this.querySelectorAll(".pagination-dot");

    this.setupEventListeners();
    this.showSlide(this.currentIndex);
  }

  setupEventListeners() {
    this.nextButton.addEventListener("click", () => this.nextSlide());
    this.prevButton.addEventListener("click", () => this.prevSlide());

    this.paginationDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.currentIndex = index;
        this.showSlide(this.currentIndex);
      });
    });

    this.addEventListener("touchstart", (e) => {
      this.startX = e.touches[0].clientX;
    });

    this.addEventListener("touchmove", (e) => {
      if (!this.startX) return;
      this.moveX = e.touches[0].clientX;
    });

    this.addEventListener("touchend", () => {
      if (!this.startX || !this.moveX) return;
      const diffX = this.startX - this.moveX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      this.startX = null;
      this.moveX = null;
    });
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("hidden", i !== index);
    });
    this.paginationDots.forEach((dot, i) => {
      dot.classList.toggle("bg-gray-300", i !== index);
      dot.classList.toggle("bg-gray-600", i === index);
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(this.currentIndex);
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentIndex);
  }
}

customElements.define("reviews-slider", ReviewsSlider);
