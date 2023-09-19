import "./AccessForm.css"
import Logo from "../Logo/Logo"
import "../Form/Form.css"
import { Link } from "react-router-dom"


function AccessForm({
  linkTo,
  title,
  children,
  buttonName,
  link,
  textLink
}) {
  return (
    <main className="content">
      <section className="access-form">

        <Logo />
        <h1 className="access-form__name"> {title}</h1>

        <form className="form">
          {children}


        </form>
        <button type="submit" className="form__button">
          {buttonName}
        </button>
        <div className="access-form__signin">
          <p className="access-form__text-link">{textLink} <Link to={linkTo} className="access-form__link"> {link} </Link> </p>

        </div>
      </section>
    </main>

  )
}
export default AccessForm