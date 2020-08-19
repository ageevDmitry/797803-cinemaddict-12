import {render, RenderPosition} from "./utils/render.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import FilmFiltration from "./view/films-filtration.js";
import FilmSorting from "./view/films-sorting.js";
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
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
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

  filmCard.setClickHandler(() => {
    replaceFilmToFilmPopap();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmPopap.setClickHandler(() => {
    replaceFilmPopapToFilm();
  });

  render(filmListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmList = (siteMain, films) => {
  const filmsSection = new FilmsSection();
  const filmsList = new FilmsList();
  const filmsContainer = new FilmsContainer();

  render(siteMain, filmsSection.getElement(), RenderPosition.BEFOREEND);
  render(filmsSection.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);
  render(filmsList.getElement(), filmsContainer.getElement(), RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(filmsList.getElement(), new NoFilms().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  films
    .slice(0, Math.min(films.length, CARD_FILMS_COUNT_PER_STEP))
    .forEach((film) => renderFilm(filmsContainer.getElement(), film));


  if (films.length > CARD_FILMS_COUNT_PER_STEP) {

    let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

    const buttonShowMore = new ButtonShowMore();

    render(filmsList.getElement(), buttonShowMore.getElement(), RenderPosition.BEFOREEND);

    buttonShowMore.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsContainer.getElement(), film));

      renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        buttonShowMore.getElement().remove();
        buttonShowMore.removeElement();
      }
    });
  }
};

render(header, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);
render(main, new FilmFiltration(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new FilmSorting().getElement(), RenderPosition.BEFOREEND);
renderFilmList(main, filmsArray);
render(footer, new Statistic(statistic).getElement(), RenderPosition.BEFOREEND);
