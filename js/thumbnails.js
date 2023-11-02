const elementTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const createImage = ({comments, description, likes, url, }) => {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__img').alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;

  return element;
};

const createImages = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const element = createImage(picture);
    fragment.append(element);
  });

  container.append(fragment);
};

export {createImages};

