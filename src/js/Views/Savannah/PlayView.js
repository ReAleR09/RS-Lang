import View from '../../lib/View';

export default class PlayView extends View {
  onMount() {
    this.props.gameManager.attach(this.element);
    this.props.gameManager.init();
  }

  onUnmount() {
    this.props.gameManager.stopGame();
    this.props.gameManager = null;
  }

  render() {
    return this.props.gameManager.getInitialLayout();
  }
}
