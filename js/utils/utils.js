const REMOVE_MESSAGE_TIMEOUT = 4000;
const DEBOUNCE_COUNT = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_COUNT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showErrorMessage, debounce };
