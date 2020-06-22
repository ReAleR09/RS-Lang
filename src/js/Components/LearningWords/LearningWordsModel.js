import LearningWordsView from './LearningWordsView';
import LearnindWordsCards from './LearningWordsCards';
import LearningWordsSoundPlayer from '../LearningWordsSoundPlayer';
import AppNavigator from '../../lib/AppNavigator';
import {
  WORD_STATUSES,
  DIFFICULTY_MODIFIERS,
  DATA_URL,
  LEARNING_WORDS_CONTROLLER,
  RESULT_ACTION,
} from './constants';

export default class LearningWordsModel {
  constructor(settings, statistics) {
    this.settings = settings;
    this.wordsState = [];
    this.view = new LearningWordsView(this);
    this.player = new LearningWordsSoundPlayer(this);
    this.statistics = statistics; // mockStatistics

    this.cards = new LearnindWordsCards(
      this.difficulty,
      settings, // settings
      statistics, // statistics
    );
  }

  get difficulty() {
    return this.settings.difficulty;
  }

  get card() {
    return this.cards.currentCard;
  }

  attach(element) {
    this.view.attach(element);
  }

  detach() {
    this.view.detach();
    this.view = null;
  }

  init() {
    this.view.init(this.settings);

    this.cards.fillCards();

    this.updateWordCard(this.card);
  }

  updateWordCard(word) {
    this.player.clearPlayQueue();
    this.player.addAudioToQueue(DATA_URL + word.audio);
    if (this.settings.showMeaning) {
      this.player.addAudioToQueue(DATA_URL + word.audioMeaning);
    }
    if (this.settings.showExample) {
      this.player.addAudioToQueue(DATA_URL + word.audioExample);
    }

    this.view.drawWordToDOM(word);

    if (this.cards.currentStatus === WORD_STATUSES.COMPLITED) {
      this.view.lockCard();
      this.view.placeSuccessPlaceHolder();
    } else {
      this.view.unlockCard();
    }
  }

  getInitialLayout() {
    return this.view.getCardLayout(this.settings);
  }

  acceptInput(value) {
    if (this.cards.currentStatus === WORD_STATUSES.COMPLITED) {
      this.goNext();
      return true;
    }

    if (!value.trim().length) {
      return false;
    }

    const result = this.checkInput(value);

    if (result) {
      this.view.lockCard();
      let { showWordRate } = this.settings;
      if (showWordRate) {
        showWordRate = (this.cards.currentStatus === WORD_STATUSES.NEW);
      }
      this.cards.currentStatus = WORD_STATUSES.COMPLITED;
      this.showFilledCard(showWordRate);
    } else if (!this.cards.currentErrors) {
      this.cards.sendCardToTrainingEnd();
      this.cards.currentErrors += 1;
    }
    return result;
  }

  checkInput(value) {
    const textResult = value.trim();

    const checkingResult = (textResult === this.card.word.trim());

    this.updateStatistics(checkingResult);

    if (!checkingResult) {
      this.cards.CurrentErrors += 1;
    }
    return (textResult === this.card.word);
  }

  showFilledCard(showWordRate = false) {
    // TODO TRANSLATES
    if (this.settings.turnOnSound) {
      this.player.play();
    }

    if (showWordRate) {
      this.updateStatistics();
      this.view.showNewWordRateForm(this.card);
    }
  }

  goNext() {
    if (this.cards.getNext()) {
      this.updateWordCard(this.card);
    } else {
      this.showResult();
    }
  }

  goPrevious() {
    this.cards.getPrevious();
    this.updateWordCard(this.card);
  }

  updateStatistics(result) { // mockStatistics
    // TODO Общение со статистикой
    this.statistics.word = this.card;
    this.statistics.result = result;
    this.statistics.errors = this.card.errors;

    this.cards.updateStatistics(this.statistics);
  }

  updateVocabulary(word, ratio = DIFFICULTY_MODIFIERS.NORMAL) {
    // TODO Vocabulary interval
    this.statistics.ratio = ratio;
  }

  sendCardToTrainingEnd() {
    this.cards.sendCardToTrainingEnd();
  }

  showResult() {
    const params = { ...this.statistics };
    // TODO ResultView final page of app
    AppNavigator.go(LEARNING_WORDS_CONTROLLER, RESULT_ACTION, params);
  }
}
