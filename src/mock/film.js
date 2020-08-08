import {getRandomInteger} from "../utils.js";
import {getRandomArray} from "../utils.js";
import {getRandomItem} from "../utils.js";
import {getStringFromArray} from "../utils.js";
import {checkArrayPunctuation} from "../utils.js";
import {checkStringLength} from "../utils.js";


import {FILM_TITLES} from "../const.js";
import {FILM_POSTERS} from "../const.js";
import {FILM_DESCRIPTION} from "../const.js";
import {FILM_GENRES} from "../const.js";

const FILM_YEAR_MIN = 1900;
const FILM_YEAR_MAX = 2020;
const FILM_HOUR_MIN = 0;
const FILM_HOUR_MAX = 3;
const FILM_MINUTES_MIN = 1;
const FILM_MINUTES_MAX = 59;
const FILM_RATING_MIN = 0;
const FILM_RATING_MAX = 100;
const FiLM_RATING_FRACTION = 10;
const FiLM_STATISTIC_MIN = 100000;
const FiLM_STATISTIC_MAX = 200000;
const USER_RANK_MIN = 0;
const USER_RANK_MAX = 30;

const generateFilmGenre = () => {
  const filmGenres = [
    `Drama`,
    `Mystery`,
    `Comedy`,
    `Western`,
    `Musical`,
    `Cartoon`
  ];

const randomIndex = getRandomInteger(0, filmGenres.length - 1);

return filmGenres[randomIndex];
};

const generateFilmYear = () => {

const filmYear = getRandomInteger(FILM_YEAR_MIN, FILM_YEAR_MAX);

return filmYear;
};

const generateFilmDuration = () => {

  const hour = getRandomInteger(FILM_HOUR_MIN, FILM_HOUR_MAX);
  const min = getRandomInteger(FILM_MINUTES_MIN, FILM_MINUTES_MAX);

  const filmDuration = hour + `h` + ` ` + min + `min`;
  return filmDuration;
};

const generateFilmRating = () => {

  const filmRating = getRandomInteger(FILM_RATING_MIN, FILM_RATING_MAX)/FiLM_RATING_FRACTION;
  return filmRating;
};

const generateFilmDescription = (FILM_DESCRIPTION) => {

  const descriptionArray = FILM_DESCRIPTION.split('. ');
  const checkedDescriptionArray = checkArrayPunctuation(descriptionArray);
  const newDescriptionArray = getRandomArray(checkedDescriptionArray);
  const newDescription = getStringFromArray(newDescriptionArray);
  // const checkedNewDescription = checkStringLength(newDescription);

  return newDescription;
};

export const generateFilm = () => {
  return {
    title: getRandomItem(FILM_TITLES),
    poster: getRandomItem(FILM_POSTERS),
    description: generateFilmDescription(FILM_DESCRIPTION),
    genre: getRandomArray(FILM_GENRES),
    year: generateFilmYear(),
    duration: generateFilmDuration(),
    rating: generateFilmRating(),
    isWachlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  }
};

export const generateStatistic = () => {
  return getRandomInteger(FiLM_STATISTIC_MIN, FiLM_STATISTIC_MAX)
}

export const generateUserRank = () => {
  const userRankArray = [
    `Novice`,
    `Fan`,
    `Movie Buff`
  ];

  const userRank1 = getRandomInteger(USER_RANK_MIN, USER_RANK_MAX);

  let userRank2

  switch (true) {
    case userRank1 === USER_RANK_MIN:
      userRank2 = '';
      break;
    case userRank1 > USER_RANK_MIN && userRank1 < 10:
      userRank2 = userRankArray[0];
      break;
    case userRank1 > 10 && userRank1 <= 20:
      userRank2 = userRankArray[1];
      break;
    case userRank1 > 20:
      userRank2 = userRankArray[2];
      break;
  }

  return userRank2;
}
