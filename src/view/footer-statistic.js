import {createElement} from "../utils.js";

export const createFooterStatistic = (filmStatistic) => {
  return (
    `<p>${filmStatistic} movies inside</p>`
  );
};

export default class Statistic {
  constructor(filmStatistic) {
    this._filmStatistic = filmStatistic;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatistic(this._filmStatistic);
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
}
