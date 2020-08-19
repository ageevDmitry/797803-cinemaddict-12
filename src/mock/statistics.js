import {getRandomInteger} from "../utils/common.js";
import {FILM_STATISTIC_MIN, FILM_STATISTIC_MAX} from "../const.js";

export const generateStatistic = () => {
  return getRandomInteger(FILM_STATISTIC_MIN, FILM_STATISTIC_MAX);
};
