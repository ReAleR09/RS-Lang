import '../../sass/Components/FieldOfDreams.scss';
import Controller from '../lib/Controller';
import UniversalGameStartView from '../Views/UniversalGameStartView';
import PlayView from '../Views/FieldOfDreams/PlayView';
import AppNavigator from '../lib/AppNavigator';
import ResultsView from '../Views/FieldOfDreams/ResultsView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { difficulties, title, description } from '../Components/Games/FieldOfDreams/constants';
import SettingsModel from '../Classes/UserSettings';
import { GAMES } from '../../config';
import FieldOfDreamsGameManager, { GAME_STATS } from '../Components/Games/FieldOfDreams/FieldOfDreamsGameManager';
import WordsApi from '../Classes/Api/WordsApi';

export default class FieldOfDreamsController extends Controller {
  constructor() {
    const viewClasses = {
      index: UniversalGameStartView,
      play: PlayView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  async indexAction() {
    const game = {
      title,
      description,
      difficulties,
    };

    const wordsApi = new WordsApi();
    const repWordsCount = await wordsApi.getRepitionWordsCount(false);
    game.userWordsPlay = (repWordsCount >= 10);

    // load saved difficulty and round
    const { difficulty, round } = SettingsModel.loadGame(GAMES.SPEAKIT);
    game.currentDifficulty = difficulty;
    game.currentRound = round;
    this.props.game = game;
  }

  playAction() {
    const params = AppNavigator.getRequestParams();

    const userWordsMode = params.get('userWords');
    let gameManager;

    if (userWordsMode) {
      gameManager = new FieldOfDreamsGameManager(true);
    } else {
      let difficulty = params.get('difficulty');
      difficulty = Number.parseInt(difficulty, 10);

      let round = params.get('round');
      round = Number.parseInt(round, 10);
      // navigate to main game page if user somehow entered the page with invalid params
      if (
        difficulty < 0 || difficulty > 5
        || round < 1 || round > difficulties[difficulty]
      ) {
        AppNavigator.go('fieldsOfDreams');
        this.cancelAction();
      }
      gameManager = new FieldOfDreamsGameManager(false, difficulty, round);
    }

    this.props.gameManager = gameManager;
  }

  resultsAction() {
    const stats = LocalStorageAdapter.get(GAME_STATS);
    // if no stats stored, redirect to start page
    if (!stats) {
      AppNavigator.go('fieldOfDreams');
      // we have to do this in order to not cause any errors to the console
      this.cancelAction();
    }
    // that's only for one time use
    LocalStorageAdapter.remove(GAME_STATS);
    this.props.stats = stats;

    // if not user words, we can proceed to the next round
    // here we decide if to show "next round" button by setting two params:
    if (!stats.isUserWordsMode) {
      if (stats.round < difficulties[stats.difficulty]) {
        this.props.nextDifficulty = stats.difficulty;
        this.props.nextRound = stats.round + 1;
      } else if (stats.difficulty < difficulties.length - 1) {
        this.props.nextDifficulty = stats.difficulty + 1;
        this.props.nextRound = 1;
      }
    }
    // and save it
    SettingsModel.saveGame(
      GAMES.FIELDOFDREAMS,
      {
        difficulty: this.props.nextDifficulty,
        round: this.props.nextRound,
      },
    );
  }
}
