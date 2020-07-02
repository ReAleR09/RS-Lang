export default class DictionaryWordCard {
  constructor(word, flag) {
    this.word = { ...word };
    this.flag = flag;
  }

  createWord() {
    let html = `
      <div class="dictionary__word word">
        <div class="dictionary__word-sound" sound="${this.word.audio}"><i class="fas fa-volume-up fa-4x"></i></div>

        <div class="word-data">
          <div class="word-data__word"><b>${this.word.word}</b> - ${this.word.wordTranslate}</div>

          <div class="word-data__transcription">${this.word.transcription}</div>
          <div class="word-data__sentence-explanation"><b>Explanation:</b> ${this.word.textMeaning}</div>
          <div class="word-data__example"><b>Example:</b> ${this.word.textExample}</div>
          <div class="word-data__picture"><img src="https://raw.githubusercontent.com/yafimchik/rslang-data/master/${this.word.image}"></div>
        </div>

        <div class="word-data">
          <div class="word-data__status"> типа точечки </div>
          <div class="word-data__stat-prev"> Когда повторялось последний раз </div>
          <div class="word-data__stat-next"> Когда будет повторяться </div>`;
    if (this.flag) {
      html += `<div class="word-data__delete-button" idWord="${this.word.id}">DELETE</div>`;
    } else {
      html += `<div class="word-data__recover-button" idWord="${this.word.id}">RECOVER</div>`;
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
