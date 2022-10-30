export const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modal2: document.querySelector('[data-modal-ingridients]'),
  backdrop: document.querySelector('.backdrop'),
  body: document.querySelector('body'),
  btnAddFavorie: document.querySelector('.modal-coctails__button'),
  ingridientsItems: document.querySelectorAll('.ingridients__item'),
};

let flag = true;
//Слушатели
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBakdropClick);
refs.btnAddFavorie.addEventListener('click', onCangeBtn);
window.addEventListener('keydown', handleCloseModal);

// Открытие 1й модалки с галереи
function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  refs.modal2.classList.add('is-hidden');
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
// Смена кнопок с Add на Remove + добавить innerHTML
function onCangeBtn() {
  if (flag) {
    refs.btnAddFavorie.innerHTML = 'Remove from favorite';
  } else {
    refs.btnAddFavorie.innerHTML = 'Add to favorite';
  }
  flag = !flag;
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
  }
  console.log('----> click');
}
refs.ingridientsItems.forEach(ingridientsItem => {
  ingridientsItem.addEventListener('click', onClickModalIngridientsTwo);
});
