import { getRandomCocktail } from './requests-api';
import { getPagination } from './pagination';

const gallery = document.querySelector('.gallery');

// функція numberOfGalleryItems повертає кількість коктейлів,
// що мають з'явитись в галереї (відповідно до ширини екрану);
let number;
export const numberOfGalleryItems = () => {
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
  for (let i = 1; i <= number; i += 1) {
    promiseArray.push(getRandomCocktail().then(data => data));
  }
  Promise.all(promiseArray).then(cocktails => {
    localStorage.setItem('cocktails', JSON.stringify(cocktails));
    renderCocktails(cocktails);
  });
}

// renderCoctails відмальовує галерею
export function renderCocktails(arr) {
  if (arr.length !== 0) {
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
          <button data-modal-open class="btn btn--orange" type="button">Learn more</button>
          <button class="btn btn--white" type="button">
            Add to &nbsp
            <span class="btn__icon-wrap">
              <svg class="btn__icon" width="15" height="15">
                <use href="/sprite.f14d31f7.svg#heart"></use>
              </svg>
            </span>
          </button>
          <button class="btn btn--white visually-hidden" type="button">
            Remove &nbsp
            <span class="btn__icon-wrap"></span>
          </button>
        </div>
      </li>`
      )
      .join('');

    gallery.innerHTML = markUp;
  } else if (arr.length === 0) {
    document.querySelector('.cocktails__title').innerHTML =
      "Sorry, we didn't find any cocktail for you";
    document.querySelector(
      '.gallery'
    ).innerHTML = `<div class="ooops-img"></div>`;
  }
  getPagination(arr, numberOfGalleryItems());
}

getRandCocktails(numberOfGalleryItems());
