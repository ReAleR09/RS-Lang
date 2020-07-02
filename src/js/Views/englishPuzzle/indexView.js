import Materialize from 'materialize-css';
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

// FC stands for Funcional Class - the one that IS NOT responsible for styles
const ARCADE_BUTTON = 'engPuz__button--arcade';
const TRAIN_WORDS_BUTTON = 'engPuz__button--myWords';
// const DIFFICULTY_SELECT_BUTTON = 'engPuz__button--difficulty';
// const LEVEL_SELECT_BUTTON = 'engPuz__button--difficulty';

const initMaterialSelects = () => {
  const elems = document.querySelectorAll('select');
  Materialize.FormSelect.init(elems);
};

export default class IndexView extends View {
  // when we are visiting this view, we will modify someParamPassToView
  // (which is passed from the controller)
  onMount() {
    const startButtonEl = this.element.querySelector(`#${ARCADE_BUTTON}`);
    startButtonEl.addEventListener('click', () => {
      AppNavigator.go('englishpuzzle', 'play');
      // get values from selects
      // if selects unset download difficulty and level from backand
    });
    initMaterialSelects();
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
      <div class="engPuz__selects flex-evenly">
          <div class="input-field">
        <select>
          <option value="0" selected>Choose difficulty</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <label>Game difficulty</label>
      </div>
          <div class="input-field ">
        <select>
          <option value="0" selected>Choose level</option>
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
        </select>
        <label>Game level</label>
      </div>
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
