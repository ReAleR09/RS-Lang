import '../../../sass/Components/LearningWords/style.scss';
import LearningWordsMaterial from './LearningWordsMaterial';
// import AppNavigator from '../../lib/AppNavigator';
import { dataURL } from './constants';
import * as CONFIGS from './template';

export default class LearningWordsView {
  constructor(model) {
    this.model = model;
  }

  attach(element) {
    this.element = element;
    this.material = new LearningWordsMaterial(element);

    this.assignButtonListeners();
  }

  assignButtonListeners() {
    const buttonNext = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.NEXT);
    const buttonPrev = this.element.querySelector(CONFIGS.QUERIES.BUTTONS.PREV);
    buttonNext.addEventListener('click', this.onButtonNext.bind(this));
    buttonPrev.addEventListener('click', this.onButtonPrevious.bind(this));
  }

  onButtonNext() {
    const wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);
    const inputValue = wordInput.value;
    wordInput.value = '';

    if (this.model.checkInput(inputValue)) {
      const modalWordRate = this.element.querySelector(CONFIGS.QUERIES.MODALS.WORD_RATE);

      this.placeSuccessPlaceHolder();
      //  this.model.startAudio();

      LearningWordsMaterial.showModal(modalWordRate);
      this.model.goNext();
    } else {
      this.placeErrorPlaceHolder();
    }
  }

  onButtonPrevious() {
    this.model.goPrevious();
  }

  placeErrorPlaceHolder() {
    const wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);
    wordInput.classList.remove('error');
  }

  placeSuccessPlaceHolder() {
    const wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);

    wordInput.classList.add('success');
  }

  initPlaceHolder(text) {
    const wordInput = this.element.querySelector(CONFIGS.QUERIES.WORD_ELEMENTS.WORD);
    wordInput.placeholder = text;
    wordInput.classList.remove('success');
    wordInput.classList.remove('error');
  }

  // eslint-disable-next-line class-methods-use-this
  getCardLayout(/* difficulty */) {
    const html = CONFIGS.HTML_COMPONENT;
    return html;
  }

  drawWordToDOM(word) {
    const wordQueries = CONFIGS.QUERIES.WORD_ELEMENTS;

    this.element.classList.remove(CONFIGS.CLASS_VISIBLE);
    const input = this.element.querySelector(wordQueries.WORD);
    const translate = this.element.querySelector(wordQueries.WORD_TRANSLATE);
    const exampleStart = this.element.querySelector(wordQueries.EXAMPLE_START);
    const exampleEnd = this.element.querySelector(wordQueries.EXAMPLE_END);
    const exampleTranslate = this.element.querySelector(wordQueries.EXAMPLE_TRANSLATE);
    const description = this.element.querySelector(wordQueries.DESCRIPTION);
    const descriptionTranslate = this.element.querySelector(wordQueries.DESCRIPTION_TRANSLATE);
    const image = this.element.querySelector(wordQueries.IMAGE);
    const transcription = this.element.querySelector(wordQueries.TRANSCRIPTION);

    input.placeholder = word.word;
    translate.innerText = word.wordTranslate;
    exampleStart.innerText = word.exampleStart;
    exampleEnd.innerText = word.exampleEnd;
    exampleTranslate.innerText = word.textExampleTranslate;
    description.innerHTML = word.textMeaning;
    descriptionTranslate.innerText = word.textMeaningTranslate;
    image.src = `${dataURL}${word.image}`;
    transcription.innerText = word.transcription;

    this.element.classList.add(CONFIGS.CLASS_VISIBLE);
  }
}
