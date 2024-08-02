function cartOpenLoading() {
  const cartContainer = document.querySelector('.drawer-cart');
  cartContainer.classList.add('drawn');
  document.querySelector('.cart-overlay').classList.add('drawn');
}

async function fetchCart() {
  try {
    const response = await fetch(`${routes.cart_url}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/javascript',
      },
    });
    const cart = await response.json();
    return cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

async function updateCart(updates, useLineNumbers = false, note = '', attributes = {}, sections = null) {
  try {
    let updatesPayload;
    if (useLineNumbers) {
      updatesPayload = {
        updates: Object.fromEntries(Object.entries(updates).map(([lineNumber, qty]) => [lineNumber, qty])),
      };
    } else {
      updatesPayload = { updates };
    }

    const requestData = {
      ...updatesPayload,
      ...(note && { note: encodeURIComponent(note) }),
      ...(Object.keys(attributes).length > 0 && {
        attributes: Object.fromEntries(
          Object.entries(attributes).map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)])
        ),
      }),
      ...(sections && { sections: sections }),
    };

    const response = await fetch(`${routes.cart_update_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/javascript',
      },
      body: JSON.stringify(requestData),
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

async function changeCartItem(
  lineOrId,
  quantity,
  useLine = false,
  properties = {},
  sellingPlan = null,
  sections = null,
  cartOpenLoadingBoolean = false
) {
  try {
    if (cartOpenLoadingBoolean) {
      cartOpenLoading();
    }

    const requestData = {
      ...(useLine ? { line: lineOrId } : { id: lineOrId }),
      quantity,
      ...(Object.keys(properties).length > 0 && {
        properties: Object.fromEntries(
          Object.entries(properties).map(([k, v]) => [encodeURIComponent(k), encodeURIComponent(v)])
        ),
      }),
      ...(sellingPlan && { selling_plan: sellingPlan }),
      ...(sections && { sections: sections }),
    };

    const response = await fetch(`${routes.cart_change_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/javascript',
      },
      body: JSON.stringify(requestData),
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

async function addToCart(items) {
  try {
    cartOpenLoading();
    const response = await fetch(`${routes.cart_add_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/javascript',
      },
      body: JSON.stringify(items),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
}

async function clearCart() {
  try {
    const response = await fetch(`${routes.cart_clear_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/javascript',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

function buildQuickData(buttonElement, sectionId) {
  const properties = {};
  const dataAttributes = buttonElement.dataset;

  for (const key in dataAttributes) {
    if (dataAttributes.hasOwnProperty(key) && key.startsWith('cartProp')) {
      const propKey = key.slice('cartProp'.length);
      properties[propKey.slice(1)] = dataAttributes[key];
    }
  }
  let quantity = dataAttributes.cartQuantity || 1;
  let id = dataAttributes.cartId;

  if (isNaN(quantity)) {
    quantity = document.querySelector(quantity).value;
  }
  if (isNaN(id)) {
    id = document.querySelector(id).value;
  }
  if (dataAttributes.cartInfoQuantityMultiplier) {
    quantity *= dataAttributes.cartInfoQuantityMultiplier;
  }

  const data = [
    {
      id: id,
      quantity: quantity,
      properties: properties,
    },
  ];
  let structuredData = {
    items: data,
  };
  if (sectionId) {
    structuredData.sections = sectionId;
  }
  return structuredData;
}

class CartFunctionsWrapper extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector('button');
    this.button.addEventListener('click', this.onClickHandler);
  }

  async onClickHandler(event) {
    event.preventDefault();
    if (this.classList.contains('disabled') || this.disabled) {
      return false;
    }

    const button = this;
    if (!button) {
      return;
    }
    const cartAdd = await addToCart(buildQuickData(button, 'cart-drawer'));
    refreshCart(true, null, cartAdd.sections);
  }
}

customElements.define('cart-functions-wrapper', CartFunctionsWrapper);

class CartActionButton extends HTMLElement {
  constructor() {
    super();
    this.buttonDelete = this.querySelector('.delete-cart-product');
    this.buttonQuantity = this.querySelector('input[name="quantity"]');
    if (this.buttonDelete) {
      this.buttonDelete.addEventListener('click', this.onEventHandler);
    }
    if (this.buttonQuantity) {
      this.buttonQuantity.addEventListener('change', this.onEventHandler);
    }
  }
  async onEventHandler(event) {
    event.preventDefault();
    try {
      const line = parseInt(this.closest('.cart-product-wrapper').dataset.line);
      let cart;

      if (event.target.name === 'quantity') {
        const quantity = parseInt(event.target.value);
        cart = await changeCartItem(line, quantity, true, {}, null, 'cart-drawer', true);
        refreshCart(false, cart, cart.sections);
      } else {
        cart = await changeCartItem(line, 0, true, {}, null, 'cart-drawer', true);
        refreshCart(false, cart, cart.sections);
      }
    } catch (error) {
      console.error('Error handling cart item change:', error);
    }
  }
}

customElements.define('cart-action-button', CartActionButton);

async function updateCartAttributes(attributes) {
  try {
    const encodedAttributes = Object.fromEntries(
      Object.entries(attributes).map(([key, value]) => [
        encodeURIComponent(key),
        value !== null ? encodeURIComponent(value) : '',
      ])
    );

    const response = await updateCart({}, false, '', encodedAttributes, 'cart-drawer');
    return response;
  } catch (error) {
    console.error('Error updating cart attributes:', error);
    throw error;
  }
}

function handleBodyClickCart(event) {
  if (event.target.closest('.cart-toggler, .add-to-cart')) {
    toggleCartVisibility(true);
  } else if (event.target.closest('.close-cart, .cart-overlay')) {
    toggleCartVisibility(false);
  } else if (event.target.closest('.custom-checkout-btn.disabled')) {
    handleDisabledCheckout(event.target.closest('.custom-checkout-btn.disabled'));
  }
}

function toggleCartVisibility(open) {
  const OVERFLOW_HIDDEN = 'overflow-hidden';
  const action = open ? 'add' : 'remove';
  document.querySelector('.drawer-cart')?.classList[action]('drawn');
  document.querySelector('.cart-overlay')?.classList[action]('drawn');
  document.body.classList[action](OVERFLOW_HIDDEN);
}

// window.upsellOpenedByDrawer = false;

function handleDisabledCheckout(button) {
  if (button.dataset.empty) return;
  document.querySelector('.drawer-cart-wrapper')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleOpenCartOnLoad() {
  const opencart = new URLSearchParams(window.location.search).get('cartopen');
  if (opencart === 'true') {
    toggleCartVisibility(true);
  }
}

async function fetchAndParseCartAndHeader(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/javascript',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  const parser = new DOMParser();
  const cartHtmlDoc = parser.parseFromString(data['cart-drawer'], 'text/html');
  const cartHTML = cartHtmlDoc.querySelector('.shopify-section-cart-drawer .drawer-cart').innerHTML;
  return { cartHTML };
} 

async function customCartUpdate(cart, sections) {
  let updatedCart = cart;
  let updatedSections = sections; 
  return { cart: updatedCart, sections: updatedSections };
} 

async function checkGratisProductEligibility(data, sections = null) {  
  let cart = data;
  let cart_update = data; 
  let newSections = sections;  
  return { cart: cart_update, sections: newSections };
}

// Main function to refresh the cart
async function refreshCart(openCart = true, cartData = null, sections = null) {
  const cartContainer = document.querySelector('.drawer-cart');
  let updatedSections = sections;

  if (openCart) {
    cartContainer.classList.add('drawn');
    document.querySelector('.cart-overlay').classList.add('drawn');
  }

  try {
    let data = cartData ? cartData : await fetchCart(); 
    const { cart: cart_update, sections: newSections } = await checkGratisProductEligibility(data, sections); 
    updatedSections = newSections;
    data = cart_update;

    const rootUrl = routes.root_url === '/' ? '' : routes.root_url;
    const cartUrl = `${rootUrl}/?sections=cart-drawer`;
    let cartHTML; 

    if (!updatedSections) {
      const fetchedSections = await fetchAndParseCartAndHeader(cartUrl);
      cartHTML = fetchedSections.cartHTML;
    } else {
      const parser = new DOMParser();
      const cartHtmlDoc = parser.parseFromString(updatedSections['cart-drawer'], 'text/html');
      cartHTML = cartHtmlDoc.querySelector('.shopify-section-cart-drawer .drawer-cart').innerHTML;
    }
    cartContainer.innerHTML = cartHTML;
  } catch (error) {
    console.error('Failed to fetch or update cart:', error);
  } finally {
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (event) {
    handleBodyClickCart(event);
  });
  handleOpenCartOnLoad();
});
