import View from '../../lib/View';
import { CLASS_VISIBLE } from '../../Components/LearningWords/IndexTemplate';
import { TEST_RESULT_HTML, QUERY_DIFFICULTY } from '../../Components/LearningWords/TestResultTemplate';
import { showPreloader, hidePreloader } from '../../Classes/Preloader';
// import LearningWordsView from '../../Components/LearningWords/LearningWordsView';

export default class TestResultView extends View {
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
    const difficultyLevel = this.element.querySelector(QUERY_DIFFICULTY);

    difficultyLevel.innerText = this.props.difficulty;

    this.element.classList.add(CLASS_VISIBLE);
    const difficulty = this.element.querySelector(QUERY_DIFFICULTY);

    difficulty.innerText = this.props.difficulty;
    hidePreloader();
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
    showPreloader();
    const html = TEST_RESULT_HTML;
    return html;
  }
}
