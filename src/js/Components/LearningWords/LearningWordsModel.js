import LearningWordsView from './LearningWordsView';
import LearnindWordsCards from './LearningWordsCards';
import LearningWordsSoundPlayer from './LearningWordsSoundPlayer';
import AppNavigator from '../../lib/AppNavigator';
import {
  WORD_STATUSES,
  DATA_URL,
  LEARNING_WORDS_CONTROLLER,
  RESULTS_ACTION,
} from './constants';
import Statistics from '../../Classes/Statistics';
import { GAMES, MODES } from '../../../config';
import Dictionary from '../../Classes/Dictionary';
import { DICT_CATEGORIES, DIFFICULTIES } from '../../Classes/Api/constants';
import LearningWordsGameMode from './LearningWordsGameMode';

export default class LearningWordsModel {
  constructor(settings, statistics, mode = MODES.REPITITION) {
    this.statistics = new Statistics(GAMES.LEARNING, mode);
    this.dictionary = new Dictionary();
    this.settings = settings;
    this.difficulty = this.settings.difficulty;
    this.wordsState = [];
    this.view = new LearningWordsView(this);
    this.player = new LearningWordsSoundPlayer(this);

    this.game = new LearningWordsGameMode();

    this.mode = mode;
    this.cards = new LearnindWordsCards();

    this.cards.init(this.difficulty, settings, statistics.limits, mode);
  }

  changeDifficulty(newDifficulty) {
    this.difficulty = newDifficulty;
    this.cards.difficulty = newDifficulty;
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
    if (this.mode === MODES.GAME) {
      this.view.turnOnGameMode();
      this.game.startGame();
      this.changeDifficulty(this.game.level);
    }
    this.view.init(this.settings);

    this.cards.fillCards();

    this.updateWordCard(this.card);
  }

  updateWordCard(word) {
    if (this.mode === MODES.REPITITION) {
      this.player.clearPlayQueue();
      this.player.addAudioToQueue(DATA_URL + word.audio);
      if (this.settings.showMeaning) {
        this.player.addAudioToQueue(DATA_URL + word.audioMeaning);
      }
      if (this.settings.showExample) {
        this.player.addAudioToQueue(DATA_URL + word.audioExample);
      }
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

  async acceptInput(value) {
    if (this.cards.currentStatus === WORD_STATUSES.COMPLITED) {
      this.goNext();
      return true;
    }

    if (!value.trim().length) {
      return false;
    }

    const result = this.checkInput(value);

    if (this.mode === MODES.GAME) {
      this.game.inputResult(result);
      if (this.game.isEnded) {
        this.settings.setDifficulty(this.game.level);
        this.showResult();
      } else {
        if (this.game.level !== this.difficulty) {
          this.changeDifficulty(this.game.level);
        }
        this.goNext();
      }
      return true;
    }

    if (result) {
      this.view.lockCard();
      let { showWordRate } = this.settings;
      if (showWordRate) {
        showWordRate = (this.cards.currentStatus === WORD_STATUSES.NEW);
      }
      this.cards.currentStatus = WORD_STATUSES.COMPLITED;
      this.showFilledCard(showWordRate);

      await this.updateStatistics(this.cards.currentErrors === 0);
    } else if (this.cards.currentErrors) {
      this.cards.sendCardToTrainingEnd();
      this.cards.currentErrors += 1;
    }
    return result;
  }

  checkInput(value) {
    const textResult = value.trim();

    const checkingResult = (textResult === this.card.word.trim());

    if (!checkingResult) {
      this.cards.CurrentErrors += 1;
    }
    return (textResult === this.card.word);
  }

  showFilledCard(showWordRate = false) {
    if (this.settings.turnOnSound) {
      this.player.play();
    }

    if (showWordRate) {
      this.view.showNewWordRateForm();
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

  async updateStatistics(result) {
    await this.statistics.updateWordStatistics(
      this.card.wordId,
      result,
    );

    this.cards.updateStatistics(this.statistics.limits);
  }

  async updateUserDifficulty(userDifficulty = DIFFICULTIES.NORMAL) {
    await this.dictionary.setUserDifficulty(this.card.wordId, userDifficulty);
  }

  async updateDictionary(category = DICT_CATEGORIES.MAIN) {
    await this.dictionary.putOnCategory(this.card.wordId, category);
  }

  sendCardToTrainingEnd() {
    this.cards.sendCardToTrainingEnd();
  }

  showResult() {
    const params = { ...this.statistics };
    // TODO ResultView final page of app
    AppNavigator.go(LEARNING_WORDS_CONTROLLER, RESULTS_ACTION, params);
  }
}
