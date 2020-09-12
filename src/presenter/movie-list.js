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
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._filmsSortingComponent = null;
    this._buttonShowMoreComponent = null;

    this._filmsSectionComponent = new FilmsSection();
    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsFiltrationComponent = new FilmsFiltration();
    this._noFilmsComponent = new NoFilms();

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

    this._renderBoard();
  }

  _renderFilmsSorting() {
    if (this._filmsSortingComponent !== null) {
      this._filmsSortingComponent = null;
    }

    this._filmsSortingComponent = new FilmsSorting(this._currentSortType);
    this._filmsSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer, this._filmsSortingComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this.init();
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
  }

  _renderBoard() {

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    const a = films.slice(0, Math.min(filmCount, this._renderedFilmCount));

    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(a);

    if (filmCount > CARD_FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(films) {
    for (let i = 0; i < films.length; i++) {
      this._renderFilm(films[i]);
    }
  }

  _renderButtonShowMore() {
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new ButtonShowMore();
    this._buttonShowMoreComponent.setShowMoreClickHandler(this._handleButtonShowMoreClick);

    render(this._filmsSectionComponent, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);
  }

  _handleButtonShowMoreClick() {
    const filmCount = this._getFilms().length;
    const newRenederedFilmCount = Math.min(filmCount, this._renderedFilmCount + CARD_FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenederedFilmCount);

    this._renderFilms(films);
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

  _getComments(commentId) {
    return this._commentsModel.getComments(commentId);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._filmsContainerComponent, this._handleViewAction, this._handleModeChange);

    const commentsId = film.comments;
    const comments = [];

    commentsId.forEach((item) => {
      comments.push(this._getComments(item))
    });

    // for (let i = 0; i < commentsId.length; i++) {
    //   comments.push(this._getComments(commentsId[i]));
    // }

    const filmAndComments = Object.assign(
      {},
      film,
      {
        comments: comments
      });

    filmPresenter.init(filmAndComments);
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
        case UpdateType.MINOR:
          this._clearBoard();
          this._renderBoard();
          break;
        case UpdateType.MAJOR:
          this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
          this._renderBoard();
          break;
    }
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;
      Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._filmsSortingComponent);
    remove(this._filmsSectionComponent);
    remove(this._filmsListComponent);
    remove(this._filmsContainerComponent);
    remove(this._noFilmsComponent);
    remove(this._buttonShowMoreComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = filmsCount;
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

}
