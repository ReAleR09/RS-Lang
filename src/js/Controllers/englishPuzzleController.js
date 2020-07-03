/* eslint-disable class-methods-use-this */
import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import EnglishPuzzleManager from '../Components/EnglishPuzzle/EnglishPuzzleManager';
// import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import IndexView from '../Views/englishPuzzle/indexView';
import PlayView from '../Views/englishPuzzle/playView';
import ResultsView from '../Views/englishPuzzle/resultsView';
import SettingsModel from '../Classes/UserSettings';
import { GAMES } from '../../config';
import engPuzConst from '../Components/EnglishPuzzle/EnglishPuzzleConstants';

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

    const userWordsMode = params.get('isUserWords');
    let gameManager;

    if (userWordsMode) {
      gameManager = new EnglishPuzzleManager(true);
    } else {
      let difficulty = params.get('difficulty');
      difficulty = Number.parseInt(difficulty, 10);

      let round = params.get('round');
      round = Number.parseInt(round, 10);
      // navigate to main game page if user somehow entered the page with invalid params
      if (
        difficulty < 0 || difficulty > 5
        || round < 1 || round > engPuzConst.pagesPerDifficulties[difficulty]
      ) {
        AppNavigator.go('speakit');
        this.cancelAction();
      }
      gameManager = new EnglishPuzzleManager(false, difficulty, round);
    }

    SettingsModel.saveGame(
      GAMES.PUZZLE,
      {
        difficulty: this.props.nextDifficulty,
        round: this.props.nextRound,
      },
    );

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
