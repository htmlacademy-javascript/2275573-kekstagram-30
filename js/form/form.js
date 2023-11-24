import { isEscapeKey } from '../utils/utils.js';
import { resetScale } from '../effects/scale.js';
import { resetEffects, updateSlider } from '../effects/effects.js';
import { sendPictures } from '../gallery/api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';


const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const textHashtags = uploadOverlay.querySelector('.text__hashtags');
const textDescription = uploadOverlay.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const submitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать'
};

const descriptionDefault = {
  MAX_LENGTH: 140,
  COMMENT_ERR: 'Длина комментария больше 140 символов',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = submitButtonCaption.SUBMITTING;
  } else {
    submitButton.textContent = submitButtonCaption.IDLE;
  }
};


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeModal = () => {
  uploadForm .reset();
  resetScale();
  resetEffects();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>document.activeElement === textHashtags || document.activeElement === textDescription;
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists) {
    evt.preventDefault();
    closeModal();
  }
}
const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = uploadInput.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openModal();
};

const onCancelButtonClick = () => {
  closeModal();
};


pristine.addValidator(textHashtags, hasValidCount, errorText.INVALID_COUNT,3,true);
pristine.addValidator(textHashtags, hasUniqueTags, errorText.NOT_UNIQUE,2,true);
pristine.addValidator(textHashtags, hasValidTags, errorText.INVALID_PATTERN,1,true);
pristine.addValidator(textDescription, (value) => value.length <= descriptionDefault.MAX_LENGTH,
  descriptionDefault.COMMENT_ERR
);


const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    toggleSubmitButton(false);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};


uploadInput.addEventListener('change', onFileInputChange);
uploadCancel.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);
updateSlider();

export { onDocumentKeydown };
