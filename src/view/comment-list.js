import {createElement} from "../utils.js";

const generateFilmCommentsString = (comment) => {

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

export default class Comments {
  constructor(comment) {
    this._comment = comment;

    this._element = null;
  }

  getTemplate() {
    return generateFilmCommentsString(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};
