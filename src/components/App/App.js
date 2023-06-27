import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoading = false;

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register isLoading={isLoading} />} />
        <Route path="/sign-in" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} isLoading={isLoading} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} isLoading={isLoading} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
