import SavannahView from './SavannahView';
import SavannahWordsApi from './SavannahWordsApi';
import Utils from '../../../Utils/Utils';
import LocalStorageAdapter from '../../../Utils/LocalStorageAdapter';
import Statistics from '../../../Classes/Statistics';
import { GAMES, MODES } from '../../../../config';

export default class SavannahGameManager {
  constructor(userWordsMode = false, difficulty = 0, round = 1) {
    this.userWordsMode = userWordsMode;
    this.difficulty = difficulty;
    this.round = round;

    this.wordsState = [];
    this.view = new SavannahView(
      this.changeState.bind(this),
      this.sendStatisticToServer.bind(this),
    );

    const mode = userWordsMode ? MODES.REPITITION : MODES.GAME;
    this.statistics = new Statistics(GAMES.SAVANNAH, mode, true);
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
    let wordsPromise;

    if (this.userWordsMode) {
      wordsPromise = SavannahWordsApi.getUserWords();
    } else {
      wordsPromise = SavannahWordsApi.getWordsForDifficultyAndRound(
        this.difficulty,
        this.round,
      );
    }

    wordsPromise
      .then((words) => {
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
      });
  }

  saveCurrentWordsState() {
    LocalStorageAdapter.set('savannah-current-words-state', this.wordsState);
  }

  sendStatisticToServer() {
    this.wordsState.forEach((wordState) => {
      this.statistics.updateWordStatistics(wordState.id, wordState.guessed);
    });
    this.statistics.sendGameResults();
  }

  getInitialLayout() {
    return this.view.getGameLayout(this.difficulty);
  }

  calculateStats() {
    const guessed = this.wordsState.filter((wordState) => wordState.guessed);
    const notGuessed = this.wordsState.filter((wordState) => !wordState.guessed);
    return {
      guessed,
      notGuessed,
      difficulty: this.difficulty,
      round: this.round,
      isUserWordsMode: this.userWordsMode,
    };
  }
}
