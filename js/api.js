const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Ошибка загрузки файла',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getPictures = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendPictures = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getPictures, sendPictures };
