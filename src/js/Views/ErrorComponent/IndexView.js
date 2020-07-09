import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';
// import LearningWordsView from '../../Components/LearningWords/LearningWordsView';

export default class IndexView extends View {

  onMount() {
    this.props.someData = {};
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */
  onUnmount() {
    this.props.model.detach();
    this.props.model = null;
  }

  render() {
    const { model } = this.props;

    const html = model.getInitialLayout();

    return html;
  }
}
