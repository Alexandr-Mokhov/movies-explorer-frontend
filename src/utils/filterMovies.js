export default function filterMovies(moviesList, value, short) {
  return moviesList.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()) &&
    (short ? movie.duration < 40 : true));
}
