import Header from "../Header/Header"
import { useContext, useState, useEffect } from "react";
import "./Profile.css"
import CurrentUserContext from "../../context/CurrentUserContext";
import { useValidation } from "../../utils/FormValidation";

function Profile({
  isBlockInput,
  signOut,
  handleUpdateProfile,
  errMessage,
  textMessage
}) {
  const { isValid, values, errors, handleChange, setValues, resetForm } = useValidation();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    handleUpdateProfile({ name, email });
  }
  const [isInputActive, setIsInputActive] = useState(false);

  function handleInputState() {
    setIsInputActive(true)
  }

  const buttonIsValid =
    isValid &&
    (values.name !== currentUser.name || values.email !== currentUser.email);

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className='profile__label'>Имя
              <input
                type='text'
                className='profile__input'
                name='name'
                minLength='2'
                maxLength='30'
                required
                id='name'
                placeholder=""
                value={values.name ? values.name : ''}
                onChange={handleChange}
                disabled={!isInputActive || isBlockInput ? true : false}
              />
              <span className="form__error-message" >{errors.name || ''}</span>
            </label>

            <label className='profile__label'>E-&nbsp;mail
              <input
                type='email'
                className='profile__input'
                name='email'
                required
                id='email'
                placeholder=""
                value={values.email ? values.email : ''}
                pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                onChange={handleChange}
                disabled={!isInputActive || isBlockInput ? true : false}
                readOnly={isBlockInput && true}
              />
              <span className="form__error-message " >{errors.email || ''}</span>
            </label>


            <span className="profile__error">{errMessage}</span>
            <span className="profile__error profile__save">{textMessage}</span>
            {
              isInputActive ? (
                <button
                  className={buttonIsValid ? 'profile__btn-save' : 'profile__btnprofile__btn-save_non-activ'}
                  type="submit"
                  disabled={!buttonIsValid || isBlockInput ? true : false}
                >
                  Сохранить
                </button>
              ) : (
                <nav className="profile__btns">
                  <button
                    className="profile__btn profile__btn_redact"
                    type="button"
                    onClick={handleInputState}
                  >
                    Редактировать
                  </button>
                  <button
                    className="profile__btn profile__btn_close"
                    type="button"
                    onClick={signOut}
                  >
                    Выйти из аккаунта
                  </button>
                </nav>)}
        </form>

      </section >
    </main >
    </>
  )
}

export default Profile
