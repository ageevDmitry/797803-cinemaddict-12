const DESCRIPTION_SENTENCES_COUNT = 5;
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

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArray = function (arr) {
  const newArr = [];
  const cloneArr = arr.slice(0);
  const randomArrLength = getRandomInteger(1, DESCRIPTION_SENTENCES_COUNT);

  for (let i = 0; i < randomArrLength; i++) {
    const randomIndex = getRandomInteger(0, cloneArr.length - 1);
    newArr.push(cloneArr[randomIndex]);
    cloneArr.splice(randomIndex, 1);
  }

  return newArr;
};

const generateFilmTittle = () => {
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

const generateFilmDescription = () => {

  const defaultText =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`

  let defaultArray2 = [];

  const defaultArray = defaultText.split('. ');

  const randomArray = getRandomArray(defaultArray);

  randomArray.forEach(function (item) {
    const a = item.split(``)
    if (a[0] === ` `) {
      a.shift();
    } else if (a[a.length - 1] !== `.`)
      a.push(`.`)

    const total = a.reduce(function (sum, current) {
        return sum + `` + current;
      });

    defaultArray2.push(total)
  });

  const defaultArray3 = defaultArray2.reduce(function (sum, current) {
    return sum + ` ` + current;
  });

  const newFilmDescriptionArray = defaultArray3.split(``);

  let total;

  if (newFilmDescriptionArray.length > 140) {
    const array2 = newFilmDescriptionArray.slice(0, 139);
    array2.push(`...`);
    total = array2.reduce(function (sum, current) {
      return sum + `` + current;
    });
  } else {
    total = newFilmDescriptionArray.reduce(function (sum, current) {
      return sum + `` + current;
    });
  }

  return total;
};


export const generateFilm = () => {
  return {
    title: generateFilmTittle(),
    poster: generateFilmPoster(),
    description: generateFilmDescription(),
    genre: generateFilmGenre(),
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

