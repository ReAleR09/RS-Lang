import SpeakitView from './SpeakitView';
import SpeakitWordsApi from './SpeakitWordsApi';
import SpeakitSoundPlayer from './SpeakitSoundPlayer';
import SpeakitVoiceRecognizer from './SpeakitVoiceRecognizer';
import AppNavigator from '../../../lib/AppNavigator';
import LocalStorageAdapter from '../../../Utils/LocalStorageAdapter';

export const SPEAKIT_GAME_STATS = 'SPEAKIT_GAME_STATS';

export default class SpeakitGameManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.soundPlayer = new SpeakitSoundPlayer();
    this.view = new SpeakitView(
      this.soundPlayer.playWordSound.bind(this.soundPlayer),
      this.startGame.bind(this),
      this.finishGame.bind(this),
    );
    this.speechRecognizer = new SpeakitVoiceRecognizer(this.handleRecognizedPhrase.bind(this));
  }

  attach(element) {
    this.view.attach(element);
  }

  // eslint-disable-next-line class-methods-use-this
  handleRecognizedPhrase(phrase) {
    this.view.drawRecognizedTextToDOM(phrase);

    const wordCandidate = phrase.toLowerCase().trim();
    if (wordCandidate.split(' ').length > 1) {
      // there are two or more words, na-ah
      return;
    }

    this.wordsState.some((wordState, index) => {
      if (wordState.word === wordCandidate) {
        if (!wordState.guessed) {
          this.view.markWordAsRecognized(wordState.id);
          this.wordsState[index].guessed = true;
          // TODO play happy sound

          if (this.areAllWordsGuessed()) {
            this.finishGame();
          }
        }

        return true;
      }
      return false;
    });
  }

  areAllWordsGuessed() {
    const guessedWords = this.wordsState.reduce(
      (count, wordState) => count + (wordState.guessed ? 1 : 0),
      0,
    );
    return guessedWords === this.wordsState.length;
  }

  startGame() {
    this.speechRecognizer.startRecognition();
  }

  finishGame() {
    this.speechRecognizer.stopRecognition();
    const stats = this.calculateStats();
    // TODO global game statistics should be sent there

    // putting stats to storage to use them on /speakit/results page
    LocalStorageAdapter.set(SPEAKIT_GAME_STATS, stats);
    // and navigatin to results
    AppNavigator.replace('speakit', 'results');
  }

  calculateStats() {
    // TODO finish stats object properly
    return {
      guessed: [],
      notGuessed: [],
      difficulty: this.difficulty,
    };
  }

  init() {
    const words = SpeakitWordsApi.getRandomWordsForDifficulty(this.difficulty);
    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
        guessed: false,
        word: wordInfo.word,
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
