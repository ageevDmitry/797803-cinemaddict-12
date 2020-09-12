import {getRandomInteger, getRandomFractionInteger, getRandomArray, getRandomItem} from "../utils/common.js";
import {getStringFromArray, checkArrayPunctuation, getRandomDate} from "../utils/film-create.js";
import {FILM_POSTERS, FILM_TITLES, FILM_DIRECTORS, FILM_WRITERS, FILM_ACTORS, COUNTRIES, AGE_LIMITS, FILM_DESCRIPTION, FILM_YEAR_MIN, FILM_YEAR_MAX, FILM_GENRES, FILM_HOUR_MIN, FILM_HOUR_MAX, FILM_MINUTES_MIN, FILM_MINUTES_MAX, FILM_RATING_MIN, FILM_RATING_MAX, COMMENTS_ID} from "../const.js";

const generateFilmRuntime = () => {

  const hour = getRandomInteger(FILM_HOUR_MIN, FILM_HOUR_MAX);
  const min = getRandomInteger(FILM_MINUTES_MIN, FILM_MINUTES_MAX);
  const filmDuration = hour + `h` + ` ` + min + `min`;

  return filmDuration;
};

const generateFilmDescription = (description) => {

  const descriptionArray = description.split(`. `);
  const checkedDescriptionArray = checkArrayPunctuation(descriptionArray);
  const newDescriptionArray = getRandomArray(checkedDescriptionArray);
  const newDescription = getStringFromArray(newDescriptionArray);

  return newDescription;
};

export const generateFilm = (id) => {
  return {
    id: id,
    poster: getRandomItem(FILM_POSTERS),
    title: getRandomItem(FILM_TITLES),
    originalTitle: getRandomItem(FILM_TITLES),
    rating: getRandomFractionInteger(FILM_RATING_MIN, FILM_RATING_MAX),
    director: getRandomItem(FILM_DIRECTORS),
    writers: getRandomArray(FILM_WRITERS),
    actors: getRandomArray(FILM_ACTORS),
    reliseDate: getRandomDate(FILM_YEAR_MIN, FILM_YEAR_MAX),
    runtime: generateFilmRuntime(),
    country: getRandomItem(COUNTRIES),
    genre: getRandomArray(FILM_GENRES),
    description: generateFilmDescription(FILM_DESCRIPTION),
    ageLimit: getRandomItem(AGE_LIMITS),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: true,
    isFavorite: Boolean(getRandomInteger()),
    comments: getRandomArray(COMMENTS_ID),
  };
};
