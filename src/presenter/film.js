import FilmCard from "../view/film-card.js";
import FilmPopap from "../view/film-popap.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  CARD: `CARD`,
  POPAP: `POPAP`
};

export default class Film {
  constructor(filmsContainerComponent, changeData, changeMode) {
    this._filmsContainerComponent = filmsContainerComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmPopapComponent = null;
    this._mode = Mode.CARD;

    this._handleOpenFilmPopapClick = this._handleOpenFilmPopapClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseFilmPopapClick = this._handleCloseFilmPopapClick.bind(this);
    this._handleCloseFilmPopapKeyDown = this._handleCloseFilmPopapKeyDown.bind(this);
    this._handleSendUserCommentKeyDown = this._handleSendUserCommentKeyDown.bind(this);
  }

  _replaceFilmCardToFilmPopap() {
    replace(this._filmPopapComponent, this._filmCardComponent);
    document.addEventListener(`keydown`, this._handleCloseFilmPopapKeyDown);
    document.addEventListener(`keydown`, this._handleSendUserCommentKeyDown);
    this._changeMode();
    this._mode = Mode.POPAP;
  }

  _replaceFilmPopapToFilmCard() {
    replace(this._filmCardComponent, this._filmPopapComponent);
    document.removeEventListener(`keydown`, this._handleCloseFilmPopapKeyDown);
    document.removeEventListener(`keydown`, this._handleSendUserCommentKeyDown);
    this._mode = Mode.CARD;
  }

  _handleOpenFilmPopapClick() {
    this._replaceFilmCardToFilmPopap();
  }

  _handleCloseFilmPopapClick() {
    this._replaceFilmPopapToFilmCard();
  }

  _handleCloseFilmPopapKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {

      evt.preventDefault();
      this._filmPopapComponent.reset(this._film);
      this._replaceFilmPopapToFilmCard();
    }
  }

  _handleSendUserCommentKeyDown(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      this._replaceFilmPopapToFilmCard();
    }
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  resetView() {
    if (this._mode !== Mode.CARD) {
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

    this._filmCardComponent.setOpenClickHandler(this._handleOpenFilmPopapClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopapComponent.setCloseClickHandler(this._handleCloseFilmPopapClick);
    this._filmPopapComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmPopapComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopapComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCardComponent === null || prevFilmPopapComponent === null) {
      render(this._filmsContainerComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmsContainerComponent.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.POPAP) {
      replace(this._filmPopapComponent, prevFilmPopapComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmPopapComponent);
  }
}
