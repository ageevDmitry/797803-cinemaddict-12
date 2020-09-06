import Film from "../presenter/film.js";
import FilmsFiltration from "../view/films-filtration.js";
import FilmsSorting from "../view/films-sorting.js";
import FilmsSection from "../view/films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";
import ButtonShowMore from "../view/button-show-more.js";
import NoFilms from "../view/no-films.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortFilmsDate, sortFilmsRating} from "../utils/film-create.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const CARD_FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(boardContainer, filmsModel, commentsModel) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;

    this._filmsSectionComponent = new FilmsSection();
    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsFiltrationComponent = new FilmsFiltration();
    this._filmsSortingComponent = new FilmsSorting();
    this._noFilmsComponent = new NoFilms();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsSorting();

    render(this._boardContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderFilmsSorting() {
    render(this._boardContainer, this._filmsSortingComponent, RenderPosition.BEFOREEND);
    this._filmsSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTaskList();
    this._renderFilmList();
  }

  _clearTaskList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
  }

  _renderBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, CARD_FILMS_COUNT_PER_STEP));
    const comments = this._getComments().slice(0, Math.min(filmCount, CARD_FILMS_COUNT_PER_STEP));

    this._renderFilms(films, comments);

    if (filmCount > CARD_FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderFilms(films, comments) {
    for (let i = 0; i < films.length; i++) {
      this._renderFilm(films[i], comments[i]);
    }
  }

  _renderButtonShowMore() {
    render(this._filmsSectionComponent, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _handleButtonShowMoreClick() {
    const filmCount = this._getFilms().length;
    const newRenederedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARD_FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenederedFilmCount);
    const comments = this._getComments().slice(this._renderedFilmCount, newRenederedFilmCount);

    this._renderFilms(films, comments);
    this._renderedFilmCount = newRenederedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return this._filmsModel.getFilms().slice().sort(sortFilmsDate);
      case SortType.RATING_DOWN:
        return this._filmsModel.getFilms().slice().sort(sortFilmsRating);
    }

    return this._filmsModel.getFilms();
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _renderFilm(film, comments) {
    const filmPresenter = new Film(this._filmsContainerComponent, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film, comments);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModeChange() {
  Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _handleModelEvent(updateType, data) {
      switch (updateType) {
        case UpdateType.PATCH:
          this._filmPresenter[data.id].init(data);
          break;
    }
  }
}
