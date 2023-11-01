import Logo from "../Logo/Logo"
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"


function Header({isLoggedIn }) {
  const location = useLocation();


  return (
    <header className= {location.pathname === '/' ? "header" : "header header_none-color"} >
      <Logo />
      {!isLoggedIn ?
        <Navigation /> :
        <nav className="header__butons">
          <Link to="/signup" className="header__btn">Регистрация</Link>
          <Link to="/signin" className="header__btn header__btn_activ">Войти</Link>

        </nav>
      }
    </header >

  )
};
export default Header