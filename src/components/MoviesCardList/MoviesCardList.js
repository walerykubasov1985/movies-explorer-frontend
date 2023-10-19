import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { useState, useEffect } from "react"

function MoviesCardList({
  movies,
  isSavedMoviePage,
  onSave,
  savedMovies,
  onDelete,
}) {

  const [quantiteMoviesNum, setQuantiteMoviesNum] = useState(0);
  const [stepMovies, setStepMovies] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setTimeout(() => setWindowWidth(window.innerWidth), 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    if (windowWidth >= 1280) {
      setQuantiteMoviesNum(16);
      setStepMovies(4);
    } else if (windowWidth >= 990) {
      setQuantiteMoviesNum(12);
      setStepMovies(3);
    } else if (windowWidth >= 768) {
      setQuantiteMoviesNum(8);
      setStepMovies(2);
    } else if (windowWidth >= 320) {
      setQuantiteMoviesNum(5);
      setStepMovies(2);
    }
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowWidth]);

  const handleMoreBtnClick = () => {
    setQuantiteMoviesNum(quantiteMoviesNum + stepMovies);
  }
  console.log()

  return (
    <section className="cards-movies">
      {movies.length === 0 ? <p className="cards-movies__text">Ничего не найдено</p> : ""}

      <ul className="cards-movies__container">
        {movies.reduce((moviesRender, movie) => {
          moviesRender.length < quantiteMoviesNum &&
            moviesRender.push(
              <li key={movie.id || movie.movieId}>
                <MoviesCard
                  movie={movie}
                  isSavedMoviePage={isSavedMoviePage}
                  onSave={onSave}
                  savedMovies={savedMovies}
                  onDelete={onDelete}
                />
              </li>
            )
          return moviesRender;
        }, [])}
      </ul>

      {
        movies.length > quantiteMoviesNum &&
        <button
          className="cards-movies__more"
          type="button"
          onClick={handleMoreBtnClick}
        >Ещё</button>
      }

    </section >

  )
}

export default MoviesCardList
