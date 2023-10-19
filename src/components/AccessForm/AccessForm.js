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
  textLink,
  onSubmit,
  errMessage,
  isValid
}) {

  return (
    <main className="content">
      <section className="access-form">

        <Logo />
        <h1 className="access-form__name"> {title}</h1>

        <form className="form" onSubmit={onSubmit}>
          {children}

          <div className="form__btn-contayner">
            <span className="form__info_err-message" >{errMessage}</span>
            <button className={isValid ? "form__button" : "form__button form__button_disabled"} type="submit" disabled={isValid?false:true}>
              {buttonName}
            </button>
          </div>
        </form>

        <div className="access-form__signin">
          <p className="access-form__text-link">{textLink} <Link to={linkTo} className="access-form__link"> {link} </Link> </p>

        </div>
      </section>
    </main>

  )
}
export default AccessForm