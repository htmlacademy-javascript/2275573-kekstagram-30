import { isEscapeKey } from '../utils/utils.js';
import { resetScale } from '../effects/scale.js';
import { resetEffects, updateSlider } from '../effects/effects.js';
import { sendPictures } from '../api/api.js';
import { openSuccessMessage, openErrorMessage } from './messages.js';


const FILE_TYPES = ['.jpg', '.jpeg', '.png'];
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать'
};

const DescriptionDefault = {
  MAX_LENGTH: 140,
  COMMENT_ERR: 'Длина комментария больше 140 символов',
};

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const textHashtags = uploadOverlay.querySelector('.text__hashtags');
const textDescription = uploadOverlay.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const toggleSubmitBtn = (isDisabled) => {
  submitButton.disabled = isDisabled;
  const displayState = isDisabled ? SubmitButtonCaption.SUBMITTING : SubmitButtonCaption.IDLE;
  submitButton.textContent = displayState;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const fileInputReset = () => {
  photoPreview.src = DEFAULT_IMAGE;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url('${DEFAULT_IMAGE}')`;
  });
};

const closeModal = () => {
  if(document.querySelector('success')){
    document.body.classList.remove('modal-open');
  }
  fileInputReset ();
  uploadForm .reset();
  resetScale();
  resetEffects();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>document.activeElement === textHashtags || document.activeElement === textDescription;
const normalizeTags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag);
const hasValidTags = (value) => normalizeTags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  const isErrorMessageExists = document.querySelector('.error');
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists) {
    evt.preventDefault();
    closeModal();
  }
}
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const uploadInputChange = () => {
  const file = uploadInput.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openModal();
};

const uploadCancelClick = () => {
  closeModal();
};

pristine.addValidator(textHashtags, hasValidCount, ErrorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtags, hasUniqueTags, ErrorText.NOT_UNIQUE,2,true);
pristine.addValidator(textHashtags, hasValidTags, ErrorText.INVALID_PATTERN,1,true);
pristine.addValidator(textDescription, (value) => value.length <= DescriptionDefault.MAX_LENGTH,
  DescriptionDefault.COMMENT_ERR
);

const sendForm = async (form) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitBtn(true);
    await sendPictures(new FormData(form));
    toggleSubmitBtn(false);
    openSuccessMessage();
    closeModal();
  } catch {
    openErrorMessage();
    toggleSubmitBtn(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

uploadInput.addEventListener('change', uploadInputChange);
uploadCancel.addEventListener('click', uploadCancelClick);
uploadForm.addEventListener('submit', onFormSubmit);
updateSlider();
