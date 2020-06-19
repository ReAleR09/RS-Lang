import SpeakitView from './SpeakitView';
import SpeakitWordsApi from './SpeakitWordsApi';
import SpeakitSoundPlayer from './SpeakitSoundPlayer';
import SpeakitVoiceRecognizer from './SpeakitVoiceRecognizer';

export default class SpeakitGameManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.soundPlayer = new SpeakitSoundPlayer();
    this.view = new SpeakitView(
      this.soundPlayer.playWordSound.bind(this.soundPlayer),
      this.startGame.bind(this),
    );
    this.speechRecognizer = new SpeakitVoiceRecognizer(this.handleRecognizedPhrase.bind(this));
  }

  attach(element) {
    this.view.attach(element);
  }

  // eslint-disable-next-line class-methods-use-this
  handleRecognizedPhrase(phrase) {
    console.log(phrase);
  }

  startGame() {
    this.speechRecognizer.startRecognition();
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
