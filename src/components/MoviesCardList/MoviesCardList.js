import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// импортировал просто модули карточек для наглядности верстки, при работе с апи будут загружаться нужные карточки
export default function MoviesCardList() {
  return (
    <div className="movies-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </div>
  )
}
