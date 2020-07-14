import Controller from '../lib/Controller';
import PlayView from '../Views/GameSprint/PlayView';
import UniversalGameStartView from '../Views/UniversalGameStartView';
import {
  difficulties, title, description,
  IN_PROGRESS_SPRINT_GAME, FINISHED_SPRINT_GAME, EVENT_NAME_SPRINT_GAME,
} from '../Components/Games/Sprint/ConstantsGameSprint';
import WordsApi from '../Classes/Api/WordsApi';
import SettingsModel from '../Classes/UserSettings';
import { GAMES, MODES } from '../../config';
import AppNavigator from '../lib/AppNavigator';
import GameSprintWordsApi from '../Components/Games/Sprint/GameSprintWordsApi';
import { showPreloader, hidePreloader } from '../Classes/Preloader';
import Statistics from '../Classes/Statistics';
// import GameSprintControllerSecond from './GameSprintContollerSecond';

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
      index: UniversalGameStartView,
      play: PlayView,
    };
    super(viewClasses);

    this.correctTranslation = 0;
    this.wrongTranslation = 1;
    this.audioClickBtn = new Audio('/assets/audio/piu.mp3');
    this.wordsState = [];
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
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
    const { difficulty, round } = SettingsModel.loadGame(GAMES.SPRINT);
    game.currentDifficulty = difficulty;
    game.currentRound = round;
    this.props.game = game;
  }

  playAction() {
    const params = AppNavigator.getRequestParams();

    const userWordsMode = params.get('userWords');
    let gameManager;

    if (userWordsMode) {
      // gameManager = new GameSprintControllerSecond(true);
      this.initGame(true);
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
        AppNavigator.go('game-sprint');
        this.cancelAction();
      }
      // gameManager = new GameSprintControllerSecond(false, difficulty, round);
      this.initGame(false, difficulty, round);
    }

    this.props.gameManager = gameManager;
  }

  async initGame(userWordsMode = false, difficulty = 0, round = 1) {
    this.userWordsMode = userWordsMode;
    this.difficulty = difficulty;
    this.round = round;

    const mode = userWordsMode ? MODES.REPITITION : MODES.GAME;
    this.statistics = new Statistics(GAMES.SPRINT, mode, false);

    this.props.onRightClick = () => {
      this.checkAnswer(this.correctTranslation);
    };
    this.props.onFalseClick = () => {
      this.checkAnswer(this.wrongTranslation);
    };

    await this.getWordsFromDataBase();
    this.startGame();
  }

  async getWordsFromDataBase() {
    showPreloader();
    // TODO show load animation?
    let words;

    if (this.userWordsMode) {
      words = await GameSprintWordsApi.getUserWords();
    } else {
      words = await GameSprintWordsApi.getWordsForDifficultyAndRound(
        this.difficulty,
        this.round,
      );
    }

    const wordsState = words.map((wordInfo) => {
      const wordState = {
        id: wordInfo.id,
        guessed: false,
        word: wordInfo.word.toLowerCase(),
        audio: wordInfo.audio,
        image: wordInfo.image,
        transcription: wordInfo.transcription,
        wordTranslate: wordInfo.wordTranslate,
      };

      return wordState;
    });
    this.wordsState = wordsState;
    // console.log(this.wordsState);
    // this.displayWords(wordsState);
    hidePreloader();
  }

  startGame() {
    this.status = IN_PROGRESS_SPRINT_GAME;
    this.rightAnswersInRow = 0;
    this.numberElement = 0;
    this.multiplier = 1;
    this.checkbox = 0;
    this.score = 0;
    this.gameTimer = 61;
    this.updateWords();
    this.updateTimer();
  }

  updateWords() {
    if (this.wordsState[this.numberElement + 1]) {
      this.currentWord = this.nextWord();
      this.translateWord = this.nextTranslateWord();
    } else {
      this.stopGame();
    }
  }

  updateTimer() {
    this.gameTimer -= 1;
    if (this.gameTimer === 0) {
      this.stopGame();
    } else {
      setTimeout(() => this.updateTimer(), 1000);
    }
    if (this.wordsState[this.numberElement + 1]) {
      this.updateView();
    }
  }

  updateView() {
    PlayView.publish(EVENT_NAME_SPRINT_GAME, {
      status: this.status,
      timer: this.gameTimer,
      score: this.score,
      multiplier: this.multiplier,
      checkbox: this.checkbox,
      currentWord: this.currentWord,
      translateWord: this.translateWord,
    });
  }

  stopGame() {
    this.statistics.sendGameResults();
    this.status = FINISHED_SPRINT_GAME;
    // AppNavigator.go('sprint', 'results');
  }

  nextWord() {
    return this.wordsState[this.numberElement].word;
  }

  nextTranslateWord() {
    this.randomNum = Math.round(Math.random() * 1);
    return this.wordsState[this.numberElement + this.randomNum].wordTranslate;
  }

  static calculateMultiplier(rightAnswersInRow) {
    let multiplier = 1;
    if (rightAnswersInRow > 3 && rightAnswersInRow <= 7) {
      multiplier = 2;
    } else if (rightAnswersInRow > 7 && rightAnswersInRow <= 11) {
      multiplier = 3;
    } else if (rightAnswersInRow > 11) {
      multiplier = 4;
    }
    return multiplier;
  }

  checkAnswer(expectedResult) {
    if (this.randomNum === expectedResult) {
      this.statistics.updateWordStatistics(this.wordsState[this.numberElement].id, true);
      this.rightAnswersInRow += 1;
      this.multiplier = GameSprintController.calculateMultiplier(this.rightAnswersInRow);
      if (this.checkbox < 3) {
        this.checkbox += 1;
      } else {
        this.checkbox = 0;
      }
      this.score += 10 * this.multiplier;
    } else {
      this.statistics.updateWordStatistics(this.wordsState[this.numberElement].id, false);
      this.rightAnswersInRow = 0;
      this.multiplier = GameSprintController.calculateMultiplier(this.rightAnswersInRow);
      this.checkbox = 0;
    }
    this.numberElement += 1;
    this.updateWords();
    this.updateView();
    this.playAudio();
  }

  playAudio() {
    this.audioClickBtn.pause();
    this.audioClickBtn.currentTime = 0.0;
    this.audioClickBtn.play();
  }
}
