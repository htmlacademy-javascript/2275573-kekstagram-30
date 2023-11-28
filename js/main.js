import { renderGallery } from './gallery/thumbnails.js';
import { getPictures } from './api/api.js';
import './form/form.js';
import { showErrorMessage } from './utils/utils.js';
import { initFilter } from './gallery/filter.js';

const bootstrap = async () => {
  try {
    const pictures = await getPictures();
    renderGallery(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();

