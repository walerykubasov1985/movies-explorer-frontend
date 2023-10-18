import "./Login.css"
import "../Form/Form.css"
import AccessForm from "../AccessForm/AccessForm"
import { useFormValidation } from '../../utils/FormValidation';

function Login({ handleLogin, errMessage, setErrorMessage }) {
  const { values, errors, isValid, handleChange } = useFormValidation();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(
      values.password,
      values.email)
  };

  return (
    <AccessForm
      linkTo="/signup"
      title="Рады видеть!"
      buttonName="Войти"
      link="Регистрация"
      textLink="Ещё не зарегистрированы?"
      onSubmit={handleLoginSubmit}
      errMessage={errMessage}
      isValid={isValid}
    >
      <label className="form__label">E-mail
        <input
          className="form__input form__input_login"
          required
          id="email"
          name="email"
          type="email"
          pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
          placeholder="введите почту"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="form__error-message" >{errors.email}</span>
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
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="form__error-message" >{errors.password}</span>
      </label>
    </AccessForm>
  )
}
export default Login
