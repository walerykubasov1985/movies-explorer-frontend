class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    }).then(res => this._getResponseData(res))
  }

  editUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
      })
    })
      .then(res => this._getResponseData(res))
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  }

  createNewMovie(data) {
    const baseMovieUrl = 'https://api.nomoreparties.co';
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        { nameRU: data.nameRU,
          nameEN: data.nameEN,
          country: data.country,
          duration: data.duration,
          director: data.director,
          year: data.year,
          description: data.description,
          image:  `${baseMovieUrl}${data.image.url}`,
          trailerLink: data.trailerLink,
          thumbnail: `${baseMovieUrl}${data.image.formats.thumbnail.url}`,
          movieId: data.id,
        }),
    }).then(res => this._getResponseData(res))
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then(res => this._getResponseData(res))
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.movies-explorer-wawa.nomoreparties.co',
  headers: {},
})

export default mainApi
