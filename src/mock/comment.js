import {getRandomInteger, getRandomItem} from "../utils/common.js";
import {getRandomDate} from "../utils/film-create.js";
import {FILM_COMMENTS_MIN, FILM_COMMENTS_MAX, COMMENT_EMOJIS, COMMENT_TEXTS, COMMENT_AUTHORS, COMMENT_YEAR_MIN, COMMENT_YEAR_MAX} from "../const.js";

export const generateComments = (id) => {

  const comments = {
    id: id,
    emoji: getRandomItem(COMMENT_EMOJIS),
    text: getRandomItem(COMMENT_TEXTS),
    author: getRandomItem(COMMENT_AUTHORS),
    day: getRandomDate(COMMENT_YEAR_MIN, COMMENT_YEAR_MAX),
  }

  return comments;
}

  // for (let i = 0; i < getRandomInteger(FILM_COMMENTS_MIN, FILM_COMMENTS_MAX); i++) {
  //   let comment = {
  //
  //   };
  //   comments.push(comment);
  // }

//   return comments;
// };

