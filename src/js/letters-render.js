import { requestApi } from './requests-api.js';
import { renderCocktails } from './render-gallery';
import { Select } from './select';

const arrLetter = [
  { id: 'a', value: 'A' },
  { id: 'b', value: 'B' },
  { id: 'c', value: 'C' },
  { id: 'd', value: 'D' },
  { id: 'e', value: 'E' },
  { id: 'f', value: 'F' },
  { id: 'g', value: 'G' },
  { id: 'h', value: 'H' },
  { id: 'i', value: 'I' },
  { id: 'j', value: 'J' },
  { id: 'k', value: 'K' },
  { id: 'l', value: 'L' },
  { id: 'm', value: 'M' },
  { id: 'n', value: 'N' },
  { id: 'o', value: 'O' },
  { id: 'p', value: 'P' },
  { id: 'q', value: 'Q' },
  { id: 'r', value: 'R' },
  { id: 's', value: 'S' },
  { id: 't', value: 'T' },
  { id: 'u', value: 'U' },
  { id: 'v', value: 'V' },
  { id: 'w', value: 'W' },
  { id: 'x', value: 'X' },
  { id: 'y', value: 'Y' },
  { id: 'z', value: 'Z' },
  { id: '1', value: 1 },
  { id: '2', value: 2 },
  { id: '3', value: 3 },
  { id: '4', value: 4 },
  { id: '5', value: 5 },
  { id: '6', value: 6 },
  { id: '7', value: 7 },
  { id: '8', value: 8 },
  { id: '9', value: 9 },
  { id: '0', value: 0 },
];

const refs = {
  letterBox: document.querySelector('.hero__letter-box'),
};

function renderLetterButtons() {
  let arr = arrLetter;
  arr.splice(-10, 0, { id: 'null', value: '' });
  const markup = arr
    .map(
      ({ id, value }) =>
        `<div class="hero__letter " data-letter="${id}">${value}</div>`
    )
    .join('');
  refs.letterBox.insertAdjacentHTML('beforeend', markup);
}

function checkWindowWidth() {
  if (window.innerWidth > 767) {
    renderLetterButtons();
  } else {
    const select = new Select('#select', {
      placeholder: 'A',
      // selectedId: 'a',
      data: arrLetter,
      onSelect(item) {
        renderCards(item.id);
        console.log('item', item, item.id);
      },
    });
    window.s = select;
  }
}

checkWindowWidth();

refs.letterBox.addEventListener('click', onCheckLetter);

function onCheckLetter(e) {
  const isHeroLetter = e.target.classList.contains('hero__letter');
  if (!isHeroLetter) {
    return;
  }

  const value = e.target.dataset.letter;
  const targetEl = e.target;
  const currentActiveEl = document.querySelector('.hero__letter.active');

  if (currentActiveEl) {
    currentActiveEl.classList.remove('active');
  }

  targetEl.classList.add('active');
  renderCards(value);
}

function renderCards(value) {
  requestApi(value, 'letter').then(cocktails => {
    document.querySelector('.cocktails__title').innerHTML =
        'Searching results';
      renderCocktails(cocktails);
      return;
    });
}
