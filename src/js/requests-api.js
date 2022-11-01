import axios from 'axios';

const getCocktailsByName = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => createCocktailArray(res))
    .catch(Error => []);
};

const getCocktailsByFirstLetter = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`)
    .then(res => createCocktailArray(res))
    .catch(Error => []);
};

const getIngredientInfo = query => {
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}`)
    .then(res => res.data.ingredients[0])
    .catch(Error => []);
};

export const getRandomCocktail = () => {
  return axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.data.drinks[0])
    .then(obj => {
      let cocktailName = '';
      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        cocktailName = 'strIngredient' + i;
        obj[cocktailName] !== null ? ingredients.push(obj[cocktailName]) : '';
      }
      return {
        name: obj.strDrink,
        instruction: obj.strInstructions,
        img: obj.strDrinkThumb,
        ingredients: ingredients,
        dataModal: 'add',
      };
    })
    .catch();
};

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
      ingredients: ingredients,
      dataModal: 'add',
    };
  });
  // console.log(newDrinks);
  localStorage.setItem('cocktails', JSON.stringify(newDrinks));
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
