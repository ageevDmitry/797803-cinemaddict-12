import {renderTemplate, renderElement, RenderPosition} from "./utils.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import FilmFiltration from "./view/film-filtration.js";
import FilmSorting from "./view/film-sorting.js";
import FilmList from "./view/film-list.js";
import FilmCard from "./view/film-card.js";
import ButtonShowMore from "./view/button-show-more.js";
import Statistic from "./view/footer-statistic.js";
import FilmPopap from "./view/film-popap.js";
import Comments from "./view/comment-list.js";

const CARD_FILMS_COUNT = 20;
const CARD_FILMS_COUNT_PER_STEP = 5;

const userRank = generateUserRank();
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const filmStatistic = generateStatistic();
export const commentsArray = generateComments();

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);

renderElement(siteHeader, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new FilmFiltration(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new FilmSorting().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new FilmList().getElement(), RenderPosition.BEFOREEND);

const films = siteMain.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 1; i <= CARD_FILMS_COUNT_PER_STEP; i++) {
  renderElement(filmsListContainer, new FilmCard(filmsArray[i]).getElement(), RenderPosition.BEFOREEND);
}

if (filmsArray.length > CARD_FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = CARD_FILMS_COUNT_PER_STEP;

  renderElement(filmsList, new ButtonShowMore().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsList.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    filmsArray
      .slice(renderedFilmCount, renderedFilmCount + CARD_FILMS_COUNT_PER_STEP)
      .forEach((array) => renderElement(filmsListContainer, new FilmCard(array).getElement(), RenderPosition.BEFOREEND));
    renderedFilmCount += CARD_FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= filmsArray.length) {
      loadMoreButton.remove();
    }
  });
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

renderElement(footerStatistics, new Statistic(filmStatistic).getElement(), RenderPosition.BEFOREEND);

renderElement(footer, new FilmPopap(filmsArray[0]).getElement(), RenderPosition.BEFOREEND);

const filmDetails = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < commentsArray.length; i++) {
  renderElement(filmDetails, new Comments(commentsArray[i]).getElement(), RenderPosition.BEFOREEND);
}
