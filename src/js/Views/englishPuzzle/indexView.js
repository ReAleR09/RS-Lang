import Materialize from 'materialize-css';
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import engPuzConst from '../../Components/EnglishPuzzle/EnglishPuzzleConstants';

const ARCADE_BUTTON = 'engPuz__button--arcade';
const TRAIN_WORDS_BUTTON = 'engPuz__button--myWords';

const initMaterialSelects = () => {
  const elems = document.querySelectorAll('select');
  Materialize.FormSelect.init(elems);
};

const clearContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
};

const renderSelectOnStart = (element, difficulty, round) => {
  let fragmentD = '<option value="none" selected>Выбрать сложность</option>';
  let fragmentR = '<option value="none" selected>Выбрать раунд</option>';
  const difficultyContainer = element.querySelectorAll('.engPuz__difficulty select');
  const roundContainer = element.querySelectorAll('.engPuz__round select');

  for (let i = 0; i <= engPuzConst.difficulties.length - 1; i += 1) {
    fragmentD += `<option value="${i}">${i}</option>`;
  }
  for (let i = 1; i <= round; i += 1) {
    fragmentR += `<option value="${i}">${i}</option>`;
  }

  clearContainer(difficultyContainer[0]);
  clearContainer(roundContainer[0]);
  difficultyContainer[0].insertAdjacentHTML('afterbegin', fragmentD);
  roundContainer[0].insertAdjacentHTML('afterbegin', fragmentR);

  difficultyContainer[0].children[0].removeAttribute('selected');
  difficultyContainer[0].children[difficulty + 1].setAttribute('selected', '');

  roundContainer[0].children[0].removeAttribute('selected');
  roundContainer[0].children[round].setAttribute('selected', '');

  Materialize.FormSelect.init(difficultyContainer);
  Materialize.FormSelect.init(roundContainer);
};

const renderRoundSelectIfDifficultyChange = (element) => {
  let fragment = '<option value="none" selected>Выбрать раунд</option>';
  const difficultyValue = element.querySelector('.engPuz__difficulty select').value;
  const selectContainer = element.querySelectorAll('.engPuz__round select');

  for (let i = 1; i <= engPuzConst.pagesPerDifficulties[difficultyValue]; i += 1) {
    fragment += `<option value="${i}">${i}</option>`;
  }

  clearContainer(selectContainer[0]);
  selectContainer[0].insertAdjacentHTML('afterbegin', fragment);
  Materialize.FormSelect.init(selectContainer);
};

export default class IndexView extends View {
  onMount() {
    const playArcadeBtn = this.element.querySelector(`#${ARCADE_BUTTON}`);
    const playMyWordsBtn = this.element.querySelector(`#${TRAIN_WORDS_BUTTON}`);

    initMaterialSelects();

    const { difficulty, round } = this.props.game;

    if (difficulty || difficulty === 0) {
      renderSelectOnStart(this.element, difficulty, round);
    }

    this.element.querySelector('.engPuz__difficulty select').addEventListener('change', () => {
      renderRoundSelectIfDifficultyChange(this.element);
    });

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
      <a id="${TRAIN_WORDS_BUTTON}" class="#fce4ec mar-left pink lighten-3 waves-effect waves-light btn flex-center"><i class="material-icons left">description</i>Тренировать мои слова</a>
      `;
    }

    const html = `
    <div class="EP-start__wrapper">
      <div class="EP-start__panel card-panel hoverable">
      <div class="row">
      <h2 class="center">English Puzzle</h2>
      <div class="flex-center">
        <blockquote class="center flex-center">Цель игры - это собрать предложения из размещённых в случайном порядке английских слов.</blockquote>
      </div>
      <div class="engPuz__selects flex-evenly">
        <div class="engPuz__difficulty input-field">
          <select>
            <option value="none" selected>Выбрать сложность</option>
          </select>
        <label>Game difficulty</label>
      </div>
          <div class="engPuz__round input-field ">
            <select>
              <option value="none" selected>Выюрать раунд</option>
            </select>
            <label>Game round</label>
        </div>
      </div>
      <div class="flex-evenly">
          <a id="${ARCADE_BUTTON}" class="#fce4ec pink lighten-3 waves-effect waves-light btn flex-center"><i class="material-icons left">description</i>Аркадный режим</a>
          ${userWordsPlayFragment}
      </div>
      </div>
    </div>
    </div>
   `;

    return html;
  }
}
