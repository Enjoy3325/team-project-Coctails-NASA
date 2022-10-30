const input = document.querySelector('.form-input')
const mobMenuinput = document.querySelector('.mob-form-input')
const form = document.querySelector('.form')
const mobMenuForm = document.querySelector('.mob-menu-form')
const formBtn = document.querySelector('.form-btn')

let inputValue = '';


input.addEventListener('input', (e)=>{
  inputValue = e.target.value;
  if (inputValue.length > 0) {
    formBtn.removeAttribute('disabled');
  } else {
    formBtn.setAttribute('disabled', 'disabled');
  }
})

mobMenuinput.addEventListener('input', (e)=>{
  inputValue = e.target.value;
  if (inputValue.length > 0) {
    formBtn.removeAttribute('disabled');
  } else {
    formBtn.setAttribute('disabled', 'disabled');
  }
})

form.addEventListener('submit', e=>{
  e.preventDefault();
  inputValue = ''
  formBtn.setAttribute('disabled', 'disabled');
  form.reset()
})

mobMenuForm.addEventListener('submit', e=>{
  e.preventDefault();
  inputValue = ''
  formBtn.setAttribute('disabled', 'disabled');
  form.reset()
})