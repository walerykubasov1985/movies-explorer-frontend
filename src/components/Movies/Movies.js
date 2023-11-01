import { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header"
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import Preloader from "../Preloder/Preloader"
import moviesApi from "../../utils/MoviesApi"
import mainApi from "../../utils/MainApi"

function Movies({
  isLiked,
  setliked,
  setSaveMovies,
  saveMovies,
  handleLikeMovie
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [short, setShort] = useState(false);

  const refreshMovies = (movies) => {
    setMovies(movies);
    localStorage.setItem('allMovies', JSON.stringify(movies));
  };

  const refreshFindMovies = (movies) => {
    setFilteredMovies(movies);
    localStorage.setItem('findMovies', JSON.stringify(movies));
  };

  const refreshSearchQuery = (query) => {
    setQuery(query);
    localStorage.setItem('query', query);
  };

  const refreshShortMovie = (short) => {
    setShort(short);
    localStorage.setItem('short', JSON.stringify(short));
  };

  const refreshMoviesSave = (saveMovies) => {
    setSaveMovies(saveMovies);
    localStorage.setItem('allMoviesSave', JSON.stringify(saveMovies));
  };


  useEffect(() => {
    refreshMovies(JSON.parse(localStorage.getItem('allMovies') || '[]'));
    refreshFindMovies(JSON.parse(localStorage.getItem('findMovies') || '[]'));
    refreshSearchQuery(localStorage.getItem('query') || '');
    refreshShortMovie(JSON.parse(localStorage.getItem('short') || 'false'));

    mainApi
      .getInitialCards()
      .then(movies => {
        refreshMoviesSave(movies);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }, []);

  const findMoviesByName = (movies, key = '') => {
    const wordByLowerCase = key.toLowerCase();
    const filterMovie = movies.filter(
      (movie) =>
        (key ? movie.nameRU.toLowerCase().includes(wordByLowerCase) : true)
    );

    return filterMovie.sort((a, b) => {
      if (a.nameRU < b.nameRU) return -1;
      if (a.nameRU > b.nameRU) return 1;
      return 0;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    moviesApi
      .getMovies()
      .then(movies => {
        const filteredMovies = findMoviesByName(movies, query)
        setMovies(filteredMovies);
        localStorage.setItem('allMovies', JSON.stringify(filteredMovies));
        setFilteredMovies(filteredMovies);
        localStorage.setItem('findMovies', JSON.stringify(filteredMovies));
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          query={query}
          onSubmit={handleSubmit}
          refreshSearchQuery={refreshSearchQuery}
          short={short}
          refreshShortMovie={refreshShortMovie} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies.filter(movie => !short || movie.duration <= 40)}
            short={short}
            saveMovies={saveMovies}
            handleLikeMovie={handleLikeMovie}
            setSaveMovies={setSaveMovies}
            isSavedMovies={false}
            setFilteredMovies={setFilteredMovies}
            isLiked={isLiked}
            setliked={setliked}
          />
        )}

      </main>
      <Footer />
    </>
  )
}
export default Movies