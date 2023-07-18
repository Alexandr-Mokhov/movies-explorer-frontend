import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  foundMovies,
  notFoundMovies,
  errorFoundMovies,
  startItems,
  savedFilms,
  setSavedFilms,
  shortFilms,
  checkedShort,
  checkedShortSaved,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
  setSavedShortFilms,
  displayedFilms,
  setFoundSavedMovies,
  setFoundSavedShortFilms,
  search,
}) {
  const { pathname } = useLocation();

  const movieFoundItems = () => {
    if (checkedShort) {
      return shortFilms.slice(0, startItems).map((movieItem) => {
        return <MoviesCard
          movie={movieItem}
          savedFilms={savedFilms}
          setSavedFilms={setSavedFilms}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
          setInfoTooltipMessage={setInfoTooltipMessage}
          key={movieItem.id} />
      });
    } else {
      return foundMovies.slice(0, startItems).map((movieItem) => {
        return <MoviesCard
          movie={movieItem}
          savedFilms={savedFilms}
          setSavedFilms={setSavedFilms}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
          setInfoTooltipMessage={setInfoTooltipMessage}
          key={movieItem.id} />
      });
    }
  }

  const movieSavedItems = () => {
    if (savedFilms[0]) {
      return displayedFilms.map((movieItem) => {
        return <MoviesCard
          movie={movieItem}
          savedFilms={savedFilms}
          setSavedFilms={setSavedFilms}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
          setInfoTooltipMessage={setInfoTooltipMessage}
          setSavedShortFilms={setSavedShortFilms}
          setFoundSavedMovies={setFoundSavedMovies}
          setFoundSavedShortFilms={setFoundSavedShortFilms}
          checkedShortSaved={checkedShortSaved}
          search={search}
          key={movieItem.movieId} />
      })
    }
  }

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {pathname === '/movies' ? movieFoundItems() : movieSavedItems()}
      </div>
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      {errorFoundMovies && <h3 className="movies-list__error-found">
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.
      </h3>}
    </section>
  )
}
