import "./Login.css"
import "../Form/Form.css"
import AccessForm from "../AccessForm/AccessForm"
// import { Link } from "react-router-dom";

function Login() {
  return (
    <AccessForm
      linkTo = "/signup"
      title="Рады видеть!"
      buttonName="Войти"
      link="Регистрация"
      textLink="Ещё не зарегистрированы?"

    >
      <label className="form__label">E-mail
        <input
          className="form__input form__input_login"
          required
          id="email"
          name="email"
          type="email"
          placeholder="введите почту"
          minLength='2'
          maxLength='30'
        />
      </label>
      <label className="form__label">Пароль
        <input
          className="form__input form__input_login"
          required
          id="password"
          name="password"
          type="password"
          placeholder="ведите пароль"
          minLength='4'
          maxLength='15'
        />
      </label>
    </AccessForm>
  )
}
export default Login
