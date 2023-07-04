import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MoviesCard.css';

export default function MoviesCard({ movies }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <div className="movies-card">
      <img
        className="movies-card__image"
        src={`https://api.nomoreparties.co/${movies.image.url}`}
        alt={movies.nameRU}
      />
      <div className="movies-card__container">
        <h2 className="movies-card__name">{movies.nameRU}</h2>
        <button
          className={`movies-card__favorites ${pathname === "/saved-movies" && 'movies-card__favorites_delete'}
            ${isLiked && 'movies-card__favorites_active'}`}
          type="button"
          onClick={handleLikeClick}
        />
      </div>
      <p className="movies-card__time">{getTimeFromMins(movies.duration)}</p>
    </div>
  )
}
