import SpeakitView from './SpeakitView';
import SpeakitWordsApi from './SpeakitWordsApi';
import SpeakitSoundPlayer from './SpeakitSoundPlayer';
import SpeakitVoiceRecognizer from './SpeakitVoiceRecognizer';
import AppNavigator from '../../../lib/AppNavigator';
import LocalStorageAdapter from '../../../Utils/LocalStorageAdapter';
import { roundSize } from './const';
import Statistics from '../../../Classes/Statistics';
import { GAMES, MODES } from '../../../../config';
import { showPreloader, hidePreloader } from '../../../Classes/Preloader';

export const SPEAKIT_GAME_STATS = 'SPEAKIT_GAME_STATS';

const FINISH_GAME_DELAY_MS = 1000;

export default class SpeakitGameManager {
  constructor(userWordsMode = false, difficulty = 0, round = 1) {
    this.userWordsMode = userWordsMode;
    this.difficulty = difficulty;
    this.round = round;
    this.wordsState = [];
    this.soundPlayer = new SpeakitSoundPlayer();
    this.view = new SpeakitView(
      this.soundPlayer.playWordSound.bind(this.soundPlayer),
      this.startGame.bind(this),
      this.finishGame.bind(this),
    );
    this.speechRecognizer = new SpeakitVoiceRecognizer(this.handleRecognizedPhrase.bind(this));
    const mode = userWordsMode ? MODES.REPITITION : MODES.GAME;
    this.statistics = new Statistics(GAMES.SPEAKIT, mode, true);
  }

  attach(element) {
    this.view.attach(element);
  }

  // SpeechRecognition might give several options
  handleRecognizedPhrase(phrases) {
    let candidate = phrases[0];
    let wordPicUrl = null;

    this.wordsState.some((wordState, index) => {
      for (let i = 0; i < phrases.length; i += 1) {
        const wordCandidate = phrases[i].toLowerCase().trim();
        if (wordCandidate.split(' ').length > 1) {
          // there are two or more words, na-ah
          break;
        }
        if (wordState.word === wordCandidate) {
          candidate = wordCandidate;
          wordPicUrl = wordState.image;
          if (!wordState.guessed) {
            this.view.markWordAsRecognized(wordState.id);
            this.wordsState[index].guessed = true;
            this.view.updateGuessedCount(this.wordsState.filter((word) => word.guessed).length);

            this.soundPlayer.playGuessSound();
            // mark word as success in stats
            // eslint-disable-next-line no-underscore-dangle
            this.statistics.updateWordStatistics(wordState._id, true);
          }
          return true;
        }
      }
      return false;
    });
    this.view.drawRecognizedWordToDOM(candidate, wordPicUrl);
    if (this.areAllWordsGuessed()) {
      this.finishGame(true);
    }
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

  finishGame(withDelay = false) {
    this.speechRecognizer.stopRecognition();

    // marking all non-guessed words as error
    this.wordsState.forEach((wordState) => {
      if (!wordState.guessed) {
        this.statistics.updateWordStatistics(wordState.id, false);
      }
    });
    // sending stats for the game async
    this.statistics.sendGameResults();

    // calculate stats for display on Result page
    const stats = this.calculateStats();

    // putting stats to storage to use them on /speakit/results page
    LocalStorageAdapter.set(SPEAKIT_GAME_STATS, stats);
    // and navigatin to results, with slight delay in case it was triggeren on last word
    setTimeout(() => AppNavigator.replace('speakit', 'results'), withDelay ? FINISH_GAME_DELAY_MS : 0);
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

  async init() {
    showPreloader();
    let words;

    if (this.userWordsMode) {
      words = await SpeakitWordsApi.getUserWords();
    } else {
      words = await SpeakitWordsApi.getWordsForDifficultyAndRound(
        this.difficulty,
        this.round,
      );
    }

    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
        guessed: false,
        word: wordInfo.word.toLowerCase(),
        audio: wordInfo.audio,
        image: wordInfo.image,
        transcription: wordInfo.transcription,
        wordTranslate: wordInfo.wordTranslate,
      };

      return wordState;
    });
    this.wordsState = wordsState;
    this.displayWords(wordsState);

    hidePreloader();
  }

  displayWords(wordsInfoArray) {
    this.soundPlayer.initWordsSounds(wordsInfoArray);
    this.view.drawWordsToDOM(wordsInfoArray);
  }

  getInitialLayout() {
    return this.view.getGameLayout(roundSize);
  }
}
