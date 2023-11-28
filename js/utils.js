const isEscapeKey = (evt) => evt.key === 'Escape';
const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

function showErrorMessage(){
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(()=>{
    errorElement.remove();
  },REMOVE_MESSAGE_TIMEOUT);
}

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showErrorMessage, debounce };
