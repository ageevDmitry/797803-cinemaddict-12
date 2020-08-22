import FilmCard from "../view/film-card.js";
import FilmPopap from "../view/film-popap.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Film {
  constructor(filmsContainerComponent) {
    this._filmsContainerComponent = filmsContainerComponent;

    this._filmCardComponent = null;
    this._filmPopapComponent = null;

    this._handleOpenFilmPopapClick = this._handleOpenFilmPopapClick.bind(this);
    this._handleCloseFilmPopapClick = this._handleCloseFilmPopapClick.bind(this);
    this._handleCloseFilmPopapKeyDown = this._handleCloseFilmPopapKeyDown.bind(this);
  }

  _replaceFilmCardToFilmPopap() {
    replace(this._filmPopapComponent, this._filmCardComponent);
    document.addEventListener(`keydown`, this._handleCloseFilmPopapKeyDown);
  }

  _replaceFilmPopapToFilmCard() {
    replace(this._filmCardComponent, this._filmPopapComponent);
    document.removeEventListener(`keydown`, this._handleCloseFilmPopapKeyDown);
  }

  _handleOpenFilmPopapClick() {
    this._replaceFilmCardToFilmPopap();
  }

  _handleCloseFilmPopapClick() {
    this._replaceFilmPopapToFilmCard();
  }

  _handleCloseFilmPopapKeyDown (evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {

      evt.preventDefault();
      this._replaceFilmPopapToFilmCard();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopapComponent);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopapComponent = this._filmPopapComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmPopapComponent = new FilmPopap(film);

    this._filmCardComponent.setClickHandler(this._handleOpenFilmPopapClick);
    this._filmPopapComponent.setClickHandler(this._handleCloseFilmPopapClick);

    if (prevFilmCardComponent === null || prevFilmPopapComponent === null) {
      render(this._filmsContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsContainerComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmsContainerComponent.getElement().contains(prevFilmPopapComponent.getElement())) {
      replace(this._filmPopapComponent, prevFilmPopapComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmPopapComponent);
  }
}
