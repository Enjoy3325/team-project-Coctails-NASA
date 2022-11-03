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
    .then(obj => {
      // let cocktailName = '';
      // let ingredients = [];
      // for (let i = 1; i <= 15; i++) {
      //   cocktailName = 'strIngredient' + i;
      //   obj[cocktailName] !== null
      //     ? ingredients.push(obj[cocktailName])
      //     : ingredients.push(obj.strIngredient);
      // }
      return {
        name: obj.strIngredient,
        description: obj.strDescription,
        type: obj.strType,
        alcoholValue: obj.strABV,
        alcohol: obj.strAlcohol,
        ingredients: obj.strIngredient,
        dataModal: 'add',
      };
    })
    .catch(Error => []);
};

export const getRandomCocktail = () => {
  const favCocktNames = JSON.parse(
    localStorage.getItem('favoriteCocktails') || '[]'
  ).map(item => item.name);

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
    .then(data => {
      favCocktNames.forEach(fav => {
        if (fav === data.name) {
          data.dataModal = 'remove';
        }
      });
      return data;
    })
    .catch();
};

const createCocktailArray = res => {
  const favCocktNames = JSON.parse(
    localStorage.getItem('favoriteCocktails') || '[]'
  ).map(item => item.name);
  const newDrinks = res.data.drinks
    .map(drink => {
      const { strDrink, strInstructions, strDrinkThumb } = drink;
      let cocktailName = '';
      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        cocktailName = 'strIngredient' + i;
        drink[cocktailName] !== null
          ? ingredients.push(drink[cocktailName])
          : '';
      }
      return {
        name: strDrink,
        instruction: strInstructions,
        img: strDrinkThumb,
        ingredients: ingredients,
        dataModal: 'add',
      };
    })
    .map(item => {
      favCocktNames.forEach(fav => {
        if (fav === item.name) {
          item.dataModal = 'remove';
        }
      });
      return item;
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
