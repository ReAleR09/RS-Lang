import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

// FC stands for Funcional Class - the one that IS NOT responsible for styles
const ARCADE_BUTTON = 'engPuz__button--arcade';
const TRAIN_WORDS_BUTTON = 'engPuz__button--myWords';

export default class IndexView extends View {
  // when we are visiting this view, we will modify someParamPassToView
  // (which is passed from the controller)
  onMount() {
    const startButtonEl = this.element.querySelector(`#${ARCADE_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      AppNavigator.go('englishpuzzle', 'play');
    });
  }

  // onUnmount() {
  // }

  // creating markup of the view and returning it
  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `
    <div class="EP-start__wrapper">
      <div class="EP-start__panel card-panel hoverable">
      <div class="row">
      <h2 class="center">English Puzzle</h2>
      <div class="flex-center">
        <blockquote class="center flex-center">Test your competency in building sentences from randomly scattered words of the sentence.</blockquote>
      </div>
      <div class="flex-evenly">
          <a id="${ARCADE_BUTTON}" class="#fce4ec pink lighten-3 waves-effect waves-light btn"><i class="material-icons left">description</i>Arcade mode</a>
          <a id="${TRAIN_WORDS_BUTTON}" class="#fce4ec disabled pink lighten-3 waves-effect waves-light btn"><i class="material-icons left">description</i>Train my words</a>
      </div>
      </div>
    </div>
    </div>
   `;

    return html;
  }
}
