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

const CARD_FILMS_LIST_COUNT = 5;

const filmsArray = new Array(CARD_FILMS_LIST_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);

console.log(filmsArray);
console.log(filters);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMenuSite(filters), `beforeend`);
render(siteMain, createSortFilms(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_FILMS_LIST_COUNT; i++) {
  render(filmsListContainer, createFilmCard(filmsArray[i]), `beforeend`);
}

render(filmsList, createButtonShowMore(), `beforeend`);

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatistic(), `beforeend`);

// Пока попап фильма не отрисовываем;
// render(footer, createFilmPopap(), `beforeend`);
