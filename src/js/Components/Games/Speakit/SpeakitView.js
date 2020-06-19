import './style.scss';
import AppNavigator from '../../../lib/AppNavigator';

const ID_DIFFICULTY_BAR = 'speakit__difficulty-bar';
const ID_PANEL = 'speakit__panel';
const ID_PICTURE = 'speakit__picture';
const ID_TRANSLATION = 'speakit__picture';
const ID_RECOGNIZED_TEXT = 'speakit__recognized-text';
const ID_WORDS_PANEL = 'speakit__words-panel';
const ID_BEGIN_BUTTON = 'speakit__begin-button';

const CLASS_WORDCARD = 'speakit__word-card';

const CLASS_BORDER = 'speakit__border';

export default class SpeakitView {
  constructor(wordSoundButtonClickCallback, beginCallback) {
    this.wordSoundButtonClickCallback = wordSoundButtonClickCallback;
    this.beginCallback = beginCallback;
  }

  attach(element) {
    this.element = element;
    this.initDifficultySwitcher();
    this.initWordSoundButtonClick();
    this.initBeginButton();
  }

  initBeginButton() {
    const wordsPanelEl = this.element.querySelector(`#${ID_BEGIN_BUTTON}`);
    wordsPanelEl.addEventListener('click', (e) => {
      this.beginCallback();
      e.preventDefault();
      e.stopPropagation();
    });
  }

  initWordSoundButtonClick() {
    const wordsPanelEl = this.element.querySelector(`#${ID_WORDS_PANEL}`);
    wordsPanelEl.addEventListener('click', (e) => {
      if (e.target.dataset.wordsound) {
        const { wordid } = e.target.dataset;
        this.wordSoundButtonClickCallback(wordid);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  initDifficultySwitcher() {
    const difficultyBarEl = this.element.querySelector(`#${ID_DIFFICULTY_BAR}`);
    difficultyBarEl.addEventListener('click', (e) => {
      if (e.target.dataset.level) {
        AppNavigator.go('speakit', 'play', { difficulty: e.target.dataset.level });
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout(difficulty) {
    let difficultyElements = '';
    for (let level = 0; level < 6; level += 1) {
      const enabledClass = (difficulty === level) ? 'speakit__difficulty_enabled' : '';
      difficultyElements += `<div class="${enabledClass}" data-level=${level}>[d${level}]</div>`;
    }

    const html = `<div class="${CLASS_BORDER}">
      <div id="${ID_DIFFICULTY_BAR}" class="${CLASS_BORDER}">
        ${difficultyElements}
      </div>
      <div id="${ID_PANEL}" class="${CLASS_BORDER}">
        <div id="${ID_PICTURE}" class="${CLASS_BORDER}">Picture of the word goes there</div>
        <div id="${ID_TRANSLATION}" class="${CLASS_BORDER}">Word translation hint goes there</div>
      </div>
      <div id="${ID_RECOGNIZED_TEXT}" class="${CLASS_BORDER}">recognized text</div>
      <div id="${ID_WORDS_PANEL}" class="${CLASS_BORDER}"></div>
      <div>
        <div id="${ID_BEGIN_BUTTON}">BEGIN</div>
      </div>
    </div>`;

    return html;
  }

  drawWordsToDOM(words) {
    const wordsHtml = words.reduce((html, wordInfo) => {
      const wordHTML = `<div class="${CLASS_WORDCARD} ${CLASS_BORDER}" data-wordid="${wordInfo.id}">
        <div class="${CLASS_BORDER}" data-wordid="${wordInfo.id}" data-wordsound="1">Sound knopka )</div>
        <div class="${CLASS_BORDER}">${wordInfo.word}</div>
        <div class="${CLASS_BORDER}">${wordInfo.transcription}</div>
      </div>`;

      return html + wordHTML;
    }, '');

    const wordsPanelEl = this.element.querySelector(`#${ID_WORDS_PANEL}`);

    wordsPanelEl.innerHTML = wordsHtml;
  }
}
