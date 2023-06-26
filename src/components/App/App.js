import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoading = false;

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route path="/sign-up" element={<Register isLoading={isLoading} />} />
        <Route path="/sign-in" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} isLoading={isLoading} />} />
        <Route path="/movies" element={<Movies loggedIn={loggedIn} />} />
        <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} />} />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} isLoading={isLoading} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
