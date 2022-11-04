export class Cocktail {
  static create(cocktail) {
    return fetch(
      `https://nasa-js-project-default-rtdb.firebaseio.com/cocktails.json`,
      {
        method: 'POST',
        body: JSON.stringify(cocktail),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      })
      .then(addToLocalStorage)
      .then(Cocktail.renderList);
  }

  static renderList() {
    const cocktails = getCocktailFromLocalStorage();

    const html = cocktails.length
      ? cocktails.map(toCard).json('')
      : `
    <div> No search</div>`;

    const list = document.querySelector('.gallery');
    list.innerHTML = html;
  }
}

function addToLocalStorage(cocktail) {
  const all = getCocktailFromLocalStorage();
  all.push(cocktail);
  localStorage.setItem('cocktail', JSON.stringify(all));
}

function getCocktailFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cocktail') || '[]');
}

function toCard(cocktail) {
  return `<div>${cocktail.name}</div>`;
}
