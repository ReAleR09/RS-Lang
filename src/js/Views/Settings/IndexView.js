import Materialize from 'materialize-css';
import '../../../sass/Components/Settings.scss';
import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
import { SETTINGS_HTML, SETTINGS_QUERIES as QUERIES } from '../../Components/Settings/constants';

export default class IndexView extends View {
  /**
   * This method will be automatically called oncewhen navigation to the page occured,
   * but before html is added to browser's DOM.
   * We can use it to add some subscriptions, timers, calculations etc
   * Plus, we init any logic objects here.
   *
   * Also, if you need to update DOM from here, this.element is available,
   * it references actual DOM root element of this view
   */
  onMount() {
    this.tabs = Materialize.Tabs.init(this.element.querySelector(QUERIES.TABS), {
      swipeable: true,
    });
    this.initSettings();
    const buttonSaveSettings = this.element.querySelector(QUERIES.BUTTON_SAVE);
    buttonSaveSettings.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.translation.checked && !this.translationMeaning.checked && !this.wordUse.checked) {
        this.warningParagraph.classList.add(QUERIES.WARNING_TEXT);
      } else {
        this.warningParagraph.classList.remove(QUERIES.WARNING_TEXT);
        this.updateSettings(); // запуск метода класса из обработчика
      }
    });
  }

  initSettings() {
    this.settings = this.props.model.settings;

    this.newCards = this.element.querySelector(QUERIES.NEW_CARDS);
    this.cardsPerDay = this.element.querySelector(QUERIES.CARDS_PER_DAY);
    this.showWordTranslate = this.element.querySelector(QUERIES.TRANSLATION);
    this.showMeaning = this.element.querySelector(QUERIES.MEANING);
    this.showExample = this.element.querySelector(QUERIES.EXAMPLE);
    this.showTranscription = this.element.querySelector(QUERIES.TRANSCRIPTION);
    this.showImage = this.element.querySelector(QUERIES.SHOW_IMAGE);
    this.showButtonAnswer = this.element.querySelector(QUERIES.SHOW_BUTTON_ANSWER);
    this.showDeleteButton = this.element.querySelector(QUERIES.SHOW_BUTTON_DELETE);
    this.showButtonComplicated = this.element.querySelector(QUERIES.SHOW_BUTTON_HARD);
    this.showWordRate = this.element.querySelector(QUERIES.SHOW_RATE);
    this.warningParagraph = this.element.querySelector(QUERIES.WARNING_PARAGRAPH);

    this.newWordsPerDay.value = this.settings.newCards;
    this.wordsPerDay.value = this.settings.cardsPerDay;
    this.showWordTranslate.checked = this.settings.showWordTranslate;
    this.showMeaning.checked = this.settings.showMeaning;
    this.showExample.checked = this.settings.showExample;
    this.showTranscription.checked = this.settings.showTranscription;
    this.showImage.checked = this.settings.showImage;
    this.showButtonAnswer.checked = this.settings.showButtonAnswer;
    this.showDeleteButton.checked = this.settings.showDeleteButton;
    this.showButtonComplicated.checked = this.settings.showButtonComplicated;
    this.showWordRate.checked = this.settings.showWordRate;
  }

  updateSettings() {
    const newSettings = {
      newCards: +this.newCards.value,
      cardsPerDay: +this.cardsPerDay.value,
      translation: this.translation.checked,
      translationMeaning: this.translationMeaning.checked,
      wordUse: this.wordUse.checked,
      wordTranscription: this.wordTranscription.checked,
      wordPicture: this.wordPicture.checked,
      showAnswer: this.showAnswer.checked,
      showDeleteButton: this.showDeleteButton.checked,
      showHardButton: this.showHardButton.checked,
      showButtons: this.showButtons.checked,
    };

    this.props.model.settings = newSettings;
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */
  onUnmount() {
    this.props.model = null;
  }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = SETTINGS_HTML;
    return html;
  }
}
