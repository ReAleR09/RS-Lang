import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import { HTML_RESULT, RESULTS_QUERIES } from '../../Components/LearningWords/ResultsTemplate';
import { CLASS_VISIBLE } from '../../Components/LearningWords/IndexTemplate';
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
  onMount() {
    const params = AppNavigator.getRequestParams();
    this.statstics = params;
    // TODO Statistics
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
