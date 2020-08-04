const DESCRIPTION_SENTENCES_COUNT = 5;

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

const generateFilmDescription = () => {
  const filmDescriptionSentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const newArray = getRandomArray(filmDescriptionSentences);

  const total = newArray.reduce(function (sum, current) {
    return sum + ` ` + current;
  });

return total;
};

export const generateFilm = () => {
  return {
    title: generateFilmTitile(),
    poster: generateFilmPoster(),
    description: generateFilmDescription(),
    genre: generateFilmGenre()
  }
};
