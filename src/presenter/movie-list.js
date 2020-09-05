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
  constructor(boardContainer, filmsModel) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmsModel = filmsModel;

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

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return this._filmsModel.getFilms().slice().sort(sortFilmsDate);
      case SortType.RATING_DOWN:
        return this._filmsModel.getFilms().slice().sort(sortFilmsRating);
    }

    return this._filmsModel.getFilms();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
      switch (updateType) {
        case UpdateType.PATCH:
          this._filmPresenter[data.id].init(data);
          break;
    }
  }

  _clearTaskList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTaskList();
    this._renderFilmList();
  }

  _renderFilmsSorting() {
    render(this._boardContainer, this._filmsSortingComponent, RenderPosition.BEFOREEND);
    this._filmsSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleButtonShowMoreClick() {
    const filmCount = this._getFilms().length;
    const newRenederedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARD_FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenederedFilmCount)

    this._renderFilms(films);
    this._renderedFilmCount = newRenederedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderButtonShowMore() {
    render(this._filmsSectionComponent, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._filmsContainerComponent, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
      films.forEach((film) => this._renderFilm(film));
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, CARD_FILMS_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > CARD_FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderBoard() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
  }

  init() {
    this._renderFilmsSorting();

    render(this._boardContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }
}
