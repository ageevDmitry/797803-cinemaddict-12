import Abstract from "./abstract.js";

const createFilmsContainer = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

export default class FilmsContainer extends Abstract {
  getTemplate() {
    return createFilmsContainer();
  }
}
