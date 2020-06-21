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
      console.log(this.dataWords);
    };

    this.gameTime = 60;
  }

  async getWordsFromDataBase() {
    try {
      const response = await fetch(this.wordsUrl);
      this.dataWords = await response.json();
    } catch (error) {
      throw new Error('Ошибка при получении слов с сервера');
    }
  }

  fetchData() {
    // this.words = words;
    IndexView.publish('status', { score: 0, multiplier: 1, currentWord: this.nextWord() });
  }

  nextWord() {
    return this.dataWords.pop();
  }

  checkIsRight() {
    if (true) {
      this.score = 10;
      this.multiplier = 1;
      this.rightAnswersInRow += 1;
      IndexView.publish('status', { score: this.score, multiplier: this.multiplier, currentWord: this.nextWord() });
    } else {
      this.multiplier = 1;
      this.rightAnswersInRow = 0;
      IndexView.publish('status', {});
    }
  }
}
