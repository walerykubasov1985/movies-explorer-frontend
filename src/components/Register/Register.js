import { useEffect } from "react";
import AccessForm from "../AccessForm/AccessForm";
import { useFormValidation } from '../../utils/FormValidation';



function Register({ onRegister, errMessage, setErrorMessage }) {

  const {values, errors, isValid, handleChange, resetForm} = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.name, values.password, values.email)   
  };

  useEffect(() => {
    resetForm();
    setErrorMessage({ errMessage: '' });
  }, []);

  return (
    <AccessForm
      linkTo="/signin"
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      link="Войти"
      textLink="Уже зарегистрированы?"
      onSubmit={handleSubmit}
      errMessage={errMessage}
      isValid = {isValid}
    >
      <label className="form__label">Имя
        <input
          className={`form__input ${errors.name && 'form__input_error'}`}
          required
          id="name"
          name="name"
          type="text"
          placeholder="введите имя"
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="form__error-message" >{errors.name}</span>
      </label>

      <label className="form__label">E-mail
        <input
          className={`form__input ${errors.email && 'form__input_error'}`}
          required
          id="email"
          name="email"
          type="text"
          placeholder="ваша почта"
          pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
          onChange={handleChange}
          value={values.email || ''}
        />
        <span className="form__error-message" >{errors.email || ''}</span>
      </label>


      <label className="form__label">Пароль
        <input
          className={`form__input ${errors.password && 'form__input_error'}`}
          required
          id="password"
          name="password"
          type="password"
          placeholder="введите пароль"
          minLength='4'
          maxLength='15'
          onChange={handleChange}
          value={values.password || ''}
        />
        <span className="form__error-message" >{errors.password || ''}</span>
      </label>

    </AccessForm>

  )
}

export default Register