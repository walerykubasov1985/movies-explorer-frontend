import { useState, useEffect } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import "./SavedMovies.css"
import  filterMovies  from "../../utils/utils"
import Preloader from "../Preloder/Preloader"


function SavedMovies({
  savedMovies,
  onDelete,
  isLoading,
  }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const handleSearch = (query) => {
    setCurrentQuery(query);
    const result = filterMovies(savedMovies, query, isShortMovies);
   console.log(result)
    setFilteredMovies(result);
  };

  const handleCheckboxChange = (checked) => {
    setIsShortMovies(checked);
    const result = filterMovies(savedMovies, currentQuery, checked);
    setFilteredMovies(result);
  };

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies])

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSearch={handleSearch}
          isChecked={isShortMovies}
          setChecked={handleCheckboxChange}
        />
        {isLoading ?
          <Preloader />
          :
          <MoviesCardList
            movies={filteredMovies}
            onDelete={onDelete}
            isSavedMoviePage={true}
            savedMovies={savedMovies}
          />
        }
      </main>
      <Footer />
    </>
  )
}
export default SavedMovies