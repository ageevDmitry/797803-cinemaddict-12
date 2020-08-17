import {render, RenderPosition} from "./utils.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import FilmFiltration from "./view/film-filtration.js";
import FilmSorting from "./view/film-sorting.js";
import FilmList from "./view/film-list.js";
import FilmCard from "./view/film-card.js";
import ButtonShowMore from "./view/button-show-more.js";
import Statistic from "./view/footer-statistic.js";
import FilmPopap from "./view/film-popap.js";

const CARD_FILMS_COUNT = 20;
const CARD_FILMS_COUNT_PER_STEP = 5;

const renderFilm = (filmListContainer, film) => {
  const filmCard = new FilmCard(film);
  const filmPopap = new FilmPopap(film);

  const replaceFilmToFilmPopap = () => {
    filmListContainer.replaceChild(filmPopap.getElement(), filmCard.getElement());
  };

  const replaceFilmPopapToFilm = () => {
    filmListContainer.replaceChild(filmCard.getElement(), filmPopap.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFilmPopapToFilm();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCard.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    replaceFilmToFilmPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    replaceFilmToFilmPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCard.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    replaceFilmToFilmPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmPopap.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    replaceFilmPopapToFilm();
  });

  render(filmListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
}

const userRank = generateUserRank();
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const filmStatistic = generateStatistic();
const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmFiltration(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmSorting().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmList().getElement(), RenderPosition.BEFOREEND);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 1; i <= CARD_FILMS_COUNT_PER_STEP; i++) {
  renderFilm(filmsListContainer, filmsArray[i]);
}

if (filmsArray.length > CARD_FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

  render(filmsList, new ButtonShowMore().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainer, film));
    renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmsArray.length) {
      loadMoreButton.remove();
    }
  });
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, new Statistic(filmStatistic).getElement(), RenderPosition.BEFOREEND);

// render(footer, new FilmPopap(filmsArray[0]).getElement(), RenderPosition.BEFOREEND);
