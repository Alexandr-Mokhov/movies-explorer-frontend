/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addStatusFavorite, deleteStatusFavorite } from '../../utils/MainApi';
import './MoviesCard.css';

export default function MoviesCard({ movie, selectedFilms, setSelectedFilms }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);

  useEffect(() => {
    if (selectedFilms[0]) {
      selectedFilms.map((item) => checkValues(item));
    }
  }, [selectedFilms, movie])

  function checkValues(item) {
    if (item.movieId === movie.id) {
      setIsLiked(true);
      movie._id = item._id;
    }
  }

  function handleLikeClick() {
    setLikeDisabled(true);
    if (isLiked || pathname === "/saved-movies") {
      deleteStatusFavorite(movie)
        .then(() => {
          setIsLiked(false);
          setSelectedFilms((state) => state.filter(arrayItem => arrayItem._id !== movie._id));
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addStatusFavorite(movie)
        .then((res) => {
          setIsLiked(true);
          setSelectedFilms([...selectedFilms, res]);
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <div className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className="movies-card__container">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <button
          className={`movies-card__favorites ${pathname === "/saved-movies" && 'movies-card__favorites_delete'}
            ${isLiked && 'movies-card__favorites_active'}`}
          type="button"
          onClick={handleLikeClick}
          disabled={likeDisabled}
        />
      </div>
      <p className="movies-card__time">{getTimeFromMins(movie.duration)}</p>
    </div>
  )
}
