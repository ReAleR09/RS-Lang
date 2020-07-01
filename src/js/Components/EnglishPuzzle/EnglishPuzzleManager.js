/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import EnglishPuzzleView from './EnglishPuzzleView';
import EnglisPuzzleMaterial from './EnglishPuzzleMaterial';
import EnglisPuzzleDragDrop from './EnglishPuzzleDragDrop';
import engPuzConst from './EnglishPuzzleConstants';
import MockWordsApi from './mockWords';
import AppNavigator from '../../lib/AppNavigator';
import Utils from '../../Utils/Utils';
import { CONF_MEDIA_BASE_PATH } from '../../../config';

export const EP_GAME_STATS = 'EP_GAME_STATS';

export default class EnglishPuzzleManager {
  constructor(difficulty = 1, page = 1) {
    this.difficulty = difficulty;
    this.words = MockWordsApi.getWordsForDifficulty(this.difficulty);
    this.page = page;
    this.puzzleLineIndex = 0;
    this.isAutoPlay = true;
    this.isTranslation = true;
    this.isPlayActive = true;
    this.isImageShow = true;
    this.answers = {};
    this.puzzleArr = [[], [], [], [], [], [], [], [], [], []];
    this.imgSrc = 'https://tlmnnk.github.io/images/rslang/birthOfVenus.jpg';
    this.sentences = [];
    this.view = new EnglishPuzzleView();
  }

  attach(element) {
    this.view.attach(element);
    this.material = new EnglisPuzzleMaterial();
  }

  getSentencesForGame() {
    this.words.forEach((word) => {
      this.sentences.push(word.textExample);
    });
  }

  async init() {
    this.getSentencesForGame();
    await this.getPuzzleElements();
    this.puzzleLineRender(this.puzzleLineIndex);
    this.eventListenersInit();
  }

  eventListenersInit() {
    this.view.element.addEventListener('click', (e) => {
      this.canvasClickHandler(e);
      this.checkButtonHandler(e);
      this.idkClickHandler(e);
      this.view.toggleTranlation(e);
      this.audioBtnHandler(e);
      this.audioSwitcherHandler(e);
      this.autoPlayBtnClickHandler(e);
      this.resultAudioHandler(e);
    });
  }

  audioBtnHandler(e) {
    if (e.target.classList.contains('engPuz__audio')) {
      new Audio(CONF_MEDIA_BASE_PATH + this.words[this.puzzleLineIndex].audioExample).play();
    }
  }

  audioSwitcherHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-audioSwitcher')) {
      this.view.togglePlayBtn();
      this.view.toggleGreyBtnBackground(e.target.parentNode);
    }
  }

  resultAudioHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-autoPlay--results')) {
      console.log(this.words);
      const { word } = e.target.dataset;
      console.log(`id = ${word}`);
      new Audio(CONF_MEDIA_BASE_PATH + this.words[word].audioExample).play();
    }
  }

  autoPlayBtnClickHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-autoPlay')) {
      this.isAutoPlay = !this.isAutoPlay;
      this.view.toggleGreyBtnBackground(this.view.element.querySelector('a .engPuz__tooltips-autoPlay'));
    }
  }

  updateCurrentStat(answer) {
    if (!this.answers[this.puzzleLineIndex]) {
      this.answers[this.puzzleLineIndex] = {
        sentence: this.words[this.puzzleLineIndex].textExample,
        isCorrect: answer,
      };
    }
  }

  idkClickHandler(e) {
    if (e.target.classList.contains('engPuz__bottom-idk')) {
      if (e.target.innerText === 'RESULTS') {
        this.getGameResults();
        e.target.innerText = 'PLAY AGAIN';
        return;
      }
      if (e.target.innerText === 'PLAY AGAIN') {
        AppNavigator.go('englishpuzzle');
        return;
      }

      const dragContainer = document.querySelector('.engPuz__drag-section .group-words');
      const dropContainer = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);

      this.updateCurrentStat(false);

      this.view.clearContainer(dropContainer);
      this.appendCorrectLineToDropOnIdkPress();
      this.view.clearContainer(dragContainer);
      this.view.addCanvasHighlight(this.puzzleLineIndex);

      this.view.renameCheckButton();
      this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`));
      this.view.removePuzzleLinePointerEvents(this.puzzleLineIndex);
    }
  }

  appendCorrectLineToDropOnIdkPress() {
    const dropSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
    this.puzzleArr[this.puzzleLineIndex].forEach((item) => {
      dropSection.appendChild(item);
    });
  }

  isLastCanvasInDragSection() {
    const dragContainer = document.querySelector('.group-words');
    const dropContainer = document.querySelector(`.row-${this.puzzleLineIndex}`);

    if (!dragContainer.firstChild && dropContainer.firstChild) {
      this.view.addCanvasHighlight(this.puzzleLineIndex);
    }
  }

  checkLineAnswers() {
    const canvasDropToCheck = this.view.element.querySelectorAll(`.canvas-row-${this.puzzleLineIndex + 1}`);
    const lineContainer = this.view.element.querySelector(`.row-${this.puzzleLineIndex}`);
    let mistakes = 0;
    if (!lineContainer.firstChild) {
      return false;
    }
    [...canvasDropToCheck].forEach((canvas) => {
      if (canvas.classList.contains('canvas-red')) {
        mistakes += 1;
      }
    });

    if (mistakes) {
      // update statistics
      return false;
    }
    return true;
  }

  canvasClickHandler(e) {
    if (e.target.parentNode.classList.contains('engPuz__drop-section--line', `row-${this.puzzleLineIndex}`)) {
      const dragSection = document.querySelector('.group-words');
      // eslint-disable-next-line no-unused-expressions
      e.target.classList.contains('canvas-green') ? e.target.classList.remove('canvas-green') : null;
      // eslint-disable-next-line no-unused-expressions
      e.target.classList.contains('canvas-red') ? e.target.classList.remove('canvas-red') : null;
      dragSection.appendChild(e.target);
      // this.isLastCanvasInDragSection();
      return;
    }
    if (e.target.parentNode.classList.contains('group-words')) {
      const dropSection = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);
      dropSection.appendChild(e.target);
      // this.isLastCanvasInDragSection();
    }
  }

  checkButtonHandler(e) {
    const checkBtn = this.view.element.querySelector(`.${engPuzConst.buttons.CHECK}`);
    if (e.target.classList.contains(engPuzConst.buttons.CHECK)) {
      if (checkBtn.innerText === 'CONTINUE') {
        this.view.removeCanvasHighlight(this.puzzleLineIndex);
        this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`));
        this.puzzleLineIndex += 1;

        // 10 means last puzzle line
        if (this.puzzleLineIndex === 10) {
          this.view.drawCompletePuzzle();
          this.view.hideTooltipsBtns();
          this.view.removeDragContainer();
          this.view.renderPaintingInfo('Here goes Painting name and Author text');
          // disabling continue button so far we don't have logic to go to next page/difficult
          this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.CHECK}`));

          this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`).innerText = 'RESULTS';
          return;
        }

        this.view.clearContainer(document.querySelector(`.${engPuzConst.content.DRAGSECTION}`));
        this.puzzleLineRender(this.puzzleLineIndex);
        this.view.renameCheckButton();
        this.dnd.createInstance(document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${this.puzzleLineIndex}`));
        return;
      }
      if (checkBtn.innerText === 'CHECK') {
        this.view.removeCanvasHighlight(this.puzzleLineIndex);
        this.view.addCanvasHighlight(this.puzzleLineIndex);
        this.updateCurrentStat(this.checkLineAnswers());
        console.log(this.checkLineAnswers());
        if (this.checkLineAnswers()) {
          this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`));
          this.view.renameCheckButton();
          this.view.removePuzzleLinePointerEvents(this.puzzleLineIndex);
          // update statisticks with correct answer
        }
        // this.isLastCanvasInDragSection();
        // TODO Update user stat
      }
    }
  }

  pushNewLinePuzzleToPuzzleArr() {
    [...this.puzzleCompelete[this.puzzleLineIndex].children].forEach((child) => {
      this.puzzleArr[this.puzzleLineIndex].push(child);
    });
  }

  autoPlaySentenceHandler() {
    if (this.isAutoPlay && this.puzzleLineIndex) {
      const audio = new Audio(CONF_MEDIA_BASE_PATH + this.words[this.puzzleLineIndex].audioExample);
      audio.play();
    }
  }

  getGameResults() {
    document.querySelector('blockquote').classList.toggle('visually-hidden');
    this.view.clearContainer(this.view.dropContainer);
    this.view.renderCurrentStat(this.answers);
  }

  puzzleLineRender() {
    // todo shuffle sentences array this.puzzle[lineIndex] before appending
    const dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    this.pushNewLinePuzzleToPuzzleArr();

    const toShuffle = Array.from(this.puzzleCompelete[this.puzzleLineIndex].children);
    const lineShuffled = Utils.arrayShuffle(toShuffle);

    const div = document.createElement('div');
    div.classList.add('group-words', `row-${this.puzzleLineIndex + 1}`);
    lineShuffled.forEach((item) => {
      div.appendChild(item);
    });

    dragZone.append(div);
    this.view.renderTranslation(this.words, this.puzzleLineIndex);
    this.autoPlaySentenceHandler();
    // eslint-disable-next-line no-new
    this.dnd = new EnglisPuzzleDragDrop();
  }

  async getPuzzleElements() {
    // insert preloader
    this.puzzleCompelete = await this.view.getPuzzleElements(this.imgSrc, this.sentences);
    // delete preloader
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
