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

  return `<div class="modal-coctails__mobile-section">
  <h2 class="modal-coctails__header">${name}</h2>

       <b class="modal-coctails__title">INSTRACTIONS:</b>
      <p class="modal-coctails__text">${instruction}</p>
      <img class="modal-coctails__image" src="${img}" alt="${name}" />

      <div class="ingridients">
        <h3 class="ingridients__subtitle">INGREDIENTS</h3>
        <p class="ingridients__subtext">Per cocktail</p>
        <ul class="ingridients__list">
        ${ingridientsList}
        </ul>
      </div>
      <button data-add-favorite class="modal-coctails__button" type="button">
        Add to favorite
      </button>
      </div>
        
      <div class="modal-coctails__tablet-section">
      <div class="modal-coctails__cover-block">
        <img class="modal-coctails__image" src="${img}" alt="${name}" />
        <div class="modal-coctails__content">
            <h2 class="modal-coctails__header">${name}</h2>
            <div class="ingridients">
            <h3 class="ingridients__subtitle">INGREDIENTS</h3>
            <p class="ingridients__subtext">Per cocktail</p>
            <ul class="ingridients__list">
            ${ingridientsList}
            </ul>
            </div>
        </div>
      </div>

        <div class="modal-coctails__instruction-block">
      <b class="modal-coctails__title">INSTRACTIONS:</b>
      <p class="modal-coctails__text">${instruction}</p>
      </div>
      <button data-add-favorite class="modal-coctails__button" type="button">
        Add to favorite
      </button>
      </div>`;
};

export { templateModal };
