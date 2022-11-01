import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  ingridientsList: document.querySelector('.ingridients__list'),
};
console.log('----> ingridientsList', refs.ingridientsList);
let selectedCocktail = {};

function modalCocktails() {
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

// Close modal
function toggleModal(e) {
  document.body.classList.toggle('no-scroll');
  refs.modal.classList.toggle('is-hidden');
}

function onGalleryClick(e) {
  const { openModal, cocktail } = e.target.dataset;

  //   Перевіряємо, щоб клік був на BUTTON Learn more,
  //   тоді вiдкриваємо модалку і записуємо дані обаного коктейлю
  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('cocktails'));
    console.log(
      'cocktail',
      cocktail,
      e.target,
      data.find(el => el.name === cocktail)
    );

    if (openModal === 'open') {
      selectedCocktail = data.find(el => el.name === cocktail);
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      toggleModal();
    } else if (openModal === 'add') {
      selectedCocktail = data.find(el => el.name === cocktail);
      onAddFavoriteToLocalStorage(selectedCocktail);
    }
  }

  // Закрытие по ЕСК
  function handleCloseModal(e) {
    if (e.key === 'Escape') {
      refs.modal.classList.add('is-hidden');
    }
  }

  function onCloseModal() {
    refs.modal.classList.add('is-hidden');
    document.body.classList.toggle('no-scroll');
  }

  function onClickModalIngridientsTwo(e) {}

  //   function onOpenModal() {
  //     refs.modal.classList.remove('is-hidden');
  //   }
}

// Додає напій в localStorage to favorite
function onAddFavoriteToLocalStorage(selectedCocktail) {
  const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
  allFavoriteCocktails.push(selectedCocktail);
  localStorage.setItem(
    'favoriteCocktails',
    JSON.stringify(allFavoriteCocktails)
  );
}

function getFavoriteCocktailsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteCocktails') || '[]');
}

// Закриття модалки по бекдропу
function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  document.body.classList.toggle('no-scroll');
}

function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
}

export { modalCocktails, getFavoriteCocktailsFromLocalStorage };

// export class CreateModalCocktails {
//   constructor() {
//     this.#setup();
//   }

//   #setup() {
//     refs.gallery.addEventListener('click', onGalleryClick);
//     refs.closeModalBtn.addEventListener('click', toggleModal);
//     refs.backdrop.addEventListener('click', onBackdropClick);
//   }
// }
