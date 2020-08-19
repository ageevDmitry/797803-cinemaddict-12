import Abstract from "./abstract.js";

const createButtonShowMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore extends Abstract {
  getTemplate() {
    return createButtonShowMore();
  }
}
