import React from "react"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header"
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import Preloder from "../Preloder/Preloader"

function Movies({ isLoader }) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloder /> : <MoviesCardList />}


      </main>
      <Footer />
    </>
  )
}
export default Movies