(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    openFavorites: document.querySelector('[data-favorites-open]'),
    openMobFavorites: document.querySelector('[data-mob-favorites-open]'),

    menu: document.querySelector('.mob-menu'),
    home: document.querySelector('.mob-menu-nav__item'),
    submitBtn: document.querySelector('.form-btn'),
    favorites: document.querySelector('.favorites'),
    favoritesMob: document.querySelector('.favorites-mob'),
    favoriteItem: document.querySelector('.favorites__item'),

    body: document.querySelector('body'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  refs.openFavorites.addEventListener('click', toggleFavorites);
  refs.openMobFavorites.addEventListener('click', toggleMobFavorites);
  refs.favoritesMob.addEventListener('click', removeMenu);
  refs.home.addEventListener('click', removeMenu);


  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }

  function toggleFavorites() {
    refs.favorites.classList.toggle('is-hidden');
  }

  function toggleMobFavorites() {
    refs.favoritesMob.classList.toggle('is-hidden');
  }

  function removeMenu() {
    refs.menu.classList.toggle('is-hidden');
  }
})();
