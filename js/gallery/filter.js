import { debounce } from '../utils/utils.js';
import { renderGallery } from './thumbnails';

const MAX_RANDOM_FILTER = 10;
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};


const filterElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,

  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) =>
    item2.comments.length - item1.comments.length
  ),
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (event, filter, data) => {
  if (currentFilter !== filter) {
    const filterData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filterData);

    const activeButtonClass = 'img-filters__button--active';
    filterForm.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
    event.target.classList.add(activeButtonClass);

    currentFilter = filter;
  }
};

const debounceRepaint = debounce((event, filter, data) => {
  repaint(event, filter, data);
});

const handleFilterClick = (event, filter, data) => {
  debounceRepaint(event, filter, data);

  const activeButtonClass = 'img-filters__button--active';
  filterForm.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
  event.target.classList.add(activeButtonClass);
};


const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.DEFAULT, data);
  });

  randomBtn.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.RANDOM, data);
  });

  discussedBtn.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.DISCUSSED, data);
  });
};

export {initFilter};
