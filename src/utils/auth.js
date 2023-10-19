// export const BASE_URL = 'api.movies-explorer-wawa.nomoreparties.co';
const BASE_URL_MAIN = 'https://api.movies-explorer-wawa.nomoreparties.co';

function chekResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, password, email) => {
  return fetch(`${BASE_URL_MAIN}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, password, email })
  }).then((res) => chekResult(res))
}

export const authorization = (password, email) => {
  return fetch(`${BASE_URL_MAIN}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then((res) => chekResult(res))
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    }
  }).then((res) => chekResult(res))
}
