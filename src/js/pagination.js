// функція додає кнопки пагінації внизу галареї.
// приймає масив коктейлів для рендера (arr)
// і кількість коктейлів на одній сторінці (number)

export function getPagination(arr, number) {
  const pagRefs = {
    box: document.querySelector('.pagination'),
    // prev: document.querySelector('.pagination__previous'),
    // next: document.querySelector('.pagination__next'),
    list: document.querySelector('.pagination__list'),
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
  document
    .querySelector('.pagination__item')
    .classList.add('pagination--active');
}