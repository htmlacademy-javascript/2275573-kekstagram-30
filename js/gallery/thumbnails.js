import { renderModal } from './big-pictures.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ comments, description, likes, url, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  return thumbnail;
};


const renderThumbnails = (pictures, picturesContainer) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);

    renderModal(pictureData);

  });
  renderThumbnails(pictures, container);
};

export { renderGallery };
