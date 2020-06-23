import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

// FC stands for Funcional Class - the one that IS NOT responsible for styles
const START_BUTTON = 'speakit__start-button';
const START_BUTTON_USERWORDS = 'speakit__start-button-userwords';

export default class IndexView extends View {
  // when we are visiting this view, we will modify someParamPassToView
  // (which is passed from the controller)
  onMount() {
    const startButtonEl = this.element.querySelector(`#${START_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      AppNavigator.go('speakit', 'play');
    });

    const startButtonUserWordsEl = this.element.querySelector(`#${START_BUTTON_USERWORDS}`);
    startButtonUserWordsEl.addEventListener('click', () => {
      AppNavigator.go('speakit', 'play');
    });
  }

  // onUnmount() {
  // }

  // creating markup of the view and returning it
  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `<div>
      <div id="${START_BUTTON}">Start game</div>
      <div id="${START_BUTTON_USERWORDS}">Start game with user hard words</div>
    </div>`;

    return html;
  }
}
