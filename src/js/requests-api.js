import axios from 'axios';

const getCocktailsByName = () => {
  return axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
}

const getCocktailsByFirstLetter = () => {
  return axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
}

const getIngredientInfo = () => {
  return axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=ice')
}

getCocktailsByName()
  .then(res => createCocktailArray(res))
  .catch()

getCocktailsByFirstLetter()
  .then(res => createCocktailArray(res))
  .catch()

getIngredientInfo()
  .then(res => res.data.ingredients[0])
  .catch()


const createCocktailArray = (res) => {
  const newDrinks = res.data.drinks.map(drink => {
    const {strDrink, strInstructions, strDrinkThumb}= drink
    let cocktailName = ''
    let ingredients = []
    for (let i = 1; i <= 15; i++){
      cocktailName = 'strIngredient' + i
      drink[cocktailName] !== null ? ingredients.push(drink[cocktailName]) : ''
    }
    return {
      name: strDrink,
      instruction: strInstructions,
      img: strDrinkThumb,
    }
  })
  console.log(newDrinks);
}