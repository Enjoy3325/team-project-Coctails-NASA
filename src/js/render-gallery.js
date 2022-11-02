import { getRandomCocktail } from './requests-api';
import { getPagination } from './pagination';
import { modalCocktails } from './modal-cocktails';

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
function getRandCocktails(number) {
  let promiseArray = [];
  for (let i = 1; i <= number; i += 1) {
    promiseArray.push(getRandomCocktail().then(data => data));
  }
  Promise.all(promiseArray).then(cocktails => {
    localStorage.setItem('cocktails', JSON.stringify(cocktails));
    renderCocktails(cocktails);

    modalCocktails();
  });
}
getRandCocktails(numberOfGalleryItems());

// візуалізація "пошук не дав результату" (oops image)
function nosearchingRes() {
  document.querySelector('.cocktails__title').innerHTML =
    "Sorry, we didn't find any cocktail for you";
  document.querySelector(
    '.gallery'
  ).innerHTML = `<div class="ooops-img"></div>`;
}

// візуалізація "ви нічого не додали у favorites"
export function noFavItems(items) {
  document.querySelector(
    '.gallery'
  ).innerHTML = `You haven't added any favorites ${items} yet`;
}

// функція renderCocktailCards відмальовує картки коктейлів
export function renderCocktailCards(arr) {
  const sliceArr = arr.slice(0, numberOfGalleryItems());
  const markUp = sliceArr
    .map(cocktail => {
      let textBtn;
      let classBtn;
      if (cocktail.dataModal === 'add') {
        textBtn = 'Add to';
        classBtn = 'btn__icon'
      } else {
        textBtn = 'Remove';
        classBtn = 'btn__icon-fill';
      }
      return `
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
          <button class="btn btn--orange" data-open-modal="open" data-cocktail="${cocktail.name}" type="button">Learn more</button>
          <button class="btn btn--white" data-open-modal="${cocktail.dataModal}" data-cocktail="${cocktail.name}" type="button">
            ${textBtn}
            <span class="btn__icon-wrap">
            <svg class="${classBtn}" width="15" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 15L7.2675 13.921C2.89 10.1035 0 7.58583 0 4.49591C0 1.9782 2.057 0 4.675 0C6.154 0 7.5735 0.662125 8.5 1.70845C9.4265 0.662125 10.846 0 12.325 0C14.943 0 17 1.9782 17 4.49591C17 7.58583 14.11 10.1035 9.7325 13.9292L8.5 15Z" />
</svg>

            </span>
          </button>
          <button class="btn btn--white visually-hidden" type="button">
            ${textBtn}
            <span class="btn__icon-wrap"></span>
          </button>
        </div>
      </li>`;
    })
    .join('');

  gallery.innerHTML = markUp;
}

// функція renderIngredientCards відмальовує картки інгредієнтів
export function renderIngredientCards(arr) {
  const sliceArr = arr.slice(0, numberOfGalleryItems());
  const markUp = sliceArr
    .map(
      ingredient => `
      <li class="ingredient">
        <h2 class="ingredient__name text-truncate">${ingredient.name}</h2>
        <h3 class="ingredient__type text-truncate">${ingredient.type}</h3>
        <div class="ingredient__btns">
          <button class="btn btn--orange" type="button">Learn more</button>
          <button class="btn btn--white" type="button">
            Remove &nbsp
            <span class="btn__icon-wrap"></span>
          </button>
        </div>
      </li>`
    )
    .join('');

  gallery.innerHTML = markUp;
}

// renderCocktails відмальовує галерею коктейлів
export function renderCocktails(arr) {
  if (arr.length !== 0) {
    renderCocktailCards(arr);
  } else if (arr.length === 0) {
    nosearchingRes();
  }
  getPagination(arr, numberOfGalleryItems());
}
