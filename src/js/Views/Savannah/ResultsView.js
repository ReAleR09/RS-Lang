import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';

const CLASS_BUTTON_PLAY_AGAIN = 'savannah__play-again-button';
const CLASS_GUESSED_WORDS_BLOCK = 'savannah__guessed-words';
const CLASS_GUESSED_WORD = 'guessed';
const CLASS_NOT_GUESSED_WORD = 'not-guessed';
const CLASS_NOT_GUESSED_WORDS_BLOCK = 'savannah__not-guessed-words';
const CLASS_FINISH_BUTTON = 'savannah__finish-button';

export default class ResultsView extends View {
  onMount() {
    const playAgainButton = this.element.querySelector(`.${CLASS_BUTTON_PLAY_AGAIN}`);
    playAgainButton.addEventListener('click', () => {
      AppNavigator.replace('savannah');
      LocalStorageAdapter.set('savannah-current-words-state', '');
    });
    const finishButton = this.element.querySelector(`.${CLASS_FINISH_BUTTON}`);
    finishButton.addEventListener('click', () => {
      AppNavigator.go();
      LocalStorageAdapter.set('savannah-current-words-state', '');
    });
  }

  render() {
    const { stats } = this.props;
    let guessed = '';
    let guessedCount = 0;
    let notGuessed = '';
    let notGuessedCount = 0;
    stats.forEach((item) => {
      if (item.guessed) {
        guessed += `<div class="${CLASS_GUESSED_WORD}">${item.word}</div>`;
        guessedCount += 1;
      } else {
        notGuessed += `<div class="${CLASS_NOT_GUESSED_WORD}">${item.word}</div>`;
        notGuessedCount += 1;
      }
    });

    const html = `
     <div class="savannah__results">
      <div class="${CLASS_GUESSED_WORDS_BLOCK}"> Я ЗНАЮ ${guessedCount}: ${guessed}</div>
      <div class="${CLASS_NOT_GUESSED_WORDS_BLOCK}"> ОШИБКИ ${notGuessedCount}: ${notGuessed}</div>
      <div class="${CLASS_FINISH_BUTTON}">Закончить</div>
      <div class="${CLASS_BUTTON_PLAY_AGAIN}">Продолжить играть</div>
     </div>
    `;

    return html;
  }
}
