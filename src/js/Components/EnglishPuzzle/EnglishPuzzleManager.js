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

  eventListenersInit() {
    this.view.element.addEventListener('click', (e) => {
      this.canvasClickHandler(e);
      this.checkButtonHandler(e);
      this.idkClickHandler(e);
    });
  }

  idkClickHandler(e) {
    if (e.target.classList.contains('engPuz__bottom-idk')) {
      const dragContainer = document.querySelector('.engPuz__drag-section .group-words');
      const dropContainer = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);

      this.view.clearContainer(dropContainer);
      this.appendCorrectLineToDropOnIdkPress();
      this.view.clearContainer(dragContainer);
      this.view.addCanvasHighlight(this.puzzleLineIndex);
      this.view.renameCheckButton();
      this.view.toggleDisableButton();
    }
  }

  appendCorrectLineToDropOnIdkPress() {
    const dropSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
    const row = this.puzzle[this.puzzleLineIndex].children;
    [...row].forEach((item) => {
      dropSection.appendChild(item);
    });
  }

  isLastCanvasInDragSection() {
    const dragContainer = document.querySelector('.group-words');
    if (!dragContainer.firstChild) {
      this.checkLineAnswers();
    }
  }

  checkLineAnswers() {
    const canvasDropToCheck = document.querySelectorAll(`.canvas-row-${this.puzzleLineIndex + 1}`);
    [...canvasDropToCheck].forEach((canvas) => {
      if (canvas.classList.contains('canvas-red')) {
        console.log('IDK or skip!');
      }
    });
  }

  canvasClickHandler(e) {
    if (e.target.parentNode.classList.contains('engPuz__drop-section--line', `row-${this.puzzleLineIndex}`)) {
      const dragSection = document.querySelector('.group-words');
      e.target.classList.contains('canvas-green') ? e.target.classList.remove('canvas-green') : null;
      e.target.classList.contains('canvas-red') ? e.target.classList.remove('canvas-red') : null;
      dragSection.appendChild(e.target);
      this.isLastCanvasInDragSection();
      return;
    }
    if (e.target.parentNode.classList.contains('group-words')) {
      const dropSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
      dropSection.appendChild(e.target);
    }
    this.isLastCanvasInDragSection();
  }

  checkButtonHandler(e) {
    const checkBtn = this.view.element.querySelector(`.${engPuzConst.buttons.CHECK}`);
    if (e.target.classList.contains(engPuzConst.buttons.CHECK)) {
      if (checkBtn.innerText === 'CHECK') {
        this.view.removeCanvasHighlight(this.puzzleLineIndex);
        this.view.addCanvasHighlight(this.puzzleLineIndex);
      }
      if (checkBtn.innerText === 'CONTINUE') {
        this.view.removeCanvasHighlight(this.puzzleLineIndex);
        this.view.toggleDisableButton();
        this.puzzleLineIndex += 1;
        this.view.clearContainer(document.querySelector(`.${engPuzConst.content.DRAGSECTION}`));
        this.puzzleLineRender(this.puzzleLineIndex);
        this.view.renameCheckButton();
        EnglisPuzzleDragDrop.activateNextLineDND(this.puzzleLineIndex);
      }
    }
  }

  puzzleLineRender(lineIndex) {
    // todo shuffle sentences array this.puzzle[lineIndex]
    const dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    dragZone.append(this.puzzleClone[lineIndex]);
    // eslint-disable-next-line no-new
    new EnglisPuzzleDragDrop();
    // EnglisPuzzleDragDrop.activateNextLineDND(lineIndex);
  }

  async getPuzzleElements() {
    // insert preloader
    this.puzzle = await this.view.getPuzzleElements(this.imgSrc, this.sentences);
    // delete preloader
    this.puzzleClone = [...this.puzzle];
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
