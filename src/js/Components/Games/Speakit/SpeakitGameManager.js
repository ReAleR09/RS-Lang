import SpeakitView from './SpeakitView';
import SpeakitWordsApi from './SpeakitWordsApi';
import SpeakitSoundPlayer from './SpeakitSoundPlayer';

export default class SpeakitGameManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.soundPlayer = new SpeakitSoundPlayer();
    this.view = new SpeakitView(this.soundPlayer.playWordSound.bind(this.soundPlayer));
  }

  attach(element) {
    this.view.attach(element);
  }

  init() {
    const words = SpeakitWordsApi.getRandomWordsForDifficulty(this.difficulty);
    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
        guessed: false,
      };

      return wordState;
    });
    this.wordsState = wordsState;
    this.displayWords(words);
  }

  displayWords(wordsInfoArray) {
    this.soundPlayer.initWordsSounds(wordsInfoArray);
    this.view.drawWordsToDOM(wordsInfoArray);
  }

  getInitialLayout() {
    return this.view.getGameLayout(this.difficulty);
  }
}
