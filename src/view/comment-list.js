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

export const generateFilmCommentsString = (comments) => {

  let filmCommentsString = ``;

  for (let i = 0; i < comments.length; i++) {
    const currentComment = generateComment(comments[i]);
    filmCommentsString = filmCommentsString + currentComment;
  }

  return filmCommentsString;
};
