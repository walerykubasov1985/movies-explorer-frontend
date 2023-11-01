import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import {
  SCREEN_1280,
  SCREEN_990,
  SCREEN_768,
  QUANTITY_SCREEN_1280,
  QUANTITY_SCREEN_990,
  QUANTITY_SCREEN_768,
  QUANTITY_SCREEN_320,
  CARDS_STEP_1280,
  CARDS_STEP_990,
  CARDS_STEP_320,
} from "../../utils/constant"

function MoviesCardList({ props }) {
  const { isLiked,
    setliked,
    setFilteredMoviesSave,
    movies,
    setSaveMovies,
    saveMovies,
    handleLikeMovie } = props
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [hiddenMovies, setHiddenMovies] = useState([])

  const [cards, setCards] = useState(QUANTITY_SCREEN_1280);
  const [moreCards, setMoreCards] = useState(CARDS_STEP_1280);

  useEffect(() => {
    changingSize()
    window.addEventListener("resize", changingSize)
    return () => {
      window.removeEventListener("resize", changingSize)
    }
  }, []);

  function changingSize() {
    const size = window.innerWidth;
    if (size >  SCREEN_1280){
      setCards(QUANTITY_SCREEN_1280)
      setMoreCards(CARDS_STEP_1280)
    } else if (size > SCREEN_990) {
      setCards(QUANTITY_SCREEN_990)
      setMoreCards(CARDS_STEP_990)
    } else if (size > SCREEN_768) {
      setCards(QUANTITY_SCREEN_768)
      setMoreCards(CARDS_STEP_320)
    } else {
      setCards(QUANTITY_SCREEN_320)
      setMoreCards(CARDS_STEP_320)
    }
  }

  useEffect(() => {
    setVisibleMovies(movies.slice(0, cards))
    setHiddenMovies(movies.slice(cards))
  }, [movies, cards]);

  function handleMoreBtnClick() {
    const moviesArray = [
      ...visibleMovies,
      ...hiddenMovies.slice(0, moreCards)
    ];
    setVisibleMovies(moviesArray)
    setHiddenMovies(hiddenMovies.slice(moreCards))

  }
  return (
    <section className="cards-movies">
      {visibleMovies.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <ul className="cards-movies__container">
          {visibleMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id ?? movie.movieId}
              saveMovies={saveMovies}
              handleLikeMovie={handleLikeMovie}
              setSaveMovies={setSaveMovies}
              setFilteredMoviesSave={setFilteredMoviesSave}
              isSavedMovies={props.isSavedMovies}
              isLiked={isLiked}
              setliked={setliked}
            />
          ))}
        </ul>
      )}{
        visibleMovies.length > 0 && hiddenMovies.length > 0 && (
          <button
            className="cards-movies__more"
            type="button"
            onClick={handleMoreBtnClick}
          >Ещё</button>)
      }
    </section>
  )
}
export default MoviesCardList;
