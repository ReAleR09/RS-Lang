import Controller from '../lib/Controller';
import IndexView from '../Views/GameAudioCall/IndexView';
import Utils from '../Utils/Utils';
import { GAMES, MODES } from '../../config';
import {
  INIT_GAME,
  UPDATE_DATA,
  GUESSED_WORD,
  NOT_GUESS,
  FINISH,
  difficulties,
  title,
  description,
} from '../Utils/ConstantsGameAudioCall';
import UniversalGameStartView from '../Views/UniversalGameStartView';
import WordsApi from '../Classes/Api/WordsApi';
import SettingsModel from '../Classes/UserSettings';
import AppNavigator from '../lib/AppNavigator';
import { showPreloader, hidePreloader } from '../Classes/Preloader';
import Statistics from '../Classes/Statistics';
import GameSprintWordsApi from '../Components/Games/Sprint/GameSprintWordsApi';

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
export default class GameAudioCallController extends Controller {
  constructor() {
    const viewClasses = {
      index: UniversalGameStartView,
      play: IndexView,
    };
    super(viewClasses);
    this.audioFail = new Audio('/assets/audio/badumtss.mp3');
    this.audioEndGame = new Audio('/assets/audio/endGame.mp3');
    this.audioEndGameFail = new Audio('/assets/audio/veryBadResult.mp3');
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
    const { difficulty, round } = SettingsModel.loadGame(GAMES.AUDIOCALL);
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
        AppNavigator.go('game-audio-call');
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
    this.statistics = new Statistics(GAMES.AUDIOCALL, mode, false);

    await this.getWordsFromDataBase();
    this.props.startGame = () => {
      this.startGame();
    };
    this.props.answerWord = (event) => {
      this.compareWords(event);
      // console.log(event.target.innerText);
    };
    this.props.sayWord = () => {
      this.playAudio();
    };
    this.props.audioEndGame = () => {
      this.playAudioEndGame();
    };
    // this.startGame();
  }

  startGame() {
    this.status = INIT_GAME;
    this.countCorrectTranslationWords = 0;
    this.wordsToSend = [];
    this.countAnswerWords = 0;
    this.prepareWords();
    this.updateView();
    this.playAudio();
  }

  prepareWords() {
    for (let x = 0; x < 10; x += 1) {
      this.wordsToSend.push({
        audio: this.dataWords[x].audio,
        image: this.dataWords[x].image,
        word: this.dataWords[x].word,
        wordTranslate: this.dataWords[x].wordTranslate,
        randomTranslateWords: this.randomTranslateWord(this.dataWords[x].wordTranslate),
      });
    }
    // console.log(this.wordsToSend);
  }

  randomTranslateWord(rightWord) {
    const randomWords = [];
    randomWords.push(rightWord);
    for (let x = 0; x < 4; x += 1) {
      let randomNumber = Math.round(Math.random() * this.dataWords.length);
      if (randomNumber === this.dataWords.length) {
        randomNumber -= 1;
      }
      const word = this.dataWords[randomNumber].wordTranslate;
      if (randomWords[0] === word || randomWords.some((el) => el === word)) {
        x -= 1;
      } else {
        randomWords.push(word);
      }
    }
    return Utils.arrayShuffle(randomWords);
  }

  updateView() {
    IndexView.publish(UPDATE_DATA, {
      status: this.status,
      countCorrectTranslationWords: this.countCorrectTranslationWords,
      wordsToSend: this.wordsToSend,
    });
  }

  // async getWordsFromDataBase() {
  //   try {
  //     const response = await fetch(this.wordsUrl);
  //     this.dataWords = await response.json();
  //     // console.log(this.dataWords);
  //   } catch (error) {
  //     throw new Error('Ошибка при получении слов с сервера');
  //   }
  // }

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
    this.dataWords = wordsState;
    console.log(this.dataWords);
    // this.displayWords(wordsState);
    hidePreloader();
  }

  compareWords(event) { // Тут можно помечать угаданные слова
    if (this.wordsToSend[this.countAnswerWords].wordTranslate === event.target.innerText) {
      this.statistics.updateWordStatistics(this.dataWords[this.countAnswerWords].id, true);
      this.countCorrectTranslationWords += 1;
      this.status = GUESSED_WORD;
      this.updateView();
    } else { // Если не угадал, отметить статус какой, как не угаданное.
      this.statistics.updateWordStatistics(this.dataWords[this.countAnswerWords].id, false);
      this.status = NOT_GUESS;
      this.updateView();
      this.playAudioFail();
    }
    this.countAnswerWords += 1;
  }

  playAudio() {
    if (this.countAnswerWords === 10) {
      this.statistics.sendGameResults();
      this.status = FINISH;
      this.updateView();
    } else {
      // console.log('playaudio');
      this.audio = new Audio(this.wordsToSend[this.countAnswerWords].audio);
      this.audio.play();
    }
  }

  playAudioFail() {
    this.audioFail.play();
  }

  playAudioEndGame() {
    if (this.countCorrectTranslationWords > 0) {
      this.audioEndGame.play();
    } else {
      this.audioEndGameFail.play();
    }
  }
}
