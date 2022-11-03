const slider = document.querySelector('.themeChanger')
const sliderMob = document.querySelector('.mob-menu-switcher .slider')
const body = document.querySelector('body')
const themeSwitcher = document.querySelector(".switcher input");
const themeMobSwitcher = document.querySelector(".mob-menu-switcher input");

themeSwitcher.checked = false
themeMobSwitcher.checked = false

const themeChanger = () => {
  if(themeSwitcher.checked){
    body.classList.remove('themeDark')
    localStorage.setItem('theme', 'white')

  } else {
    body.classList.add('themeDark', 'themeDark')
    localStorage.setItem('theme', 'black')
  }
};

const themeMobChanger = () => {
  if(themeMobSwitcher.checked){
    body.classList.remove('themeDark')
    localStorage.setItem('theme', 'white')

  } else {
    body.classList.add('themeDark', 'themeDark')
    localStorage.setItem('theme', 'black')
  }
};

slider.addEventListener('click', themeChanger)
sliderMob.addEventListener('click', themeMobChanger)

window.onload = checkTheme();

function checkTheme() {
  const localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme !== null && localStorageTheme === "black") {
    body.classList.add('themeDark', 'themeDark')
    const themeSwitch = document.querySelector(".switcher input");
    themeSwitch.checked = true;
    const themeMobSwitch = document.querySelector(".mob-menu-switcher input");
    themeMobSwitch.checked = true;
  }
}