import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import IndexView from '../Views/LearningWords/IndexView';
import ResultsView from '../Views/LearningWords/ResultsView';
import LearningWordsModel from '../Components/LearningWords/LearningWordsModel';
import { MODES } from '../../config';
// import Statistics from '../Classes/Statistics';
import { PARAM_MODE, PARAM_WAS_STARTED } from '../Utils/Constants';
import TestResultView from '../Views/LearningWords/TestResultView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { PARAM_STATS_LEARNING } from '../Components/LearningWords/constants';

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
      testResult: TestResultView,
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

    let mode = MODES.REPITITION;
    if (params.has(PARAM_MODE)) {
      mode = params.get(PARAM_MODE);
    }

    this.props.model = new LearningWordsModel(mode);
  }

  resultsAction() {
    const params = AppNavigator.getRequestParams();
    let wasStarted = false;
    let mode = MODES.REPITITION;
    if (params.has(PARAM_MODE)) {
      mode = params.get(PARAM_MODE);
    }
    if (params.has(PARAM_WAS_STARTED)) {
      wasStarted = (params.get(PARAM_WAS_STARTED) === 'true');
    }
    this.props.stats = LocalStorageAdapter.get(PARAM_STATS_LEARNING);

    this.props.wasStarted = wasStarted;
    this.props.mode = mode; // new Statistics(GAMES.LEARNING, mode);
  }

  testResultAction() {
    const params = AppNavigator.getRequestParams();

    let difficulty = params.get('difficulty');
    if (difficulty) {
      difficulty = Number.parseInt(difficulty, 10);
    } else {
      difficulty = 0;
    }

    this.props.difficulty = difficulty; // new Statistics(GAMES.LEARNING, mode);
  }
}
