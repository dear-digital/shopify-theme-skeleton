class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.getSelectedOptions();
    this.getSelectedVariant();

    if (this.currentVariant) {
      this.updateURL();
      this.updateFormID();
      this.updatePrice();
    }
  }

  getSelectedOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
    console.log(this.options);
  }

  getVariantJSON() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJSON().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);

      if (findings) return variant;
    });

    console.log(this.currentVariant);
  }

  updateURL() {
    if (!this.currentVariant) return;

    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateFormID() {
    const form_input = document.querySelector('#product-form').querySelector('input[name="id"]');
    form_input.value = this.currentVariant.id;
  }

  updatePrice() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const oldPrice = document.getElementById(id);
        const newPrice = html.getElementById(id);

        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;
      });
  }
}

customElements.define('variant-selector', VariantSelector);
