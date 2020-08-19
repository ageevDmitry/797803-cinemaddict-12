import {render, RenderPosition} from "./utils/render.js";
import {generateUserRank} from "./mock/user-rank-status.js";
import {generateStatistic} from "./mock/statistics.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import UserRank from "./view/user-rank.js";
import Statistic from "./view/footer-statistic.js";
import FilmsFiltration from "./view/films-filtration.js";
import Board from "./presenter/board.js";

const CARD_FILMS_COUNT = 20;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const userRank = generateUserRank();
const filmsArray = new Array(CARD_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(filmsArray);
const statistic = generateStatistic();
const boardPresenter = new Board(main);

render(header, new UserRank(userRank), RenderPosition.BEFOREEND);
render(main, new FilmsFiltration(filters), RenderPosition.BEFOREEND);
boardPresenter.init(filmsArray);
render(footer, new Statistic(statistic), RenderPosition.BEFOREEND);
