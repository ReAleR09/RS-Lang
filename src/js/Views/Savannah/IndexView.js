import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const START_BUTTON = 'savannah__start-button';

export default class IndexView extends View {
  onMount() {
    const startButton = this.element.querySelector(`#${START_BUTTON}`);
    startButton.addEventListener('click', () => {
      AppNavigator.go('savannah', 'play');
    });
  }

  // onUnmount() {
  // }

  render() {
    const html = `
    <div>
      <div> ${this.props.data} </div>
      <div class="description">The Savannah training helps you build your vocabulary. The more words you know, the more experience points you'll get.</div>
      <div id="${START_BUTTON}">START</div>
    </div>`;

    return html;
  }
}
