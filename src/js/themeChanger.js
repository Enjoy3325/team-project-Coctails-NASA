const slider = document.querySelector('.themeChanger')
const body = document.querySelector('body')

const themeChanger = () => {
  body.classList.toggle('themeDark')
};

slider.addEventListener('click', themeChanger)