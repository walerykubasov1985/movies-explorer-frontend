class MoviesCardApi {
  constructor(setting) {
    this._address = setting.address;
    this._headers = setting.headers;
  }
  //Проверка ответа сервера
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получение карточек-фильмов с сервера
  getInitialCards() {
    return fetch(this._address, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}
const moviesApi = new MoviesCardApi({
  address: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {},
});
export default moviesApi;