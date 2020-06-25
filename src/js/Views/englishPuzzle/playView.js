/* eslint-disable class-methods-use-this */
import View from '../../lib/View';

export default class PlayView extends View {
  onMount() {
    this.props.gameManager.attach(this.element);
    // this.props.gameManager.init();
  }

  onUnmount() {
    // removing reference to the game instance (just in case)
    this.props.gameManager = null;
  }

  render() {
    return this.props.gameManager.getInitialLayout();
  }
}
