import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const START_BUTTON = 'speakit__start-button';

export default class IndexView extends View {
  onMount() {
    const startButtonEl = this.element.querySelector(`#${START_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      AppNavigator.go('speakit', 'play');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const html = `
    <div>
      <div class='row'><h2>SpeakIt: mini-game</h2></div>
      <p>
        In this game you have to pronounce words using a microphone!
      </p>
      <div class='row'><div class="waves-effect waves-light btn col s12" id="${START_BUTTON}">Start game</div></div>
    </div>`;

    return html;
  }
}
