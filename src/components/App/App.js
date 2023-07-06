import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [selectedFilms, setSelectedFilms] = useState([]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    getSavedMovies()
      .then((res) => {
        setSelectedFilms(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  
  console.log(selectedFilms);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email });
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            />
          } />
          <Route path="/sign-in" element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
            />
          } />
          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              selectedFilms={selectedFilms}
              setSelectedFilms={setSelectedFilms}
            />} />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              selectedFilms={selectedFilms}
              setSelectedFilms={setSelectedFilms}
            />} />
          <Route path="/profile" element={
            <ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
