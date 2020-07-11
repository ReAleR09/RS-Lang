import AppNavigator from '../../../lib/AppNavigator';

const GUESSED_SOUND = '/assets/audio/savannah-right.mp3';
const NOT_GUESSED_SOUND = '/assets/audio/savannah-wrong.mp3';

const CLASS_LIVES = 'savannah__lives';
const CLASS_LIFE = 'savannah-life';
const CLASS_ENGLISH_CARD = 'savannah__english-word';
const CLASS_TRANSLATE_CARDS = 'savannah__translate-words';
const CLASS_TRANSLATE_CARD = 'savannah-translate-word';
const ID_ENGLISH_CARD = 'savanna__falling-word';

const START_LEFT_COORDINATE = '50%';
const INTERVAL = 40;

export default class SavannahView {
  constructor(changeState, sendStatisticToServer) {
    this.changeState = changeState;
    this.sendStatisticToServer = sendStatisticToServer;
    this.play = this.play.bind(this);
    this.mistakes = 0;
    this.keyHandler = this.keyHandler.bind(this);

    this.top = -100;
    this.trueAudio = new Audio(GUESSED_SOUND);
    this.falseAudio = new Audio(NOT_GUESSED_SOUND);
  }

  attach(element) {
    this.element = element;
    this.initEnglishWordBlock();
    this.initTranslateWordsBlock();
  }

  init(words) {
    if (words) {
      this.words = words;
    }
    if (this.words.length && this.mistakes < 5) {
      const randomWords = this.words[0];
      const englishWord = this.element.querySelector(`.${CLASS_ENGLISH_CARD}`);
      englishWord.innerHTML = randomWords[0].word;
      const width = englishWord.offsetWidth;
      englishWord.style.marginLeft = `${-width / 2}px`;

      let translateWords = this.element.querySelectorAll(`.${CLASS_TRANSLATE_CARD}`);

      /* eslint-disable no-param-reassign */
      translateWords.forEach((item, index) => {
        item.setAttribute('right', index === 0);
        item.innerText = randomWords[index].wordTranslate;
      });
      translateWords = Array.from(translateWords).sort(() => Math.random() - 0.5);
      /* eslint-enable no-param-reassign */

      const translateWordsBlock = this.element.querySelector(`.${CLASS_TRANSLATE_CARDS}`);
      translateWordsBlock.innerHtml = '';
      translateWordsBlock.append(...translateWords);
    } else {
      clearInterval(this.interval);
      window.removeEventListener('keyup', this.keyHandler);
      this.sendStatisticToServer();
      AppNavigator.replace('savannah', 'results');
    }
  }

  initEnglishWordBlock() {
    this.englishWord = this.element.querySelector(`.${CLASS_ENGLISH_CARD}`);
    this.endPoint = window.innerHeight / 2;

    this.englishWord.style.position = 'absolute';
    this.englishWord.style.left = START_LEFT_COORDINATE;

    this.interval = setInterval(this.animation.bind(this), INTERVAL);
  }

  animation() {
    this.top += 2;

    if (this.top < this.endPoint + 30) {
      this.englishWord.style.top = `${this.top}px`;
    } else {
      this.goNotGuessedStep();
      this.getNextWord();
    }
  }

  stopAnimation() {
    clearInterval(this.interval);
  }

  initTranslateWordsBlock() {
    const translateWordsBlock = this.element.querySelector(`.${CLASS_TRANSLATE_CARDS}`);
    translateWordsBlock.addEventListener('click', this.play);
    window.addEventListener('keyup', this.keyHandler);
  }

  keyHandler(e) {
    const translateWordsBlock = this.element.querySelectorAll(`.${CLASS_TRANSLATE_CARD}`);

    if (e.key >= '1' && e.key <= '4') {
      if (translateWordsBlock[+e.key - 1].getAttribute('right') === 'true') {
        this.goGuessedStep();
      } else {
        this.goNotGuessedStep();
      }
      this.getNextWord();
    }
  }

  play(e) {
    e.preventDefault();

    const element = e.target;
    if (element.classList.contains(CLASS_TRANSLATE_CARD)) {
      if (element.getAttribute('right') === 'true') {
        this.goGuessedStep();
      } else {
        this.goNotGuessedStep();
      }

      this.getNextWord();
    }
  }

  getNextWord() {
    this.top = -100;
    setTimeout(() => {
      this.words.shift();
      this.init();
    }, 500);
  }

  goGuessedStep() {
    this.trueAudio.play();
    const englishWord = this.element.querySelector(`.${CLASS_ENGLISH_CARD}`).innerHTML;
    this.changeState(englishWord);
  }

  goNotGuessedStep() {
    this.mistakes += 1;

    this.falseAudio.play();
    const lives = Array.from(this.element.querySelectorAll(`.${CLASS_LIFE}`));
    lives.shift();
    const livesBlock = this.element.querySelector(`.${CLASS_LIVES}`);
    livesBlock.innerHTML = '';
    livesBlock.append(...lives);
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout() {
    const html = `
    <div class="savannah">
      <div class="${CLASS_LIVES}">
        <div class="${CLASS_LIFE}">♥</div>
        <div class="${CLASS_LIFE}">♥</div>
        <div class="${CLASS_LIFE}">♥</div>
        <div class="${CLASS_LIFE}">♥</div>
        <div class="${CLASS_LIFE}">♥</div>
      </div>
      <div id="${ID_ENGLISH_CARD}" class="${CLASS_ENGLISH_CARD}"> </div>
      <div class="${CLASS_TRANSLATE_CARDS}">
        <div class="${CLASS_TRANSLATE_CARD}"></div>
        <div class="${CLASS_TRANSLATE_CARD}"></div>
        <div class="${CLASS_TRANSLATE_CARD}"></div>
        <div class="${CLASS_TRANSLATE_CARD}"></div>
      </div>
      <div class="savannah__hint">Use keys 1, 2, 3, and 4 to give a quick answer</div>
      </div>`;

    return html;
  }
}
