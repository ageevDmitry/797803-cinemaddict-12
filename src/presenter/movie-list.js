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
import {SortType} from "../const.js";

const CARD_FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._filmsSectionComponent = new FilmsSection();
    this._filmsListComponent = new FilmsList();
    this._filmsContainerComponent = new FilmsContainer();
    this._filmsFiltrationComponent = new FilmsFiltration();
    this._filmsSortingComponent = new FilmsSorting();
    this._noFilmsComponent = new NoFilms();
    this._buttonShowMoreComponent = new ButtonShowMore();

    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  _sortFilms(sortType) {

    switch (sortType) {
      case SortType.DATE_DOWN:
        this._films.sort(sortFilmsDate);
        break;
      case SortType.RATING_DOWN:
        this._films.sort(sortFilmsRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
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

    this._sortFilms(sortType);
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
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + CARD_FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._buttonShowMoreComponent);
    }
  }

  _renderButtonShowMore() {
    render(this._filmsSectionComponent, this._buttonShowMoreComponent, RenderPosition.BEFOREEND);

    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderFilm(film) {
    const filmPresenter = new Film(this._filmsContainerComponent);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, CARD_FILMS_COUNT_PER_STEP));

    if (this._films.length > CARD_FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderFilmsSorting();

    render(this._boardContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }
}
