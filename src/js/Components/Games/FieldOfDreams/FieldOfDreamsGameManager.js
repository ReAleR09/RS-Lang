import FieldOfDreamsView from './FieldOfDreamsView';
import AppNavigator from '../../../lib/AppNavigator';
import LocalStorageAdapter from '../../../Utils/LocalStorageAdapter';
import Statistics from '../../../Classes/Statistics';
import { GAMES, MODES } from '../../../../config';
import FieldOfDreamsWordsApi from './FieldOfDreamsWordsApi';
import VoiceApi from './VoiceApi';
import { hintsCount } from './constants';
import Timers from './Timers';

export const GAME_STATS = 'GAME_STATS';

const FINISH_GAME_DELAY_MS = 1000;

export default class FieldOfDreamsGameManager {
  constructor(userWordsMode = false, difficulty = 0, round = 1) {
    this.userWords = userWordsMode;

    this.voiceControl = new VoiceApi(this.acceptAnswer.bind(this));
    this.difficulty = difficulty;
    this.round = round;
    this.wordsState = [];
    this.results = [];
    this.hints = 0;
    this.view = new FieldOfDreamsView(
      this.goNextWord.bind(this),
      this.useHint.bind(this),
      this.voiceControl.startRecognition.bind(this.voiceControl),
      this.acceptAnswer.bind(this),
      this.startQuestionUtterance.bind(this),
    );
    const mode = userWordsMode ? MODES.REPITITION : MODES.GAME;
    this.statistics = new Statistics(GAMES.FIELDOFDREAMS, mode, true);
  }

  attach(element) {
    this.timers = new Timers();
    this.view.attach(element, this.timers.setNewTimer.bind(this.timers));
  }

  detach() {
    this.timers.deleteTimers();
    this.timers = null;
  }

  startQuestionUtterance() {
    this.voiceControl.speak(this.currentWord.MeaningTranslate);
  }

  finishGame(withDelay = false) {
    this.voiceControl.stopRecognition();

    // sending stats for the game async
    this.statistics.sendGameResults();

    // calculate stats for display on Result page
    const stats = this.calculateStats();

    // putting stats to storage to use them on /speakit/results page
    LocalStorageAdapter.set(GAME_STATS, stats);
    // and navigatin to results, with slight delay in case it was triggeren on last word

    this.timers.setNewTimer(() => AppNavigator.replace('fieldOfDreams', 'results'), withDelay ? FINISH_GAME_DELAY_MS : 0);
  }

  calculateStats() {
    const guessed = this.results.filter((wordState) => wordState.guessed);
    const notGuessed = this.results.filter((wordState) => !wordState.guessed);
    return {
      guessed,
      notGuessed,
      difficulty: this.difficulty,
      round: this.round,
      isUserWordsMode: this.userWordsMode,
    };
  }

  async init() {
    // TODO show load animation?
    let wordsPromise;

    if (this.userWordsMode) {
      wordsPromise = FieldOfDreamsWordsApi.getUserWords();
    } else {
      wordsPromise = FieldOfDreamsWordsApi.getWordsForDifficultyAndRound(
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
            word: wordInfo.word.toLowerCase(),
            audio: wordInfo.audio,
            image: wordInfo.image,
            transcription: wordInfo.transcription,
            wordTranslate: wordInfo.wordTranslate,
            MeaningTranslate: wordInfo.textMeaningTranslate,
          };

          return wordState;
        });
        this.wordsState = wordsState;
        this.goNextWord();
        FieldOfDreamsView.showInstructions();
      });
  }

  // SpeechRecognition might give several options
  acceptAnswer(phrases) {
    this.view.lockComponent();
    this.voiceControl.stopRecognition();
    let result = false;
    if (phrases instanceof Array) {
      const findResult = phrases.findIndex((phrase) => {
        const wordCandidate = phrase.toLowerCase().trim();
        if (phrase.split(' ').length > 1) return false;
        return (this.currentWord.word === wordCandidate);
      });
      result = (findResult !== -1);
    }

    this.currentWord.guessed = result;

    this.results.push(this.currentWord);

    this.view.openAnswer(result);

    this.statistics.updateWordStatistics(this.currentWord.id, result);
  }

  goNextWord() {
    this.hints = 0;
    if (!this.wordsState.length) {
      this.finishGame(true);
      return;
    }
    this.voiceControl.stopSpeaking();
    this.currentWord = this.wordsState.pop();
    const isLast = !(this.wordsState.length);
    this.view.drawWordToDOM(this.currentWord, isLast);
  }

  useHint(hintLetter) {
    const result = (this.hints < hintsCount);
    if (result && hintLetter) {
      this.hints += 1;
      const letters = this.currentWord.word.toUpperCase().trim().split('');
      const indexArray = [];
      letters.forEach((letter, index) => {
        if (letter === hintLetter) {
          indexArray.push(index);
        }
      });
      if (indexArray.length) {
        this.view.flipLetters(indexArray);
      }
    }
    return result;
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
