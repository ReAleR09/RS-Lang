/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import Sortable from 'sortablejs';
import engPuzConst from './EnglishPuzzleConstants';

export default class EnglisPuzzleDragDrop {
  constructor() {
    this.dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    this.dropZone = document.querySelector(`.${engPuzConst.content.DROPSECTION}`);
  }

  init() {
    new Sortable(this.dragZone, {
      group: 'shared', // set both lists to same group
      animation: 150,
    });

    new Sortable(this.dropZone, {
      group: 'shared',
      animation: 150,
    });
  }
}