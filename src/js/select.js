import { requestApi } from './requests-api.js';

const arrLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',

  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
];

const refs = {
  letterBox: document.querySelector('.hero__letter-box'),
  selectLetter: document.querySelector('#letter'),
};

function renderOptions() {
  const markup = arrLetters
    .map(
      letter =>
        `<option value="${letter}">${
          !isNaN(letter) ? letter : letter.toUpperCase()
        }</option>`
    )
    .join('');

  refs.selectLetter.insertAdjacentHTML('beforeend', markup);
}

function renderLetterButtons() {
  let arr = arrLetters;
  arr.splice(-10, 0, ' ');
  const markup = arr
    .map(
      letter =>
        `<div class="hero__letter " data-letter="${letter}">${
          !isNaN(letter) ? letter : letter.toUpperCase()
        }</div>`
    )
    .join('');
  refs.letterBox.insertAdjacentHTML('beforeend', markup);
}

function checkWindowWidth() {
  if (window.innerWidth > 767) {
    renderLetterButtons();
  } else {
    renderOptions();
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
  requestApi(value, 'letter').then(data => console.log('data', data));
}
