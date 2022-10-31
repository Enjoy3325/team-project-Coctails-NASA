const templateModal = ({ name, instruction, img, ingredients }) => {
  let ingridientsList;
  if (ingredients.length > 0) {
    ingridientsList = ingredients
      .map(
        el => `<li class="ingridients__item">
            <span>${el}</span>
          </li>`
      )
      .join('');
  }

  console.log(ingridientsList);

  return `<h2 class="modal-coctails__header">Negroni</h2>

      <b class="modal-coctails__title">${name}</b>
      <p class="modal-coctails__text">${instruction}</p>
      <img class="modal-coctails__image" src="${img}" alt="${name}" />

      <div class="ingridients">
        <h3 class="ingridients__subtitle">INGREDIENTS</h3>
        <p class="ingridients__subtext">Per cocktail</p>
        <ul class="ingridients__list">
        ${ingridientsList}
        </ul>
      </div>
      <button data-modal-open class="modal-coctails__button" type="button">
        Add to favorite
      </button>`;
};

export { templateModal };
