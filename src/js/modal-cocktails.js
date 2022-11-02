import { templateModal } from './modal-template.js';
import { onClickIngredient, onClickBtnIngredient } from './modal-ingredients';
import { nosearchingRes } from './render-gallery';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),

  // --------Ingredient_______
  //   closeModalIngredientBtn: document.querySelector(
  //     '[data-modal-ingredient-closes]'
  //   ),
  //   modalIngredient: document.querySelector('[data-modal-ingredient]'),
  //   ingridientsList: document.querySelector('.ingridients__list'),
  //   backdropIngredient: document.querySelector('.backdrop-ingredient'),
};

function modalCocktails() {
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  refs.modal.addEventListener('click', onClickBtnInModal);
}

function onGalleryClick(e) {
  let selectedCocktail = {};
  const {
    openModal,
    cocktail,
    action,
    type,
    favoriteIngredient,
    modalIngredient,
  } = e.target.dataset;

  //   Перевіряємо, щоб клік був на BUTTON Learn more,
  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(
      localStorage.getItem(
        type === 'favorite' ? 'favoriteCocktails' : 'cocktails'
      )
    );
    const btnLearMore = document.querySelector('[data-open-modal="open"]');
    selectedCocktail = data?.find(el => el.name === cocktail);

    // вiдкриваємо модалку
    if (openModal === 'open') {
      document.querySelector('#modal-section').innerHTML = templateModal({
        ...selectedCocktail,
        dataModal: action,
        type: type,
      });
      onOpenModal(e);
    } else if (openModal === 'add') {
      // додаємо напій до LocalStorage і змінюємо текст в кнопці
      if (selectedCocktail) {
        btnLearMore.dataset.action = 'remove';
        e.target.innerHTML = contentBtnRemovOrAdd('remove');
        e.target.dataset.openModal = 'remove';
        onAddFavoriteToLocalStorage(selectedCocktail, type);
      }
    } else if (openModal === 'remove') {
      // видаляємо напій з LocalStorage і змінюємо текст в кнопці
      btnLearMore.dataset.action = 'add';
      e.target.closest('.gallery__item').classList.add('is-hidden');
      e.target.innerHTML = contentBtnRemovOrAdd('add');
      e.target.dataset.openModal = 'add';
      onRemoveFavoriteFromLocalStorage(selectedCocktail, type);
    } else if (favoriteIngredient === 'openModal') {
      onClickIngredient(e);
    } else if (modalIngredient === 'remove' || modalIngredient === 'add') {
      onClickBtnIngredient(e, 'favorite');
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

// Додає напій в localStorage to favorite
function onAddFavoriteToLocalStorage(selectedCocktail, type) {
  const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
  const isFound = allFavoriteCocktails.some(
    el => el.name === selectedCocktail.name
  );

  if (isFound) {
    return;
  } else {
    allFavoriteCocktails.push({ ...selectedCocktail, dataModal: 'remove' });
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify(allFavoriteCocktails)
    );
  }
}

// видаляємо напій з localStorage favorite
function onRemoveFavoriteFromLocalStorage(selectedCocktail, type) {
  const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
  const filterArr = allFavoriteCocktails.filter(
    drink => drink.name !== selectedCocktail.name
  );

  console.log('type', type);
  if (filterArr.length < 1 && type === 'favorite') {
    nosearchingRes();
  }
  localStorage.setItem('favoriteCocktails', JSON.stringify(filterArr));
}

function getFavoriteCocktailsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteCocktails') || '[]');
}

// ---------------------- MODAL ----------------------

// Закрытие по ЕСК
export function onEskKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

// Закриття модалки по бекдропу
function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function toggleModal(e) {
  document.body.classList.toggle('no-scroll');
  refs.modal.classList.toggle('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEskKeyPress);
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  refs.modal.removeEventListener('click', onClickBtnInModal);
}

function onOpenModal(e) {
  window.addEventListener('keydown', onEskKeyPress);
  refs.modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function onClickBtnInModal(e) {
  let selectedCocktail = {};
  const { modalBtn, cocktail, type } = e.target.dataset;

  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(
      localStorage.getItem(
        type === 'favorite' ? 'favoriteCocktails' : 'cocktails'
      )
    );
    selectedCocktail = data.find(el => el.name === cocktail);

    if (modalBtn === 'add') {
      e.target.innerHTML = 'Remove from favorite';
      e.target.dataset.modalBtn = 'remove';
      onAddFavoriteToLocalStorage(selectedCocktail, type);
    } else {
      // remove card from gallery if remove cocktail on the favorite page
      if (type === 'favorite') {
        console.log('remove modal', type, selectedCocktail, cocktail);
        onCloseModal();
        refs.gallery
          .querySelector(`[data-cocktail="${cocktail}"]`)
          .closest('.gallery__item')
          .classList.add('is-hidden');
        onRemoveFavoriteFromLocalStorage(selectedCocktail, type);
      }
      e.target.innerHTML = 'Add to favorite';
      e.target.dataset.modalBtn = 'add';
      onRemoveFavoriteFromLocalStorage(selectedCocktail, type);
    }
  } else if (e.target.nodeName === 'SPAN') {
    // open ingredient modal
    onClickIngredient(e);
    window.removeEventListener('keydown', onEskKeyPress);
  }
}

export {
  modalCocktails,
  getFavoriteCocktailsFromLocalStorage,
  contentBtnRemovOrAdd,
  onAddFavoriteToLocalStorage,
  onRemoveFavoriteFromLocalStorage,
};
