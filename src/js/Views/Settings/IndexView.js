import Materialize from 'materialize-css';
import '../../../sass/Components/Settings.scss';
import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
import { SETTINGS_HTML, SETTINGS_QUERIES as QUERIES } from '../../Components/Settings/constants';
import { DICT_CATEGORIES } from '../../Classes/Api/constants';

import Toaster from '../../Classes/Toaster';
import AppNavigator from '../../lib/AppNavigator';
import { PARAM_MODE } from '../../Utils/Constants';
import { MODES } from '../../../config';
import ProgressBarInstance from '../../Classes/ProgressBar';

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
      swipeable: false,
    });

    this.initSettings();

    const selects = this.element.querySelectorAll('select');
    Materialize.FormSelect.init(selects);

    const rangeDomEls = document.querySelectorAll('input[type=range]');
    Materialize.Range.init(rangeDomEls);

    const buttonSaveSettings = this.element.querySelector(QUERIES.BUTTON_SAVE);
    buttonSaveSettings.addEventListener('click', (event) => {
      event.preventDefault();
      if (
        !this.showWordTranslate.checked
        && !this.showMeaning.checked
        && !this.showExample.checked
      ) {
        this.warningParagraph.classList.add(QUERIES.WARNING_TEXT);
      } else {
        this.warningParagraph.classList.remove(QUERIES.WARNING_TEXT);
        this.updateSettings();
      }
    });

    const buttonCheckDifficultyLevel = this.element.querySelector(QUERIES.BUTTON_CHECK_DIFF);
    buttonCheckDifficultyLevel.addEventListener('click', (event) => {
      event.preventDefault();
      AppNavigator.go('learningWords', 'index', { [PARAM_MODE]: MODES.GAME });
    });
  }

  initElements() {
    this.difficulty = this.element.querySelector(QUERIES.DIFFICULTY);
    this.newWordsPerDay = this.element.querySelector(QUERIES.NEW_CARDS);
    this.wordsPerDay = this.element.querySelector(QUERIES.CARDS_PER_DAY);
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

    this.firstInterval = this.element.querySelector(QUERIES.FIRST_INTERVAL);
    this.baseInterval = this.element.querySelector(QUERIES.BASE_INTERVAL);
    this.baseMultiplier = this.element.querySelector(QUERIES.BASE_MULTIPLIER);
    this.hardMultiplier = this.element.querySelector(QUERIES.HARD_MULTIPLIER);
    this.simpleMultiplier = this.element.querySelector(QUERIES.SIMPLE_MULTIPLIER);
    this.maxInterval = this.element.querySelector(QUERIES.MAX_INTERVAL);
    this.annoyingLimit = this.element.querySelector(QUERIES.ANNOYING_LIMIT);
    this.annoyingAction = this.element.querySelector(QUERIES.ANNOYING_ACTION);

    this.actionComplicated = this.element.querySelector(QUERIES.ACTION_COMPLICATED);
    this.actionDelete = this.element.querySelector(QUERIES.ACTION_DELETE);
    this.actionComplicated.value = DICT_CATEGORIES.COMPLICATED;
    this.actionDelete.value = DICT_CATEGORIES.DELETE;
  }

  initSettings() {
    this.settings = this.props.model.settings;

    this.initElements();

    this.difficulty.value = this.settings.difficulty;
    this.newWordsPerDay.value = this.settings.newWordsPerDay;
    this.wordsPerDay.value = this.settings.wordsPerDay;
    this.showWordTranslate.checked = this.settings.showWordTranslate;
    this.showMeaning.checked = this.settings.showMeaning;
    this.showExample.checked = this.settings.showExample;
    this.showTranscription.checked = this.settings.showTranscription;
    this.showImage.checked = this.settings.showImage;
    this.showButtonAnswer.checked = this.settings.showButtonAnswer;
    this.showDeleteButton.checked = this.settings.showButtonDelete;
    this.showButtonComplicated.checked = this.settings.showButtonComplicated;
    this.showWordRate.checked = this.settings.showWordRate;

    this.firstInterval.value = this.settings.firstIntervalMinutes;
    this.baseInterval.value = this.settings.baseIntervalDays;
    this.baseMultiplier.value = this.settings.baseMultiplierPercents;
    this.hardMultiplier.value = this.settings.hardMultiplierPercents;
    this.simpleMultiplier.value = this.settings.simpleMultiplierPercents;
    this.maxInterval.value = this.settings.maxIntervalDays;
    this.annoyingLimit.value = this.settings.annoyinglimit;

    this.setAnnoyingAction(this.settings.annoyingAction);
    console.log(this.settings);
  }

  setAnnoyingAction(category) {
    if (category === DICT_CATEGORIES.COMPLICATED) {
      this.actionComplicated.setAttribute('selected', '');
      this.actionDelete.removeAttribute('selected');
    }
    if (category === DICT_CATEGORIES.DELETE) {
      this.actionComplicated.removeAttribute('selected');
      this.actionDelete.setAttribute('selected', '');
    }
  }

  updateSettings() {
    const newSettings = {
      difficulty: +this.difficulty.value,
      newWordsPerDay: +this.newWordsPerDay.value,
      wordsPerDay: +this.wordsPerDay.value,
      showWordTranslate: this.showWordTranslate.checked,
      showMeaning: this.showMeaning.checked,
      showExample: this.showExample.checked,
      showTranscription: this.showTranscription.checked,
      showImage: this.showImage.checked,
      showButtonAnswer: this.showButtonAnswer.checked,
      showButtonDelete: this.showDeleteButton.checked,
      showButtonComplicated: this.showButtonComplicated.checked,
      showWordRate: this.showWordRate.checked,
      firstIntervalMinutes: +this.firstInterval.value,
      baseIntervalDays: +this.baseInterval.value,
      baseMultiplierPercents: +this.baseMultiplier.value,
      hardMultiplierPercents: +this.hardMultiplier.value,
      simpleMultiplierPercents: +this.simpleMultiplier.value,
      maxIntervalDays: +this.maxInterval.value,
      annoyinglimit: +this.annoyingLimit.value,
      annoyingAction: this.annoyingAction.value,
    };

    this.props.model.settings = newSettings;

    ProgressBarInstance.changeSettings(this.props.model.wordLimitsPerDay);

    if (this.ajaxSettingsTimeout) {
      clearTimeout(this.ajaxSettingsTimeout);
    }
    // protect button from spamming requests
    this.ajaxSettingsTimeout = setTimeout(() => {
      this.ajaxSettingsTimeout = null;
      this.props.model.saveSettings();
      Toaster.showToast('Настройки сохранены');
    }, 1000);
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
