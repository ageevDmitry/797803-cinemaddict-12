import Abstract from "./abstract.js";

const createFilmsSection = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class FilmsSection extends Abstract {
  getTemplate() {
    return createFilmsSection();
  }
}
