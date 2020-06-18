import './style.scss';

const ID_DIFFICULTY_BAR = 'speakit__difficulty-bar';
const ID_PANEL = 'speakit__panel';
const ID_PICTURE = 'speakit__picture';
const ID_TRANSLATION = 'speakit__picture';
const ID_RECOGNIZED_TEXT = 'speakit__recognized-text';
const ID_WORDS_PANEL = 'speakit__words-panel';

const CLASS_WORDCARD = 'speakit__word-card';

export default class SpeakitView {
  attach(element) {
    this.element = element;
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout(difficulty) {
    let difficultyElements = '';
    for (let level = 0; level < 6; level += 1) {
      const enabledClass = (difficulty === level) ? 'speakit__difficulty_enabled' : '';
      difficultyElements += `<div class="${enabledClass}" data-level=${level}>[d${level}]</div>`;
    }

    const html = `<div>
      <div id="${ID_DIFFICULTY_BAR}">
        ${difficultyElements}
      </div>
      <div id="${ID_PANEL}">
        <div id="${ID_PICTURE}">Picture of the word goes there</div>
        <div id="${ID_TRANSLATION}">Word translation hint goes there</div>
      </div>
      <div id="${ID_RECOGNIZED_TEXT}">recognized text</div>
      <div id="${ID_WORDS_PANEL}">
        
      </div>
    </div>`;

    return html;
  }

  drawWordsToDOM(words) {
    const wordsHtml = words.reduce((html, wordInfo) => {
      const wordHTML = `<div class="${CLASS_WORDCARD}" id="${wordInfo.id}">
        <div>Sound knopka )</div>
        <div>${wordInfo.word}</div>
        <div>${wordInfo.transcription}</div>
      </div>`;

      return html + wordHTML;
    });

    const wordsPanelEl = this.element.querySelector(`#${ID_WORDS_PANEL}`);

    wordsPanelEl.innerHTML = wordsHtml;
  }
}
