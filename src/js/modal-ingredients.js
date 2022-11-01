import { templateModalIngredients } from './modal-template.js';
const refs = {
  closeModal2Btn: document.querySelector('[data-modal-closes]'),
  addFavoriteBtn: document.querySelector('[data-add-favorite]'),
  modal2: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  ingridientsList: document.querySelector('[data-modal-open]'),
};

// function onCloseModal() {
//   refs.modal2.classList.add('is-hidden');
//   document.body.classList.toggle('no-scroll');
// }
