import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
// import LearningWordsView from '../../Components/LearningWords/LearningWordsView';

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
    this.props.model.attach(this.element);
    this.props.model.init();
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */
  onUnmount() {
    this.props.model.detach();
    this.props.model = null;
  }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */
  render() {
    const { model } = this.props;

    const html = model.getInitialLayout();

    return html;
  }
}
