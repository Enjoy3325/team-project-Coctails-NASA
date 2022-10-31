const slider = document.querySelector('.themeChanger')
const sliderMob = document.querySelector('.mob-menu-switcher .slider')
const body = document.querySelector('body')

const themeChanger = () => {
  body.classList.toggle('themeDark')
};

slider.addEventListener('click', themeChanger)
sliderMob.addEventListener('click', themeChanger)