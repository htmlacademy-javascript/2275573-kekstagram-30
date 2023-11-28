const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные попробуйте ещё раз',
  [HttpMethod.POST]: 'Не удалось отправить данный формы',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getPictures = async () => request(SERVER_URL + Route.GET_DATA);

const sendPictures = async (pictureData) => request(SERVER_URL + Route.SEND_DATA, HttpMethod.POST, pictureData);

export { getPictures, sendPictures };
