/* eslint-disable class-methods-use-this */
import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import EnglishPuzzleManager from '../Components/EnglishPuzzle/EnglishPuzzleManager';
// import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import IndexView from '../Views/englishPuzzle/indexView';
import PlayView from '../Views/englishPuzzle/playView';
import ResultsView from '../Views/englishPuzzle/resultsView';

export default class EnglishPuzzleController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      play: PlayView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.userData = {};
  }

  playAction() {
    const params = AppNavigator.getRequestParams();
    let difficulty = params.get('difficulty');
    if (difficulty) {
      difficulty = Number.parseInt(difficulty, 10);
    } else {
      difficulty = 0;
    }

    const gameManager = new EnglishPuzzleManager();
    this.props.gameManager = gameManager;
  }

  resultsAction() {
    // const stats = LocalStorageAdapter.get(SPEAKIT_GAME_STATS);
    // if no stats stored, redirect to start page
    /*  if (!stats) {
      AppNavigator.go('englispuzzle');
      return;
    } */
    // that's only for one time use
    // LocalStorageAdapter.remove(SPEAKIT_GAME_STATS);
    // this.props.stats = stats;
  }
}
