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
    const settingsBtn = this.element.querySelector(QUERIES.BUTTON_SAVE);

    settingsBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.updateSettings(); // запуск метода класса из обработчика
    });

    // Или сделать сохранение по событию на изменение любой из настроек... типа...

    const allSettingsQueries = Object.values(QUERIES);
    const AllSettingsElements = allSettingsQueries.map((query) => {
      const newElement = this.element.querySelector(query);
      return newElement;
    });

    AllSettingsElements.forEach((element) => {
      element.addEventListener('change', this.updateSettings.bind(this)); // еще один метод запуска метода класса из обработчика непосредственно
    });
  }

  initSettings() {
    const settings = this.props.model;

    const newCards = this.element.querySelector(QUERIES.NEW_CARDS);
    const cardsPerDay = this.element.querySelector(QUERIES.CARDS_PER_DAY);
    const translation = this.element.querySelector(QUERIES.TRANSLATION);
    const translationMeaning = this.element.querySelector(QUERIES.TRANSLATION_MEANING);
    const wordUse = this.element.querySelector(QUERIES.EXAMPLE);
    const wordTranscription = this.element.querySelector(QUERIES.TRANSCRIPTION);
    const wordPicture = this.element.querySelector(QUERIES.SHOW_IMAGE);
    const showAnswer = this.element.querySelector(QUERIES.SHOW_BUTTON_ANSWER);
    const showDeleteButton = this.element.querySelector(QUERIES.SHOW_BUTTON_DELETE);
    const showHardButton = this.element.querySelector(QUERIES.SHOW_BUTTON_HARD);
    const showButtons = this.element.querySelector(QUERIES.SHOW_RATE);

    newCards.value = settings.settings.newCards;
    cardsPerDay.value = settings.settings.cardsPerDay;
    translation.checked = settings.settings.translation;
    translationMeaning.checked = settings.settings.translationMeaning;
    wordUse.checked = settings.settings.wordUse;
    wordTranscription.checked = settings.settings.wordTranscription;
    wordPicture.checked = settings.settings.wordPicture;
    showAnswer.checked = settings.settings.showAnswer;
    showDeleteButton.checked = settings.settings.showDeleteButton;
    showHardButton.checked = settings.settings.showHardButton;
    showButtons.checked = settings.settings.showButtons;
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
