import SavannahView from './SavannahView';
import SavannahWordsApi from './SavannahWordsApi';
import Utils from '../../../Utils/Utils';
import LocalStorageAdapter from '../../../Utils/LocalStorageAdapter';

export default class SavannahGameManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.view = new SavannahView(
      this.changeState.bind(this),
    );
  }

  attach(element) {
    this.view.attach(element);
  }

  startGame(words) {
    const indexesOfWords = new Set();
    const setsWordsToPlayArray = [];
    for (let i = 0; i < words.length; i += 1) {
      indexesOfWords.clear();
      indexesOfWords.add(i);
      do {
        indexesOfWords.add(Utils.getRandomInt(9));
      } while (indexesOfWords.size < 4);
      const indexesOfWordsArray = Array.from(indexesOfWords);
      const setsWordsToPlay = [];
      for (let j = 0; j < 4; j += 1) {
        setsWordsToPlay.push(words[indexesOfWordsArray[j]]);
      }
      setsWordsToPlayArray.push(setsWordsToPlay);
    }

    this.view.init(setsWordsToPlayArray);
  }

  stopGame() {
    this.view.stopAnimation();
  }

  changeState(word) {
    /* eslint-disable no-param-reassign */
    this.wordsState.forEach((item) => {
      if (item.word === word) {
        item.guessed = true;
      }
    });
    /* eslint-enable no-param-reassign */
    this.saveCurrentWordsState();
  }

  init() {
    const words = SavannahWordsApi.getRandomWordsForDifficulty(this.difficulty);
    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
        guessed: false,
        word: wordInfo.word,
      };

      return wordState;
    });
    this.wordsState = wordsState;
    this.saveCurrentWordsState();

    this.startGame(words);
  }

  saveCurrentWordsState() {
    LocalStorageAdapter.set('savannah-current-words-state', this.wordsState);
    // localStorage.setItem('savannah-current-words-state', JSON.stringify(this.wordsState));
  }

  getInitialLayout() {
    return this.view.getGameLayout(this.difficulty);
  }
}
