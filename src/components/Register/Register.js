import "./Register.css"

import AccessForm from "../AccessForm/AccessForm"

function Register() {
  return (
    <AccessForm
      linkTo="/signin"
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      link="Войти"
      textLink="Уже зарегистрированы?"
    >
      <label className="form__label">Имя
        <input
          className="form__input form__input_register"
          required
          id="Имя"
          name="Имя"
          type="Имя"
          placeholder="введите имя"
          minLength='2'
          maxLength='30'
        />
      </label>
      <label className="form__label">E-mail
        <input
          className="form__input form__input_register"
          required
          id="email"
          name="email"
          type="email"
          placeholder="ваша почта"
          minLength='2'
          maxLength='30'
        />
      </label>
      <label className="form__label">Пароль
        <input
          className="form__input form__input_err"
          required
          id="password"
          name="password"
          type="password"
          placeholder="введите пароль"
          minLength='4'
          maxLength='15'
        />
        <span className="form__input-error name-error"></span>
      </label>

    </AccessForm>

  )
}

export default Register