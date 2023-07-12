/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { checkToken } from '../../utils/MainApi';
import { getSavedMovies } from '../../utils/MainApi';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', ownerId: '' });
  const [selectedFilms, setSelectedFilms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          setSelectedFilms(res.filter(movie => movie.owner === currentUser.ownerId));
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isTokenChecked]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email, ownerId: res._id });
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            localStorage.setItem('ownerId', res._id);
            setLoggedIn(true);
            setIsTokenChecked(true);
            navigate(pathname, { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('movieSearchText');
    localStorage.removeItem('shortFilms');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('isCheckedShortFilms');
    localStorage.removeItem('ownerId');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '', ownerId: '' });
    setSelectedFilms([]);
    setMovies([]);
    setFoundMovies([]);
    setNotFoundMovies(false);
    setIsTokenChecked(false);
    navigate('/', { replace: true });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-up" element={
            <Register
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
            />}
          />
          <Route path="/sign-in" element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
            />}
          />
          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              selectedFilms={selectedFilms}
              setSelectedFilms={setSelectedFilms}
              foundMovies={foundMovies}
              setFoundMovies={setFoundMovies}
              movies={movies}
              setMovies={setMovies}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
            />}
          />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              selectedFilms={selectedFilms}
              setSelectedFilms={setSelectedFilms}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
            />}
          />
          <Route path="/profile" element={
            <ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
              onSignOut={onSignOut}
            />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
