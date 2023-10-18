import Header from "../Header/Header"
import { useContext, useEffect } from "react";
import "./Profile.css"
import CurrentUserContext from "../../context/CurrentUserContext";
import { useFormValidation } from '../../utils/FormValidation';


function Profile({ onUpdateProfile, errMessage, setErrorMessage, textMessage, setSaveMessage, exitProfil, setIsBlockInput, isBlockInput }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues} = useFormValidation();

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    });

  }, [setValues, currentUser]);

  function handleRedactClick() {
    setIsBlockInput(true);
    setSaveMessage(false);
    setErrorMessage(false);
  };

  const buttonBlock = isValid && (values.name !== currentUser.name || values.email !== currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(
      values.name,
      values.email
    )
    setIsBlockInput(false);
  }

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${values.name}!`}</h1>
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
                value={values.name || ''}
                onChange={handleChange}
                disabled={!isBlockInput}
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
                value={values.email || ''}
                pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                onChange={handleChange}
                disabled={!isBlockInput}
              />
              <span className="form__error-message " >{errors.email || ''}</span>
            </label>


            <span className="profile__error">{errMessage}</span>
            <span className="profile__error profile__save">{textMessage}</span>
            {
              !isBlockInput ?
                <nav className="profile__btns">
                  <button className="profile__btn profile__btn_redact" type="button" onClick={handleRedactClick}> Редактировать</button>
                  <button className="profile__btn profile__btn_close" type="button" onClick={exitProfil}>Выйти из аккаунта</button>
                </nav>
                :
                <>
                  <button className={buttonBlock ? "profile__btn-save" : " profile__btn-save profile__btn-save_non-activ"} type="submit" disabled={!isBlockInput}>Сохранить</button>
                </>
            }
          </form>

        </section>
      </main>
    </>
  )
}

export default Profile
