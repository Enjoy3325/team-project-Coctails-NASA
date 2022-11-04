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


let selectedObj = {
  img: 'https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg',
  instruction:
    'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
  name: 'Almeria',
};

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
