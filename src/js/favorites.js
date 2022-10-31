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
  favCocktails: document.querySelector('#cocktails'),
  favIngredients: document.querySelector('#ingredients'),
};

//  це тестові масиви - їх треба буде видалити
// коли запрацює логінізація і збереження вибраного в локал сторедж
const favorCocktArr = [
  {
    img: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
    instruction:
      'Add the crème de cassis to the bottom of the glass, then top up with wine.',
    name: 'Kir',
  },
  {
    img: 'https://www.thecocktaildb.com/images/media/drink/vqwryq1441245927.jpg',
    instruction:
      'Mix together. Blend at highest blender speed for about 1 minute. Pour into a glass and drink with a straw. Notes: This works best if everything is cold (if you make fresh coffee, mix it with the milk and let it sit in the fridge for 1/2 hour. If it is not frothy, add more milk, or even just some more milk powder. The froth gradually turns to liquid at the bottom of the glass, so you will find that you can sit and drink this for about 1/2 hour, with more iced coffee continually appearing at the bottom. Very refreshing.',
    name: 'Frappé',
  },
  {
    img: 'https://www.thecocktaildb.com/images/media/drink/spxtqp1478963398.jpg',
    instruction:
      'In a shaker half-filled with ice cubes, combine the rum, Kahlua, and cream. Shake well. Strain into a cocktail glass and garnish with the nutmeg.',
    name: 'Quentin',
  },
];

const favorIngredientsArr = [
  { name: 'Campari', type: 'liqueur' },
  { name: 'Vermouth', type: 'fortified wine' },
  { name: 'Tequila', type: 'distilled beverage' },
];

//  це функція, яка відмальовує вибрані коктейлі.
// На місце favorCocktArr треба передавати масив вибраних коктейлів з локал сторедж.
function getFavorites(arr) {
  event.preventDefault();
  const items = event.target.id;
  refs.hero.classList.add('visually-hidden');
  refs.title.innerHTML = `Favorite ${items}`;
  if (arr.length === 0) {
    noFavItems(items);
    return;
  }
  items === 'cocktails' ? renderCocktailCards(arr) : renderIngredientCards(arr);
  getPagination(arr, numberOfGalleryItems());
}
refs.favCocktails.addEventListener('click', event =>
  getFavorites(favorCocktArr)
);
refs.favIngredients.addEventListener('click', event =>
  getFavorites(favorIngredientsArr)
);
