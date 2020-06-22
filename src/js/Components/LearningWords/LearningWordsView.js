import '../../../sass/Components/LearningWords/style.scss';
import LearningWordsMaterial from './LearningWordsMaterial';
// import AppNavigator from '../../lib/AppNavigator';
import { DIFFICULTY_MODIFIERS, DATA_URL } from './constants';
import * as CONFIGS from './template';

export default class LearningWordsView {
  constructor(model) {
    this.model = model;
  }

  attach(element) {
    this.element = element;
    this.material = new LearningWordsMaterial(element);

    this.wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);

    this.assignButtonListeners();

    this.assignInputListeners();
  }

  detach() {
    this.model = null;
    this.element = null;
    this.material = null;
  }

  assignButtonListeners() {
    const buttonNext = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.NEXT);
    const buttonPrev = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.PREV);

    buttonNext.addEventListener('click', this.onButtonNext.bind(this));
    buttonPrev.addEventListener('click', this.onButtonPrevious.bind(this));

    this.assignWordRateButtonListeners();
  }

  assignWordRateButtonListeners() {
    const buttonAgain = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.AGAIN);
    const buttonHard = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.HARD);
    const buttonNormal = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.NORMAL);
    const buttonEasy = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.EASY);

    buttonAgain.addEventListener('click', () => {
      this.model.sendCardToTrainingEnd();
    });
    buttonHard.addEventListener('click', () => {
      this.model.updateVocabulary(this.rateWord, DIFFICULTY_MODIFIERS.HARD);
    });
    buttonNormal.addEventListener('click', () => {
      this.model.updateVocabulary(this.rateWord, DIFFICULTY_MODIFIERS.NORMAL);
    });
    buttonEasy.addEventListener('click', () => {
      this.model.updateVocabulary(this.rateWord, DIFFICULTY_MODIFIERS.EASY);
    });
  }

  assignInputListeners() {
    this.wordInput.addEventListener('input', () => {
      this.removePlaceHolder();
    });
  }

  onButtonNext() {
    const inputValue = this.wordInput.value;
    this.wordInput.value = '';

    const checkResult = this.model.acceptInput(inputValue);

    if (this.isCardLocked()) {
      if (checkResult) {
        this.placeSuccessPlaceHolder();
      } else {
        this.placeErrorPlaceHolder();
      }
    }
  }

  onButtonPrevious() {
    this.model.goPrevious();
  }

  showNewWordRateForm(word) {
    this.rateWord = word;
    const modalWordRate = this.element.querySelector(CONFIGS.QUERIES.MODALS.WORD_RATE);
    LearningWordsMaterial.showModal(modalWordRate);
  }

  placeErrorPlaceHolder() {
    // TODO Clever placeholder
    this.initPlaceHolder();
    this.wordInput.classList.add(CONFIGS.CLASS_ERROR);
  }

  placeSuccessPlaceHolder() {
    this.initPlaceHolder();
    this.wordInput.classList.add(CONFIGS.CLASS_SUCCESS);
  }

  removePlaceHolder() {
    this.wordInput.classList.remove(CONFIGS.CLASS_SUCCESS);
    this.wordInput.classList.remove(CONFIGS.CLASS_ERROR);
  }

  initPlaceHolder(text) {
    if (!text) return;
    const wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);
    wordInput.placeholder = text;
  }

  // eslint-disable-next-line class-methods-use-this
  getCardLayout() {
    const html = CONFIGS.HTML_COMPONENT;
    return html;
  }

  drawWordToDOM(word) {
    this.removePlaceHolder();

    this.initPlaceHolder(word.word);

    const wordQueries = CONFIGS.QUERIES.WORD_ELEMENTS;

    this.element.classList.remove(CONFIGS.CLASS_VISIBLE);

    const translate = this.element.querySelector(wordQueries.WORD_TRANSLATE);
    const exampleStart = this.element.querySelector(wordQueries.EXAMPLE_START);
    const exampleEnd = this.element.querySelector(wordQueries.EXAMPLE_END);
    const exampleTranslate = this.element.querySelector(wordQueries.EXAMPLE_TRANSLATE);
    const description = this.element.querySelector(wordQueries.DESCRIPTION);
    const descriptionTranslate = this.element.querySelector(wordQueries.DESCRIPTION_TRANSLATE);
    const image = this.element.querySelector(wordQueries.IMAGE);
    const transcription = this.element.querySelector(wordQueries.TRANSCRIPTION);

    translate.innerText = word.wordTranslate;
    exampleStart.innerText = word.exampleStart;
    exampleEnd.innerText = word.exampleEnd;
    exampleTranslate.innerText = word.textExampleTranslate;
    description.innerHTML = word.textMeaning;
    descriptionTranslate.innerText = word.textMeaningTranslate;
    image.src = `${DATA_URL}${word.image}`;
    transcription.innerText = word.transcription;

    this.element.classList.add(CONFIGS.CLASS_VISIBLE);
  }

  lockCard() {
    const wordCard = this.element.querySelector(CONFIGS.QUERY_WORDCARD);
    wordCard.classList.add(CONFIGS.CLASS_LOCK);
  }

  unlockCard() {
    const wordCard = this.element.querySelector(CONFIGS.QUERY_WORDCARD);
    wordCard.classList.remove(CONFIGS.CLASS_LOCK);
  }

  isCardLocked() {
    const wordCard = this.element.querySelector(CONFIGS.QUERY_WORDCARD);
    return wordCard.classList.contains(CONFIGS.CLASS_LOCK);
  }
}
