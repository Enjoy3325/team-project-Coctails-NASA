import { getRandomCocktail } from './requests-api';

const gallery = document.querySelector('.gallery');

// функція numberOfGalleryItems повертає кількість коктейлів,
// що мають з'явитись в галереї (відповідно до ширини екрану);
const numberOfGalleryItems = () => {
  if (window.innerWidth >= 1280) {
    return (number = 9);
  } else if ((window.innerWidth < 1280) & (window.innerWidth >= 480)) {
    return (number = 6);
  } else {
    return (number = 3);
  }
};

// функція getRandCocktails повертає масив рандомних коктейлів,
// який треба відмалювати в галерею;
function getRandCocktails(number) {
  let promiseArray = [];
  for (i = 1; i <= number; i += 1) {
    promiseArray.push(getRandomCocktail().then(data => data));
  }
  Promise.all(promiseArray).then(cocktails => renderCocktails(cocktails));
}

// renderCoctails відмальовує галерею
export function renderCocktails(arr) {
  const markUp = arr
    .map(
      cocktail => `
      <li class="gallery__item">
        <img
            class="gallery__img"
            src="${cocktail.img}"
            alt="${cocktail.name}"
            width="280px"
            height="280px"
          />
          <h3 class="gallery__subtitle text-truncate">${cocktail.name}</h3>
        <div class="gallery__btns">
          <button class="btn btn--orange" type="button">Learn more</button>
          <button class="btn btn--white" type="button">
            Add to &nbsp
            <span class="btn__icon-wrap">
              <svg class="btn__icon" width="15" height="15">
                <use href="./images/sprite.svg#heart"></use>
              </svg>
            </span>
          </button>
          <button class="btn btn--white visually-hidden" type="button">
            Remove &nbsp
            <span class="btn__icon-wrap"> </span>
          </button>
        </div>
      </li>`
    )
    .join('');

  gallery.innerHTML = markUp;
  getPagination(arr, numberOfGalleryItems());
}

getRandCocktails(numberOfGalleryItems());

// функція додає кнопки пагінації внизу галареї.
// приймає масив коктейлів для рендера (arr)
// і кількість коктейлів на одній сторінці (number)
const pagRefs = {
  box: document.querySelector('.pagination'),
  prev: document.querySelector('.pagination__previous'),
  next: document.querySelector('.pagination__next'),
  list: document.querySelector('.pagination__list'),
};
console.log('посилання на пагінацію: ', pagRefs);
function getPagination(arr, number) {
  if (arr.length <= number) {
    pagRefs.box.classList.add('visually-hidden');
    return;
  }
  pagRefs.box.classList.remove('visually-hidden');
  const numOfItems = Math.ceil(arr.length / number);
  let markup = [];
  for (i = 1; i <= numOfItems; i += 1) {
    markup.push(`<li class="pagination__item">${i}</li>`);
  };
  pagRefs.list.innerHTML = markup.join('');
  document
    .querySelector('.pagination__item')
    .classList.add('pagination--active');
}