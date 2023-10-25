const POSTS_COUNT = 25;
const LIKES_COUNT = {min: 15, max: 200,};
const MESSAGES_COUNT = {min: 0, max: 30,};
const AVATARS = {min: 1, max: 6,};
const NAME = [
  'Артем',
  'Димон',
  'Шурик',
  'Ната',
  'Ника',
  'Полька',
  'Ярик',
  'Сан Саныч',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Просто классное фото',
  'Ланч на берегу море #food #summer',
  'Вот это тачка! #wow #car #carwow #drive',
];

let postId = 1;
let commentId = 1;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const message = Array.from({length:getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));

  return Array.from(new Set(message)).join(' ');
};

const addComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(AVATARS.min, AVATARS.max)}.svg`,
  message: createMessage (),
  name: getRandomArrayElement(NAME),
});

const addPost = () => ({
  id: postId,
  url: `photos/ ${postId++}.jpg`,
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
  comments: Array.from({length: getRandomInteger(MESSAGES_COUNT.min, MESSAGES_COUNT.max)}, addComment),
  description: getRandomArrayElement(DESCRIPTIONS),
});

const createPosts = () => Array.from({length:POSTS_COUNT}, addPost);


createPosts ();

// console.log(createPosts());
