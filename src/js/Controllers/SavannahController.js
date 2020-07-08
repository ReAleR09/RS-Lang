import Controller from '../lib/Controller';
import IndexView from '../Views/Savannah/IndexView';
import PlayView from '../Views/Savannah/PlayView';
import ResultsView from '../Views/Savannah/ResultsView';
import SavannahGameManager from '../Components/Games/Savannah/SavannahGameManager';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { difficulties, title, description } from '../Components/Games/Savannah/const';
import SettingsModel from '../Classes/UserSettings';
import { GAMES } from '../../config';
import AppNavigator from '../lib/AppNavigator';

export default class SavannahController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      play: PlayView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  indexAction() {
    const game = {
      title,
      description,
      difficulties,
    };

    // TODO вычислить может ли пользовать сыграть с пользовательскими словами
    game.userWordsPlay = true;

    const { difficulty, round } = SettingsModel.loadGame(GAMES.SAVANNAH);
    game.currentDifficulty = difficulty;
    game.currentRound = round;
    this.props.game = game;
  }

  playAction() {
    const params = AppNavigator.getRequestParams();

    const userWordsMode = params.get('userWords');
    let gameManager;

    if (userWordsMode) {
      gameManager = new SavannahGameManager(true);
    } else {
      let difficulty = params.get('difficulty');
      difficulty = Number.parseInt(difficulty, 10);

      let round = params.get('round');
      round = Number.parseInt(round, 10);

      gameManager = new SavannahGameManager(false, difficulty, round);
    }
    this.props.gameManager = gameManager;
  }

  resultsAction() {
    const stats = LocalStorageAdapter.get('savannah-current-words-state') || {};
    this.props.stats = stats;
  }
}
