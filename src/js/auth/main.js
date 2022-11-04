import { Cocktail } from './cocktail';
import { authWithEmailAndPassword } from './cocktail';

function submitFormHandler(e) {
  e.preventDefault();
  // Async request to server to save coctails
  Cocktail.create({ name: 'Vampiro' }).then(() => {
    //   clear form
    // input.value = ''
    // input.className = ''
    // submitBtn.disabled = false
  });
}

function openModalAuth() {
  //createModal
  // document.querySelector('#auth-form')
  //     .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(e) {
  e.preventDefault();
  const email = e.target.querySelector('.email').value;
  const password = e.target.querySelector('.password').value;

  authWithEmailAndPassword(email, password);
}
