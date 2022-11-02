const templateModal = ({
  name,
  instruction,
  img,
  ingredients,
  dataModal,
  type,
}) => {
  let ingredientsList;
  if (ingredients.length > 0) {
    ingredientsList = ingredients
      .map(
        el => `<li class="ingredients__item">
            <span data-ingredient="${el}">${el}</span>
          </li>`
      )
      .join('');
  }
  let textBtn;

  if (dataModal === 'add') {
    textBtn = 'Add to favorite';
  } else {
    textBtn = 'Remove from favorite';
  }

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
      <button data-modal-btn="${dataModal}" data-cocktail="${name}" data-type="${type}" class="modal-cocktails__button" type="button">
         ${textBtn}
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
      <button data-modal-btn="${dataModal}" data-cocktail="${name}" class="modal-cocktails__button" type="button">
        ${textBtn}
      </button>
      </div>`;
};

const templateModalIngredients = ({
  name,
  type,
  description,
  ingredients,
  alcoholValue,
  alcohol,
  dataModal,
}) => {
  // let ingredientsDescription;
  // if (ingredients.length > 0) {
  //   ingredientsList = ingredients
  //     .map(
  //       el => `<li class="ingredients__item">
  //           <span>${el}</span>
  //         </li>`
  //     )
  //     .join('');
  // }
  console.log(fks);
  return `<div class="modal-ingredient__section">
  <div class="modal-ingredient__section-first">
  <h2 class="modal-ingredient__header">${name}</h2>

       <b class="modal-ingredient__title">${
         type !== null ? type : 'no information'
       }</b>
       </div>
       <div class="modal-ingredient__line"></div>
       <div class="modal-ingredient__section-last">
       <div class="modal-ingredient__description">
      <p class="modal-ingredient__text">${description}</p>
      </div>
      <div class="ingredients">
        <ul data-modal-open class="ingredients__list2">
        <li class="ingredients__item2">
            <span class="span2">Type: ${
              type !== null ? type : 'no information'
            } </span>
          </li>
          <li class="ingredients__item2">
            <span class="span2">Alcohol by volume: ${
              alcoholValue !== null ? alcoholValue : 'no information'
            }</span>
          </li>
          <li class="ingredients__item2">
            <span class="span2">Alcohol: ${
              alcohol !== null ? alcohol : 'no information'
            }</span>
          </li>
          <li class="ingredients__item2">
            <span class="span2">Ingredients: ${
              ingredients !== null ? ingredients : 'no information'
            }</span>
          </li>
        </ul>
      </div>
      <button data-modal-ingredient="add" data-ingredient="${name}" class="modal-ingredient__button" type="button">
        Add to favorite
      </button>
      </div>
      </div>`;
};
export { templateModal, templateModalIngredients };
