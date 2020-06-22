import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import IndexView from '../Views/GameSprint/IndexView';

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
    this.wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
    this.getWordsFromDataBase();
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
  indexAction() {
    console.log(this);
    this.props.exampleArray = ['4', '2', '0']; // just passing some data to view

    const params = AppNavigator.getRequestParams(); // get GET parameters etc /example/index?id=3
    this.props.exampleId = params.get('id'); // pass the GET param to View to utilize it later

    this.props.firstName = 'Boris';
    this.props.onRightClick = () => {
      this.checkIsRight();
    };
    this.props.onFalseClick = () => {
      this.checkIsFalse();
    };

    this.gameTime = 60;
  }

  async getWordsFromDataBase() {
    try {
      const response = await fetch(this.wordsUrl);
      this.dataWords = await response.json();
      console.log(this.dataWords);
      this.sendData();
    } catch (error) {
      throw new Error('Ошибка при получении слов с сервера');
    }
  }

  sendData() {
    this.numberElement = 0;
    this.multiplier = 1;
    this.checkbox = 0;
    this.score = 0;
    IndexView.publish('status', {
      score: this.score,
      multiplier: 1,
      checkbox: this.checkbox,
      currentWord: this.nextWord(),
      translateWord: this.nextTranslateWord(),
    });
  }

  nextWord() {
    return this.dataWords[this.numberElement].word;
  }

  nextTranslateWord() {
    this.randomNum = Math.round(Math.random() * 1);
    return this.dataWords[this.numberElement + this.randomNum].wordTranslate;
  }

  checkIsRight() {
    if (
      this.dataWords[this.numberElement].word === this.dataWords[this.numberElement].wordTranslate
    ) {
      this.rightAnswersInRow += 1;
      if (this.rightAnswersInRow < 4) {
        this.multiplier = 1;
      } else if (this.rightAnswersInRow > 4 && this.rightAnswersInRow < 8) {
        this.multiplier = 2;
      } else if (this.rightAnswersInRow > 8 && this.rightAnswersInRow < 12) {
        this.multiplier = 3;
      } else if (this.rightAnswersInRow > 12 && this.rightAnswersInRow < 16) {
        this.multiplier = 4;
      }
      if (this.checkbox < 3) {
        this.checkbox += 1;
      } else {
        this.checkbox = 0;
      }
      this.score += 10 * this.multiplier;
      this.numberElement += 1;
      IndexView.publish('status', {
        score: this.score,
        multiplier: this.multiplier,
        checkbox: this.checkbox,
        currentWord: this.nextWord(),
        translateWord: this.nextTranslateWord(),
      });
    } else {
      this.multiplier = 1;
      this.rightAnswersInRow = 0;
      this.checkbox = 0;
      this.numberElement += 1;
      IndexView.publish('status', {
        score: this.score,
        multiplier: this.multiplier,
        checkbox: this.checkbox,
        currentWord: this.nextWord(),
        translateWord: this.nextTranslateWord(),
      });
    }
  }

  checkIsFalse() {
    if (
      this.dataWords[this.numberElement].word !== this.dataWords[this.numberElement].wordTranslate
    ) {
      this.rightAnswersInRow += 1;
      if (this.rightAnswersInRow < 4) {
        this.multiplier = 1;
      } else if (this.rightAnswersInRow > 4 && this.rightAnswersInRow < 8) {
        this.multiplier = 2;
      } else if (this.rightAnswersInRow > 8 && this.rightAnswersInRow < 12) {
        this.multiplier = 3;
      } else if (this.rightAnswersInRow > 12 && this.rightAnswersInRow < 16) {
        this.multiplier = 4;
      }
      if (this.checkbox < 3) {
        this.checkbox += 1;
      } else {
        this.checkbox = 0;
      }
      this.score += 10 * this.multiplier;
      this.numberElement += 1;
      IndexView.publish('status', {
        score: this.score,
        multiplier: this.multiplier,
        checkbox: this.checkbox,
        currentWord: this.nextWord(),
        translateWord: this.nextTranslateWord(),
      });
    } else {
      this.multiplier = 1;
      this.rightAnswersInRow = 0;
      this.checkbox = 0;
      this.numberElement += 1;
      IndexView.publish('status', {
        score: this.score,
        multiplier: this.multiplier,
        checkbox: this.checkbox,
        currentWord: this.nextWord(),
        translateWord: this.nextTranslateWord(),
      });
    }
  }
}
