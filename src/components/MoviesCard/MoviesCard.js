import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MoviesCard.css';

export default function MoviesCard() {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  return (
    <div className="movies-card">
      <img
        className="movies-card__image"
        src="https://thecity.m24.ru/b/d/SYketSiveYs9JffObLLBFlFNGhtudTX-kYVfOS8Xp1Gj5pqKzWTJSFS-PsArI08gRZaK1yZktQXWesHOaOz7FWcJ5xZMng=xC4cpbRD2LUqTSWmL6Ve8w.jpg"
        alt="33 слова о дизайне"
      />
      <div className="movies-card__container">
        <h3 className="movies-card__name">33 слова о дизайне</h3>
        <button
          className={`movies-card__favorites ${pathname === "/saved-movies" && 'movies-card__favorites_delete'}
            ${isLiked && 'movies-card__favorites_active'}`}
          type="button"
          onClick={handleLikeClick}
        />
      </div>
      <p className="movies-card__time">1ч 42м</p>
    </div>
  )
}
