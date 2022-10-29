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
  console.log(document.querySelector('#letter'), markup);
  document.querySelector('#letter').insertAdjacentHTML('beforeend', markup);
}

renderOptions();
