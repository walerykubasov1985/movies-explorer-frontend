import Header from "../Header/Header"
import React from "react";
import "./Profile.css"
import { Link } from "react-router-dom";

function Profile() {
  const [inputActiv, setInputActiv] = React.useState(false)

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className='profile__label'>Имя
              <input
                type='text'
                className='profile__input'
                name='name'
                minLength='2'
                maxLength='30'
                required
                id='name'
                disabled={inputActiv}
                placeholder="ваше имя"
              />
            </label>

            <label className='profile__label'>E-&nbsp;mail
              <input
                type='email'
                className='profile__input'
                name='email'
                required
                id='email'
                disabled={inputActiv}
                placeholder="ваша почта"
              />
            </label>
          </form>
          <span className={inputActiv ? "profile__error profile__error_activ" : "profile__error_disabled"}>При обновлении профиля произошла ошибка.</span>
          {
            !inputActiv ?
              <nav className="profile__btns">
                <button className="profile__btn profile__btn_redact" type="button"> Редактировать</button>
                <Link to={"/"} className="profile__btn profile__btn_close">Выйти из аккаунта</Link>
              </nav>
              :
              <button className={!inputActiv ? "profile__btn-save" : "profile__btn-save profile__btn-save_non-activ"} type="submit">Сохранить</button>
          }


        </section>
      </main>
    </>

  )
}

export default Profile