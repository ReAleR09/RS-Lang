/* eslint-disable no-unused-expressions */
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';
import engPuzConst from '../../Components/EnglishPuzzle/EnglishPuzzleConstants';
import { CONF_MEDIA_BASE_PATH } from '../../../config';

const ID_BUTTON_PLAYAGAIN = 'engPuz__play-again-button';
const ID_BUTTON_CONTINUE = 'engPuz__continue-button';

const audioSentenceClick = (e) => {
  if (e.target.classList.contains('engPuz__tooltips-autoPlay--results')) {
    const url = CONF_MEDIA_BASE_PATH + e.target.dataset.audio;
    new Audio(url).play();
  }
};

const hideContinueBtnIfUserWordsMode = (props, element) => {
  const { userWordsMode } = props;
  if (userWordsMode) {
    const continueBtn = element.querySelector(`.${ID_BUTTON_CONTINUE}`);
    continueBtn.classList.add('disabled');
  }
};

const playAgainClick = (e) => {
  if (e.target.classList.contains('engPuz__play-again-button')) {
    AppNavigator.go('englishpuzzle');
  }
};

export default class ResultsView extends View {
  // eslint-disable-next-line class-methods-use-this
  onMount() {
    // this.saveLastRound();
    hideContinueBtnIfUserWordsMode(this.props, this.element);
    this.element.addEventListener('click', (e) => {
      audioSentenceClick(e);
      playAgainClick(e);
      this.continueBtnClick(e);
    });
  }

  /* async saveLastRound() {
    let { difficulty, round } = await SettingsModel.loadGame(GAMES.PUZZLE);
    if (round < engPuzConst.pagesPerDifficulties[difficulty]) {
      round += 1;
    } else {
      round = 1;
      difficulty < engPuzConst.pagesPerDifficulties.length - 1 ? difficulty += 1 : difficulty = 0;
    }
    this.difficulty = difficulty;
    this.round = round;
    await SettingsModel.saveGame(GAMES.PUZZLE, {
      difficulty,
      round,
    });
  } */

  async continueBtnClick(e) {
    if (e.target.classList.contains('engPuz__continue-button')) {
      if (this.props.nextRound) {
        AppNavigator.go('englishpuzzle', 'play', { difficulty: this.props.nextDifficulty, round: this.props.nextRound });
      } else {
        AppNavigator.go('englishpuzzle', 'play', { difficulty: 0, round: 1 });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const { stats } = this.props;
    let fragment = '';
    Object.values(stats).forEach((value) => {
      fragment += `<div class="fullWidth flex-center margin-bottom">
      <a class="engPuz__tooltips-autoPlay--results btn waves-effect blue lighten-4" data-audio="${value.audio}">
      <i class="engPuz__tooltips-autoPlay--results large material-icons"  data-audio="${value.audio}">volume_up</i>
      </a>
        <div class="fullWidth ${value.isCorrect ? 'green' : 'red'}">${value.sentence}</div>
      </div>`;
    });

    const html = `
    <div>
    <div id="engPuz__drop-section" class="${engPuzConst.content.DROPSECTION} card-panel">
    ${fragment}
    </div>
    <div class="engPuz__bottom-btn flex-center">
    <div class="flex-evenly">
    <a id="${ID_BUTTON_PLAYAGAIN}" class="#fce4ec pink lighten-3 waves-effect waves-light btn engPuz__play-again-button flex-center"><i class="engPuz__play-again-button material-icons left">rotate_90_degrees_ccw</i>Play again</a>
    <a id="${ID_BUTTON_CONTINUE}" class="engPuz__continue-button mar-left #fce4ec blue lighten-2 waves-effect waves-light btn flex-center"><i class="engPuz__continue-button material-icons left">rotate_90_degrees_ccw</i>CONTINUE</a>
        </div>
      </div>
    </div>
    `;
    LocalStorageAdapter.remove(engPuzConst.localstorage.RESULTS);
    return html;
  }
}
