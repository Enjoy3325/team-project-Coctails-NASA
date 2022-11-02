import { templateModalIngredients } from './modal-template.js';
import { requestApi } from './requests-api.js';

const refs = {
  closeModalIngredientBtn: document.querySelector(
    '[data-modal-ingredient-closes]'
  ),
  modalIngredient: document.querySelector('[data-modal-ingredient]'),
  ingridientsList: document.querySelector('.ingridients__list'),
  backdropIngredient: document.querySelector('.backdrop-ingredient'),
};

function onClickIngredient(e) {
  const { ingredient } = e.target.dataset;
  console.log('onClickIngr', e.target, e.target.dataset);
  //   refs.modalIngredient.addEventListener('click', onClickBtnIngredient);
  refs.closeModalIngredientBtn.addEventListener(
    'click',
    onCloseIngredientModal
  );
  refs.backdropIngredient.addEventListener('click', onBackdropIngredientClick);
  refs.modalIngredient.addEventListener('click', onClickBtnIngredient);
  renderIngredientTemplate(ingredient);

  console.log('onOpenIngredient', e.target.dataset);
  onOpenIngredientModal();
}

function renderIngredientTemplate(ingredientName) {
  console.log('ingredientN', ingredientName);
  requestApi(ingredientName, 'ingredient').then(ingredient => {
    document.querySelector('#modal-ingredient').innerHTML =
      templateModalIngredients(ingredient);
    const arrIngredient = getIngredientFromLocalStorage();
    arrIngredient.push(ingredient);
    localStorage.setItem('ingredient', JSON.stringify(arrIngredient));
    // onClickBtnIngredient(ingredient);
  });
}

function onClickBtnIngredient(e) {
  let selectedIngredient = {};

  const { modalIngredient, ingredient } = e.target.dataset;

  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('ingredient'));
    selectedIngredient = data.find(el => el.name === ingredient);
    if (modalIngredient === 'add') {
      console.log('selectedIngredient', selectedIngredient);
      console.log('Ingredient', ingredient);
      e.target.innerHTML = 'Remove from favorite';
      e.target.dataset.modalIngredient = 'remove';
      onAddIngredientToLocalStorage(selectedIngredient);
    } else if (modalIngredient === 'remove') {
      e.target.innerHTML = 'Add to favorite';
      e.target.dataset.modalIngredient = 'add';
      onRemoveIngredientFromLocalStorage(selectedIngredient);
    }
  }
}

// Додає ingredient в localStorage to favorite
function onAddIngredientToLocalStorage(ingredient) {
  const allFavoriteIngredient = getFavoriteIngredientFromLocalStorage();
  const isFound = allFavoriteIngredient.some(el => el.name === ingredient.name);
  console.log('onAddIngr', ingredient, isFound);
  if (isFound) {
    return;
  } else {
    allFavoriteIngredient.push({ ...ingredient, dataModal: 'remove' });
    console.log('add', allFavoriteIngredient);
    localStorage.setItem(
      'favoriteIngredients',
      JSON.stringify(allFavoriteIngredient)
    );
  }
}

// видаляємо ingredient з localStorage favorite
function onRemoveIngredientFromLocalStorage(ingredient) {
  const allFavoriteIngredient = getFavoriteIngredientFromLocalStorage();
  const filterArr = allFavoriteIngredient.filter(drink => {
    console.log('remove', drink.name, ingredient.name);
    return drink.name !== ingredient.name;
  });
  localStorage.setItem('favoriteIngredients', JSON.stringify(filterArr));
}

function getFavoriteIngredientFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteIngredients') || '[]');
}

function getIngredientFromLocalStorage() {
  return JSON.parse(localStorage.getItem('ingredient') || '[]');
}

function onOpenIngredientModal() {
  refs.modalIngredient.classList.remove('is-hidden');
}

function onCloseIngredientModal(e) {
  refs.modalIngredient.classList.add('is-hidden');
}

function onBackdropIngredientClick(e) {
  if (e.currentTarget === e.target) {
    onCloseIngredientModal();
  }
}

export { onClickIngredient };

// function onCloseModal() {
//   refs.modal2.classList.add('is-hidden');
//   document.body.classList.toggle('no-scroll');
// }
