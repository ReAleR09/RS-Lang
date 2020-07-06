import Controller from '../lib/Controller';
import IndexView from '../Views/GameSprint/IndexView';
import { BACKEND_URL } from '../../config';
import { IN_PROGRESS_SPRINT_GAME, FINISHED_SPRINT_GAME, EVENT_NAME_SPRINT_GAME } from '../Utils/ConstantsGameSprint';

/**
 * Controller is a sctructure that describes a set of "actions",
 * which can be triggered by navigation through app.
 * Every action name must end with "Action" postfix.
 * Note that you need to wire up a controller to 1st level route in order for it to work
 * (currently it's set in index.js)
 *
 * e.g. we navigate to rslang.com/example/someaction, then
 * controller's "someactionAction" metod will be called
 */
export default class GameSprintController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
    this.wordsUrl = `${BACKEND_URL}words?page=1&group=0`;
    this.correctTranslation = 0;
    this.wrongTranslation = 1;

    this.audioClickBtn = new Audio('../../audio/piu.mp3');
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
  async indexAction() {
    this.props.onRightClick = () => {
      this.checkAnswer(this.correctTranslation);
    };
    this.props.onFalseClick = () => {
      this.checkAnswer(this.wrongTranslation);
    };

    await this.getWordsFromDataBase();
    this.startGame();
  }

  startGame() {
    this.status = IN_PROGRESS_SPRINT_GAME;
    this.rightAnswersInRow = 0;
    this.numberElement = 0;
    this.multiplier = 1;
    this.checkbox = 0;
    this.score = 0;
    this.gameTimer = 61;
    this.updateWords();
    this.updateTimer();
  }

  updateWords() {
    if (this.dataWords[this.numberElement + 1]) {
      this.currentWord = this.nextWord();
      this.translateWord = this.nextTranslateWord();
    } else {
      this.stopGame();
    }
  }

  updateTimer() {
    this.gameTimer -= 1;
    if (this.gameTimer === 0) {
      this.stopGame();
    } else {
      setTimeout(() => this.updateTimer(), 1000);
    }
    if (this.dataWords[this.numberElement + 1]) {
      this.updateView();
    }
  }

  updateView() {
    IndexView.publish(EVENT_NAME_SPRINT_GAME, {
      status: this.status,
      timer: this.gameTimer,
      score: this.score,
      multiplier: this.multiplier,
      checkbox: this.checkbox,
      currentWord: this.currentWord,
      translateWord: this.translateWord,
    });
  }

  stopGame() {
    this.status = FINISHED_SPRINT_GAME;
  }

  async getWordsFromDataBase() {
    try {
      const response = await fetch(this.wordsUrl);
      this.dataWords = await response.json();
    } catch (error) {
      throw new Error('Ошибка при получении слов с сервера');
    }
  }

  nextWord() {
    return this.dataWords[this.numberElement].word;
  }

  nextTranslateWord() {
    this.randomNum = Math.round(Math.random() * 1);
    return this.dataWords[this.numberElement + this.randomNum].wordTranslate;
  }

  static calculateMultiplier(rightAnswersInRow) {
    let multiplier = 1;
    if (rightAnswersInRow > 3 && rightAnswersInRow <= 7) {
      multiplier = 2;
    } else if (rightAnswersInRow > 7 && rightAnswersInRow <= 11) {
      multiplier = 3;
    } else if (rightAnswersInRow > 11) {
      multiplier = 4;
    }
    return multiplier;
  }

  checkAnswer(expectedResult) {
    if (this.randomNum === expectedResult) {
      this.rightAnswersInRow += 1;
      this.multiplier = GameSprintController.calculateMultiplier(this.rightAnswersInRow);
      if (this.checkbox < 3) {
        this.checkbox += 1;
      } else {
        this.checkbox = 0;
      }
      this.score += 10 * this.multiplier;
    } else {
      this.rightAnswersInRow = 0;
      this.multiplier = GameSprintController.calculateMultiplier(this.rightAnswersInRow);
      this.checkbox = 0;
    }
    this.numberElement += 1;
    this.updateWords();
    this.updateView();
    this.playAudio();
  }

  playAudio() {
    this.audioClickBtn.pause();
    this.audioClickBtn.currentTime = 0.0;
    this.audioClickBtn.play();
  }
}
