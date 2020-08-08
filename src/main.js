import {createUserRankTemplate} from "./view/user-rank.js";
import {createMenuSite} from "./view/site-menu.js";
import {createSortFilms} from "./view/sort-films.js";
import {createFilmsList} from "./view/films-list.js";
import {createFilmCard} from "./view/films-card.js";
import {createButtonShowMore} from "./view/button-show-more.js";
import {createFooterStatistic} from "./view/footer-statistic.js";
// import {createFilmPopap} from "./view/film-popap.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateStatistic} from "./mock/film.js";
import {generateUserRank} from "./mock/film.js";

const CARD_FILMS_COUNT = 20;
const CARD_FILMS_COUNT_PER_STEP = 5;

const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const filmStatistic = generateStatistic();
const userRank = generateUserRank();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, createUserRankTemplate(userRank), `beforeend`);
render(siteMain, createMenuSite(filters), `beforeend`);
render(siteMain, createSortFilms(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 1; i <= CARD_FILMS_COUNT_PER_STEP; i++) {
  render(filmsListContainer, createFilmCard(filmsArray[i]), `beforeend`);
}

if (filmsArray.length > CARD_FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

  render(filmsList, createButtonShowMore(), `beforeend`);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
      .forEach((filmsArray) => render(filmsListContainer, createFilmCard(filmsArray), `beforeend`));

      renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmsArray.length) {
      loadMoreButton.remove();
    }
  });
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatistic(filmStatistic), `beforeend`);

// Пока попап фильма не отрисовываем;
// render(footer, createFilmPopap(), `beforeend`);
