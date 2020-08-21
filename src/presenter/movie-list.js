import FilmsFiltration from "../view/films-filtration.js";
import FilmsSorting from "../view/films-sorting.js";
import FilmsSection from "../view/films-section.js";
import FilmsList from "../view/films-list.js";
import FilmsContainer from "../view/films-container.js";
import FilmCard from "../view/film-card.js";
import ButtonShowMore from "../view/button-show-more.js";
import FilmPopap from "../view/film-popap.js";
import NoFilms from "../view/no-films.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {sortFilmsDate, sortFilmsRating} from "../utils/film-create.js";
import {SortType} from "../const.js";

const CARD_FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

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

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderFilmsSorting();

    render(this._boardContainer, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
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
    this._filmsContainerComponent.getElement().innerHTML = ``;
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

  _renderFilm(film) {
    const filmCardComponent = new FilmCard(film);
    const filmPopapComponent = new FilmPopap(film);

    const replaceFilmCardToFilmPopap = () => {
      replace(filmPopapComponent, filmCardComponent);
    };

    const replaceFilmPopapToFilmCard = () => {
      replace(filmCardComponent, filmPopapComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFilmPopapToFilmCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setClickHandler(() => {
      replaceFilmCardToFilmPopap();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmPopapComponent.setClickHandler(() => {
      replaceFilmPopapToFilmCard();
    });

    render(this._filmsContainerComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
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

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }
}
