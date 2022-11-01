import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  ingridientsList: document.querySelector('.ingridients__list'),
};

function modalCocktails() {
  let selectedCocktail = {};
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', handleCloseModal);
  refs.backdrop.addEventListener('click', onBackdropClick);

  function toggleModal(e) {
    document.body.classList.toggle('no-scroll');
    refs.modal.classList.toggle('is-hidden');
    refs.ingridientsList.addEventListener('click', onClickModalIngridientsTwo);
  }

  function onGalleryClick(e) {
    const { openModal, cocktail } = e.target.dataset;

    //   Перевіряємо, щоб клік був на BUTTON і мав  data-open-modal="open",
    //   тоді видкриваємо модалку і записуємо дані обраного коктейлю
    if (e.target.nodeName === 'BUTTON' && openModal === 'open') {
      const data = JSON.parse(localStorage.getItem('cocktails'));
      selectedCocktail = data.find(el => el.name === cocktail);
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      toggleModal();
    }
    console.log(selectedCocktail);
  }

  // Закрытие по бекдропу
  function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
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

export { modalCocktails };

// export class modalCocktailsClass {
//   constructor() {}
// }
