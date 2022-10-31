const templateModal = ({ name, instruction, img, ingredients }) => {
  let ingredientsList;
  if (ingredients.length > 0) {
    ingredientsList = ingredients
      .map(
        el => `<li class="ingredients__item">
            <span>${el}</span>
          </li>`
      )
      .join('');
  }

  console.log(ingredientsList);

  return `<div class="modal-cocktails__mobile-section">
  <h2 class="modal-cocktails__header">${name}</h2>

       <b class="modal-cocktails__title">INSTRACTIONS:</b>
      <p class="modal-cocktails__text">${instruction}</p>
      <img class="modal-cocktails__image" src="${img}" alt="${name}" />

      <div class="ingredients">
        <h3 class="ingredients__subtitle">INGREDIENTS</h3>
        <p class="ingredients__subtext">Per cocktail</p>
        <ul class="ingredients__list">
        ${ingredientsList}
        </ul>
      </div>
      <button data-modal-open class="modal-cocktails__button" type="button">
        Add to favorite
      </button>
      </div>

      <div class="modal-cocktails__tablet-section">
      <div class="modal-cocktails__cover-block">
        <img class="modal-cocktails__image" src="${img}" alt="${name}" />
        <div class="modal-cocktails__content">
            <h2 class="modal-cocktails__header">${name}</h2>
            <div class="ingredients">
            <h3 class="ingredients__subtitle">INGREDIENTS</h3>
            <p class="ingredients__subtext">Per cocktail</p>
            <ul class="ingredients__list">
            ${ingredientsList}
            </ul>
            </div>
        </div>
      </div>

        <div class="modal-cocktails__instruction-block">
      <b class="modal-cocktails__title">INSTRACTIONS:</b>
      <p class="modal-cocktails__text">${instruction}</p>
      </div>
      <button data-modal-open class="modal-cocktails__button" type="button">
        Add to favorite
      </button>
      </div>`;
};

export { templateModal };
