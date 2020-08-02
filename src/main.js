import {createUserRankTemplate} from "./view/user-rank.js";
import {createMenuSite} from "./view/site-menu.js";
import {createSortFilms} from "./view/sort-films.js";
import {createFilmsList} from "./view/films-list.js";
import {createFilmCard} from "./view/films-card.js";
import {createButtonShowMore} from "./view/button-show-more.js";
import {createFilmsListTopRated} from "./view/films-list-top-rated.js";
import {createFilmsListMostCommented} from "./view/films-list-most-comment.js";
import {createFooterStatistic} from "./view/footer-statistic.js";
import {createFilmPopap} from "./view/film-popap.js";

const CARD_FILMS_LIST_COUNT = 5;
const CARD_FILMS_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMenuSite(), `beforeend`);
render(siteMain, createSortFilms(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_FILMS_LIST_COUNT; i++) {
  render(filmsListContainer, createFilmCard(), `beforeend`);
}

render(filmsList, createButtonShowMore(), `beforeend`);

render(films, createFilmsListTopRated(), `beforeend`);

const filmsListTopRated = siteMain.querySelector(`.films-list--top-rated`);
const topRatedContainer = filmsListTopRated.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_FILMS_EXTRA_COUNT; i++) {
  render(topRatedContainer, createFilmCard(), `beforeend`);
}

render(films, createFilmsListMostCommented(), `beforeend`);

const filmsListMostComment = siteMain.querySelector(`.films-list--most-comment`);
const mostCommentContainer = filmsListMostComment.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_FILMS_EXTRA_COUNT; i++) {
  render(mostCommentContainer, createFilmCard(), `beforeend`);
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatistic(), `beforeend`);

// Пока попап фильма не отрисовываем;
// render(footer, createFilmPopap(), `beforeend`);
