import './style.scss';

const ID_PICTURE = 'speakit__picture';
const ID_TRANSLATION = 'speakit__picture';
const ID_RECOGNIZED_TEXT = 'speakit__recognized-text';
const ID_WORDS_PANEL = 'speakit__words-panel';
const ID_BEGIN_BUTTON = 'speakit__begin-button';
const ID_FINISH_BUTTON = 'speakit__finish-button';
const ID_GUESSD_COUNT = 'speakit__guessd-count';

const CLASS_WORDCARD = 'speakit__word-card';
const CLASS_WORDCARD_SOUND = 'speakit__word-card_sound-icon';
const CLASS_BUTTON_HIDDEN = 'speakit__button-hidden';

const CLASS_WORDCARD_RECOGNIZED = 'green';

const START_PIC = '/assets/img/speakit_start_pic.jpg';

export default class SpeakitView {
  constructor(wordSoundButtonClickCallback, beginCallback, stopCallback) {
    this.wordSoundButtonClickCallback = wordSoundButtonClickCallback;
    this.beginCallback = beginCallback;
    this.stopCallback = stopCallback;
  }

  attach(element) {
    this.element = element;
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

  markWordAsRecognized(wordId) {
    const wordCardsEls = this.element.querySelectorAll(`.${CLASS_WORDCARD}`);
    wordCardsEls.forEach((wordCardEl) => {
      if (wordCardEl.dataset.wordid === wordId) {
        wordCardEl.classList.add(CLASS_WORDCARD_RECOGNIZED);
      }
    });
  }

  updateGuessedCount(count) {
    const el = this.element.querySelector(`#${ID_GUESSD_COUNT}`);
    el.innerHTML = count;
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout(roundSize) {
    const html = `<div>
    <div class="row">
        <div class="col s4 offset-s4">
          Guessed
          <span id="${ID_GUESSD_COUNT}">0</span>
          out of <span>${roundSize}</span>
        </div>
      </div>
      <div class="row">
        <img id="${ID_PICTURE}" class="col s4 offset-s4" src="${START_PIC}"/>
      </div>
      <div class="row">
        <div class="col s4 offset-s4">
          <div readonly id="${ID_TRANSLATION}" class="speakit__translation-input"></div>
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

  drawRecognizedWordToDOM(text, imageUrl) {
    const textDiv = this.element.querySelector(`#${ID_RECOGNIZED_TEXT}`);
    textDiv.value = text;

    if (imageUrl) {
      const imgEl = this.element.querySelector(`#${ID_PICTURE}`);
      imgEl.src = imageUrl;
    }
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
