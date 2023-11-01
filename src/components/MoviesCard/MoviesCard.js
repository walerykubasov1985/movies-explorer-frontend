import { BASE_URL } from "../../utils/constant";
import { useState, useEffect } from "react";
import "./MoviesCard.css"
import { getTransformationTime } from "../../utils/utils"
import moviesApi from "../../utils/MoviesApi"
import mainApi from "../../utils/MainApi"

function MoviesCard({ props }) {

  const { isLiked, movie, setSaveMovies, setFilteredMoviesSave } = props

  const [liked, setLiked] = useState(isLiked);

  function handleLikeMovie(movie) {
    if (!props.isSavedMovies && !liked) {
      mainApi
        .createNewMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: BASE_URL + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail: BASE_URL + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
        .then((res) => {
          movie._id = res._id
          const moviesSaved = JSON.parse(localStorage.getItem('allMoviesSave') || '[]');
          const newSavedMovies = [res, ...moviesSaved];
          localStorage.setItem('allMoviesSave', JSON.stringify(newSavedMovies));
          setLiked(true);

        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    } else {
      mainApi
        .deleteMovie(movie._id)
        .then((res) => {
          const moviesSaved = JSON.parse(localStorage.getItem('allMoviesSave'));
          const newSavedMovies = moviesSaved.filter((c) => c._id !== movie._id);
          localStorage.setItem('allMoviesSave', JSON.stringify(newSavedMovies));
          if (props.isSavedMovies) {
            setSaveMovies(newSavedMovies);
            setFilteredMoviesSave(newSavedMovies);
          }
          else { setLiked(false); }
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        });
    }
  }

  useEffect(() => {
    const moviesSave = JSON.parse(localStorage.getItem('allMoviesSave') || '[]');
    moviesSave.forEach((userMovie) => {
      if (userMovie.movieId === movie.id) {
        setLiked(true);
        movie._id = userMovie._id
      }
    })
  }, [setLiked])

  const handleSaveMovie = () => {
    handleLikeMovie(movie)
  }
 
  return (
    <article className="card-movie">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className='card-movie__trailer'>
        <img
          className="card-movie__image"
          src={movie.image.url ? moviesApi._baseUrl + movie.image.url : movie.image}
          alt={movie.nameRU}
        /> </a>
      <div className="card-movie__caption">
        <h2 className="card-movie__title">{movie.nameRU || movie.nameEN}</h2>
        <button className={
          (`card-movie__like ${liked ? 'card-movie__like_activ' : ''} 
            ${props.isSavedMovies ? 'card-movie__like_delete' : ''}  `)}
          onClick={handleSaveMovie}
          type='button'
        />

      </div>
      <p className="card-movie__duration">{getTransformationTime(movie.duration)}</p>

    </article>
  )
}
export default MoviesCard
