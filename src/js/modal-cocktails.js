import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
};

function modalCocktails() {
  let selectedCocktail = {};
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', onBakdropClick);

  function toggleModal(e) {
    document.body.classList.toggle('no-scroll');
    refs.modal.classList.toggle('is-hidden');
  }

  function onGalleryClick(e) {
    const { openModal, cocktail } = e.target.dataset;

    //   Перевіряємо, щоб клік був на BUTTON і мав  data-open-modal="open",
    //   тоді видкриваємо модалку і записуємо дані обаного коктейлю
    if (e.target.nodeName === 'BUTTON' && openModal === 'open') {
      const data = JSON.parse(localStorage.getItem('cocktails'));
      selectedCocktail = data.find(el => el.name === cocktail);
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      toggleModal();
      refs.addFavoriteBtn.addEventListener('click', onAddFavorite);
    }
  }

  console.log('refs.addFavoriteBtn', refs.addFavoriteBtn);
  // Додає напій в localStorage to favorite
  function onAddFavorite(e) {
    console.log(e);
    localStorage.setItem('favotite', JSON.stringify(selectedCocktail));
  }

  // Закрытие по бекдропу
  function onBakdropClick(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  }

  function onCloseModal() {
    refs.modal.classList.add('is-hidden');
    document.body.classList.toggle('no-scroll');
  }

  //   function onOpenModal() {
  //     refs.modal.classList.remove('is-hidden');
  //   }
}

export { modalCocktails };

// export class modalCocktailsClass {
//   constructor() {}
// }
