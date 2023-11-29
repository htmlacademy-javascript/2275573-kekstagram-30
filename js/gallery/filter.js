import { debounce } from '../utils/utils.js';
import { renderThumbnails } from './thumbnails';

const MAX_RANDOM_FILTER = 10;
const RERENDER_DELAY = 500;
const ACTIVE_CLASS = 'img-filters__button--active';

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const imgFilter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = imgFilter.querySelector('#filter-default');
const randomBtn = imgFilter.querySelector('#filter-random');
const discussedBtn = imgFilter.querySelector('#filter-discussed');

let activeBtn = defaultBtn;

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => data.slice().sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_FILTER),
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const changeClasses = (button) => {
  activeBtn.classList.remove(ACTIVE_CLASS);
  button.classList.add(ACTIVE_CLASS);
  activeBtn = button;
};

const clearContainer = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const reRender = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  clearContainer();
  renderThumbnails(filteredData);
};

const debounceRender = debounce(reRender, RERENDER_DELAY);

const initFilter = (data) => {
  imgFilter.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    const target = evt.target;
    if (!target.classList.contains('img-filters__button') || target === activeBtn) {
      return;
    }
    changeClasses(target);

    if (target === defaultBtn) {
      debounceRender(FilterEnum.DEFAULT, data);
    }
    if (target === randomBtn) {
      debounceRender(FilterEnum.RANDOM, data);
    }
    if (target === discussedBtn) {
      debounceRender(FilterEnum.DISCUSSED, data);
    }
  });
};

export {initFilter};
