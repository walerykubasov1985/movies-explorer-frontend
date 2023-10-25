import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate, Navigate, useLocation} from 'react-router-dom';
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
import apiBeatfilm from "../../utils/MoviesApi";
import mainApi from "../../utils/mainApi"
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.patchname;
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isBlockInput, setIsBlockInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errMessage: '', });
  const [saveMessage, setSaveMessage] = useState({ textMessage: '', });
  const [userAutorisate, setUserAutorisate] = useState(false);

  // регистрация пользователя
  const handleRegister = (name, password, email) => {
    auth
      .register(name, password, email)
      .then(() => {
        handleLogin(password, email);
        navigate("/signin");

      })
      .catch((err) => {
        setErrorMessage({ errMessage: '' })
        if (err === `Ошибка: 409`) {
          setErrorMessage({
            errMessage: `Пользователь ${email} уже существует`,
          });
        } else {
          setErrorMessage({
            errMessage: `При регистрации произошла ошибка`,
          });
        }
      })
  };

  //логирование пользователя
  const handleLogin = (password, email) => {
    setLoggedIn(false)
    auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserAutorisate(prev => !prev)
          navigate("/movies");
          handleCheckToken();
        }
      })
      .catch((err) => {
        setErrorMessage({
          errMessage: '',
        });
        if (err === `Ошибка: 401`) {
          setErrorMessage({
            errMessage: `Неправильный логин или пароль.`,
          });
        } else {
          setErrorMessage({
            errMessage: `При авторизации произошла ошибка`,
          });
        }
      })
  }

  //проверка токена
  const handleCheckToken = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          navigate( path, {replace:true});
          setUserAutorisate(prev => !prev)
          setLoggedIn(true);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  //функция выхода
  function handleOutProfil() {
    localStorage.clear();
    navigate("/");
    setUserAutorisate(prev => !prev)
    setCurrentUser(null);
    setLoggedIn(false);
    setAllMovies([]);
    setSavedMovies([]);
  }

  //обновление профиля
  const handleUpdateUser = (name, email) => {
    mainApi
      .editUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setErrorMessage({ errMessage: "" });
        setSaveMessage({ textMessage: "Данные успешно обновлены" });
      })
      .catch((err) => {
        setErrorMessage({ errMessage: '' });
        if (err === `Ошибка: 409`) {
          setSaveMessage({ textMessage: '' })
          setErrorMessage({
            errMessage: `Пользователь ${email} уже существует`,
          });
        } else {
          setErrorMessage({
            errMessage: `При обновлении произошла ошибка`,
          });
        }
      })
  };

  //получение информации о фильмах с сервера
  useEffect(() => {
    setIsLoading(true);
    if (userAutorisate) {
    Promise.all([
      apiBeatfilm.getInitialCards(),
      mainApi.getSavedMovies(),
    ])
      .then(([cardData, savedCardData]) => {
        setAllMovies(cardData);
        console.log(cardData)
        setSavedMovies(savedCardData);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    }
  }, [userAutorisate]);

  //Сохранение фильма
  const handleSaveMovie = (movie) => {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isSaved) {
      mainApi.createNewMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const deleteMovies = savedMovies.find(
        (item) => item.movieId === movie.id
      );

      if (deleteMovies && deleteMovies._id) {
        mainApi.deleteMovie(deleteMovies._id)
          .then(() => {
            setSavedMovies((movies) =>
              movies.filter((item) => item._id !== deleteMovies._id)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  const handleDeleteSaveMovie = (movie) => {
    return mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const newCardsArr = savedMovies.filter((c) => c._id !== movie._id);
        setSavedMovies(newCardsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          
          
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                movies={allMovies}
                isLoading={isLoading}
                savedMovies={savedMovies}
                onSave={handleSaveMovie}
                isBlockInput={isBlockInput}
                onDelete={handleDeleteSaveMovie}

              />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onDelete={handleDeleteSaveMovie}

              />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Profile}
                onUpdateProfile={handleUpdateUser}
                errMessage={errorMessage.errMessage}
                setErrorMessage={setErrorMessage}
                textMessage={saveMessage.textMessage}
                setSaveMessage={setSaveMessage}
                exitProfil={handleOutProfil}
                isBlockInput={isBlockInput}
                setIsBlockInput={setIsBlockInput}
              />}
          />

          <Route path="/signin"
            element={
              loggedIn ?
             (<Navigate to="/movies" replace loggedIn={loggedIn} />)
              :
              (<Login
                handleLogin={handleLogin}
                errMessage={errorMessage.errMessage}
                setErrorMessage={setErrorMessage}
              />)}
          />
          <Route
            path='/signup'
            element={
              loggedIn ?
             (<Navigate to="/movies" replace loggedIn={loggedIn} />)
              :
              (<Register
                onRegister={handleRegister}
                errMessage={errorMessage.errMessage}
                setErrorMessage={setErrorMessage}
              />)}
          />
          <Route exact path='/' element={
            <>
              <Header loggedIn={!loggedIn} />
              <Main />
              <Footer />
            </>
          }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
