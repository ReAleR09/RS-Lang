import View from '../../lib/View';
import { HTML_RESULT, RESULTS_QUERIES } from '../../Components/LearningWords/ResultsTemplate';
import { CLASS_DISABLED, CLASS_VISIBLE } from '../../Components/LearningWords/IndexTemplate';
import { MODES } from '../../../config';
// import LearningWordsView from '../../Components/LearningWords/LearningWordsView';

export default class ResultsView extends View {
  /**
   * This method will be automatically called oncewhen navigation to the page occured,
   * but before html is added to browser's DOM.
   * We can use it to add some subscriptions, timers, calculations etc
   * Plus, we init any logic objects here.
   *
   * Also, if you need to update DOM from here, this.element is available,
   * it references actual DOM root element of this view
   */
  async onMount() {
    const repititonWrapper = this.element.querySelector(RESULTS_QUERIES.REPITITION);
    const complicatedWrapper = this.element.querySelector(RESULTS_QUERIES.COMPLICATED);

    if (this.props.mode === MODES.REPITITION) {
      complicatedWrapper.classList.add(CLASS_DISABLED);
    }
    if (this.props.mode === MODES.COMPLICATED) {
      repititonWrapper.classList.add(CLASS_DISABLED);
    }

    const wordsCount = this.element.querySelector(RESULTS_QUERIES.TOTAL_COUNT);
    const newWordsCount = this.element.querySelector(RESULTS_QUERIES.NEWWORDS_COUNT);

    const errorsCount = this.element.querySelector(RESULTS_QUERIES.ERRORS_COUNT);
    const bestResult = this.element.querySelector(RESULTS_QUERIES.BEST_RESULT);
    const suggestion = this.element.querySelector(RESULTS_QUERIES.SUGGESTION);

    wordsCount.innerText = this.props.stats.dayResults.totalWordsCount;
    newWordsCount.innerText = this.props.stats.dayResults.newWordsCount;
    if (this.props.stats.dayResults.results) {
      errorsCount.innerText = this.props.stats.dayResults.results.errors;
      bestResult.innerText = this.props.stats.dayResults.results.bestResult;
    }
    const complAll = this.element.querySelector(RESULTS_QUERIES.COMPLICATED_ALL);
    const complErrors = this.element.querySelector(RESULTS_QUERIES.COMPLICATED_ERRORS);
    const complBest = this.element.querySelector(RESULTS_QUERIES.COMPLICATED_BEST);

    complAll.innerText = this.props.stats.sessionResults.successes
      + this.props.stats.sessionResults.errors;
    complErrors.innerText = this.props.stats.sessionResults.errors;
    complBest.innerText = this.props.stats.sessionResults.bestResult;
    if (!this.props.wasStarted) {
      suggestion.classList.remove(CLASS_DISABLED);
    }
    const componentElement = document.querySelector(RESULTS_QUERIES.COMPONENT);
    componentElement.classList.add(CLASS_VISIBLE);
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */

  // eslint-disable-next-line class-methods-use-this
  onUnmount() {
  }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = HTML_RESULT;
    return html;
  }
}
