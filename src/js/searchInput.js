import { requestApi } from './requests-api';

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
  mobMenuForm.reset()
})

const createSubmit = (e) => {
  e.preventDefault();
  inputValue = e.target.elements[1].value
  requestApi(inputValue)
  inputValue = ''
}


