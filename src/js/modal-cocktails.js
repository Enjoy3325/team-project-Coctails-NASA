import { templateModal } from './modal-template.js';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
};

// const templateModal = ({ name, instruction, img, ingredients }) => {
//   let ingridientsList;
//   if (ingredients.length > 0) {
//     ingridientsList = ingredients
//       .map(
//         el => `<li class="ingridients__item">
//             <span>${el}</span>
//           </li>`
//       )
//       .join('');
//   }

//   console.log(ingridientsList);

//   return `<h2 class="modal-coctails__header">Negroni</h2>

//       <b class="modal-coctails__title">${name}</b>
//       <p class="modal-coctails__text">${instruction}</p>
//       <img class="modal-coctails__image" src="${img}" alt="${name}" />

//       <div class="ingridients">
//         <h3 class="ingridients__subtitle">INGREDIENTS</h3>
//         <p class="ingridients__subtext">Per cocktail</p>
//         <ul class="ingridients__list">
//         ${ingridientsList}
//         </ul>
//       </div>
//       <button data-modal-open class="modal-coctails__button" type="button">
//         Add to favorite
//       </button>`;
// };

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
      // templateModal(selectedCocktail);
      document.querySelector('#modal-section').innerHTML =
        templateModal(selectedCocktail);
      toggleModal();
    }
    console.log(selectedCocktail);
  }

  // Закрытие по бекдропу
  function onBakdropClick(e) {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  }

  function onCloseModal() {
    refs.modal.classList.add('is-hidden');
  }

  //   function onOpenModal() {
  //     refs.modal.classList.remove('is-hidden');
  //   }
}

export { modalCocktails };

// export class modalCocktailsClass {
//   constructor() {}
// }
