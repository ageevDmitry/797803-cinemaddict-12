// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateFilmTitile = () => {
  const filmTitles = [
    `Где деньги, Лебовски?`,
    `Generation P`,
    `ДМБ`,
    `Star Wars`,
    `Карты, деньги, два ствола`,
    `Игра престолов`,
    `Аватар`,
    `Миллионер из трущоб`,
    `Бриллиантовая рука`,
    `Операция Ы`
  ];

const randomIndex = getRandomInteger(0, filmTitles.length - 1);

return filmTitles[randomIndex];
};

const generateFilmPoster = () => {
  const filmPosters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

const randomIndex = getRandomInteger(0, filmPosters.length - 1);

return filmPosters[randomIndex];
};

export const generateFilm = () => {
  return {
    title: generateFilmTitile(),
    poster: generateFilmPoster(),
  }
};
