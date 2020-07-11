import Materialize from 'materialize-css';
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import SettingsModel from '../../Classes/UserSettings';
import { GAMES } from '../../../config';

const ARCADE_BUTTON = 'engPuz__button--arcade';
const TRAIN_WORDS_BUTTON = 'engPuz__button--myWords';

const initMaterialSelects = () => {
  const elems = document.querySelectorAll('select');
  Materialize.FormSelect.init(elems);
};

export default class IndexView extends View {
  onMount() {
    const playArcadeBtn = this.element.querySelector(`#${ARCADE_BUTTON}`);
    const playMyWordsBtn = this.element.querySelector(`#${TRAIN_WORDS_BUTTON}`);

    initMaterialSelects();

    const { difficulty, round } = SettingsModel.loadGame(GAMES.PUZZLE);

    playArcadeBtn.addEventListener('click', () => {
      const difficultyValue = document.querySelector('.engPuz__difficulty select').value;
      let roundValue = document.querySelector('.engPuz__round select').value;

      if (difficultyValue === 'none') {
        // take values from backend
        AppNavigator.go('englishpuzzle', 'play', { difficulty, round });
        return;
      }
      if (difficultyValue !== 'none') {
        // eslint-disable-next-line no-unused-expressions
        roundValue === 'none' ? roundValue = 1 : null;
        AppNavigator.go('englishpuzzle', 'play', { difficulty: difficultyValue, round: roundValue });
      }

      // get values from selects
      // if selects unset download difficulty and level from backand
    });

    playMyWordsBtn.addEventListener('click', () => {
      AppNavigator.go('englishpuzzle', 'play', { isUserWords: 1 });
    });
  }

  // creating markup of the view and returning it
  // eslint-disable-next-line class-methods-use-this
  render() {
    const { game } = this.props;

    let userWordsPlayFragment = '';
    if (game.userWordsPlay) {
      userWordsPlayFragment = `
      <a id="${TRAIN_WORDS_BUTTON}" class="#fce4ec mar-left pink lighten-3 waves-effect waves-light btn flex-center"><i class="material-icons left">description</i>Train my words</a>
      `;
    }

    const html = `
    <div class="EP-start__wrapper">
      <div class="EP-start__panel card-panel hoverable">
      <div class="row">
      <h2 class="center">English Puzzle</h2>
      <div class="flex-center">
        <blockquote class="center flex-center">Test your competency in building sentences from randomly scattered words of the sentence.</blockquote>
      </div>
      <div class="engPuz__selects flex-evenly">
        <div class="engPuz__difficulty input-field">
          <select>
            <option value="none" selected>Choose difficulty</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        <label>Game difficulty</label>
      </div>
          <div class="engPuz__round input-field ">
            <select>
              <option value="none" selected>Choose round</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
            </select>
            <label>Game round</label>
        </div>
      </div>
      <div class="flex-evenly">
          <a id="${ARCADE_BUTTON}" class="#fce4ec pink lighten-3 waves-effect waves-light btn flex-center"><i class="material-icons left">description</i>Arcade mode</a>
          ${userWordsPlayFragment}
      </div>
      </div>
    </div>
    </div>
   `;

    return html;
  }
}
