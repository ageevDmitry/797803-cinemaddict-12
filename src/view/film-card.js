import Abstract from "./abstract.js";
import {checkStringLength, isFilmFlag} from "../utils.js";

const createFilmCard = (film) => {

  const {poster, title, rating, reliseDate, runtime, genre, description, isWachlist, isWached, isFavorite, comments} = film;
  const limitDescription = checkStringLength(description);
  const isWachlistClassName = isFilmFlag(isWachlist);
  const isWachedClassName = isFilmFlag(isWached);
  const isFavoriteClassName = isFilmFlag(isFavorite);
  const filmCommentsCount = comments.length;
  const filmCardReliseDate = reliseDate.toLocaleString(`en-ZA`, {year: `numeric`});

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmCardReliseDate}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${limitDescription}</p>
        <a class="film-card__comments">${filmCommentsCount} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWachlistClassName}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWachedClassName}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}">Mark as favorite</button>
        </form>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;

  }

  getTemplate() {
    return createFilmCard(this._film);
  }
}
