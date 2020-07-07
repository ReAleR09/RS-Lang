const CLASS_DICTIONARY_WORD = 'dictionary__word';
const CLASS_DICTIONARY_WORD_SOUND = 'dictionary__word-sound';
const CLASS_WORD_DATA = 'word-data';
const CLASS_WORD_DATA_WORD = 'word-data__word';
const CLASS_TRANSCRIPTION = 'word-data__transcription';
const CLASS_WORD_EXPLANATION = 'word-data__sentence-explanation';
const CLASS_WORD_EXAMPLE = 'word-data__example';
const CLASS_WORD_PICTURE = 'word-data__picture';
// const CLASS_WORD_STATUS = 'word-data__status';
const CLASS_WORD_COUNT = 'word-data__count';
const CLASS_WORD_STAT_PREV = 'word-data__stat-prev';
const CLASS_WORD_STAT_NEXT = 'word-data__stat-next';

const CLASS_WORD_DELETE_BUTTON = 'word-data__delete-button';
const CLASS_WORD_RECOVER_BUTTON = 'word-data__recover-button';

class DictionaryWordCard {
  constructor(word, flag) {
    this.word = { ...word };
    this.flag = flag;
  }

  createWord() {
    let html = `
      <div class="${CLASS_DICTIONARY_WORD}">
        <div class="${CLASS_DICTIONARY_WORD_SOUND}" sound="${this.word.audio}"><i class="fas fa-volume-up fa-4x"></i></div>

        <div class="${CLASS_WORD_DATA}">

          <div class="${CLASS_WORD_DATA_WORD}"><b>${this.word.word}</b> - ${this.word.wordTranslate}</div>

          <div class="${CLASS_TRANSCRIPTION}">${this.word.transcription}</div>
          <div class="${CLASS_WORD_EXPLANATION}"><b>Explanation:</b> ${this.word.textMeaning}</div>
          <div class="${CLASS_WORD_EXAMPLE}"><b>Example:</b> ${this.word.textExample}</div>
          <div class="${CLASS_WORD_PICTURE}"><img src="https://raw.githubusercontent.com/yafimchik/rslang-data/master/${this.word.image}"></div>
        </div>

        <div class="${CLASS_WORD_DATA}">
          <div class="${CLASS_WORD_COUNT}"><b>Repeated:</b> ${this.word.userWord.optional.errors + this.word.userWord.optional.success || 0} </div>
          <div class="${CLASS_WORD_STAT_PREV}"><b>Last</b> ${new Date(this.word.userWord.optional.lastDate).toLocaleString()} </div>
          <div class="${CLASS_WORD_STAT_NEXT}"><b>Next</b> ${new Date(this.word.userWord.optional.nextDate).toLocaleString()} </div>`;
    if (this.flag) {
      html += `<div class="${CLASS_WORD_DELETE_BUTTON}" idWord="${this.word._id}"> <i class="fa fa-trash" aria-hidden="true"></i> </div>`;
    } else {
      html += `<div class="${CLASS_WORD_RECOVER_BUTTON}" idWord="${this.word._id}"><i class="fa fa-recycle" aria-hidden="true"></i></div>`;
    }

    html += `
        </div>
      </div>
    `;

    return html;
  }

  render() {
    const result = this.createWord();
    return result;
  }
}

export {
  CLASS_DICTIONARY_WORD_SOUND,
  CLASS_WORD_DELETE_BUTTON,
  CLASS_WORD_RECOVER_BUTTON,
  DictionaryWordCard,
};
