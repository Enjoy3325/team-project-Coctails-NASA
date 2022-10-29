import axios from 'axios';

const getCocktailsByName = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => createCocktailArray(res))
    .catch();
};

const getCocktailsByFirstLetter = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`)
    .then(res => createCocktailArray(res))
    .catch();
};

const getIngredientInfo = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}`)
    .then(res => res.data.ingredients[0])
    .catch();
};

export const getRandomCocktail = () => {
  return axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.data.drinks[0])
    .then(obj => {
      return {
        name: obj.strDrink,
        instruction: obj.strInstructions,
        img: obj.strDrinkThumb,
      };
    })
    .catch();
}

const createCocktailArray = res => {
  const newDrinks = res.data.drinks.map(drink => {
    const { strDrink, strInstructions, strDrinkThumb } = drink;
    let cocktailName = '';
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      cocktailName = 'strIngredient' + i;
      drink[cocktailName] !== null ? ingredients.push(drink[cocktailName]) : '';
    }
    return {
      name: strDrink,
      instruction: strInstructions,
      img: strDrinkThumb,
    };
  });
  // console.log(newDrinks);

  return newDrinks;
};

export function requestApi(query, name = 'name') {
  switch (name) {
    case 'letter':
      return getCocktailsByFirstLetter(query);
    case 'ingredient':
      return getIngredientInfo(query);
    default:
      return getCocktailsByName(query);
  }
}

// export { requestApi };

// getCocktailsByName(query)
//   .then(res => createCocktailArray(res))
//   .catch();

// getCocktailsByFirstLetter()
//   .then(res => createCocktailArray(res))
//   .catch();

// getIngredientInfo()
//   .then(res => res.data.ingredients[0])
//   .catch();
