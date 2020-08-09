export const generateFilmCommentsString = (comment) => {

  let total = ``;

  comment.forEach((item) =>{
    const {emoji,
      text,
      author,
      day} = item;

    total = total +
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${day}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
        </div>
    </li>`
  });

  return total;
};
