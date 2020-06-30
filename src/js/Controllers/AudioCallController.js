import Controller from '../lib/Controller';
import IndexView from '../Views/GameAudioCall/IndexView';
import Utils from '../Utils/Utils';

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
      index: IndexView,
    };
    super(viewClasses);
    this.wordsUrl = 'http://pacific-castle-12388.herokuapp.com/words?page=1&group=0';
    this.audioClickBtn = new Audio('../../audio/piu.mp3');
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
  async indexAction() {
    this.props.checkAnswerWord = () => {
      this.checkAnswer();
    };
    this.props.answerWord = (event) => {
      console.log(event.target.innerText);
    };
    await this.getWordsFromDataBase();
    this.startGame();
  }

  startGame() {
    this.status = 'in-progress';
    this.countCorrectTranslationWords = 0;
    this.wordsToSend = [];
    this.prepareWords();
    this.updateView();
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
    IndexView.publish('update-data', {
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

  checkAnswer() {
    this.playAudio();
  }

  playAudio() {
    this.audioClickBtn.pause();
    this.audioClickBtn.currentTime = 0.0;
    this.audioClickBtn.play();
  }

  stopGame() {
    this.status = 'finish';
  }
}
