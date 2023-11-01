import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import CurrentUserContext from "../../context/CurrentUserContext";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from "../../utils/MainApi"
import * as auth from "../../utils/auth";

function App() {
  const [errorMessage, isErrorMessage] = useState({
    errMessage: '',
  });
  const [saveMessage, isSaveMessage] = useState({
    textMessage: '',
  })

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isBlockInput, setIsBlockInput] = useState(false);
  const [isLiked, setliked] = useState(false);
  const navigate = useNavigate();

  const checkToken = useCallback(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');

      auth
        .getContent(jwt)
        .then((res) => {
          const { _id, name, email } = res;
          setStateIsLogin({
            isLoggedIn: true,
          });
          setCurrentUser({ _id, name, email });
        })

        .catch((error) => console.log(`Ошибка: ${error}`));
    }

  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const [stateIsLogin, setStateIsLogin] = useState(
    JSON.parse(localStorage.getItem('stateIsLogin')) ||
    { isLoggedIn: false }
  );

  useEffect(() => {
    localStorage.setItem('stateIsLogin', JSON.stringify(stateIsLogin));
  }, [stateIsLogin]);


  const handleRegister = (name, password, email) => {
    setIsBlockInput(true)
    auth
      .register(name, password, email)
      .then(() => {
        handleLogin(password, email);
        navigate("/signin");
      })
      .catch((error) => {
        isErrorMessage({
          errMessage: '',
        });
        setIsBlockInput(false)
        if (error === `Ошибка: 409`) {
          isErrorMessage({
            errMessage: `Пользователь ${email} уже существует`,
          });
        }
        if (error === `Ошибка: 500`) {
          isErrorMessage({
            errMessage: 'При регистрации произошла ошибка.',
          });
        }
      })

  };

  const handleLogin = (password, email) => {
    setIsBlockInput(true)
    auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          checkToken();
        }
        setLoggedIn(true)
        setStateIsLogin({
          isLoggedIn: true,
        });
        navigate("/movies");
      })
      .catch((error) => {
        isErrorMessage({
          errMessage: '',
        });
        setIsBlockInput(false)
        if (error === `Ошибка: 400`) {
          isErrorMessage({
            errMessage: 'Неправильный логин или пароль.',
          });
        }
        if (error === `Ошибка: 500`) {
          isErrorMessage({
            errMessage: 'При авторизации произошла ошибка.',
          });
        }
      })
  };

  function handleUpdateProfile(name, email) {
    setIsBlockInput(true)
    mainApi
      .editUserInfo(name, email)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        isSaveMessage({
          textMessage: 'Данные успешно изменены!'
        })
        isErrorMessage({
          errMessage: '',
        });
      })
      .catch((error) => {
        isErrorMessage({
          errMessage: '',
        });
        setIsBlockInput(false)
        if (error === `Ошибка: 400`) {
          isErrorMessage({
            errMessage: `Пользователь ${email} уже существует`,
          });
        }
        if (error === `Ошибка: 500`) {
          isErrorMessage({
            errMessage: 'При обновлении произошла ошибка.',
          });
        }
      })
  }

  function signOut() {
    localStorage.clear()
    setStateIsLogin({
      isLoggedIn: false,
    });
    setCurrentUser({
      name: '',
      email: '',
    });
    navigate('/');
  }

  const location = useLocation();

  const footer =
    location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';

  const header =
    location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        {header && <Header isLoggedIn={stateIsLogin.isLoggedIn} />}
        <Routes>
          <Route
            path="/"
            element={<Main />}
          />
          <Route path='/movies'
            element={<ProtectedRoute isLoggedIn={stateIsLogin.isLoggedIn}>
              <Movies
                movies={movies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isLiked={isLiked}
                setliked={setliked}
              />
            </ProtectedRoute>}
          />
          <Route
            path='/saved-movies'
            element={<ProtectedRoute isLoggedIn={stateIsLogin.isLoggedIn}>
              <SavedMovies
                movies={movies}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                isLiked={isLiked}
                setliked={setliked}
              />
            </ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute isLoggedIn={stateIsLogin.isLoggedIn}>
              <Profile
                handleUpdateProfile={handleUpdateProfile}
                errMessage={errorMessage.errMessage}
                textMessage={saveMessage.textMessage}
                signOut={signOut}
                isBlockInput={isBlockInput}
                setIsBlockInput={setIsBlockInput}
              />
            </ProtectedRoute>}

          />

          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleLogin}
                errMessage={errorMessage.errMessage}
                isBlockInput={isBlockInput}
                setIsBlockInput={setIsBlockInput}
              />}
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegister}
                errMessage={errorMessage.errMessage}
                isBlockInput={isBlockInput}
                setIsBlockInput={setIsBlockInput}
              />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {footer && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
