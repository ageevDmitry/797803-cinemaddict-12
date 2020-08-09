import {USER_RANKS} from "../const.js";
import {USER_RANK_MIN} from "../const.js";
import {USER_RANK_MAX} from "../const.js";
import {USER_RANK_NOVICE} from "../const.js";
import {USER_RANK_FAN} from "../const.js";
import {USER_RANK_MOVIE_BUFF} from "../const.js";
import {getRandomInteger} from "../utils.js";

export const generateUserRank = () => {
  let userRank;

  const userRankInteger = getRandomInteger(USER_RANK_MIN, USER_RANK_MAX);

  switch (true) {
    case userRankInteger === USER_RANK_MIN:
      userRank = ``;
      break;
    case userRankInteger >= USER_RANK_NOVICE && userRankInteger < USER_RANK_FAN:
      userRank = USER_RANKS[0];
      break;
    case userRankInteger >= USER_RANK_FAN && userRankInteger <= USER_RANK_MOVIE_BUFF:
      userRank = USER_RANKS[1];
      break;
    case userRankInteger >= USER_RANK_MOVIE_BUFF:
      userRank = USER_RANKS[2];
      break;
  }

  return userRank;
};
