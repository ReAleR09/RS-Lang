/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import Sortable from 'sortablejs';
import engPuzConst from './EnglishPuzzleConstants';

export default class EnglisPuzzleDragDrop {
  constructor() {
    this.dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION} .group-words`);
    this.dropZone = document.querySelector('.engPuz__drop-section--line');
    this.init();
  }

  init() {
    new Sortable(this.dragZone, {
      group: 'shared', // set both lists to same group
      animation: 150,
      ghostClass: 'blue-background-class',
      swap: true,
      swapClass: 'highlight',
      dragoverBubble: true,
      removeCloneOnHide: true,
    });

    new Sortable(this.dropZone, {
      group: 'shared',
      animation: 150,
      ghostClass: 'blue-background-class',
      swap: true,
      swapClass: 'highlight',
      dragoverBubble: true,
      removeCloneOnHide: true,
      onEnd(evt) {
        if (evt.to.classList.contains('group-words')) {
          evt.item.classList.remove('canvas-green', 'canvas-red');
        }
      },
    });
  }

  static activateNextLineDND(rowIndex) {
    console.log(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex - 1}`));
    if (document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex - 1}`)) {
      new Sortable(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex - 1}`), {
        disabled: true,
      });
    }
    new Sortable(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${rowIndex}`), {
      group: 'shared',
      animation: 150,
    });
  }
}
