import React, { useEffect, useState } from "react";
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
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi"
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isBlockInput, setIsBlockInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errMessage: '', });
  const [saveMessage, setSaveMessage] = useState({ textMessage: '', });
  const [userAutorisate, setUserAutorisate] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);



  // регистрация пользователя
  const handleRegister = (name, password, email) => {
    auth
      .register(name, password, email)
      .then(() => {
        handleLogin(password, email);
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
        if (data) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserAutorisate(prev => !prev)
          navigate("/movies");
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

  //функция выхода
  function handleOutProfil() {
    localStorage.clear();
    setLoggedIn(false);
    setUserAutorisate(prev => !prev)
    setCurrentUser(null);
    setAllMovies([]);
    setSavedMovies([]);
    navigate("/");
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  // Получение списка фильмов
  useEffect(() => {
    setIsLoading(true);
    moviesApi.getInitialCards()
      .then((data) => {
        setAllMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setIsLoading(false);
      });
  }, [userAutorisate]);

  // Получение сохраненных фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userAutorisate]);

  //запрет на закрытие без авторизации
  useEffect(() => {
    if (loggedIn && (location.pathname === '/signin' || location.pathname === '/signup')) {
      navigate('/movies');
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path='/' element={
            <>
              <Header loggedIn={!loggedIn} />
              <Main />
              <Footer />
            </>
          }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={Movies}
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
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={SavedMovies}
                savedMovies={savedMovies}
                onDelete={handleDeleteSaveMovie}

              />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                isCheckingToken={isCheckingToken}
                component={Profile}
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
              <Login
                handleLogin={handleLogin}
                location={location}
                errMessage={errorMessage.errMessage}
                setErrorMessage={setErrorMessage}
              />}
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegister}
                location={location}
                errMessage={errorMessage.errMessage}
                setErrorMessage={setErrorMessage}
              />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
