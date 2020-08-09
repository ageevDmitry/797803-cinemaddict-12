import {FILM_STATISTIC_MIN} from "../const.js";
import {FILM_STATISTIC_MAX} from "../const.js";
import {getRandomInteger} from "../utils.js";

export const generateStatistic = () => {
  return getRandomInteger(FILM_STATISTIC_MIN, FILM_STATISTIC_MAX);
};
