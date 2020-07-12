/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import Controller from '../lib/Controller';
import AppNavigator from '../lib/AppNavigator';
import EnglishPuzzleManager from '../Components/EnglishPuzzle/EnglishPuzzleManager';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import IndexView from '../Views/englishPuzzle/indexView';
import PlayView from '../Views/englishPuzzle/playView';
import ResultsView from '../Views/englishPuzzle/resultsView';
import engPuzConst from '../Components/EnglishPuzzle/EnglishPuzzleConstants';
import WordsApi from '../Classes/Api/WordsApi';
import SettingsModel from '../Classes/UserSettings';
import { GAMES } from '../../config';

export default class EnglishPuzzleController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      play: PlayView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  async indexAction() {
    const game = {};
    const { difficulty, round } = SettingsModel.loadGame(GAMES.PUZZLE);

    game.difficulty = difficulty;
    game.round = round;

    const wordsApi = new WordsApi();
    const repWordsCount = await wordsApi.getRepitionWordsCount(false);
    game.userWordsPlay = (repWordsCount >= 10);
    this.props.game = game;
  }

  async playAction() {
    const params = AppNavigator.getRequestParams();

    const userWordsMode = params.get('isUserWords');
    let gameManager;
    let difficulty = params.get('difficulty');
    let round = params.get('round');
    if (userWordsMode) {
      gameManager = new EnglishPuzzleManager(true);
    } else {
      difficulty = Number.parseInt(difficulty, 10);
      round = Number.parseInt(round, 10);
      // navigate to main game page if user somehow entered the page with invalid params
      if (
        difficulty < 0 || difficulty > 5
        || round < 1 || round > engPuzConst.pagesPerDifficulties[difficulty]
      ) {
        AppNavigator.go('englishpuzzle');
        this.cancelAction();
      }
      gameManager = new EnglishPuzzleManager(false, difficulty, round);
    }
    this.props.gameManager = gameManager;
  }

  resultsAction() {
    const params = AppNavigator.getRequestParams();
    const stats = LocalStorageAdapter.get(engPuzConst.localstorage.RESULTS);

    if (!stats) {
      AppNavigator.go('englishpuzzle');
      this.cancelAction();
    }

    const userWordsMode = params.get('userWordsPlay');
    const { difficulty, round } = SettingsModel.loadGame(GAMES.PUZZLE);

    this.props.nextDifficulty = difficulty;
    this.props.nextRound = round;
    this.props.userWordsMode = userWordsMode;
    this.props.stats = stats;
  }
}
