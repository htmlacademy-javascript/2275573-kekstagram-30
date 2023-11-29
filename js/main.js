import { renderThumbnails } from './gallery/thumbnails.js';
import { getPictures } from './api/api.js';
import './form/form.js';
import { showErrorMessage } from './utils/utils.js';
import { initFilter } from './gallery/filter.js';

const loadAssemblage = async () => {
  try {
    const pictures = await getPictures();
    renderThumbnails(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

loadAssemblage();
