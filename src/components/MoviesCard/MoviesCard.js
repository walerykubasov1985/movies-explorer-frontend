import { BASE_URL } from "../../utils/constant";
import "./MoviesCard.css"
import { getTransformationTime } from "../../utils/utils"

function MoviesCard({
  movie,
  isSavedMoviePage,
  onSave,
  onDelete,
  savedMovies,
}) {

  const isSaved = savedMovies.some(item => item?.movieId === movie.id);

  const handleSave = () => {
    onSave(movie);
  };

  const handleDelete = () => {
    onDelete(movie);
  };

  return (
    <article className="card-movie">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className='card-movie__trailer'>
        <img
          className="card-movie__image"
          src={isSavedMoviePage ? movie.image : BASE_URL + movie.image.url}
          alt={movie.nameRU}
        /> </a>
      <div className="card-movie__caption">
        <h2 className="card-movie__title">{movie.nameRU || movie.nameEN}</h2>
        {!isSavedMoviePage ?
          (<button
            className={`card-movie__like ${isSaved ? "card-movie__like card-movie__like_activ" : ""}`}
            disabled={isSaved ? true : false}
            type="button"
            onClick={handleSave}

          >
          </button>) :
          (<button
            className="card-movie__like card-movie__like_delete"
            type="button"
            onClick={handleDelete}>
          </button>)
        }
      </div>
      <p className="card-movie__duration">{getTransformationTime(movie.duration)}</p>

    </article>
  )
}
export default MoviesCard
