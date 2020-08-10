import {getRandomInteger, getRandomItem, getRandomDate} from "../utils.js";
import {FILM_COMMENTS_MIN, FILM_COMMENTS_MAX, COMMENT_EMOJIS, COMMENT_TEXTS, COMMENT_AUTHORS, COMMENT_YEAR_MIN, COMMENT_YEAR_MAX} from "../const.js";

export const generateComments = () => {

  const comments = [];

  for (let i = 0; i < getRandomInteger(FILM_COMMENTS_MIN, FILM_COMMENTS_MAX); i++) {
    let comment = {
      emoji: getRandomItem(COMMENT_EMOJIS),
      text: getRandomItem(COMMENT_TEXTS),
      author: getRandomItem(COMMENT_AUTHORS),
      day: getRandomDate(COMMENT_YEAR_MIN, COMMENT_YEAR_MAX),
    };
    comments.push(comment);
  }

  return comments;
};
