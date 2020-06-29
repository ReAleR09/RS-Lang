import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import IndexView from '../Views/LearningWords/IndexView';
import ResultsView from '../Views/LearningWords/ResultsView';
import LearningWordsModel from '../Components/LearningWords/LearningWordsModel';

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
export default class LearningWordsController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
  indexAction() {
    const params = AppNavigator.getRequestParams();
    let difficulty = params.get('difficulty');
    if (difficulty) {
      difficulty = Number.parseInt(difficulty, 10);
    } else {
      difficulty = 0;
    }

    const settings = {
      maxCount: 50,
      maxCountNewCards: 20,
      showWordTranslate: true,
      showExample: true, // TODO СДЕЛАТЬ СОКРЫТИЕ ИСКОМОГО СЛОВА В ПОДСКАЗКАХ
      showTranscription: true,
      showMeaning: true,
      showButtonSkip: true,
      showButtonSimple: true,
      showButtonComplicated: true,
      showImage: true,
      showWordRate: true,

    };
    const statistics = { totalCount: 0, NewWords: 0 };
    // TODO Принять настройки и статистику
    this.props.model = new LearningWordsModel(settings, statistics, mode);
  }

  resultsAction() {
    this.statistics = 0;
  }
}
