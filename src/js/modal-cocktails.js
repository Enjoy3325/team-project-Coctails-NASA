import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  ingridientsList: document.querySelector('.ingridients__list'),
};

// let selectedCocktail = {};
// let flag = true;
function modalCocktails() {
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
}

//?______________________________ Close modal_______________________________
function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function onGalleryClick(e) {
  let selectedCocktail = {};

  const { openModal, cocktail } = e.target.dataset;

  //*_______________________Перевіряємо, щоб клік був на BUTTON Learn more,_____________________________________________________
  if (e.target.nodeName === 'BUTTON') {
    const data = JSON.parse(localStorage.getItem('cocktails'));
    selectedCocktail = data.find(el => el.name === cocktail);

    //!________________________Якщо openModal === 'open вiдкриваємо модалку____________________
    if (openModal === 'open') {
      window.addEventListener('keydown', handleCloseModal);
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      toggleModal();
    } else if (openModal === 'add') {
      //?*__________________________ Додаємо напій до LocalStorage і змінюємо текст в кнопці_______________________
      if (selectedCocktail) {
        e.target.innerHTML = contantBtnRemovOrAdd('remove');
        e.target.dataset.openModal = 'remove';

        onAddFavoriteToLocalStorage(selectedCocktail);
      }
    } else if (openModal === 'remove') {
      // видаляємо напій з LocalStorage і змінюємо текст в кнопці
      e.target.innerHTML = contantBtnRemovOrAdd('add');
      e.target.dataset.openModal = 'add';
      onRemoveFavoriteFromLocalStorage(selectedCocktail);
    }
  }

  //!_____________________________Закрытие по ESC____________________________
  function handleCloseModal(e) {
    if (e.key === 'Escape') {
      refs.modal.classList.add('is-hidden');
      window.removeEventListener('keydown', handleCloseModal);
      onCloseModal();
    }
  }
  //?__________________________________ Закриття модалки по бекдропу______________________________________
  refs.backdrop.addEventListener('click', onBackdropClick);
  function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  }
  //
  function onCloseModal() {
    refs.modal.classList.add('is-hidden');
    document.body.classList.toggle('no-scroll');
  }

  // function onClickModalIngridientsTwo(e) {}

  //   function onOpenModal() {
  //     refs.modal.classList.remove('is-hidden');
  //   }
  // }

  function contantBtnRemovOrAdd(type = 'add') {
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

  //!____________________ Додає напій в localStorage to favorite__________________
  function onAddFavoriteToLocalStorage(selectedCocktail) {
    const allFavoriteCocktails = getFavoriteCocktailsFromLocalStorage();
    allFavoriteCocktails.push({ ...selectedCocktail, dataModal: 'remove' });
    localStorage.setItem(
      'favoriteCocktails',
      JSON.stringify(allFavoriteCocktails)
    );
  }

  //!__________________________ видаляємо напій з localStorage favorite___________________________
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

  function onCloseModal() {
    refs.modal.classList.add('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
}
// function onOpenModal() {
//   refs.modal.classList.remove('is-hidden');
// }

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
