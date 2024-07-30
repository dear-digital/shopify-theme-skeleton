class AnnouncementSlider {
  constructor(selector) {
    // If already initialized, skip creating a new instance
    if (AnnouncementSlider.instances[selector]) {
      return;
    }

    this.sliderContainer = document.querySelector(selector);
    if (!this.sliderContainer) {
      throw new Error(`No element found for selector: ${selector}`);
    }

    this.slides = this.sliderContainer.querySelectorAll('.announcement__item');
    this.currentSlide = 0;
    this.duration = this.getDuration();

    // Save the instance to prevent re-initialization
    AnnouncementSlider.instances[selector] = this;

    if (this.slides.length > 1) {
      this.initSlider();
    }
  }

  static instances = {};

  getDuration() {
    // Simplified duration retrieval with a fallback
    const duration = parseInt(this.sliderContainer.dataset.duration, 10);
    return isNaN(duration) ? 4000 : duration * 1000;
  }

  initSlider() {
    // Using arrow function for 'this' context preservation
    this.intervalId = setInterval(() => this.goToNextSlide(), this.duration);
  }

  goToNextSlide() {
    const nextSlide = (this.currentSlide + 1) % this.slides.length;
    this.animateSlideInOut(this.currentSlide, nextSlide);
  }

  animateSlideInOut(currentSlide, nextSlide) {
    this.slides[nextSlide].classList.add('slide-in');
    this.slides[currentSlide].classList.add('slide-out-left');

    setTimeout(() => {
      this.slides[currentSlide].classList.remove('slide-in', 'slide-out-left');
      this.currentSlide = nextSlide; // Update currentSlide
    }, 1000); // Assuming the animation duration is 1000ms
  }
}

// Initialization on DOM ready
 
document.addEventListener('DOMContentLoaded', function () { 
    const selector = '.announcement__wrapper';
    if (document.querySelector(selector)) {
        new AnnouncementSlider(selector);
    } 
});

// Shopify design mode
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    //console.log(event.detail);
    const sectionId = event.detail.sectionId;
    const selector = `#shopify-section-${sectionId} .announcement__wrapper`;
    if (document.querySelector(selector)) {
      new AnnouncementSlider(selector);
  }
  });
}

// cart operations

/**
 * Fetches the cart data from the server.
 * @returns {Promise<Object>} A promise that resolves to the cart data.
 * @throws {Error} If there is an error fetching the cart data.
 */
async function fetchCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart.js');
    const cart = await response.json();
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error; // Re-throw the error to handle it outside the function if necessary.
  }
}

/**
 * Updates the cart with the specified updates.
 * @param {Object} updates - The updates to apply to the cart. Can be an object of line numbers and quantities or a simple object of updates.
 * @param {boolean} [useLineNumbers=false] - Indicates whether the updates should be applied using line numbers. Default is false.
 * @param {string} [note=''] - Additional note to include with the updates. Default is an empty string.
 * @param {Object} [attributes={}] - Additional attributes to include with the updates. Should be an object of key-value pairs. Default is an empty object.
 * @returns {Promise<Object>} - A promise that resolves to the updated cart data.
 * @throws {Error} - If there is an error updating the cart.
 */
async function updateCart(updates, useLineNumbers = false, note = '', attributes = {}) {
  try {
    let updatesPayload;
    if (useLineNumbers) {
      updatesPayload = { updates: Object.fromEntries(Object.entries(updates).map(([lineNumber, qty]) => [lineNumber, qty])) };
    } else {
      updatesPayload = { updates };
    }

    const requestData = {
      ...updatesPayload,
      ...(note && { note: encodeURIComponent(note) }),
      ...(Object.keys(attributes).length > 0 && { attributes: Object.fromEntries(Object.entries(attributes).map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)])) })
    };

    const response = await fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

/**
 * Changes the quantity and properties of a cart item.
 * @param {string|number} lineOrId - The line item ID or line item index.
 * @param {number} quantity - The new quantity for the cart item.
 * @param {boolean} [useLine=false] - Indicates whether the line item ID should be used instead of the line item index.
 * @param {Object} [properties={}] - Additional properties to update for the cart item.
 * @param {string|null} [sellingPlan=null] - The selling plan for the cart item.
 * @returns {Promise<Object>} - A promise that resolves to the updated cart item.
 * @throws {Error} - If there is an error changing the cart item.
 */
async function changeCartItem(lineOrId, quantity, useLine = false, properties = {}, sellingPlan = null) {
  try {
    const requestData = {
      ...(useLine ? { line: lineOrId } : { id: lineOrId }),
      quantity,
      ...(Object.keys(properties).length > 0 && { properties: Object.fromEntries(Object.entries(properties).map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)])) }),
      ...(sellingPlan && { selling_plan: sellingPlan }),
    };

    const response = await fetch(window.Shopify.routes.root + 'cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error changing cart item:', error);
    throw error;
  }
}

/**
 * Adds items to the cart.
 * @param {Array} items - The items to be added to the cart.
 * @returns {Promise} - A promise that resolves to the updated cart.
 * @throws {Error} - If there is an error adding the item to the cart.
 */
async function addToCart(items) {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // After successfully adding items, fetch the updated cart
    return await fetchCart();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

/**
 * Clears the cart by making a POST request to the Shopify API.
 * After successfully clearing the cart, fetches the updated cart.
 * @returns {Promise} A promise that resolves with the updated cart.
 * @throws {Error} If there is an error clearing the cart.
 */
async function clearCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/clear.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // After successfully clearing the cart, fetch the updated cart
    return await fetchCart();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

async function prepareShippingRates() {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/prepare_shipping_rates.json', {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text(); // This endpoint does not return JSON, but a successful response indicates the calculation has started.
  } catch (error) {
    console.error('Error preparing shipping rates:', error);
    throw error;
  }
}

async function fetchShippingRates() {
  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/async_shipping_rates.json', {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    throw error;
  }
}
