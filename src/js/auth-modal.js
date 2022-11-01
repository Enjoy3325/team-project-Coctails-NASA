const refs = {
  authModal: document.querySelector('[data-auth-modal]'),
  openAuthModal: document.querySelector('[data-auth-modal-open]'),
  closeAuthModal: document.querySelector('[data-auth-modal-close]'),
  backdrop: document.querySelector('.backdrop.auth'),
  regFormBtn: document.querySelector('.reg-form__button'),
  loginFormBtn: document.querySelector('.login-form__button'),
  regMarkup: document.querySelector('.register-markup'),
  loginMarkup: document.querySelector('.login-markup'),
};

refs.openAuthModal.addEventListener('click', toggleModal);
refs.closeAuthModal.addEventListener('click', toggleModal);
refs.backdrop.addEventListener('click', onBackdropClick);




refs.regFormBtn.addEventListener('click', toggleMarkup);
refs.loginFormBtn.addEventListener('click', toggleMarkup);

function toggleMarkup() {
  refs.regMarkup.classList.toggle('is-hidden');
  refs.loginMarkup.classList.toggle('is-hidden');
}


function toggleModal() {
  document.body.classList.toggle('no-scroll');
  refs.authModal.classList.toggle('is-hidden');
  refs.regMarkup.classList.toggle('is-hidden');
  refs.loginMarkup.classList.toggle('is-hidden');
}

function onCloseModal() {
  refs.authModal.classList.add('is-hidden');
  document.body.classList.toggle('no-scroll');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}