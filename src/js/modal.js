export const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modal2: document.querySelector('[data-modal-ingridients]'),
  backdrop: document.querySelector('.backdrop'),
  body: document.querySelector('body'),
  btnAddFavorie: document.querySelector('.modal-coctails__add'),
  ingridientsLink: document.querySelector('.ingridients__link'),
  //   btnRemove: document.querySelector('.modal-coctails__remove'),
};
let flag = true;
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBakdropClick);
refs.btnAddFavorie.addEventListener('click', onCangeBtn);
// refs.btnRemove.addEventListener('click', onClickRemoveHiden),
refs.ingridientsLink.addEventListener('click', onClickModalIngridientsTwo);

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
// Закрітие по
function onBakdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}
function onCangeBtn() {
  if (flag) {
    console.log('Yes');
    refs.btnAddFavorie.innerHTML = 'Remove from favorite';
  } else {
    console.log('0');
    refs.btnAddFavorie.innerHTML = 'Add to favorite';
  }
  flag = !flag;
}
// Добавление is-hidden на кнопку Add и снятие  is-hidden с кнопки Remove
function onAddFavorite() {
  refs.btnRemove.classList.remove('is-hidden');
  console.log('---> Add');
  refs.btnAddFavorie.classList.add('is-hidden');
}
// Добавление is-hidden на кнопку Remove и снятие  is-hidden с кнопки Add
function onClickRemoveHiden() {
  refs.btnRemove.classList.add('is-hidden');
  refs.btnAddFavorie.classList.remove('is-hidden');
}
// Вызов модалки 2 по ссылке
function onClickModalIngridientsTwo() {
  if ('click') {
    refs.modal2.classList.remove('is-hidden');
    refs.modal.classList.add('is-hidden');
  }
}
// Закрытие по ЕСК
function handleCloseModal(e) {
  if (e.key === 'Escape') {
    refs.modal.classList.add('is-hidden');
  }
}
