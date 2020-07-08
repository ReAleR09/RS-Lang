import LearningWordsView from './LearningWordsView';
import LearnindWordsCards from './LearningWordsCards';
import LearningWordsSoundPlayer from './LearningWordsSoundPlayer';
import AppNavigator from '../../lib/AppNavigator';
import SettingsModel from '../../Classes/UserSettings';
import {
  WORD_STATUSES,
  DATA_URL,
  LEARNING_WORDS_CONTROLLER,
  RESULTS_ACTION,
  TEST_RESULT_ACTION,
} from './constants';
import Statistics from '../../Classes/Statistics';
import { GAMES, MODES } from '../../../config';
import Dictionary from '../../Classes/Dictionary';
import { DICT_CATEGORIES, DIFFICULTIES } from '../../Classes/Api/constants';
import LearningWordsGameMode from './LearningWordsGameMode';
import { PARAM_MODE } from '../../Utils/Constants';

export default class LearningWordsModel {
  constructor(mode = MODES.REPITITION) {
    this.statistics = new Statistics(GAMES.LEARNING, mode);
    this.dictionary = new Dictionary();
    this.settingsObject = SettingsModel;
    this.settings = this.settingsObject.settings;
    this.dayNorms = this.settingsObject.wordLimitsPerDay;
    this.difficulty = this.settings.difficulty;

    this.view = new LearningWordsView(this);
    this.player = new LearningWordsSoundPlayer(this);

    this.game = new LearningWordsGameMode();

    this.mode = mode;
    this.cards = new LearnindWordsCards();
  }

  changeDifficulty(newDifficulty) {
    this.difficulty = newDifficulty;
    this.cards.difficulty = newDifficulty;
  }

  get card() {
    return this.cards.currentCard;
  }

  async attach(element) {
    await this.statistics.get();

    const limits = await this.statistics.getLimits();
    this.cards.init(
      this.difficulty,
      this.settings,
      this.dayNorms,
      limits,
      this.mode,
    );
    this.view.attach(element);
  }

  detach() {
    this.view.detach();
    this.view = null;
  }

  async init() {
    if (this.mode === MODES.GAME) {
      this.view.turnOnGameMode();
      this.game.startGame();
      this.changeDifficulty(this.game.level);
    }

    this.view.init(this.settings);

    await this.cards.fillCards();
    if (this.cards.isCardReady) {
      this.updateWordCard(this.card);
    } else {
      this.showResult();
    }
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
      await this.goNext();
      return true;
    }

    if (!value.trim().length) {
      return false;
    }

    const result = this.checkInput(value);

    if (this.mode === MODES.GAME) {
      this.game.inputResult(result);
      if (this.game.isEnded) {
        this.settingsObject.setDifficulty(this.game.level);
        this.showResult();
      } else {
        if (this.game.level !== this.difficulty) {
          this.changeDifficulty(this.game.level);
        }
        await this.goNext();
      }
      return true;
    }

    if (result) {
      this.cards.updateCounts();
      this.view.lockCard();
      let { showWordRate } = this.settings;
      if (showWordRate) {
        showWordRate = (this.cards.currentStatus === WORD_STATUSES.NEW);
      }
      await this.updateStatistics(this.cards.currentErrors === 0);
      this.cards.currentStatus = WORD_STATUSES.COMPLITED;
      this.showFilledCard(showWordRate);
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

  async goNext() {
    if (await this.cards.getNext()) {
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
    // eslint-disable-next-line no-underscore-dangle
    const wordId = this.card._id;
    this.statistics.updateWordStatistics(
      wordId,
      result,
      (this.cards.currentStatus === WORD_STATUSES.NEW),
    );
  }

  async updateUserDifficulty(userDifficulty = DIFFICULTIES.NORMAL) {
    // eslint-disable-next-line no-underscore-dangle
    await this.dictionary.setUserDifficulty(this.card._id, userDifficulty);
  }

  async updateDictionary(category = DICT_CATEGORIES.MAIN) {
    // eslint-disable-next-line no-underscore-dangle
    await this.dictionary.putOnCategory(this.card._id, category);
  }

  sendCardToTrainingEnd() {
    this.cards.sendCardToTrainingEnd();
  }

  // eslint-disable-next-line class-methods-use-this
  showResult() {
    const params = { [PARAM_MODE]: this.mode, difficulty: this.difficulty };
    if (this.mode === MODES.GAME) {
      AppNavigator.go(LEARNING_WORDS_CONTROLLER, TEST_RESULT_ACTION, params);
    } else {
      AppNavigator.go(LEARNING_WORDS_CONTROLLER, RESULTS_ACTION, params);
    }
  }
}
