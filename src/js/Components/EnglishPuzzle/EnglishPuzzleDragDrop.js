/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import Sortable from 'sortablejs';
import engPuzConst from './EnglishPuzzleConstants';

const OPTIONS = {
  group: 'shared', // set both lists to same group
  animation: 150,
  pull: 'clone',
  ghostClass: 'blue-background-class',
  swap: true,
  swapClass: 'highlight',
  dragoverBubble: true,
  removeCloneOnHide: true,
};

export default class EnglisPuzzleDragDrop {
  constructor() {
    this.dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION} .group-words`);
    this.dropZone = document.querySelector('.engPuz__drop-section--line.row-0');
    this.instances = [];
    this.toDisable = [];
    this.init();
  }

  createInstance(node) {
    const instance = new Sortable(node, OPTIONS);
    this.instances.push(instance);
  }

  init() {
    new Sortable(this.dragZone, {
      group: 'shared', // set both lists to same group
      animation: 150,
      pull: 'clone',
      ghostClass: 'blue-background-class',
      swap: true,
      swapClass: 'highlight',
      dragoverBubble: true,
      removeCloneOnHide: true,
    });

    this.createInstance(this.dropZone);
  }

  static activateNextLineDND(rowIndex) {
    if (document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex - 1}`)) {
      new Sortable(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex - 1}`), {
        swap: true,
        group: 'shared',
        disabled: true,
      });
    }
    new Sortable(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex}`), {
      group: 'shared',
      animation: 150,
    });
  }
}
