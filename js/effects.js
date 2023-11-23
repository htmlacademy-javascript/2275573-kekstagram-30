const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];
const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const rangesSliderContainer = document.querySelector('.effect-level');
const rangesSlider = document.querySelector('.effect-level__slider');
const rangesSliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

const smaller = document.querySelector('.scale__control--smaller');
const bigger = document.querySelector('.scale__control--bigger');
const valueScale = document.querySelector('.scale__control--value');

const image = document.querySelector('.img-upload__preview img');

smaller.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value > 25) {
    valueScale.value = `${value - 25}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

bigger.addEventListener('click', () => {
  const value = parseInt(valueScale.value, 10);
  if (value < 100) {
    valueScale.value = `${value + 25}%`;
    image.style.cssText += `transform: scale(${parseInt(valueScale.value, 10) / 100})`;
  }
});

function showRangeSlider () {
  rangesSliderContainer.classList.remove('hidden');
}

function hideRangeSlider () {
  rangesSliderContainer.classList.add('hidden');
}
hideRangeSlider ();

function updateSlider () {
  rangesSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max
  });
}

function onEffectsListClick(evt) {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) =>effect.name === evt.target.value);
    image.className = `img-upload__preview effects__preview--${currentEffect.name}`;

    updateSlider ();

    if (currentEffect.name === 'none') {
      hideRangeSlider();
    } else {
      showRangeSlider();
    }
  }
}

function onRangeSliderUpdate () {
  const rangesSliderValue = rangesSlider.noUiSlider.get();
  rangesSliderInput.value = rangesSliderValue;
  image.style.filter = `${currentEffect.style}(${rangesSliderValue}${currentEffect.unit})`;

  if (currentEffect.name === 'none') {
    image.style.filter = DEFAULT_EFFECT.style;
  }
}

noUiSlider.create(rangesSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.min
});

effectsList.addEventListener ('click', onEffectsListClick);
rangesSlider.noUiSlider.on('update', onRangeSliderUpdate);
