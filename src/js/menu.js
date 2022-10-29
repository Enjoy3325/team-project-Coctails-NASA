(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),

    menu: document.querySelector('.mob-menu'),
    body: document.querySelector('body'),
    menuList: document.querySelector('.mob-menu-nav__list'),


    btn: document.querySelector('.btn'),
    fav: document.querySelector('#favorites-ul'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  refs.menuList.addEventListener('click', removeMenu);
  refs.btn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    // refs.fav.classList.toggle('is-hidden');
    // refs.body.classList.toggle('no-scroll');
  }

  function removeMenu() {
    refs.menu.classList.add('is-hidden');
  }
})();
