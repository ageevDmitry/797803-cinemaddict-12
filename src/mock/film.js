import {getRandomInteger} from "../utils.js";
import {getRandomFractionInteger} from "../utils.js";
import {getRandomArray} from "../utils.js";
import {getRandomItem} from "../utils.js";
import {getStringFromArray} from "../utils.js";
import {checkArrayPunctuation} from "../utils.js";
import {FILM_TITLES} from "../const.js";
import {FILM_POSTERS} from "../const.js";
import {FILM_DESCRIPTION} from "../const.js";
import {FILM_YEAR_MIN} from "../const.js";
import {FILM_YEAR_MAX} from "../const.js";
import {FILM_GENRES} from "../const.js";
import {FILM_HOUR_MIN} from "../const.js";
import {FILM_HOUR_MAX} from "../const.js";
import {FILM_MINUTES_MIN} from "../const.js";
import {FILM_MINUTES_MAX} from "../const.js";
import {FILM_RATING_MIN} from "../const.js";
import {FILM_RATING_MAX} from "../const.js";

const FiLM_STATISTIC_MIN = 100000;
const FiLM_STATISTIC_MAX = 200000;

const generateFilmDuration = () => {

  const hour = getRandomInteger(FILM_HOUR_MIN, FILM_HOUR_MAX);
  const min = getRandomInteger(FILM_MINUTES_MIN, FILM_MINUTES_MAX);

  const filmDuration = hour + `h` + ` ` + min + `min`;
  return filmDuration;
};

const generateFilmDescription = (description) => {

  const descriptionArray = description.split('. ');
  const checkedDescriptionArray = checkArrayPunctuation(descriptionArray);
  const newDescriptionArray = getRandomArray(checkedDescriptionArray);
  const newDescription = getStringFromArray(newDescriptionArray);

  return newDescription;
};

export const generateFilm = () => {
  return {
    title: getRandomItem(FILM_TITLES),
    poster: getRandomItem(FILM_POSTERS),
    description: generateFilmDescription(FILM_DESCRIPTION),
    genre: getRandomArray(FILM_GENRES),
    year: getRandomInteger(FILM_YEAR_MIN, FILM_YEAR_MAX),
    duration: generateFilmDuration(),
    rating: getRandomFractionInteger(FILM_RATING_MIN, FILM_RATING_MAX),
    isWachlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger())
  }
};

export const generateStatistic = () => {
  return getRandomInteger(FiLM_STATISTIC_MIN, FiLM_STATISTIC_MAX)
}

