/* eslint-disable class-methods-use-this */
import EnglishPuzzleView from './EnglishPuzzleView';
import EnglisPuzzleMaterial from './EnglishPuzzleMaterial';
import EnglisPuzzleDragDrop from './EnglishPuzzleDragDrop';
import engPuzConst from './EnglishPuzzleConstants';

export const EP_GAME_STATS = 'EP_GAME_STATS';

export default class EnglishPuzzleManager {
  constructor(difficulty = 0, page = 1) {
    this.difficulty = difficulty;
    this.page = page;
    this.puzzleLineIndex = 0;
    this.isAutoPlay = true;
    this.isTranslation = true;
    this.isPlayActive = true;
    this.isImageShow = true;
    this.imgSrc = 'https://tlmnnk.github.io/images/rslang/birthOfVenus.jpg';
    this.sentences = [
      'The students <b>agree</b> they have too much homework.',
      'There is a small <b>boat</b> on the lake.',
      'They <b>arrived</b> at school at 7 a.m.',
      'Is your birthday in <b>August</b>?',
      'I ate eggs for <b>breakfast</b>.',
      'I brought my <b>camera</b> on my vacation.',
      'The <b>capital</b> of the United States is Washington, D.C.',
      'Did you <b>catch</b> the ball during the baseball game?',
      'People feed <b>ducks</b> at the lake.',
      'The woman <b>enjoys</b> riding her bicycle.',
    ];
    this.view = new EnglishPuzzleView();
  }

  attach(element) {
    this.view.attach(element);
    this.material = new EnglisPuzzleMaterial();
  }

  async init() {
    await this.getPuzzleElements();
    this.puzzleLineRender(this.puzzleLineIndex);
    this.eventListenersInit();
  }

  canvasClickHandler(e) {
    if (e.target.parentNode.classList.contains('engPuz__drop-section--line', `row-${this.puzzleLineIndex}`)) {
      console.log('hello');
      const drapSection = document.querySelector('.group-words');
      drapSection.appendChild(e.target);
      return;
    }
    if (e.target.parentNode.classList.contains('group-words')) {
      console.log(`.row-${this.puzzleLineIndex}`);
      const dragSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
      console.log('hi');
      console.log(dragSection);
      dragSection.appendChild(e.target);
    }
  }

  eventListenersInit() {
    this.view.element.addEventListener('click', (e) => {
      this.checkButtonHandler(e);
      this.canvasClickHandler(e);
    });
  }

  checkButtonHandler() {
  /*  if (e.classList.contains(engPuzConst.buttons.CHECK)) {
     const dragSection = document.querySelector(`.${engPuzConst.content.DROPSECTION} .group-words`);

    } */
  }

  puzzleLineRender(lineIndex) {
    // todo shuffle sentences array
    const dragContainer = document.querySelector(engPuzConst.content.DRAGSECTION);
    console.log(dragContainer);
    // this.view.clearContainer(dragContainer);
    const dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    dragZone.appendChild(this.puzzle[lineIndex]);
    // eslint-disable-next-line no-new
    new EnglisPuzzleDragDrop();
    // EnglisPuzzleDragDrop.activateNextLineDND(lineIndex);
  }

  async getPuzzleElements() {
    this.puzzle = await this.view.getPuzzleElements(this.imgSrc, this.sentences);
    console.log(this.puzzle[0]);
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
