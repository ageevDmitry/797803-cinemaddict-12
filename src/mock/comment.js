import {getRandomInteger} from "../utils.js";
import {getRandomItem} from "../utils.js";
import {FILM_COMMENTS_MIN} from "../const.js";
import {FILM_COMMENTS_MAX} from "../const.js";
import {COMMENT_EMOJIS} from "../const.js";
import {COMMENT_TEXTS} from "../const.js";
import {COMMENT_AUTHORS} from "../const.js";

export const generateComments = () => {

  const comments = [];

  for (let i = 0; i < getRandomInteger(FILM_COMMENTS_MIN, FILM_COMMENTS_MAX); i ++) {
    let comment = {
      emoji: getRandomItem(COMMENT_EMOJIS),
      text: getRandomItem(COMMENT_TEXTS),
      author: getRandomItem(COMMENT_AUTHORS),
      day: `test`,
    }
    comments.push(comment);
  }

 return comments;
}
