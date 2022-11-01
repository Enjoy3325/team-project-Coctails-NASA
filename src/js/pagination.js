import { renderCocktailCards} from './render-gallery';
// функція додає кнопки пагінації внизу галареї.
// приймає масив коктейлів для рендера (arr)
// і кількість коктейлів на одній сторінці (number)

export function getPagination(arr, number) {
  let lclStorCocktails = JSON.parse(localStorage.getItem('cocktails'));
  const pagRefs = {
    box: document.querySelector('.pagination'),
    list: document.querySelector('.pagination__list'),
    prev: document.querySelector('.pagination__previous'),
    next: document.querySelector('.pagination__next'),
  };
  if (arr.length <= number) {
    pagRefs.box.classList.add('visually-hidden');
    return;
  }
  pagRefs.box.classList.remove('visually-hidden');
  const numOfItems = Math.ceil(arr.length / number);
  let markup = [];
  for (let i = 1; i <= numOfItems; i += 1) {
    markup.push(`<li class="pagination__item">${i}</li>`);
  }
  pagRefs.list.innerHTML = markup.join('');
    const pagBtnsArr = document.querySelectorAll('.pagination__item');
    for (const btn of pagBtnsArr) {
        btn.addEventListener('click', showThisPage)
    }
    let activeBtn = pagBtnsArr[0];
    activeBtn.classList.add('pagination--active');
    
    function showThisPage(event) {
        activeBtn.classList.remove('pagination--active');
        this.classList.add('pagination--active');
        activeBtn = this;
        let pageNum = Number(this.innerHTML);
        let start = ((pageNum - 1) * number);
        let end = (pageNum * number);
        let sliceArr = lclStorCocktails.slice(start, end);
        renderCocktailCards(sliceArr);
        if (pagBtnsArr.length === Number(activeBtn.innerHTML)) {
          pagRefs.next.classList.add('is-hidden');
        }
        if (pagBtnsArr.length > Number(activeBtn.innerHTML)) {
          pagRefs.next.classList.remove('is-hidden');
        }
        if (Number(activeBtn.innerHTML) === 1) {
          pagRefs.prev.classList.add('is-hidden');
        }
        if (Number(activeBtn.innerHTML) > 1) {
          pagRefs.prev.classList.remove('is-hidden');
        }
    }
    function showPrevPage(event) {
        let prevPage = Number(activeBtn.innerHTML) - 1;
        console.log(prevPage);
        activeBtn.classList.remove('pagination--active');
        activeBtn = pagBtnsArr[prevPage - 1];
        activeBtn.classList.add('pagination--active');
        if (pagBtnsArr.length > Number(activeBtn.innerHTML)) {
          pagRefs.next.classList.remove('is-hidden');
        }
        let start = (prevPage - 1) * number;
        let end = prevPage * number;
        let sliceArr = lclStorCocktails.slice(start, end);
        renderCocktailCards(sliceArr);
        console.log('activeBtn:', activeBtn, 'prevPage:', prevPage);
        if (Number(activeBtn.innerHTML) === 1) {
          pagRefs.prev.classList.add('is-hidden');
        }
    }
    function showNextPage(event) {
        let pageNum = Number(activeBtn.innerHTML);
        activeBtn.classList.remove('pagination--active');
        activeBtn = pagBtnsArr[pageNum];
        activeBtn.classList.add('pagination--active');
        if (Number(activeBtn.innerHTML) > 1) {
          pagRefs.prev.classList.remove('is-hidden');
        }
        let start = pageNum * number;
        let end = (pageNum + 1) * number;
        let sliceArr = lclStorCocktails.slice(start, end);
        renderCocktailCards(sliceArr);
        console.log('activeBtn', activeBtn.innerHTML);
        if (pagBtnsArr.length === Number(activeBtn.innerHTML)) {
          pagRefs.next.classList.add('is-hidden');
        }
    }
    pagRefs.next.addEventListener('click', showNextPage);
    pagRefs.prev.addEventListener('click', showPrevPage)
}