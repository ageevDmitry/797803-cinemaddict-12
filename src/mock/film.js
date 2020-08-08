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

const generateFilmRuntime = () => {

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
    poster: getRandomItem(FILM_POSTERS),
    title: getRandomItem(FILM_TITLES),
    originalTitle : getRandomItem(FILM_TITLES),
    rating: getRandomFractionInteger(FILM_RATING_MIN, FILM_RATING_MAX),
    director: ``,
    writers: ``,
    actors: ``,
    reliseDate: getRandomInteger(FILM_YEAR_MIN, FILM_YEAR_MAX),
    runtime: generateFilmRuntime(),
    country: ``,
    genre: getRandomArray(FILM_GENRES),
    description: generateFilmDescription(FILM_DESCRIPTION),
    ageLimit: ``,
    isWachlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger())
  }
};
