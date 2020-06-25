import Controller from '../lib/Controller';
import GameStartView from '../Views/GameStartView';
import SpeakitGameManager, { SPEAKIT_GAME_STATS } from '../Components/Games/Speakit/SpeakitGameManager';
import PlayView from '../Views/Speakit/PlayView';
import AppNavigator from '../lib/AppNavigator';
import ResultsView from '../Views/Speakit/ResultsView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

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
      title: 'SpeakIt: mini-game',
      description: 'In this game You have to pronounce words using a microphone!',
      // TODO fill with actual data
      // this array describes total amount of rounds per every difficulty
      // (implicitly index with 0-5 like difficulties)
      difficulties: [
        50, 60, 40,
        30, 10, 20,
      ],
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
    if (difficulty) {
      difficulty = Number.parseInt(difficulty, 10);
    } else {
      difficulty = 0;
    }
    const gameManager = new SpeakitGameManager(difficulty);
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
