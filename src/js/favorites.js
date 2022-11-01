import {
  renderCocktailCards,
  renderIngredientCards,
  noFavItems,
  numberOfGalleryItems,
} from './render-gallery';
import { getPagination } from './pagination';

const refs = {
  hero: document.querySelector('.hero'),
  title: document.querySelector('.cocktails__title'),
  favCocktails: document.querySelectorAll('[data-name="cocktails"]'),
  favIngredients: document.querySelectorAll('[data-name="ingredients"]'),
};

//  це функція, яка відмальовує обрані коктейлі або інгредієнти.
// Масиви треба переробити на локал сторедж.
function getFavorites() {
    event.preventDefault();
    const items = event.target.dataset.name;
  refs.hero.classList.add('visually-hidden');
  refs.title.innerHTML = `Favorite ${items}`;
  let arr = JSON.parse(
    localStorage.getItem(`favorite${items[0].toUpperCase() + items.slice(1)}`)
  );
  if (arr.length === 0) {
    noFavItems(items);
    return;
  }
  items === 'cocktails' ? renderCocktailCards(arr) : renderIngredientCards(arr);
  getPagination(arr, numberOfGalleryItems());
}

for (const ref of refs.favCocktails) {
    ref.addEventListener('click', getFavorites)
};
for (const ref of refs.favIngredients) {
  ref.addEventListener('click', getFavorites);
};
