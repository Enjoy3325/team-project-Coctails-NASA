//Render select template

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? '';

  const items = data
    .map(item => {
      let cls = '';
      if (item.id === selectedId) {
        text = item.value;
        cls = 'selected';
      }
      return ` <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
    })
    .join('');

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
  <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
    
      <svg class="select__arrow-down" data-type="arrow"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.84302 9.59323L11.5 15.2502L17.157 9.59323L16.45 8.88623L11.5 13.8362L6.55002 8.88623L5.84302 9.59323Z" />

    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items}
      </ul>
    </div>`;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId || null;

    this.#render();
    this.#setup();

    //    <svg class="select__arrow-down" data-type="arrow">
    //      <use
    //        class="form-btn__icon"
    //        href="/sprite.f14d31f7.svg#icon-arrow-down"
    //      ></use>
    //    </svg>;
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    console.log('click', event);
    const { type } = event.target.dataset;

    if (type === 'input' || type === 'value' || type === 'arrow') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$el.classList.add('selected');
    this.$value.textContent = this.current.value;
    const currentActiveEl = this.$el.querySelector('.select__item.selected');

    if (currentActiveEl) {
      currentActiveEl.classList.remove('selected');
    }

    this.$el.querySelectorAll(`[data-id="item"]`);
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.remove('selected');
    this.$el.classList.add('open');
    this.$arrow.classList.remove('select__arrow-down');
    this.$arrow.classList.add('select__arrow-up');
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.add('select__arrow-down');
    this.$arrow.classList.remove('select__arrow-up');
    if (this.selectedId) {
      this.$el.classList.add('selected');
    }
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}
