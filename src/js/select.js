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

function renderOptions() {
  const markup = arrLetters
    .map(
      letter =>
        `<option value="${letter}">${
          !isNaN(letter) ? letter : letter.toUpperCase()
        }</option>`
    )
    .join('');
  //   console.log(document.querySelector('#letter'), markup);
  document.querySelector('#letter').insertAdjacentHTML('beforeend', markup);
}

function renderLetterButtons() {
  let arr = arrLetters;
  arr.splice(-10, 1, ' ');
  console.log(arr);
  const markup = arr
    .map(
      letter =>
        `<button type="button" class="hero__letter" data-letter="${letter}">${
          !isNaN(letter) ? letter : letter.toUpperCase()
        }</button>`
    )
    .join('');
  document
    .querySelector('.hero__letter-box')
    .insertAdjacentHTML('beforeend', markup);
}
console.log(window.innerWidth, window.innerWidth > 479);

function checkWindowWidth() {
  if (window.innerWidth > 767) {
    renderLetterButtons();
  } else {
    renderOptions();
  }
}

checkWindowWidth();

import { requestApi } from './requests-api.js';
requestApi('a', 'letter').then(data => console.log('data', data));
