/* eslint-disable class-methods-use-this */
import M from 'materialize-css';

export default class EnglishPuzzleMaterial {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getSelectValue(elem) {
    return M.FormSelect.getInstance(elem).getSelectedValues();
  }
}
