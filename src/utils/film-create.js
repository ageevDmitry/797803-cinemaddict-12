import {FILM_DESCRIPTION_LENGTH} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

export const getStringFromArray = (array, separ = ` `) => {
  const string = array.reduce(function (sum, current) {
    return sum + separ + current;
  });
  return string;
};

export const checkArrayPunctuation = (array) => {
  let cloneArray = [];

  array.forEach(function (item) {
    const arraySymbol = item.split(``);
    if (arraySymbol[0] === ` `) {
      arraySymbol.shift();
    } else if (arraySymbol[arraySymbol.length - 1] !== `.`) {
      arraySymbol.push(`.`);
    }
    const total = getStringFromArray(arraySymbol, ``);

    cloneArray.push(total);
  });

  return cloneArray;
};

export const checkStringLength = (string) => {
  let cloneString;

  const stringArray = string.split(``);

  if (stringArray.length > FILM_DESCRIPTION_LENGTH) {
    const limitString = stringArray.slice(0, FILM_DESCRIPTION_LENGTH - 1);
    limitString.push(`...`);
    cloneString = getStringFromArray(limitString, ``);
  } else {
    cloneString = getStringFromArray(stringArray, ``);
  }
  return cloneString;
};

export const isFilmFlag = (flag) => {
  return (flag) ? `film-card__controls-item--active` : ``;
};

export const getRandomDate = (yearMin, yearMax) => {
  const year = getRandomInteger(yearMin, yearMax);
  const month = getRandomInteger(0, 12);
  const hour = getRandomInteger(0, 24);
  const minute = getRandomInteger(0, 60);

  const date = new Date(year, month, hour, minute);
  return date;
};
