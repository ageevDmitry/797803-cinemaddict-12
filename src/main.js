import {render, RenderPosition} from "./utils/render.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import Statistic from "./view/footer-statistic.js";
import FilmsFiltration from "./view/films-filtration.js";
import MovieList from "./presenter/movie-list.js";
import Films from "./model/films.js";
import Comments from "./model/comments.js";

const CARD_FILMS_COUNT = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const userRank = generateUserRank();
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
<<<<<<< HEAD
const commentsArray = new Array(CARD_FILMS_COUNT).fill().map(generateComments);
=======

for (let i = 0; i < CARD_FILMS_COUNT; i++) {
  commentsArray.push(generateComments(i));
}
>>>>>>> 274d71851251ca2065fa84c28a21d04364134b05

const filmsModel = new Films();
const commentsModel = new Comments();
filmsModel.setFilms(filmsArray);
commentsModel.setComments(commentsArray);

const filters = generateFilter(filmsArray);
const statistic = generateStatistic();
const MovieListPresenter = new MovieList(main, filmsModel, commentsModel);

render(header, new UserRank(userRank), RenderPosition.BEFOREEND);
render(main, new FilmsFiltration(filters), RenderPosition.BEFOREEND);
MovieListPresenter.init();
render(footer, new Statistic(statistic), RenderPosition.BEFOREEND);
