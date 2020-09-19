import Abstract from "./abstract.js";
import moment from "moment";

const createComment = (comment) => {

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

export default class Comment extends Abstract {
  constructor(comment) {
    super();

    this._comment = comment;
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
  }

  getTemplate() {
    return createComment(this._comment);
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.foo(`Удаление комментария!`);
  }

  setDeleteHandler(callback) {
    this._callback.foo = callback;
    this.getElement().querySelector(`.film-details__comment-text`).addEventListener(`click`, this._commentDeleteHandler);
  }
}
