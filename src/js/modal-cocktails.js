import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  ingridientsList: document.querySelector('.ingridients__list'),
};

function modalCocktails() {
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  refs.modal.addEventListener('click', onClickBtnInModal);
}

function onGalleryClick(e) {
  let selectedCocktail = {};
  const { openModal, cocktail } = e.target.dataset;

  //__________________________________Перевіряємо, щоб клік був на BUTTON Learn more,__________________________________
  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('cocktails'));
    selectedCocktail = data.find(el => el.name === cocktail);

    //________________________________Якщо openModal === 'open вiдкриваємо модалку______________________________________
    if (openModal === 'open') {
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      onOpenModal(e);
      //   onClickBtnInModal(e);
      //   toggleModal();
    } else if (openModal === 'add') {
      //____________________________  Додаємо напій до LocalStorage і змінюємо текст в кнопці___________________________
      if (selectedCocktail) {
        e.target.innerHTML = contentBtnRemovOrAdd('remove');
        e.target.dataset.openModal = 'remove';
        onAddFavoriteToLocalStorage(selectedCocktail);
      }
    } else if (openModal === 'remove') {
      //______________________________Видаляємо напій з LocalStorage і змінюємо текст в кнопці___________________________
      e.target.innerHTML = contentBtnRemovOrAdd('add');
      e.target.dataset.openModal = 'add';
      onRemoveFavoriteFromLocalStorage(selectedCocktail);
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

//__________________________________ Додає напій в localStorage to favorite__________________________________________
function onAddFavoriteToLocalStorage(selectedCocktail) {
  const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
  allFavoriteCocktails.push({ ...selectedCocktail, dataModal: 'remove' });
  localStorage.setItem(
    'favoriteCocktails',
    JSON.stringify(allFavoriteCocktails)
  );
}

//___________________________________Видаляємо напій з localStorage favorite_______________________________________
function onRemoveFavoriteFromLocalStorage(selectedCocktail) {
  const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
  const filterArr = allFavoriteCocktails.filter(
    drink => drink.name !== selectedCocktail.name
  );
  localStorage.setItem('favoriteCocktails', JSON.stringify(filterArr));
}

function getFavoriteCocktailsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteCocktails') || '[]');
}

//__________________________________Закриття модалки по бекдропу____________________________________________________
function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

// ----------------------OPEN MODAL ----------------------

function onClickBtnInModal(e) {
  let selectedCocktail = {};
  const { modalBtn, cocktail } = e.target.dataset;

  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('cocktails'));
    selectedCocktail = data.find(el => el.name === cocktail);

    if (modalBtn === 'add') {
      e.target.innerHTML = 'Remove from favorite';
      e.target.dataset.modalBtn = 'remove';
      onAddFavoriteToLocalStorage(selectedCocktail);
    } else {
      e.target.innerHTML = 'Add to favorite';
      e.target.dataset.modalBtn = 'add';
      onRemoveFavoriteFromLocalStorage(selectedCocktail);
    }
  }
}

function onAddOrRemoveCocktail(e) {
  console.log('onAddRemoveCockt', selectedCocktail, e.target);
}

//_________________________________Закрытие по ЕСК________________________________
function onEskKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

//_________________________________toggle modal__________________________________
function toggleModal(e) {
  document.body.classList.toggle('no-scroll');
  refs.modal.classList.toggle('is-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEskKeyPress);
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

function onOpenModal(e) {
  console.log('onOpenMod', e);
  window.addEventListener('keydown', onEskKeyPress);
  refs.modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

export {
  modalCocktails,
  getFavoriteCocktailsFromLocalStorage,
  contentBtnRemovOrAdd,
  onAddFavoriteToLocalStorage,
  onRemoveFavoriteFromLocalStorage,
};

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
