import { templateModalIngredients } from './modal-template.js';
import { requestApi } from './requests-api.js';
import { noFavItems } from './render-gallery';
import { onEskKeyPress } from './modal-cocktails';

const refs = {
  closeModalIngredientBtn: document.querySelector(
    '[data-modal-ingredient-closes]'
  ),
  gallery: document.querySelector('.gallery'),
  modalIngredient: document.querySelector('[data-modal-ingredient]'),
  ingridientsList: document.querySelector('.ingridients__list'),
  backdropIngredient: document.querySelector('.backdrop-ingredient'),
};

function onClickIngredient(e) {
  const { ingredient, type } = e.target.dataset;
  refs.closeModalIngredientBtn.addEventListener(
    'click',
    onCloseIngredientModal
  );
  refs.backdropIngredient.addEventListener('click', onBackdropIngredientClick);
  refs.modalIngredient.addEventListener('click', onClickBtnIngredient);
  renderIngredientTemplate(ingredient, type);

  onOpenIngredientModal();
}

function renderIngredientTemplate(ingredientName, type = 'all') {
  requestApi(ingredientName, 'ingredient').then(ingredient => {
    document.querySelector('#modal-ingredient').innerHTML =
      // templateModalIngredients({ ...ingredient, dataModal: 'remove' });
      templateModalIngredients(
        type === 'favorite'
          ? { ...ingredient, dataModal: 'remove', typeIngredient: 'favorite' }
          : ingredient
      );
    const arrIngredient = getIngredientFromLocalStorage();
    arrIngredient.push(ingredient);
    localStorage.setItem('ingredient', JSON.stringify(arrIngredient));
  });
}

function onClickBtnIngredient(e, type = 'modal') {
  let selectedIngredient = {};

  const {
    modalIngredient,
    ingredient,
    type: typeIngredient,
  } = e.target.dataset;

  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('ingredient'));
    selectedIngredient = data.find(el => el.name === ingredient);

    if (modalIngredient === 'add') {
      // add ingredient to LocalStorage and rename btn
      e.target.innerHTML =
        type === 'favorite'
          ? contentBtnRemovOrAdd('remove')
          : 'Remove from favorite';
      e.target.dataset.modalIngredient = 'remove';
      onAddIngredientToLocalStorage(selectedIngredient);
    } else if (modalIngredient === 'remove') {
      // remove card from gallery if remove ingredient on the favorite page
      if (typeIngredient === 'favorite') {
        onCloseIngredientModal();
        refs.gallery
          .querySelector(`[data-ingredient="${ingredient}"]`)
          .closest('.ingredient')
          .classList.add('is-hidden');
      }
      e.target.innerHTML =
        type === 'favorite' ? contentBtnRemovOrAdd('add') : 'Add to favorite';
      e.target.dataset.modalIngredient = 'add';
      onRemoveIngredientFromLocalStorage(selectedIngredient, typeIngredient);
    }
  }
}

function contentBtnRemovOrAdd(type = 'add') {
  if (type === 'remove') {
    return `Remove 
            <span class="btn__icon-wrap">
            <svg class="btn__icon-fill" width="15" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 15L7.2675 13.921C2.89 10.1035 0 7.58583 0 4.49591C0 1.9782 2.057 0 4.675 0C6.154 0 7.5735 0.662125 8.5 1.70845C9.4265 0.662125 10.846 0 12.325 0C14.943 0 17 1.9782 17 4.49591C17 7.58583 14.11 10.1035 9.7325 13.9292L8.5 15Z" />
            </svg>`;
  } else {
    return `Add to
            <span class="btn__icon-wrap">
            <svg class="btn__icon" width="15" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 15L7.2675 13.921C2.89 10.1035 0 7.58583 0 4.49591C0 1.9782 2.057 0 4.675 0C6.154 0 7.5735 0.662125 8.5 1.70845C9.4265 0.662125 10.846 0 12.325 0C14.943 0 17 1.9782 17 4.49591C17 7.58583 14.11 10.1035 9.7325 13.9292L8.5 15Z" />
            </svg>`;
  }
}

// Додає ingredient в localStorage to favorite
function onAddIngredientToLocalStorage(ingredient) {
  const allFavoriteIngredient = getFavoriteIngredientFromLocalStorage();
  const isFound = allFavoriteIngredient.some(el => el.name === ingredient.name);
  if (isFound) {
    return;
  } else {
    allFavoriteIngredient.push({ ...ingredient, dataModal: 'remove' });

    localStorage.setItem(
      'favoriteIngredients',
      JSON.stringify(allFavoriteIngredient)
    );
  }
}

// видаляємо ingredient з localStorage favorite
function onRemoveIngredientFromLocalStorage(ingredient, type = 'all') {
  const allFavoriteIngredient = getFavoriteIngredientFromLocalStorage();
  const filterArr = allFavoriteIngredient.filter(
    drink => drink.name !== ingredient.name
  );
  if (filterArr.length < 1 && type === 'favorite') {
    noFavItems('ingredients');
  }
  localStorage.setItem('favoriteIngredients', JSON.stringify(filterArr));
}

// Закрытие по ЕСК
function onEskKeyPressIngredient(e) {
  if (e.code === 'Escape') {
    onCloseIngredientModal();
  }
}

function getFavoriteIngredientFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteIngredients') || '[]');
}

function getIngredientFromLocalStorage() {
  return JSON.parse(localStorage.getItem('ingredient') || '[]');
}

function onOpenIngredientModal() {
  refs.modalIngredient.classList.remove('is-hidden');
  window.addEventListener('keydown', onEskKeyPressIngredient);
}

function onCloseIngredientModal(e) {
  refs.modalIngredient.classList.add('is-hidden');
  window.removeEventListener('keydown', onEskKeyPressIngredient);
  window.addEventListener('keydown', onEskKeyPress);
}

function onBackdropIngredientClick(e) {
  if (e.currentTarget === e.target) {
    onCloseIngredientModal();
  }
}

export { onClickIngredient, onClickBtnIngredient };
