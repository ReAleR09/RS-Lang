/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import EnglishPuzzleView from './EnglishPuzzleView';
import EnglisPuzzleDragDrop from './EnglishPuzzleDragDrop';
import engPuzConst from './EnglishPuzzleConstants';
import AppNavigator from '../../lib/AppNavigator';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';
import Utils from '../../Utils/Utils';
import getImageInfo from './EnglishPuzzleImageInfo';
import SettingsModel from '../../Classes/UserSettings';
import Statistics from '../../Classes/Statistics';
import { GAMES, MODES, CONF_MEDIA_BASE_PATH } from '../../../config';
import WordsApi from '../../Classes/Api/WordsApi';

export const EP_GAME_STATS = 'EP_GAME_STATS';

export default class EnglishPuzzleManager {
  constructor(isUserWordsMode = false, difficulty = 0, round = 1) {
    this.isUserWordsMode = isUserWordsMode;
    this.difficulty = difficulty;
    this.round = round;
    this.words = null;
    this.puzzleLineIndex = 0;
    this.isAutoPlay = true;
    this.isTranslation = true;
    this.isPlayBtnActive = true;
    this.isBackgroundShow = true;
    this.imageInfo = null;
    this.answers = {};
    this.puzzleArr = [[], [], [], [], [], [], [], [], [], []];
    this.puzzleBumperArr = [[], [], [], [], [], [], [], [], [], []];
    this.defaultImage = 'https://tlmnnk.github.io/images/rslang/birthOfVenus.jpg';
    this.sentences = [];
    this.view = new EnglishPuzzleView();

    const mode = isUserWordsMode ? MODES.REPITITION : MODES.GAME;
    this.statistics = new Statistics(GAMES.PUZZLE, mode, true);
    this.wordsApi = new WordsApi();
  }

  attach(element) {
    this.view.attach(element);
  }

  async getSentencesForGame() {
    if (this.isUserWordsMode) {
      const words = await this.wordsApi.getRepeatedWords(
        10,
        undefined,
        true,
      );
      this.words = words;
    } else {
      let words = await this.wordsApi.getWordsForGame(
        this.difficulty,
        10,
        this.round,
        true,
      );
      if (!words.length) {
        words = await this.wordsApi.getWordsForGame(
          this.difficulty,
          10,
          this.round,
        );
      }
      this.words = words;
    }
    console.log(this.words);
    this.words.forEach((word) => {
      this.sentences.push(word.textExample);
    });
  }

  resetGameParametres() {
    this.puzzleCompelete = null;
    this.words = null;
    this.puzzleLineIndex = 0;
    this.imageInfo = null;
    this.answers = {};
    this.puzzleArr = [[], [], [], [], [], [], [], [], [], []];
  }

  getRandomParametrasForImgIfUserWordsMode() {
    this.difficulty = Utils.getRandomIntInRange(
      engPuzConst.difficulties[0],
      engPuzConst.difficulties.length - 1,
    );
    this.round = Utils.getRandomIntInRange(
      1,
      engPuzConst.pagesPerDifficulties[this.difficulty],
    );
  }

  getImageForGame() {
    if (this.isUserWordsMode) {
      this.getRandomParametrasForImgIfUserWordsMode();
    }
    const imageInfoArray = getImageInfo(this.difficulty);
    if (imageInfoArray[this.round]) {
      this.imageInfo = imageInfoArray[this.round];
    } else {
      // eslint-disable-next-line prefer-destructuring
      this.imageInfo = imageInfoArray[1];
    }

    this.imgSrc = engPuzConst.paintings.URL + this.imageInfo.imageSrc;
  }

  async init() {
    await this.getSavedGameSettings();
    this.applyGameSettingsOnStart();

    this.getImageForGame();
    await this.getSentencesForGame();
    console.log(this.words);
    await this.getPuzzleElements();
    this.puzzleLineRender(this.puzzleLineIndex);
    this.eventListenersInit();
  }

  async getSavedGameSettings() {
    const autoPlay = await LocalStorageAdapter.get(engPuzConst.localstorage.AUTOPLAY_BTN);
    const showTranslation = await LocalStorageAdapter.get(engPuzConst.localstorage.SHOW_TRANSLATION_BTN);
    const showAudioBtn = await LocalStorageAdapter.get(engPuzConst.localstorage.SHOW_AUDIO_BTN);
    const showBackground = await LocalStorageAdapter.get(engPuzConst.localstorage.SHOW_PUZZLEBACK_BTN);

    autoPlay !== null ? this.isAutoPlay = autoPlay : null;
    showTranslation !== null ? this.isTranslation = showTranslation : null;
    showAudioBtn !== null ? this.isPlayBtnActive = showAudioBtn : null;
    showBackground !== null ? this.isBackgroundShow = showBackground : null;
  }

