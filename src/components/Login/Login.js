import "./Login.css"
import "../Form/Form.css"
import AccessForm from "../AccessForm/AccessForm"
import { useValidation } from "../../utils/FormValidation";
import { useState, useEffect } from 'react';

function Login({
  isBlockInput,
  onLogin,
  errMessage
}) {
  const { values,  errors, isValid, handleChange, resetForm } = useValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit (e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password
    })
  };
  return (
    <AccessForm
      linkTo="/signup"
      title="Рады видеть!"
      buttonName="Войти"
      link="Регистрация"
      textLink="Ещё не зарегистрированы?"
      onSubmit={handleSubmit}
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
          onChange={ handleChange}
          disabled={isBlockInput && true}
        />
        <span className="form__error-message" >{errors.email || ""}</span>
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
          onChange={ handleChange}
          disabled={isBlockInput && true}
        />
        <span className="form__error-message" >{errors.password || ""}</span>
      </label>
    </AccessForm>
  )
}
export default Login
