/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
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

  isLastCanvasInDragSection() {
    const dragContainer = document.querySelector('.group-words');
    if (!dragContainer.firstChild) {
      console.log('hellloooo');
      this.checkLineAnswers();
    }
  }

  checkLineAnswers() {
    const canvasDropToCheck = document.querySelectorAll(`.canvas-row-${this.puzzleLineIndex + 1}`);
    console.log(canvasDropToCheck);
    [...canvasDropToCheck].forEach((canvas) => {
      if (canvas.classList.contains('canvas-red')) {
        console.log('IDK or skip!');
      }
    });
  }

  canvasClickHandler(e) {
    if (e.target.parentNode.classList.contains('engPuz__drop-section--line', `row-${this.puzzleLineIndex}`)) {
      const drapSection = document.querySelector('.group-words');
      e.target.classList.contains('canvas-green') ? e.target.classList.remove('canvas-green') : null;
      e.target.classList.contains('canvas-red') ? e.target.classList.remove('canvas-red') : null;
      drapSection.appendChild(e.target);
      this.isLastCanvasInDragSection();
      return;
    }
    if (e.target.parentNode.classList.contains('group-words')) {
      const dragSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
      dragSection.appendChild(e.target);
    }
    this.isLastCanvasInDragSection();
  }

  eventListenersInit() {
    this.view.element.addEventListener('click', (e) => {
      this.canvasClickHandler(e);
      this.checkButtonHandler(e);
    });
  }

  checkButtonHandler(e) {
    if (e.target.classList.contains(engPuzConst.buttons.CHECK)) {
      this.view.removeCanvasHighlight(this.puzzleLineIndex);
      // const dragSection = document.querySelector(`.${engPuzConst.content.DRAGSECTION}
      // .group-words`);
      this.view.addCanvasHighlight(this.puzzleLineIndex);
    }
  }

  puzzleLineRender(lineIndex) {
    // todo shuffle sentences array this.puzzle[lineIndex]
    const dragContainer = document.querySelector(engPuzConst.content.DRAGSECTION);
    console.log(dragContainer);

    const dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    const puzzleLine = this.puzzle[lineIndex];
    dragZone.appendChild(puzzleLine);
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
