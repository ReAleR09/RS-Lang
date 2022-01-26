import View from '../../lib/View';
import { showPreloader, hidePreloader } from '../../Classes/Preloader';

export default class PlayView extends View {
  onMount() {
    showPreloader();
    this.props.gameManager.attach(this.element);
    this.props.gameManager.init();
    hidePreloader();
  }

  onUnmount() {
    // removing reference to the game instance (just in case)
    this.props.gameManager.detach();
    this.props.gameManager = null;
  }

  render() {
    return this.props.gameManager.getInitialLayout();
  }
}
