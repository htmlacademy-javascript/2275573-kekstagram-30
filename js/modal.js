import {isEscapeKey} from './util.js';


const COMMENT_COUNTER = 5;
let showComments = 0;
let comments;

const pictureModal = document.querySelector('.big-picture');
const FullSizeImg = document.querySelector('.big-picture__img img');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const likesCount = document.querySelector('.likes-count');
const postCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const setButtonState = () => {
  if (showComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsLoader.classList.remove('hidden');
};

const closeModal = () => {
  pictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  showComments = 0;
};

const openModal = () => {
  pictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};


const fillCommentsCounter = () => {
  commentCount.innerHTML = `${showComments} из <span class="comments-count">${comments.length}</span> комментариев</div>`;
};

const fillComment = (item) => {
  const comment = commentItem.cloneNode(true);
  const socialPicture = comment.querySelector('.social__picture');
  socialPicture.src = item.avatar;
  socialPicture.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  return comment;
};

const fillCommentsList = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(showComments, showComments + COMMENT_COUNTER);
  showComments = Math.min(showComments + COMMENT_COUNTER, comments.length);
  currentComments.forEach((comment) => fragment.append(fillComment(comment)));
  commentsList.append(fragment);
  setButtonState();
  fillCommentsCounter();
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

function onCommentsLoaderClick (evt) {
  evt.preventDefault();
  fillCommentsList();
}


const fillModalPicture = (data) => {
  FullSizeImg.src = data.url;
  FullSizeImg.alt = data.description;
  likesCount.textContent = data.likes;
  postCaption.textContent = data.description;
  fillCommentsList(data.comments);
};

const renderModal = (data) => {
  commentsList.innerHTML = '';
  comments = data.comments;
  openModal();
  fillModalPicture(data);
};


export {renderModal};
