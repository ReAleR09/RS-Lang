import Controller from '../lib/Controller';
import IndexView from '../Views/GameAudioCall/IndexView';
import Utils from '../Utils/Utils';
import { BACKEND_URL, CONF_MEDIA_BASE_PATH } from '../../config';
import {
  INIT_GAME,
  UPDATE_DATA,
  GUESSED_WORD,
  NOT_GUESS,
  FINISH,
} from '../Utils/ConstantsGameAudioCall';

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
      index: IndexView,
    };
    super(viewClasses);
    this.wordsUrl = `${BACKEND_URL}words?page=1&group=0`;
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

  async getWordsFromDataBase() {
    try {
      const response = await fetch(this.wordsUrl);
      this.dataWords = await response.json();
      // console.log(this.dataWords);
    } catch (error) {
      throw new Error('Ошибка при получении слов с сервера');
    }
  }

  compareWords(event) { // Тут можно помечать угаданные слова
    if (this.wordsToSend[this.countAnswerWords].wordTranslate === event.target.innerText) {
      this.countCorrectTranslationWords += 1;
      this.status = GUESSED_WORD;
      this.updateView();
    } else { // Если не угадал, отметить статус какой, как не угаданное.
      this.status = NOT_GUESS;
      this.updateView();
      this.playAudioFail();
    }
    this.countAnswerWords += 1;
  }

  playAudio() {
    if (this.countAnswerWords === 10) {
      this.status = FINISH;
      this.updateView();
    } else {
      // console.log('playaudio');
      this.audio = new Audio(CONF_MEDIA_BASE_PATH + this.wordsToSend[this.countAnswerWords].audio);
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
