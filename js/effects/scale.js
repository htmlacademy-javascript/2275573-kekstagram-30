const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT_DIVIDER = 100;

const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  image.style.transform = `scale(${value / PERCENT_DIVIDER})`;
  scaleInput.value = `${value}%`;
};

const onSmallerBtnClick = () => {
  scaleImage(Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE));
};

const onBiggerBtnClick = () => {
  scaleImage(Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE));
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerBtn.addEventListener('click', onSmallerBtnClick);
biggerBtn.addEventListener('click', onBiggerBtnClick);

export {resetScale};
