const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
const image = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

let baseEffects = DEFAULT_EFFECT;

const isDefault = () => baseEffects === DEFAULT_EFFECT;

const updateSlider = () => {
  slider.classList.remove('hidden');
  if (isDefault()) {
    sliderContainer.style.display = 'none';
  } else {
    sliderContainer.style.display = 'block';
  }

  slider.noUiSlider.updateOptions({
    range: {
      min: baseEffects.min,
      max: baseEffects.max,
    },
    step: baseEffects.step,
    start: baseEffects.max,
  });

  if (isDefault()) {
    slider.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  baseEffects = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = slider.noUiSlider.get();
  image.style.filter = `${baseEffects.style}(${sliderValue}${baseEffects.unit})`;
  image.classList.add(`effects__preview--${baseEffects.name}`);
  effectLevel.value = parseFloat(sliderValue).toString();
};

const resetEffects = () => {
  baseEffects = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

form.addEventListener('change', onFormChange);
slider.noUiSlider.on('update', onSliderUpdate);


export { resetEffects, updateSlider };
