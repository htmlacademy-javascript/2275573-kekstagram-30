import { renderGallery } from './thumbnails.js';
import { getPictures } from './api.js';
import './form.js';
import { showErrorMessage } from './utils.js';
import { initFilter } from './filter.js';

async function bootstrap() {
  try {
    const pictures = await getPictures();
    renderGallery(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();
