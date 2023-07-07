import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({ selectedFilms, setSelectedFilms }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === '') {
      setIsValid(false);
      setSearched(false);
      setFoundSavedMovies([]);
    } else {
      setIsValid(true);
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearched(true);
    selectedFilms.filter(movie => {
      if (movie.nameRU.toLowerCase().includes(value.toLowerCase()) && (isChecked ? movie.duration < 40 : true))
      foundSavedMovies.push(movie);
    })
  }

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <MoviesCardList
        selectedFilms={searched ? foundSavedMovies : selectedFilms}
        setSelectedFilms={setSelectedFilms}
      />
    </main>
  )
}