  applyGameSettingsOnStart() {
    if (!this.isAutoPlay) {
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.AUTOPLAY}`));
    }
    if (!this.isTranslation) {
      this.view.element.querySelector('blockquote').classList.toggle('visually-hidden');
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.TRANSLATION}`));
    }
    if (!this.isPlayBtnActive) {
      this.view.togglePlayBtn();
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.AUDIOBTN}`));
    }
    if (!this.isBackgroundShow) {
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.PICTURE}`));
    }
  }

  eventListenersInit() {
    this.view.element.addEventListener('click', (e) => {
      this.canvasClickHandler(e);
      this.checkButtonHandler(e);
      this.idkClickHandler(e);
      this.toggleTranlationHandler(e);
      this.audioBtnHandler(e);
      this.audioSwitcherHandler(e);
      this.autoPlayBtnClickHandler(e);
      this.resultAudioHandler(e);
      this.showPuzzleBackgroundHandler(e);
    });
  }

  toggleTranlationHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-translation')) {
      this.isTranslation = !this.isTranslation;
      LocalStorageAdapter.set(engPuzConst.localstorage.SHOW_TRANSLATION_BTN, this.isTranslation);
      this.view.element.querySelector('blockquote').classList.toggle('visually-hidden');
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.TRANSLATION}`));
    }
  }

  audioBtnHandler(e) {
    if (e.target.classList.contains('engPuz__audio')) {
      const url = CONF_MEDIA_BASE_PATH + this.words[this.puzzleLineIndex].audioExample;
      new Audio(url).play();
    }
  }

  audioSwitcherHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-audioSwitcher')) {
      this.isPlayBtnActive = !this.isPlayBtnActive;
      LocalStorageAdapter.set(engPuzConst.localstorage.SHOW_AUDIO_BTN, this.isPlayBtnActive);
      this.view.togglePlayBtn();
      this.view.toggleGreyBtnBackground(e.target.parentNode);
    }
  }

  showPuzzleBackgroundHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-picture')) {
      LocalStorageAdapter.set(engPuzConst.localstorage.SHOW_PUZZLEBACK_BTN, !this.isBackgroundShow);
      this.view.toggleGreyBtnBackground(this.view.element.querySelector(`a.${engPuzConst.switchers.PICTURE}`));
      this.applyBackgroundToPuzzleLine();
      this.isBackgroundShow = !this.isBackgroundShow;
    }
  }

  async applyBackgroundToPuzzleLine() {
    const canvasLineAll = this.view.element.querySelectorAll(`.canvas-row-${this.puzzleLineIndex + 1}`);

    if (this.isBackgroundShow) {
      canvasLineAll.forEach(async (canvas) => {
        const data = await canvas.dataset.item;
        const parent = await canvas.parentNode;
        const toReplace = this.puzzleBumperArr[this.puzzleLineIndex].filter((canvasTo) => canvasTo.dataset.item === data);
        canvas.remove();
        await parent.appendChild(toReplace[0]);
        // canvas.parentNode.append()
      });
    } else {
      canvasLineAll.forEach(async (canvas) => {
        const data = await canvas.dataset.item;
        const toReplace = this.puzzleArr[this.puzzleLineIndex].filter((canvasTo) => canvasTo.dataset.item === data);
        const parent = await canvas.parentNode;
        canvas.remove();
        await parent.appendChild(toReplace[0]);
        // canvas.parentNode.append()
      });
    }
  }

  resultAudioHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-autoPlay--results')) {
      const { word } = e.target.dataset;
      const url = CONF_MEDIA_BASE_PATH + this.words[word].audioExample;
      new Audio(url).play();
    }
  }

  async autoPlayBtnClickHandler(e) {
    if (e.target.classList.contains('engPuz__tooltips-autoPlay')) {
      this.isAutoPlay = !this.isAutoPlay;
      await LocalStorageAdapter.set(engPuzConst.localstorage.AUTOPLAY_BTN, this.isAutoPlay);
      this.view.toggleGreyBtnBackground(this.view.element.querySelector('a.engPuz__tooltips-autoPlay'));
    }
  }

  updateCurrentStat(answer) {
    if (!this.answers[this.puzzleLineIndex]) {
      this.answers[this.puzzleLineIndex] = {
        sentence: this.words[this.puzzleLineIndex].textExample,
        isCorrect: answer,
        audio: this.words[this.puzzleLineIndex].audioExample,
      };
    }
  }

  async idkClickHandler(e) {
    if (e.target.classList.contains('engPuz__bottom-idk')) {
      if (e.target.innerText === 'RESULTS') {
        this.sendStatisticToServer();
        if (this.isUserWordsMode) {
          AppNavigator.go('englishpuzzle', 'results', { userWordsPlay: 1 });
        } else {
          AppNavigator.go('englishpuzzle', 'results');
        }
        return;
      }
      if (e.target.innerText === 'PLAY AGAIN') {
        AppNavigator.go('englishpuzzle');
        return;
      }

      const dragContainer = document.querySelector('.engPuz__drag-section .group-words');
      const dropContainer = document.querySelector(`.engPuz__drop-section--line.row-${this.puzzleLineIndex}`);

      this.updateCurrentStat(false);
      this.view.toggleShowBackgroundBtnNoPointer();

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

  async saveGameForNextRound() {
    if (!this.isUserWordsMode) {
      if (this.round < engPuzConst.pagesPerDifficulties[this.difficulty]) {
        this.round += 1;
      } else {
        this.round = 1;
        this.difficulty < engPuzConst.pagesPerDifficulties.length - 1 ? this.difficulty += 1 : this.difficulty = 0;
      }
    }
    console.log(this.difficulty);
    console.log(this.round);

    await SettingsModel.saveGame(
      GAMES.PUZZLE,
      {
        difficulty: this.difficulty,
        round: this.round,
      },
    );
  }

  sendStatisticToServer() {
    Object.values(this.answers).forEach((word, i) => {
      this.statistics.updateWordStatistics(this.isUserWordsMode
        ? this.words[i]._id
        : this.words[i].id,
      word.isCorrect);
    });
    this.statistics.sendGameResults();
  }

  async checkButtonHandler(e) {
    const checkBtn = this.view.element.querySelector(`.${engPuzConst.buttons.CHECK}`);
    if (e.target.classList.contains(engPuzConst.buttons.CHECK)) {
      if (checkBtn.innerText === 'CONTINUE') {
        /* if (this.isGameFinished) {
          AppNavigator.replace('englishpuzzle', 'play', {
            difficulty: this.difficulty,
            round: this.difficulty,
          });
          return;
        } */
        this.view.element.querySelector('a.engPuz__tooltips-picture').classList.contains('disabled') ? this.view.toggleShowBackgroundBtnNoPointer()
          : null;
        this.view.removeCanvasHighlight(this.puzzleLineIndex);
        this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`));
        this.puzzleLineIndex += 1;

        // 10 means last puzzle line
        if (this.puzzleLineIndex === 10) {
          LocalStorageAdapter.set(engPuzConst.localstorage.RESULTS, this.answers);
          this.isGameFinished = true;
          await this.saveGameForNextRound();

          this.view.drawCompletePuzzle();
          this.view.hideTooltipsBtns();
          this.view.removeDragContainer();
          this.view.renderImageInfo(this.imageInfo);
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
        if (this.isGameFinished) {
          checkBtn.classList.add('disabled');
          return;
        }

        if (this.checkLineAnswers()) {
          this.view.toggleShowBackgroundBtnNoPointer();
          this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.DONTKNOW}`));
          this.view.renameCheckButton();
          !this.isBackgroundShow ? await this.applyBackgroundToPuzzleLine() : null;
          this.view.addCanvasHighlight(this.puzzleLineIndex);
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
    [...this.puzzleBumper[this.puzzleLineIndex].children].forEach((child) => {
      this.puzzleBumperArr[this.puzzleLineIndex].push(child);
    });
  }

  autoPlaySentenceHandler() {
    if (this.isAutoPlay && this.puzzleLineIndex) {
      const audio = new Audio(this.words[this.puzzleLineIndex].audioExample);
      audio.play();
    }
  }

  async getGameResults() {
    document.querySelector('blockquote').classList.toggle('visually-hidden');
    this.view.toggleDisableButton(this.view.element.querySelector(`.${engPuzConst.buttons.CHECK}`));
    this.view.clearContainer(this.view.dropContainer);
    this.view.renderCurrentStat(this.answers);
  }

  puzzleLineRender() {
    const dragZone = document.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    this.pushNewLinePuzzleToPuzzleArr();

    let toShuffle;
    if (this.isBackgroundShow) {
      toShuffle = Array.from(this.puzzleCompelete[this.puzzleLineIndex].children);
    } else {
      toShuffle = Array.from(this.puzzleBumper[this.puzzleLineIndex].children);
    }

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
    console.log(this.sentences);
    const puzzleData = await this.view.getPuzzleElements(this.imgSrc, this.sentences);
    this.puzzleCompelete = puzzleData.originalImage;
    this.puzzleBumper = puzzleData.bumperImage;
    // delete preloader
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
