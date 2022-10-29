import { requestApi } from './requests-api';
import { arrLetters } from './select';

const gallery = document.querySelector('.gallery');

// функція randomEl повертає довільний елемент з масиву arr;
function randomEl(arr) {
  const RandIndex = Math.floor(Math.random() * arr.length);
  return (randValue = arr[RandIndex]);
}

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
    promiseArray.push(
      requestApi(randomEl(arrLetters), 'letter').then(data => randomEl(data))
    );
  }
  console.log('масив промісів:', promiseArray);
  Promise.all(promiseArray)
    .then(cocktails => renderCoctails(cocktails));
}
 
// renderCoctails відмальовує галерею
function renderCoctails(arr) {
  const markUp = arr
    .map((cocktail) => `
      <li class="gallery__item">
        <img
            class="gallery__img"
            src="${cocktail.img}"
            alt="${cocktail.name}"
            width="280px"
            height="280px"
          />
          <h3 class="gallery__subtitle">Negroni</h3>
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
      </li>`)
    .join('');

  gallery.innerHTML = markUp;
}
 
getRandCocktails(numberOfGalleryItems());
