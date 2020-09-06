import Abstract from "./abstract.js";
import {checkStringLength, isFilmFlag} from "../utils/film-create.js";
import {formatDate} from "../utils/film-create.js";

const createFilmCard = (film, comments) => {

  const {poster, title, rating, reliseDate, runtime, genre, description, isWatchlist, isWatched, isFavorite} = film;
  const limitDescription = checkStringLength(description);
  const isWatchlistClassName = isFilmFlag(isWatchlist);
  const isWachedClassName = isFilmFlag(isWatched);
  const isFavoriteClassName = isFilmFlag(isFavorite);
  const filmCommentsCount = comments.length;
  const filmCardReliseDate = formatDate(reliseDate, `YYYY`);

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
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistClassName}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWachedClassName}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteClassName}">Mark as favorite</button>
        </form>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film, this._comments);
  }

  _clickHandler() {
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
