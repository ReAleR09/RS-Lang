import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
import { SETTINGS_HTML, SETTINGS_QUERIES as QUERIES } from '../../Components/Settings/constants';
import SettingsModel from '../../lib/UserSettings';

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
    this.initSettings();
    const settingsBtn = this.element.querySelector(QUERIES.BUTTON_SAVE);
    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.translation.checked && !this.translationMeaning.checked && !this.wordUse.checked) {
        this.wraningParagraph.classList.add(QUERIES.WARNING_TEXT);
      } else {
        this.wraningParagraph.classList.remove(QUERIES.WARNING_TEXT);
        this.updateSettings(); // запуск метода класса из обработчика
      }
    });

    // Или сделать сохранение по событию на изменение любой из настроек... типа...
  /*
    const allSettingsQueries = Object.values(QUERIES);
    const AllSettingsElements = allSettingsQueries.map((query) => {
      const newElement = this.element.querySelector(query);
      return newElement;
    });

    AllSettingsElements.forEach((element) => {
      element.addEventListener('change', this.updateSettings.bind(this));
      // еще один метод запуска метода класса из обработчика непосредственно
    }); */
  }

  initSettings() {
    this.settings = this.props.model;

    this.newCards = this.element.querySelector(QUERIES.NEW_CARDS);
    this.cardsPerDay = this.element.querySelector(QUERIES.CARDS_PER_DAY);
    this.translation = this.element.querySelector(QUERIES.TRANSLATION);
    this.translationMeaning = this.element.querySelector(QUERIES.TRANSLATION_MEANING);
    this.wordUse = this.element.querySelector(QUERIES.EXAMPLE);
    this.wordTranscription = this.element.querySelector(QUERIES.TRANSCRIPTION);
    this.wordPicture = this.element.querySelector(QUERIES.SHOW_IMAGE);
    this.showAnswer = this.element.querySelector(QUERIES.SHOW_BUTTON_ANSWER);
    this.showDeleteButton = this.element.querySelector(QUERIES.SHOW_BUTTON_DELETE);
    this.showHardButton = this.element.querySelector(QUERIES.SHOW_BUTTON_HARD);
    this.showButtons = this.element.querySelector(QUERIES.SHOW_RATE);
    this.wraningParagraph = this.element.querySelector(QUERIES.WARNING_PARAGRAPH);

    this.newCards.value = this.settings.newCards;
    this.cardsPerDay.value = this.settings.cardsPerDay;
    this.translation.checked = this.settings.translation;
    this.translationMeaning.checked = this.settings.translationMeaning;
    this.wordUse.checked = this.settings.wordUse;
    this.wordTranscription.checked = this.settings.wordTranscription;
    this.wordPicture.checked = this.settings.wordPicture;
    this.showAnswer.checked = this.settings.showAnswer;
    this.showDeleteButton.checked = this.settings.showDeleteButton;
    this.showHardButton.checked = this.settings.showHardButton;
    this.showButtons.checked = this.settings.showButtons;
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

    SettingsModel.settings = newSettings;
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
