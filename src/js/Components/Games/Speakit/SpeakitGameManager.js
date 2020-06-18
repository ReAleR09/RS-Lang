import SpeakitView from './SpeakitView';
import SpeakitWordsApi from './SpeakitWordsApi';

export default class SpeakitGameManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.view = new SpeakitView();
  }

  attach(element) {
    this.view.attach(element);
  }

  init() {
    const words = SpeakitWordsApi.getRandomWordsForDifficulty(this.difficulty);
    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
      };

      return wordState;
    });
    this.wordsState = wordsState;
    this.drawWords(words);
  }

  drawWords(wordsInfoArray) {
    this.view.drawWordsToDOM(wordsInfoArray);
  }

  getInitialLayout() {
    return this.view.getGameLayout(this.difficulty);
  }
}
