import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const ID_BUTTON_PLAYAGAIN = 'EP__play-again-button';

export default class ResultsView extends View {
  onMount() {
    const playAgainButton = this.element.querySelector(`#${ID_BUTTON_PLAYAGAIN}`);
    playAgainButton.addEventListener('click', () => {
      AppNavigator.replace('englishpuzzle');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `
    <div class="EP-start__wrapper">
      <div class="EP-start__panel card-panel hoverable">
      <div class="row">
      <h2 class="center">Game results</h2>
      <div class="flex-center">
        <blockquote class="center flex-center">Game result goes here.</blockquote>
      </div>
      <div class="flex-evenly">
          <a id="${ID_BUTTON_PLAYAGAIN}" class="#fce4ec pink lighten-3 waves-effect waves-light btn"><i class="material-icons left">rotate_90_degrees_ccw</i>Play again</a>
      </div>
      </div>
    </div>
    </div>
   `;
    return html;
  }
}
