import { onDocumentKeydown } from './form.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

function closeMessage() {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('.click', onBodyClick);
}

function onCloseButtonClick() {
  closeMessage();
}


function onBodyClick(evt){
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))){
    return;
  }
  closeMessage();
}

function showMessage(element, buttonClass) {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
}

function openSuccessMessage() {
  showMessage(successMessageElement, '.success__button');
}

function openErrorMessage() {
  showMessage(errorMessageElement, '.error__button');
}
export { openSuccessMessage, openErrorMessage };
