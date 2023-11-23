import {isEscapeKey} from './util.js';


const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const bodyElement = document.querySelector('body');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = uploadOverlay.querySelector('.text__hashtags');
const textDescription = uploadOverlay.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeModal = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  textHashtags.removeEventListener('keydown', onFormFieldKeydown);
  textDescription.removeEventListener('keydown', onFormFieldKeydown);
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
  uploadCancel.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
  textHashtags.addEventListener('keydown', onFormFieldKeydown);
  textDescription.addEventListener('keydown', onFormFieldKeydown);
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


function onFormFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeModal();
  }
}

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
// 11й
};

pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,1,true);
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,2,true);

uploadForm.addEventListener('submit', onUploadFormSubmit);
uploadInput.addEventListener('change', openModal);
