import './MoviesCard.css';

export default function MoviesCard() {
  return (
    <div className="movies-card">
      <img
        className="movies-card__image"
        src="https://thecity.m24.ru/b/d/SYketSiveYs9JffObLLBFlFNGhtudTX-kYVfOS8Xp1Gj5pqKzWTJSFS-PsArI08gRZaK1yZktQXWesHOaOz7FWcJ5xZMng=xC4cpbRD2LUqTSWmL6Ve8w.jpg"
        alt="33 слова о дизайне"
      />
      <div className="movies-card__container">
        <h3 className="movies-card__name">33 слова о дизайне</h3>
        <div className="movies-card__favorites">
          <div className="movies-card__favorites-heart movies-card__favorites-heart_active" />
        </div>
      </div>
      <p className="movies-card__time">1ч 42м</p>
    </div>
  )
}
