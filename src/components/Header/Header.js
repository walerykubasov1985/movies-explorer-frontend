import Logo from "../Logo/Logo"
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import "./Header.css"


function Header({ loggedIn }) {



  return (
    <header className= {!loggedIn ? "header header_none-color" : "header"} >
      <Logo />

      {!loggedIn ?
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