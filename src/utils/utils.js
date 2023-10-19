//преобразование времени
export function getTransformationTime(min) {
   const hours = Math.trunc(min / 60);
   const minutes = min % 60;
   return `${hours}ч ${minutes}м`;
}

//функция фильтрации фильмов
export function filterMovies(movies, query, showShortMovies) {
   let filteredMovies = movies.filter(movie => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN ? movie.nameEN.toLowerCase() : "";
      return movieNameRU.includes(query.toLowerCase()) || movieNameEN.includes(query.toLowerCase());
   });
   if (showShortMovies) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
   }
   return filteredMovies;
}