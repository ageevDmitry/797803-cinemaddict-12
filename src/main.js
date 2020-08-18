import {render, RenderPosition} from "./utils.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import FilmFiltration from "./view/film-filtration.js";
import FilmSorting from "./view/film-sorting.js";
import FilmsSection from "./view/films-section.js";
import FilmsList from "./view/films-list.js";
import FilmsContainer from "./view/films-container.js";
import FilmCard from "./view/film-card.js";
import ButtonShowMore from "./view/button-show-more.js";
import Statistic from "./view/footer-statistic.js";
import FilmPopap from "./view/film-popap.js";
import NoFilms from "./view/no-films.js";

const CARD_FILMS_COUNT = 20;
const CARD_FILMS_COUNT_PER_STEP = 5;

const userRank = generateUserRank();
const films = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const statistic = generateStatistic();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

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
};

// render(main, new FilmList().getElement(), RenderPosition.BEFOREEND);

const renderFilmList = (filmsListContainer, films) => {
  const filmsSection = new FilmsSection();
  const filmsList = new FilmsList();
  const filmsContainer = new FilmsContainer();

  render(filmsListContainer, filmsSection.getElement(), RenderPosition.BEFOREEND);
  render(filmsSection.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);
  render(filmsList.getElement(), filmsContainer.getElement(), RenderPosition.BEFOREEND);

  // const filmsMain = main.querySelector(`.films`);
  // const filmsList = filmsMain.querySelector(`.films-list`);
  // const filmsListContainer = document.querySelector(`.films-list__container`);

  if (films.length === 0) {
    render(filmsList.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  for (let i = 1; i <= CARD_FILMS_COUNT_PER_STEP; i++) {
    renderFilm(filmsContainer.getElement(), films[i]);
  }
  // if (films.length > CARD_FILMS_COUNT_PER_STEP) {

  //   let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

  //   render(filmsList, new ButtonShowMore().getElement(), RenderPosition.BEFOREEND);

  //   const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  //   loadMoreButton.addEventListener(`click`, (evt) => {
  //     evt.preventDefault();
  //     films
  //       .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
  //       .forEach((film) => renderFilm(filmsListContainer, film));
  //     renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

  //     if (renderedFilmCount >= films.length) {
  //       loadMoreButton.remove();
  //     }
  //   });
  // }
}

render(header, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);
render(main, new FilmFiltration(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new FilmSorting().getElement(), RenderPosition.BEFOREEND);
renderFilmList(main, films);
render(footer, new Statistic(statistic).getElement(), RenderPosition.BEFOREEND);
