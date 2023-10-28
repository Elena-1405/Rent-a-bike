import axios from 'axios';

const BASE_URL = 'https://sf-final-project-be.herokuapp.com';

export const sendRequest = (path, method, payload, callback, token) => {
  const options = {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      'Content-type': 'application/json',
    },
    data: payload,
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  axios(options).then(callback);
  // TODO: (опционально) добавить обработку ошибок
};
// Лишняя скобка
