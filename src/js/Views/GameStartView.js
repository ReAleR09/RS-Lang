import Materialize from 'materialize-css';
import View from '../lib/View';
import AppNavigator from '../lib/AppNavigator';

const ID_START_BUTTON = 'speakit__start-button';
const ID_START_BUTTON_USER = 'speakit__start-button-user';
const ID_DIFFICULTY_SELECTOR = 'speakit__difficulty-selector';
const ID_ROUND_SELECTOR = 'speakit__round-selector';

export default class GameStartView extends View {
  onMount() {
    const startButtonEl = this.element.querySelector(`#${ID_START_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      AppNavigator.go('speakit', 'play');
    });

    const rangeDomEls = document.querySelectorAll('input[type=range]');
    Materialize.Range.init(rangeDomEls);
  }

  render() {
    const { game } = this.props;

    let userWordsPlay = '';
    if (game.userWordsPlay) {
      userWordsPlay = `
        <div class='row'>
          <div class="waves-effect waves-light btn col s12" id="${ID_START_BUTTON_USER}">Start game with learned words</div>
        </div>
      `;
    }

    const html = `
    <div>
      <div class='row'><h2>${game.title}</h2></div>
      <blockquote>
        ${game.description}
      </blockquote>
      <div class='row'>
        <p class="range-field col s12">
          Difficulty:
        </p>
        <p class="range-field col s12">
          <input
            type="range"
            id="${ID_DIFFICULTY_SELECTOR}"
            min="0"
            max="5"
            step="1"
            value="${game.currentDifficulty}"
          />
        </p>
        <p class="range-field col s12">
          Round:
        </p>
        <p class="range-field col s12">
          <input
            type="range"
            id="${ID_ROUND_SELECTOR}"
            min="1"
            max="${game.difficulties[game.currentDifficulty]}"
            step="1"
            value="${game.currentRound}"
          />
        </p>
        <div class="waves-effect waves-light btn col s12" id="${ID_START_BUTTON}">Start game</div>
      </div>
      ${userWordsPlay}
    </div>`;

    return html;
  }
}
