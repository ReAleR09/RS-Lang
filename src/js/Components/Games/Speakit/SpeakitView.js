import './style.scss';
import AppNavigator from '../../../lib/AppNavigator';

const ID_DIFFICULTY_BAR = 'speakit__difficulty-bar';
const ID_PICTURE = 'speakit__picture';
const ID_TRANSLATION = 'speakit__picture';
const ID_RECOGNIZED_TEXT = 'speakit__recognized-text';
const ID_WORDS_PANEL = 'speakit__words-panel';
const ID_BEGIN_BUTTON = 'speakit__begin-button';
const ID_FINISH_BUTTON = 'speakit__finish-button';

const CLASS_WORDCARD = 'speakit__word-card';
const CLASS_WORDCARD_SOUND = 'speakit__word-card_sound-icon';
const CLASS_BUTTON_HIDDEN = 'speakit__button-hidden';

const CLASS_WORDCARD_RECOGNIZED = 'green';

export default class SpeakitView {
  constructor(wordSoundButtonClickCallback, beginCallback, stopCallback) {
    this.wordSoundButtonClickCallback = wordSoundButtonClickCallback;
    this.beginCallback = beginCallback;
    this.stopCallback = stopCallback;
  }

  attach(element) {
    this.element = element;
    this.initDifficultySwitcher();
    this.initWordSoundButtonClick();
    this.initBeginButton();
    this.initFinishButton();
  }

  initBeginButton() {
    const beginButton = this.element.querySelector(`#${ID_BEGIN_BUTTON}`);
    const finishButton = this.element.querySelector(`#${ID_FINISH_BUTTON}`);
    beginButton.addEventListener('click', (e) => {
      this.beginCallback();
      beginButton.classList.add(CLASS_BUTTON_HIDDEN);
      finishButton.classList.remove(CLASS_BUTTON_HIDDEN);
      e.preventDefault();
      e.stopPropagation();
    });
  }

  initFinishButton() {
    const finishButton = this.element.querySelector(`#${ID_FINISH_BUTTON}`);
    finishButton.addEventListener('click', (e) => {
      this.stopCallback();
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

  markWordAsRecognized(wordId) {
    const wordCardsEls = this.element.querySelectorAll(`.${CLASS_WORDCARD}`);
    wordCardsEls.forEach((wordCardEl) => {
      if (wordCardEl.dataset.wordid === wordId) {
        wordCardEl.classList.add(CLASS_WORDCARD_RECOGNIZED);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout(difficulty) {
    let difficultyElements = '';
    for (let level = 0; level < 6; level += 1) {
      const enabledClass = (difficulty === level) ? 'speakit__difficulty_enabled' : '';
      difficultyElements += `<div class="waves-effect waves-light btn col s1 ${enabledClass}" data-level=${level}>[d${level}]</div>`;
    }

    const html = `<div>
      <h5 class="col s12">Difficulty:</h5>
      <div id="${ID_DIFFICULTY_BAR}" class="row valign-wrapper">
        ${difficultyElements}
      </div>
      <div class="row">
        <img id="${ID_PICTURE}" class="col s6 push-s3" src="https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/files/12_0223.jpg"/>
      </div>
      <div class="row">
        <div class="col s6 push-s3">
          <div readonly id="${ID_TRANSLATION}" class="speakit__translation-input">Translation</div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 push-s3">
          <i class="material-icons prefix">micro</i>
          <input id="${ID_RECOGNIZED_TEXT}">
        </div>
      </div>

      <div id="${ID_WORDS_PANEL}" class="row"></div>

      <div class="row">
        <div id="${ID_BEGIN_BUTTON}" class="waves-effect waves-light btn col s2 offset-s5">START GAME</div>
        <div id="${ID_FINISH_BUTTON}" class="waves-effect waves-light btn col s2 offset-s5 ${CLASS_BUTTON_HIDDEN}">FINISH GAME</div>
      </div>
    </div>`;

    return html;
  }

  drawRecognizedTextToDOM(text) {
    const textDiv = this.element.querySelector(`#${ID_RECOGNIZED_TEXT}`);
    textDiv.value = text;
  }

  drawWordsToDOM(words) {
    const wordsHtml = words.reduce((html, wordInfo) => {
      const wordHTML = `<div class="${CLASS_WORDCARD} col s2 card" data-wordid="${wordInfo.id}">
        <i class="${CLASS_WORDCARD_SOUND} material-icons prefix" data-wordid="${wordInfo.id}" data-wordsound="1">micro</i>
        <div class="">${wordInfo.word}</div>
        <div class="">${wordInfo.transcription}</div>
      </div>`;

      return html + wordHTML;
    }, '');

    const wordsPanelEl = this.element.querySelector(`#${ID_WORDS_PANEL}`);

    wordsPanelEl.innerHTML = wordsHtml;
  }
}
