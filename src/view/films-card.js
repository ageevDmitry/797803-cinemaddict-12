import {checkStringLength} from "../utils.js";

export const createFilmCard = (filmsList) => {
  const {title, poster, description, genre, year, duration, rating, isWachlist, isWached, isFavorite} = filmsList;

  const limitDescription = checkStringLength(description);

  const isFilmFlag = (flag) => {
    return (flag) ? `film-card__controls-item--active` : ``
  }

  const isWachlistClassName = isFilmFlag(isWachlist);
  const isWachedClassName = isFilmFlag(isWached);
  const isFavoriteClassName = isFilmFlag(isFavorite);


  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${limitDescription}</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWachlistClassName}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWachedClassName}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}">Mark as favorite</button>
        </form>
    </article>`
  );
};
