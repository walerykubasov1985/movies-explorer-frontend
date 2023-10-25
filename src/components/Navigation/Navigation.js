import React, { useState } from 'react';
import "./Navigation.css"
import { NavLink } from "react-router-dom"

function Navigation() {
  const [isClicked, setIsClicked] = useState(false);

   function handleMenuOpen() {
    setIsClicked(true)
  };

  function handleMenuClose() {
    setIsClicked(false)
  };

  return (
    <section className="navigation">
      <nav className={!isClicked ? "navigation__menu" : "navigation_menu_open"}>
        <button className={`navigation__btn ${!isClicked ? "navigation__btn-burger" : "navigation__btn-close"}`} onClick={isClicked ? handleMenuClose : handleMenuOpen} type='button'></button>

        <ul className={`navigation__container ${isClicked ? "navigation__menu_open" : ""}`}>
          <li className="navigation__link navigation__link_first">
            <NavLink to="/" className="navigation__link-text" onClick={handleMenuClose}>
              Главная</NavLink>
          </li>
          <li className="navigation__link">
            <NavLink to="/movies" className="navigation__link-text" onClick={handleMenuClose}>
              Фильмы</NavLink>
          </li>
          <li className="navigation__link">
            <NavLink to="/saved-movies" className="navigation__link-text" onClick={handleMenuClose}>
              Сохраненные фильмы</NavLink>
          </li>
          <li className='navigation__link navigation__link_last'>
            <NavLink to="/profile" className="navigation__link-text navigation__link-text_profil" onClick={handleMenuClose}>
              Аккаунт</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  )
}
export default Navigation