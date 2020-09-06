import SmartView from "./smart.js";
import {getStringFromArray} from "../utils/film-create.js";
import {COMMENT_EMOJIS} from "../const.js";
import {formatDate} from "../utils/film-create.js";
import moment from "moment";

const renderFilmComment = (comment) => {

  const {emoji, text, author, day} = comment;

  const commentDayLocale = moment(day).fromNow();

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDayLocale}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
        </div>
    </li>`
  );
};

const renderFilmComments = (comments) => {

  let filmCommentsString = ``;

  for (let i = 0; i < comments.length; i++) {
    const currentComment = renderFilmComment(comments[i]);
    filmCommentsString = filmCommentsString + currentComment;
  }

  return filmCommentsString;
};

const renderUserComment = (commentUserEmodji) => {

  const imgEmodji = commentUserEmodji ? `<img src="images/emoji/${commentUserEmodji}.png" width="55" height="55" alt="emoji-smile">` : ``;

  return (
    `<div for="add-emoji" class="film-details__add-emoji-label">
        ${imgEmodji}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>`
  );
};

const renderEmodjiList = (commentUserEmodji) => {
  return COMMENT_EMOJIS.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}"
    ${commentUserEmodji === emoji ? `checked` : ``}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`).join(``);
};

const createFilmPopap = (data) => {

  console.log(data);
  const {poster, title, originalTitle, rating, director, writers, actors, reliseDate, runtime, country, genre, description, ageLimit, isWatchlist, isWatched, isFavorite, comments, commentUserEmodji} = data;

  const filmGenres = (genreArray) => {
    let total = ``;
    genreArray.forEach((item) => {
      total = total + `<span class="film-details__genre">${item}</span>`;
    });
    return total;
  };

  const writersString = getStringFromArray(writers, `, `);
  const actorsString = getStringFromArray(actors, `, `);
  const genreTittle = genre.length > 1 ? `Genres` : `Genre`;
  const genreString = filmGenres(genre);
  const filmPopapReliseDate = formatDate(reliseDate, `DD MMMM YYYY`);
  const isWatchlistChecked = isWatchlist ? `checked` : ``;
  const isWatchedClassChecked = isWatched ? `checked` : ``;
  const isFavoriteClassChecked = isFavorite ? `checked` : ``;
  const commentsFilmString = renderFilmComments(comments);
  const commentUserString = renderUserComment(commentUserEmodji);
  const commentEmodjString = renderEmodjiList(commentUserEmodji);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageLimit}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersString}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsString}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmPopapReliseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreTittle}</td>
                  <td class="film-details__cell">
                    ${genreString}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlistChecked}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatchedClassChecked}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteClassChecked}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments<span class="film-details__comments-count"> ${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${commentsFilmString}
        </ul>

        <div class="film-details__new-comment">
          ${commentUserString}
          <div class="film-details__emoji-list">
            ${commentEmodjString}
          </div>
        </div>
      </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopap extends SmartView {
  constructor(film, comments) {
    super();
    this._data = FilmPopap.parseFilmToData(film, comments);
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._choiceEmojiComment = this._choiceEmojiComment.bind(this);

    this._setInnerHandlers();
  }

  _choiceEmojiComment(evt) {
    this.updateData({
      commentUserEmodji: evt.target.value
    });
  }

  reset(film, comments) {
    this.updateData(
      FilmPopap.parseFilmToData(film, comments)
    );
  }

  getTemplate() {
    return createFilmPopap(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._choiceEmojiComment);
  }

  _clickHandler() {
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  static parseFilmToData(film, comments) {
    return Object.assign(
        {},
        film,
        {
          comments: comments
        },
        {
          commentUserEmodji: null,
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.commentUserEmodji;
    delete data.comments;

    return data;
  }
}
