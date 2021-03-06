import Materialize from 'materialize-css';
import View from '../lib/View';
import AppNavigator from '../lib/AppNavigator';
import Router from '../Router';
import { showPreloader, hidePreloader } from '../Classes/Preloader';

const ID_START_BUTTON = 'start-button';
const ID_START_BUTTON_USER = 'start-button-user';
const ID_DIFFICULTY_SELECTOR = 'difficulty-selector';
const ID_ROUND_SELECTOR = 'round-selector';
const PLAY_VIEW_ALIAS = 'play';

export default class UniversalGameStartView extends View {
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
    const { controllerAlias } = Router.getUrlParts();
    const startButtonEl = this.element.querySelector(`#${ID_START_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      const difficulty = parseInt(this.difficultySlider.value, 10);
      const round = parseInt(this.roundSlider.value, 10);
      AppNavigator.go(controllerAlias, PLAY_VIEW_ALIAS, { difficulty, round });
    });

    const startButtonUserEl = this.element.querySelector(`#${ID_START_BUTTON_USER}`);
    if (startButtonUserEl) {
      startButtonUserEl.addEventListener('click', () => {
        AppNavigator.go(controllerAlias, PLAY_VIEW_ALIAS, { userWords: 1 });
      });
    }

    this.initSliders();
    hidePreloader();
  }

  render() {
    showPreloader();
    const { game } = this.props;

    let userWordsPlay = '';
    if (game.userWordsPlay) {
      userWordsPlay = `
        <div class='row'>
          <div class="waves-effect waves-light btn col s12" id="${ID_START_BUTTON_USER}">Играть с изучаемыми словами</div>
        </div>
      `;
    }

    const html = `
    <div class="game-start">
      <div class='row'><h2>${game.title}</h2></div>
      <blockquote>
        ${game.description}
      </blockquote>
      <div class='row'>
        <p class="range-field col s12">
          Сложность:
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
          Раунд:
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
        <div class="waves-effect waves-light btn col s12" id="${ID_START_BUTTON}">Играть</div>
      </div>
      ${userWordsPlay}
    </div>`;

    return html;
  }
}
