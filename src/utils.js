import {FILM_DESCRIPTION_LENGTH} from "./const.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFractionInteger = (a = 0, b = 1) => {
  const randomInteger = Math.random() * (b - a) + a;
  const randomFractionInteger = Math.floor(randomInteger * 10) / 10;

  return randomFractionInteger;
};

export const getRandomArray = (array) => {
  const newArray = [];
  const cloneArray = array.slice(0);
  const randomArrayLength = getRandomInteger(1, array.length);

  for (let i = 0; i < randomArrayLength; i++) {
    const randomIndex = getRandomInteger(0, cloneArray.length - 1);
    newArray.push(cloneArray[randomIndex]);
    cloneArray.splice(randomIndex, 1);
  }

  return newArray;
};

export const getRandomItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

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
