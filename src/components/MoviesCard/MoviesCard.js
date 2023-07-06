import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addStatusFavorite, deleteStatusFavorite } from '../../utils/MainApi';
import './MoviesCard.css';

export default function MoviesCard({ movie, selectedFilms, setSelectedFilms }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    if (selectedFilms[0]) {
      selectedFilms.map((item) => {
        // console.log(item, movie);
        if (item.movieId === movie.id) {
          setIsLiked(true);
          movie.movieId = item.movieId;
          movie._id = item._id;
        }
      })
    }
  }, [selectedFilms, setSelectedFilms])

  function handleLikeClick() {
    if (isLiked || pathname === "/saved-movies") {
      console.log(selectedFilms, movie);
      deleteStatusFavorite(movie)
        .then(() => {
          setIsLiked(false);

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addStatusFavorite(movie)
        .then(() => {
          setIsLiked(true);
          setSelectedFilms([...selectedFilms, movie]);
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
        />
      </div>
      <p className="movies-card__time">{getTimeFromMins(movie.duration)}</p>
    </div>
  )
}
