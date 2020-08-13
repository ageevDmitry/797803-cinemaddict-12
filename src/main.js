import {renderTemplate, renderElement, RenderPosition} from "./utils.js";
import {createUserRankTemplate} from "./view/user-rank.js";
import {createMenuSite} from "./view/site-menu.js";
import {createSortFilms} from "./view/sort-films.js";
import {createFilmsList} from "./view/films-list.js";
import {createFilmCard} from "./view/films-card.js";
import {createButtonShowMore} from "./view/button-show-more.js";
// import {createFilmPopap} from "./view/film-popap.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import Statistic from "./view/footer-statistic.js";
import {generateUserRank} from "./mock/user-rank-status.js";

const CARD_FILMS_COUNT = 20;
const CARD_FILMS_COUNT_PER_STEP = 5;

const userRank = generateUserRank();
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const filmStatistic = generateStatistic();

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

// renderTemplate(siteHeader, createUserRankTemplate(userRank), `beforeend`);
renderElement(siteHeader, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);

renderTemplate(siteMain, createMenuSite(filters), `beforeend`);
renderTemplate(siteMain, createSortFilms(), `beforeend`);
renderTemplate(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 1; i <= CARD_FILMS_COUNT_PER_STEP; i++) {
  renderTemplate(filmsListContainer, createFilmCard(filmsArray[i]), `beforeend`);
}

if (filmsArray.length > CARD_FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

  renderTemplate(filmsList, createButtonShowMore(), `beforeend`);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
      .forEach((array) => renderTemplate(filmsListContainer, createFilmCard(array), `beforeend`));

    renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmsArray.length) {
      loadMoreButton.remove();
    }
  });
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

renderElement(footerStatistics, new Statistic(filmStatistic).getElement(), RenderPosition.BEFOREEND);

// renderTemplate(footer, createFilmPopap(filmsArray[0]), `beforeend`);
