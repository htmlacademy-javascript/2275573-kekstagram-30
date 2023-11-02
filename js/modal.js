import {isEscapeKey} from './util.js';


const bigPicture = document.querySelector('.big-picture');
const FullSizeImg = document.querySelector('.big-picture__img img');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const likesCount = bigPicture.querySelector('.likes-count');
const postCaption = bigPicture.querySelector('.social__caption');

const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const hideElements = () => {
  commentsLoader.remove();
  commentCount.remove();
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function onButtonCloseClick (evt) {
  evt.preventDefault();
  closeModal();
}

const fillComment = (item) => {
  const comment = commentItem.cloneNode(true);
  const socialPicture = comment.querySelector('.social__picture');
  socialPicture.src = item.avatar;
  socialPicture.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  return comment;
};

const fillCommentsList = (data) => {
  data.forEach((item) => commentsList.append(fillComment(item)));
};

const fillBigPicture = (data) => {
  FullSizeImg.src = data.url;
  FullSizeImg.alt = data.description;
  likesCount.textContent = data.likes;
  postCaption.textContent = data.description;
  fillCommentsList(data.comments);
};

const renderModal = (data) => {
  commentsList.innerHTML = '';
  hideElements();
  openModal();
  fillBigPicture(data);
};


export {renderModal};
