import { isEscapeKey } from '../utils/utils.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  const exists = document.querySelector('.success') || document.querySelector('.error');
  exists.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseButtonClick = () => closeMessage();

const openMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }

  closeMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const openSuccessMessage = () => {
  openMessage(successMessage, '.success__button');
};

const openErrorMessage = () => {
  openMessage(errorMessage, '.error__button');
};


export { openSuccessMessage, openErrorMessage };

