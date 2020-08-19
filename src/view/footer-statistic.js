import Abstract from "./abstract.js";

const createFooterStatistic = (filmStatistic) => {
  return (
    `<section class="footer__statistics">
      <p>${filmStatistic} movies inside</p>
    </section>`
  );
};

export default class Statistic extends Abstract {
  constructor(filmStatistic) {
    super();
    this._filmStatistic = filmStatistic;
  }

  getTemplate() {
    return createFooterStatistic(this._filmStatistic);
  }
}
