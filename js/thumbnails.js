import {createPosts} from './data.js';
import {renderModal} from './modal.js';

const picturesContainer = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');
const data = createPosts();
const fragment = document.createDocumentFragment();


const createThumbnail = (photo) => {
  const pictureClone = picture.cloneNode(true);
  const img = pictureClone.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;
  pictureClone.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureClone.querySelector('.picture__likes').textContent = photo.likes;
  pictureClone.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderModal(photo);
  });
  fragment.append(pictureClone);
};

const createImages = () => {
  data.forEach((item) => createThumbnail(item));
  picturesContainer.append(fragment);
};


export {createImages};
