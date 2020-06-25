import Controller from '../lib/Controller';
import GameStartView from '../Views/GameStartView';
import SpeakitGameManager, { SPEAKIT_GAME_STATS } from '../Components/Games/Speakit/SpeakitGameManager';
import PlayView from '../Views/Speakit/PlayView';
import AppNavigator from '../lib/AppNavigator';
import ResultsView from '../Views/Speakit/ResultsView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { difficulties, title, description } from '../Components/Games/Speakit/const';

export default class SpeakitController extends Controller {
  constructor() {
    const viewClasses = {
      index: GameStartView,
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
    // TODO достать последнюю сложность
    game.currentDifficulty = 2;
    // TODO достать последний раунд
    game.currentRound = 24;

    this.props.game = game;
  }

  playAction() {
    const params = AppNavigator.getRequestParams();

    let difficulty = params.get('difficulty');
    difficulty = Number.parseInt(difficulty, 10);

    let round = params.get('round');
    round = Number.parseInt(round, 10);
    // navigate to main game page if user somehow entered the page with invalid params
    if (
      difficulty < 0 || difficulty > 5
      || round < 1 || round > difficulties[difficulty]
    ) {
      AppNavigator.go('speakit');
      this.cancelAction();
    }

    const gameManager = new SpeakitGameManager(false, difficulty, round);
    this.props.gameManager = gameManager;
  }

  resultsAction() {
    const stats = LocalStorageAdapter.get(SPEAKIT_GAME_STATS);
    // if no stats stored, redirect to start page
    if (!stats) {
      AppNavigator.go('speakit');
      // we have to do this in order to not cause any errors to the console
      this.cancelAction();
    }
    // that's only for one time use
    LocalStorageAdapter.remove(SPEAKIT_GAME_STATS);
    this.props.stats = stats;

    // TODO global game statistics should be sent there
  }
}
