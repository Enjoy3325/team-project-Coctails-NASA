const refs = {
  closeModalBtn: document.querySelector('[data-modal-closes]'),
  modal: document.querySelector('[data-modal]'),
  gallery: document.querySelector('.gallery'),
};

function modalCocktails() {
  let selectedCocktail = {};
  refs.gallery.addEventListener('click', onGalleryClick);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal(e) {
    document.body.classList.toggle('no-scroll');
    refs.modal.classList.toggle('is-hidden');
  }

  function onGalleryClick(e) {
    const { openModal, cocktail } = e.target.dataset;

    //   Перевіряємо, щоб клік був на BUTTON і мав  data-open-modal="open",
    //   тоді видкриваємо модалку і записуємо дані обаного коктейлю
    if (e.target.nodeName === 'BUTTON' && openModal === 'open') {
      const data = JSON.parse(localStorage.getItem('cocktails'));
      selectedCocktail = data.find(el => el.name === cocktail);
      toggleModal();
    }
    console.log(selectedCocktail);
  }

  //   function closeModal() {
  //     refs.modal.classList.add('is-hidden');
  //   }

  //   function onOpenModal() {
  //     refs.modal.classList.remove('is-hidden');
  //   }
}

export { modalCocktails };

// export class modalCocktails
