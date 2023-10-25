import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { useState, useEffect } from "react"
import {
  SCREEN_1280,
  SCREEN_990,
  SCREEN_768,
  SCREEN_320,
  QUANTITY_SCREEN_1280,
  QUANTITY_SCREEN_990,
  QUANTITY_SCREEN_768,
  QUANTITY_SCREEN_320,
  CARDS_STEP_1280,
  CARDS_STEP_990,
  CARDS_STEP_320
} from "../../utils/constant"

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
    if (windowWidth >= SCREEN_1280) {
      setQuantiteMoviesNum(QUANTITY_SCREEN_1280);
      setStepMovies(CARDS_STEP_1280);
    } else if (windowWidth >= SCREEN_990) {
      setQuantiteMoviesNum( QUANTITY_SCREEN_990);
      setStepMovies(CARDS_STEP_990);
    } else if (windowWidth >= SCREEN_768) {
      setQuantiteMoviesNum(QUANTITY_SCREEN_768);
      setStepMovies(CARDS_STEP_320);
    } else if (windowWidth >= SCREEN_320) {
      setQuantiteMoviesNum(QUANTITY_SCREEN_320);
      setStepMovies(CARDS_STEP_320);
    }
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowWidth, movies]);

  const handleMoreBtnClick = () => {
    setQuantiteMoviesNum(quantiteMoviesNum + stepMovies);
  }
  // console.log(movies)
  return (
    <section className="cards-movies">
      {movies.length === 0 ? <p className="cards-movies__text">Ничего не найдено</p> : ""}

      <ul className="cards-movies__container">
        {movies.reduce((moviesRender, movie) => {

          moviesRender.length < quantiteMoviesNum &&
            moviesRender.push(
              <li key={movie.id ?? movie.movieId}>
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
        !isSavedMoviePage && movies.length > quantiteMoviesNum &&
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
