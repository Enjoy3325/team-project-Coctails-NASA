import { requestApi } from './requests-api';
import { renderCocktails } from './render-gallery';

const form = document.querySelector('.form')
const mobMenuForm = document.querySelector('.mob-menu-form')

let inputValue = '';

form.addEventListener('submit', e=>{
  createSubmit(e)
  form.reset()
})

mobMenuForm.addEventListener('submit', e=>{
  createSubmit(e)
  document.querySelector('.mob-menu').classList.add('is-hidden')
  document.querySelector('body').classList.toggle('no-scroll');
  mobMenuForm.reset()
})

const createSubmit = (e) => {
  e.preventDefault();
  inputValue = e.target.elements[1].value
  requestApi(inputValue).then(cocktails => {
    document.querySelector('.cocktails__title').innerHTML =
      'Searching results';
    renderCocktails(cocktails);
    return;
  });
  inputValue = ''
}




