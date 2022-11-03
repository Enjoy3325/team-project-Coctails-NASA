import { renderCocktailCards, number } from './render-gallery';
// функція додає кнопки пагінації внизу галареї.
// приймає масив коктейлів для рендера (arr)
// і кількість коктейлів на одній сторінці (number)

const box = document.querySelector('.pagination');
const list = document.querySelector('.pagination__list');
const prev = document.querySelector('.pagination__previous');
const next = document.querySelector('.pagination__next');

let pageNum;
let activeBtn;
let pagBtnsArr = [];
let paginationArr = [];

// ця функія визначає масив для пагінації залежно від сторінки, яку ми відкрили
function getArrToPagination(event) {
  let key = 'cocktails';
  if (event.target.innerHTML === 'Favorite cocktails') {
    key = 'favoriteCocktails';
  }
  if (event.target.innerHTML === 'Favorite ingredients') {
    key = 'favoriteIngredients';
  }
  let paginationArr = JSON.parse(localStorage.getItem(`${key}`));
  return paginationArr;
}
// ця функція додає truncate, якщо в пагінації більше шести сторінок
function showDots(arr) {
  if (arr.length <= 6) {
    return;
  } else {
    pageNum = Number(document.querySelector('.pagination--active').innerHTML);
    const listItems = document.querySelectorAll('.pagination__item');
    listItems.forEach(li =>
      li.classList.remove(
        'visually-hidden',
        'pagination__dots-before',
        'pagination__dots-after'
      )
    );
    // якщо активна кнопка 1 або 2
    if (pageNum <= 2) {
      for (let i = 3; i < arr.length - 2; i += 1) {
        listItems[i].classList.add('visually-hidden');
      }
      listItems[2].classList.add('pagination__dots-after');
      // якщо активна кнопка передостання або остання
    } else if (pageNum >= arr.length - 1) {
      for (let i = 2; i < arr.length - 3; i += 1) {
        listItems[i].classList.add('visually-hidden');
      }
      listItems[arr.length - 3].classList.add('pagination__dots-before');
      // якщо активна кнопка будь-яка крім двох з кожного краю
    } else {
      for (let i = 1; i < arr.length - 1; i += 1) {
        listItems[i].classList.add('visually-hidden');
      }
      listItems[pageNum - 2].classList.remove('visually-hidden');
      listItems[pageNum - 1].classList.remove('visually-hidden');
      listItems[pageNum].classList.remove('visually-hidden');
      if (pageNum - 2 > 1) {
        listItems[pageNum - 2].classList.add('pagination__dots-before');
      }
      if (pageNum + 2 < arr.length) {
        listItems[pageNum].classList.add('pagination__dots-after');
      }
    }
  }
}
// ця функція виконує пагінацію і логіку кнопок.
export function getPagination(arr, number) {
  paginationArr = getArrToPagination(event);

  if (arr.length <= number) {
    box.classList.add('visually-hidden');
    return;
  }
  box.classList.remove('visually-hidden');
  const pagesCount = Math.ceil(paginationArr.length / number);
  let markup = [];
  for (let i = 1; i <= pagesCount; i += 1) {
    markup.push(
      `<li class="pagination__item" data-name="pageBtn${i}"><span class="pagination__num">${i}</span></li>`
    );
  }
  list.innerHTML = markup.join('');
  pagBtnsArr = document.querySelectorAll('.pagination__num');
  for (const btn of pagBtnsArr) {
    btn.addEventListener('click', showThisPage);
  }
  pageNum = 1;
  activeBtn = pagBtnsArr[pageNum - 1];
  activeBtn.classList.add('pagination--active');
  showDots(pagBtnsArr);

  //   // функції кнопок ====================================
  function showThisPage() {
    activeBtn.classList.remove('pagination--active');
    pageNum = Number(this.innerHTML);
    console.log('pageNum', pageNum);
    activeBtn = pagBtnsArr[pageNum - 1];
    activeBtn.classList.add('pagination--active');
    console.log('activeBtn', activeBtn);
    showDots(pagBtnsArr);
    let start = (pageNum - 1) * number;
    let end = pageNum * number;
    let sliceArr = arr.slice(start, end);
    renderCocktailCards(sliceArr);
    if (pagBtnsArr.length === Number(activeBtn.innerHTML)) {
      next.classList.add('is-hidden');
    }
    if (pagBtnsArr.length > Number(activeBtn.innerHTML)) {
      next.classList.remove('is-hidden');
    }
    if (Number(activeBtn.innerHTML) === 1) {
      prev.classList.add('is-hidden');
    }
    if (Number(activeBtn.innerHTML) > 1) {
      prev.classList.remove('is-hidden');
    }
  }
  function showPrevPage(event) {
    activeBtn.classList.remove('pagination--active');
    pageNum = pageNum - 1;
    activeBtn = pagBtnsArr[pageNum - 1];
    activeBtn.classList.add('pagination--active');
    if (pageNum === 1) {
      prev.classList.add('is-hidden');
    }
    showDots(pagBtnsArr);
    if (pagBtnsArr.length > pageNum) {
      next.classList.remove('is-hidden');
    }
    let start = (pageNum - 1) * number;
    let end = pageNum * number;
    let sliceArr = arr.slice(start, end);
    renderCocktailCards(sliceArr);
  }
  function showNextPage(event) {
    activeBtn.classList.remove('pagination--active');
    pageNum = pageNum + 1;
    activeBtn = pagBtnsArr[pageNum - 1];
    activeBtn.classList.add('pagination--active');
    if (pageNum === pagBtnsArr.length) {
      next.classList.add('is-hidden');
    }
    showDots(pagBtnsArr);
    if (pagBtnsArr.length > 1) {
      prev.classList.remove('is-hidden');
    }
    let start = (pageNum - 1) * number;
    let end = pageNum * number;
    let sliceArr = arr.slice(start, end);
    renderCocktailCards(sliceArr);
  }

  //   оголошення слухачів кнопок ========================
  next.addEventListener('click', showNextPage);
  prev.addEventListener('click', showPrevPage);
}
