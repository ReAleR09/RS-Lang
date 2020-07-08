// import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';

// const START_BUTTON = 'savannah__start-button';

// export default class IndexView extends View {
//   onMount() {
//     const startButton = this.element.querySelector(`#${START_BUTTON}`);
//     startButton.addEventListener('click', () => {
//       AppNavigator.go('savannah', 'play');
//     });
//   }

//   // onUnmount() {
//   // }

//   render() {
//     const html = `
//     <div>
//       <div> ${this.props.data} </div>
//       <div class="description">The Savannah training helps you build
// your vocabulary. The more words you know, the more experience points you'll get.</div>
//       <div id="${START_BUTTON}">START</div>
//     </div>`;

//     return html;
//   }
// }

import Materialize from 'materialize-css';
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const ID_START_BUTTON = 'savannah__start-button';
const ID_START_BUTTON_USER = 'savannah__start-button-user';
const ID_DIFFICULTY_SELECTOR = 'savannah__difficulty-selector';
const ID_ROUND_SELECTOR = 'savannah__round-selector';

export default class GameStartView extends View {
  initSliders() {
    const rangeDomEls = document.querySelectorAll('input[type=range]');
    Materialize.Range.init(rangeDomEls);

    this.roundSlider = document.querySelector(`#${ID_ROUND_SELECTOR}`);

    this.difficultySlider = document.querySelector(`#${ID_DIFFICULTY_SELECTOR}`);
    this.difficultySlider.addEventListener('change', (e) => {
      const newDifficultyVal = e.target.value;
      const maxRoundsForDifficulty = this.props.game.difficulties[newDifficultyVal];
      this.roundSlider.max = maxRoundsForDifficulty; // update rounds countm depends on difficulty
      this.roundSlider.value = 1; // default round to 1
    });
  }

  onMount() {
    const startButtonEl = this.element.querySelector(`#${ID_START_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      const difficulty = parseInt(this.difficultySlider.value, 10);
      const round = parseInt(this.roundSlider.value, 10);
      AppNavigator.go('savannah', 'play', { difficulty, round });
    });

    const startButtonUserEl = this.element.querySelector(`#${ID_START_BUTTON_USER}`);
    startButtonUserEl.addEventListener('click', () => {
      AppNavigator.go('savannah', 'play', { userWords: 1 });
    });

    this.initSliders();
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
            list="tickmarks"
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
