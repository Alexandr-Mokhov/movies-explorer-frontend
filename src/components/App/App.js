import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const { pathname } = useLocation();

  return (
    <div className="page">
      {pathname === "/sign-up" || pathname === "/sign-in" ? '' : <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {pathname === "/sign-up" || pathname === "/sign-in" ? '' : <Footer />}
    </div>
  );
}
