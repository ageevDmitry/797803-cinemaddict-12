import Abstract from "./abstract.js";
import {getStringFromArray} from "../utils/film-create.js";

const generateComment = (comment) => {

  const {emoji, text, author, day} = comment;

  const commentDayLocale = day.toLocaleString(`en-ZA`, {year: `numeric`, month: `numeric`, day: `numeric`});

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
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

const generateFilmCommentsString = (comments) => {

  let filmCommentsString = ``;

  for (let i = 0; i < comments.length; i++) {
    const currentComment = generateComment(comments[i]);
    filmCommentsString = filmCommentsString + currentComment;
  }

  return filmCommentsString;
};

const createFilmPopap = (film) => {

  const {poster, title, originalTitle, rating, director, writers, actors, reliseDate, runtime, country, genre, description, ageLimit, isWatchlist, isWatched, isFavorite, comments} = film;

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
  const filmPopapReliseDate = reliseDate.toLocaleString(`en-GB`, {year: `numeric`, month: `long`, day: `numeric`});
  const commentsString = generateFilmCommentsString(comments);
  const isWatchlistChecked = isWatchlist ? `checked` : ``;
  const isWatchedClassChecked = isWatched ? `checked` : ``;
  const isFavoriteClassChecked = isFavorite ? `checked` : ``;
  const commentEmodji = `<div for="add-emoji" class="film-details__add-emoji-label">
                          <img src="images/emoji/sleeping.png" width="55" height="55" alt="emoji-smile">
                        </div>`


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
          ${commentsString}
        </ul>
        <div class="film-details__new-comment">
          ${commentEmodji}

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopap extends Abstract {
  constructor(filmPopap) {
    super();
    this._filmPopap = filmPopap;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopap(this._filmPopap);
  }

  _clickHandler() {
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`,this._watchlistClickHandler);
  }
}
