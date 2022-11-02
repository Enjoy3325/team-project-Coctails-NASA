import { refs } from './modal-cocktails.js';
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
  //   refs.modalIngredient.addEventListener('click', onClickBtnIngredient);
  refs.closeModalIngredientBtn.addEventListener(
    'click',
    onCloseIngredientModal
  );

  refs.backdropIngredient.addEventListener('click', onBackdropIngredientClick);
  renderIngredientTemplate(ingredient);

  console.log('onOpenIngredient', e.target.dataset);
  onOpenIngredientModal();
}

function renderIngredientTemplate(ingredientName) {
  requestApi(ingredientName, 'ingredient')
    .then(ingredient => {
      document.querySelector('#modal-ingredient').innerHTML =
        templateModalIngredients(ingredient);
      return ingredient;
    })
    .then(ingredient => {
      refs.modalIngredient.addEventListener('click', e => {
        const { modalIngredient } = e.target.dataset;

        if (e.target.nodeName === 'BUTTON') {
          if (modalIngredient === 'add') {
            console.log('modalIngredient', ingredient);
            e.target.innerHTML = 'Remove from favorite';
            e.target.dataset.modalIngredient = 'remove';
            onAddIngredientToLocalStorage(ingredient);
          } else if (modalIngredient === 'remove') {
            e.target.innerHTML = 'Add to favorite';
            e.target.dataset.modalIngredient = 'add';
            onRemoveIngredientFromLocalStorage(ingredient);
          }
        }
      });
    });
}

// Додає ingredient в localStorage to favorite
function onAddIngredientToLocalStorage(ingredient) {
  const allFavoriteIngredient = getFavoriteIngredientFromLocalStorage();
  const isFound = allFavoriteIngredient.some(el => el.name === ingredient.name);
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
  const filterArr = allFavoriteIngredient.filter(
    drink => drink.name !== ingredient.name
  );
  localStorage.setItem('favoriteIngredients', JSON.stringify(filterArr));
}

function getFavoriteIngredientFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteIngredients') || '[]');
}

function onOpenIngredientModal() {
  refs.modalIngredient.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  refs.modal.classList.add('is-hidden');
  window.addEventListener('keydown', onEskKeyPress);
}

function onCloseIngredientModal(e) {
  window.removeEventListener('keydown', onEskKeyPress);
  refs.modalIngredient.classList.add('is-hidden');
  refs.modal.classList.remove('is-hidden');
}

function onBackdropIngredientClick(e) {
  if (e.currentTarget === e.target) {
    onCloseIngredientModal();
  }
}

function onEskKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseIngredientModal();
  }
}

export { onClickIngredient };

// function onCloseModal() {
//   refs.modal2.classList.add('is-hidden');
//   document.body.classList.toggle('no-scroll');
// }
