const templateModal = ({
  name,
  instruction,
  img,
  ingredients,
  dataModal,
  type,
  isAuth
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
let cls = !isAuth ? 'is-hidden': 'modal-cocktails__button'

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

      <button data-modal-btn="${dataModal}" data-cocktail="${name}" data-type="${type}" class="${cls}" type="button">
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
      <button data-modal-btn="${dataModal}" data-cocktail="${name}" data-type="${type}" class="modal-cocktails__button" type="button">
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
  typeIngredient = 'all',
}) => {
  let textBtn;
  if (dataModal === 'add') {
    textBtn = 'Add to favorite';
  } else {
    textBtn = 'Remove from favorite';
  }

  console.log('dataModal', dataModal);
  return `<div class="modal-ingredient__section">
  <div class="modal-ingredient__section-first">
  <h2 class="modal-ingredient__header">${name}</h2>

       <b class="modal-ingredient__title">${type}</b>
       </div>
       <div class="modal-ingredient__line"></div>
       <div class="modal-ingredient__section-last">
       <div class="modal-ingredient__description">
      <p class="modal-ingredient__text">${description}</p>
      </div>
      <div class="ingredients">
        <ul data-modal-open class="ingredients__list">
        <li class="ingredients__item">
            <span>Type: ${type !== null ? type : 'no information'} </span>
          </li>
          <li class="ingredients__item">
            <span>Alcohol by volume: ${
              alcoholValue !== null ? alcoholValue : 'no information'
            }</span>
          </li>
          <li class="ingredients__item">
            <span>Alcohol: ${
              alcohol !== null ? alcohol : 'no information'
            }</span>
          </li>
          <li class="ingredients__item">
            <span>Ingredients: ${
              ingredients !== null ? ingredients : 'no information'
            }</span>
          </li>
        </ul>
      </div>
      <button data-modal-ingredient="${dataModal}" data-type='${typeIngredient}' data-ingredient="${name}" class="modal-ingredient__button" type="button">
        ${textBtn}
      </button>
      </div>
      </div>`;
};
export { templateModal, templateModalIngredients };
