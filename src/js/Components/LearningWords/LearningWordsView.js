import '../../../sass/Components/LearningWords/style.scss';
import LearningWordsMaterial from './LearningWordsMaterial';
// import AppNavigator from '../../lib/AppNavigator';
import {
  DATA_URL,
  lockAttribute,
  ONE_LETTER_WIDTH,
  WIDTH_ADDITION,
} from './constants';
import {
  INDEX_QUERIES as QUERIES,
  CLASS_DISABLED,
  CLASS_ERROR,
  CLASS_SUCCESS,
  HTML_COMPONENT,
  CLASS_VISIBLE,
  CLASS_CARD_LOCKED,
} from './IndexTemplate';
import { DIFFICULTIES, DICT_CATEGORIES } from '../../Classes/Api/constants';

export default class LearningWordsView {
  constructor(model) {
    this.model = model;
    this.mode = this.model.mode;
    this.buttonNextLock = false;
  }

  init(settings) {
    this.settings = settings;

    this.settings.showTranslates = true;
    this.settings.turnOnSound = true;
  }

  updateSettings() {
    const disabledElements = [];
    const enabledElements = [];

    Object.values(QUERIES.WORD_ELEMENTS).forEach((query) => {
      enabledElements.push(this.element.querySelector(query));
    });

    Object.values(QUERIES.BUTTONS).forEach((query) => {
      enabledElements.push(this.element.querySelector(query));
    });

    enabledElements.forEach((element) => element.classList.remove(CLASS_DISABLED));

    if (!this.settings.showWordTranslate) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.WORD_TRANSLATE));
    }

    if (!this.settings.showImage) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.IMAGE));
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.IMAGE_WRAPPER));
    }

    if (!this.settings.showExample) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.EXAMPLE_START));
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.EXAMPLE_END));
    }

    if (!this.settings.showTranscription) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.TRANSCRIPTION));
    }

    if (!this.settings.showMeaning) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.DESCRIPTION));
    }

    if (!this.settings.showButtonSkip) {
      disabledElements.push(this.element.querySelector(QUERIES.BUTTONS.SKIP));
    }

    if (!this.settings.showButtonDelete) {
      disabledElements.push(this.element.querySelector(QUERIES.BUTTONS.DELETE));
    }

    if (!this.settings.showButtonComplicated) {
      disabledElements.push(this.element.querySelector(QUERIES.BUTTONS.COMPLICATED));
    }

    if (!this.settings.showTranslates || !this.isCardLocked()) {
      disabledElements.push(this.element.querySelector(QUERIES.WORD_ELEMENTS.EXAMPLE_TRANSLATE));
      disabledElements.push(this.element.querySelector(
        QUERIES.WORD_ELEMENTS.DESCRIPTION_TRANSLATE,
      ));
    }

    disabledElements.forEach((element) => element.classList.add(CLASS_DISABLED));
  }

  attach(element) {
    this.element = element;
    this.material = new LearningWordsMaterial(element);

    this.wordInput = this.element.querySelector(QUERIES.WORD_ELEMENTS.WORD);
    this.isLocked = false;

    this.assignButtonListeners();

    this.assignInputListeners();
  }

  detach() {
    this.model = null;
    this.element = null;
    this.material = null;
  }

  assignButtonListeners() {
    const buttonNext = this.element.querySelector(QUERIES.BUTTONS.NEXT);
    const buttonPrev = this.element.querySelector(QUERIES.BUTTONS.PREV);

    buttonNext.addEventListener('click', this.onButtonNext.bind(this));
    buttonPrev.addEventListener('click', this.onButtonPrevious.bind(this));

    const buttonSkip = this.element.querySelector(QUERIES.BUTTONS.SKIP);
    const buttonTranslate = this.element.querySelector(QUERIES.BUTTONS.TRANSLATE);
    const buttonSwitchSound = this.element.querySelector(QUERIES.BUTTONS.VOLUME);

    buttonSkip.addEventListener('click', () => {
      this.placeSuccessPlaceHolder();
    });
    buttonTranslate.addEventListener('click', () => {
      this.toggleShowTranslatesSetting();
    });
    buttonSwitchSound.addEventListener('click', () => {
      this.toggleTurnOnSoundSetting();
    });

    this.assignWordRateButtonListeners();

    const buttonDelete = this.element.querySelector(QUERIES.BUTTONS.DELETE);
    const buttonComplicated = this.element.querySelector(QUERIES.BUTTONS.COMPLICATED);

    buttonDelete.addEventListener('click', () => {
      this.model.updateDictionary(DICT_CATEGORIES.DELETE);
    });
    buttonComplicated.addEventListener('click', () => {
      this.model.updateDictionary(DICT_CATEGORIES.COMPLICATED);
    });
  }

  assignWordRateButtonListeners() {
    const buttonAgain = this.element.querySelector(QUERIES.BUTTONS.AGAIN);
    const buttonHard = this.element.querySelector(QUERIES.BUTTONS.HARD);
    const buttonNormal = this.element.querySelector(QUERIES.BUTTONS.NORMAL);
    const buttonEasy = this.element.querySelector(QUERIES.BUTTONS.EASY);

    buttonAgain.addEventListener('click', () => {
      this.model.sendCardToTrainingEnd();
    });
    buttonHard.addEventListener('click', () => {
      this.model.updateUserDifficulty(DIFFICULTIES.HARD);
    });
    buttonNormal.addEventListener('click', () => {
      this.model.updateUserDifficulty(DIFFICULTIES.NORMAL);
    });
    buttonEasy.addEventListener('click', () => {
      this.model.updateUserDifficulty(DIFFICULTIES.SIMPLE);
    });
  }

  assignInputListeners() {
    this.wordInput.addEventListener('input', () => {
      this.removePlaceHolder();
    });
  }

  async onButtonNext() {
    if (this.buttonNextLock) return;
    const inputValue = this.wordInput.value;
    this.wordInput.value = '';

    const checkResult = await this.model.acceptInput(inputValue);

    if (this.isCardLocked()) {
      this.buttonNextLock = true;
      this.placeSuccessPlaceHolder();
    } else if (checkResult) {
      this.removePlaceHolder();
    } else {
      this.placeErrorPlaceHolder();
    }
  }

  onButtonPrevious() {
    this.model.goPrevious();
  }

  showNewWordRateForm() {
    const modalWordRate = this.element.querySelector(QUERIES.MODALS.WORD_RATE);
    LearningWordsMaterial.showModal(modalWordRate);
  }

  placeErrorPlaceHolder() {
    // TODO Clever placeholder
    this.initPlaceHolder();
    this.wordInput.classList.add(CLASS_ERROR);
  }

  placeSuccessPlaceHolder() {
    this.initPlaceHolder();
    this.wordInput.classList.add(CLASS_SUCCESS);
  }

  removePlaceHolder() {
    this.wordInput.classList.remove(CLASS_SUCCESS);
    this.wordInput.classList.remove(CLASS_ERROR);
  }

  initPlaceHolder(text) {
    if (!text) return;
    const wordInput = this.element.querySelector(QUERIES.WORD_ELEMENTS.WORD);
    wordInput.placeholder = text;
  }

  // eslint-disable-next-line class-methods-use-this
  getCardLayout() {
    const html = HTML_COMPONENT;
    return html;
  }

  drawWordToDOM(word) {
    // TODO clever placeholder: input width = placeholder.width
    this.wordInput.setAttribute('style', `width: ${ONE_LETTER_WIDTH * (word.word.length + WIDTH_ADDITION)}rem;`);
    this.wordInput.setAttribute('maxlength', word.word.length);
    this.removePlaceHolder();

    this.initPlaceHolder(word.word);

    const wordQueries = QUERIES.WORD_ELEMENTS;

    this.element.classList.remove(CLASS_VISIBLE);

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

    this.element.classList.add(CLASS_VISIBLE);
    this.updateSettings();
    this.wordInput.focus();
    this.buttonNextLock = false;
  }

  lockCard() {
    this.isLocked = true;
    this.wordInput.setAttribute(lockAttribute, '');
    this.element.classList.add(CLASS_CARD_LOCKED);
    this.updateSettings();
  }

  unlockCard() {
    this.isLocked = false;
    this.wordInput.removeAttribute(lockAttribute);
    this.element.classList.remove(CLASS_CARD_LOCKED);
    this.updateSettings();
  }

  isCardLocked() {
    return this.isLocked;
  }

  toggleShowTranslatesSetting() {
    this.settings.showTranslates = !this.settings.showTranslates;
  }

  toggleTurnOnSoundSetting() {
    this.settings.turnOnSound = !this.settings.turnOnSound;
  }

  turnOnGameMode() {
    const buttonPrev = this.element.querySelector(QUERIES.BUTTONS.PREV);
    buttonPrev.setAttribute('disabled', '');

    this.settings.turnOnSound = false;
    this.settings.showButtonDelete = false;
    this.settings.showButtonComplicated = false;
    this.settings.showButtonSkip = false;
  }
}
