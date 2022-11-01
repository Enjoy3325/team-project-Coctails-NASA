export const refs = {
  // openModalBtn: document.querySelector('[data-modal-open]'),
  openModalBtn: document.querySelectorAll('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modal2: document.querySelector('[data-modal-ingridients]'),
  backdrop: document.querySelector('.backdrop'),
  // body: document.querySelector('body'),
  btnAddFavorie: document.querySelector('.modal-coctails__button'),
  ingridientsItems: document.querySelectorAll('.ingridients__item'),
  gallery: document.querySelector('.gallery'),
  modalBody: document.querySelector('.modal-coctails'),
};
// console.log(refs.openModalBtn);

let selectedObj = {
  img: 'https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg',
  instruction:
    'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
  name: 'Almeria',
};
// refs.gallery.addEventListener('click', e => {
//   let selectedName = e.target.dataset.cocktail;
//   selectedObj = JSON.parse(localStorage.getItem('cocktails')).find(
//     el => el.name === selectedName
//   );

// });

// function onCreateCockteilsMarkup(selectedObj) {
//   console.log('----> onCreateCockteilsMarkup ', selectedObj.name);
// }

// function onCreateCockteilsMarkup() {
//   return ` <div class="modal-coctails">
//     <button data-modal-close class="modal-coctails__closeModal" type="button">
//       <svg width="18" height="18">
//         <use href="./images/sprite.svg#cross"></use>
//       </svg>
//     </button>
//     <h2 class="modal-coctails__header">${selectedObj.name}</h2>

//     <b class="modal-coctails__title">INSTRACTIONS:</b>
//     <p class="modal-coctails__text">${selectedObj.instruction}</p>
//     <div class="box-image">
//     <img class="box-image__image" src=${selectedObj.img} alt="${selectedObj.name}" />
//     </div>
//     <div class="ingridients">
//       <h3 class="ingridients__subtitle">INGREDIENTS</h3>
//       <p class="ingridients__subtext">Per cocktail</p>
//       <ul class="ingridients__list">
//         <li class="ingridients__item">
//           <span>Ice</span>
//         </li>
//         <li class="ingridients__item">
//           <span>1 ounce gin</span>
//         </li>
//         <li class="ingridients__item">
//           <span>1 ounce Campari</span>
//         </li>
//         <li class="ingridients__item">
//           <span>1 ounce sweet vermouth</span>
//         </li>
//         <li class="ingridients__item">
//           <span>orange peel</span>
//         </li>
//       </ul>
//     </div>

//     <button class="modal-coctails__button" type="button">
//       Add to favorite
//     </button>
//   </div>`;
// }
// refs.backdrop.insertAdjacentHTML('beforeend', onCreateCockteilsMarkup());
// console.log(cocktailMarkup);

// let flag = true;
//Слушатели
refs.openModalBtn.addEventListenerAll('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBakdropClick);
refs.btnAddFavorie.addEventListener('click', onCangeBtn);
// window.addEventListener('keydown', handleCloseModal);
// refs.openModalBtn.addEventListener('click', toggleModal);

function onClickModalIngridientsTwo() {
  if ('click') {
    refs.modal.classList.remove('is-hidden');
    refs.modal2.classList.add('is-hidden');

    console.log('----> click');

    refs.openModalBtn.forEach(el => {
      el.addEventListener('click', onClickModalIngridientsTwo);
    });
  }
}
// function toggleModal() {
//   onCreateCockteilsMarkup();
//   refs.openModalBtn.classList.toggle('is-hidden');
//   refs.body.classList.toggle('no-scroll');
//   refs.modal2.classList.add('is-hidden');

//   refs.openModalBtn.forEach(el => {
//     el.addEventListener('click', toggleModal);
//   });
// }

// Открытие 1й модалки с галереи
// function toggleModal(e) {
//   console.log(refs.modal.classList, e);
//   refs.modal.classList.toggle('is-hidden');
//   // refs.body.classList.toggle('no-scroll');
//   // refs.modal2.classList.add('is-hidden');
//   onCreateCockteilsMarkup();
// }
//  Закрытие модалки по кнопке
function onCloseModal() {
  if ('click') {
    refs.modal.classList.add('is-hidden');
    refs.modal2.classList.add('is-hidden');
  }
}

// Закрытие по бекдропу
function onBakdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}
// let flag = true;
// Смена кнопок с Add на Remove + добавить innerHTML
// function onCangeBtn() {
//   if (flag) {
//     refs.btnAddFavorie.innerHTML = 'Remove from favorite';
//   } else {
//     refs.btnAddFavorie.innerHTML = 'Add to favorite';
//   }
//   flag = !flag;
// }

// Закрытие по ЕСК
function handleCloseModal(e) {
  if (e.key === 'Escape') {
    refs.modal.classList.add('is-hidden');
  }
}

// ___________Вызов модалки 2 ______________

function onClickModalIngridientsTwo() {
  if ('click') {
    refs.modal2.classList.remove('is-hidden');
    refs.modal.classList.add('is-hidden');

    console.log('----> click');

    refs.ingridientsItems.forEach(ingridientsItem => {
      ingridientsItem.addEventListener('click', onClickModalIngridientsTwo);
    });
  }
}
