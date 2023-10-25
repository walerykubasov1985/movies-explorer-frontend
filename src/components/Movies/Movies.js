import { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header"
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import { filterMovies } from "../../utils/utils"
import Preloader from "../Preloder/Preloader"

function Movies({
  movies,
  isLoading,
  savedMovies,
  onSave,
  isBlockInput,
  onDelete
}) {

  const [query, setQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [isChecked, setChecked] = useState(localStorage.getItem('isShortFilmChecked') === 'true');
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [inputValue, setInputValue] = useState(localStorage.getItem('inputValue') || '');

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('isShortFilmChecked', isChecked.toString());
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    localStorage.setItem('inputValue', inputValue);
  }, [query, isChecked, filteredMovies, inputValue]);

  useEffect(() => {
    const result = filterMovies(movies, query, isChecked);
    setFilteredMovies(result);
  }, [movies, query, isChecked]);

  const handleSearchMovies = (newQuery) => {
    const lowercaseQuery = newQuery.toLowerCase();
    const searchResult = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredMovies(searchResult);
    setQuery(newQuery);
  };

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSearch={(query) => handleSearchMovies(query)}
          isChecked={isChecked}
          setChecked={setChecked}
          initialValue={inputValue}
          onInputChange={setInputValue}
        />
        {isLoading ?
          <Preloader />
          :
          <MoviesCardList
            movies={filteredMovies}
            isSavedMoviePage={false}
            onSave={onSave}
            savedMovies={savedMovies}
            isBlockInput={isBlockInput}
            onDelete={onDelete}
          />
        }
      </main>
      <Footer />
    </>
  )
}
export default Movies