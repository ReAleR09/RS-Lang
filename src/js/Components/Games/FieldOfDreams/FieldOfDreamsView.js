// import './style.scss';
import {
  FIELD_OF_DREAMS_QUERIES,
  APLHABET_LETTER_HTML_TEMPLATE,
  FIELD_OF_DREAMS_GAME_HTML,
  LETTER_REPLACE_STRING,
  ALPHABET_REPLACE_STRING,
  ANSWER_LETTER_HTML_TEMPLATE,
  CLASS_HIDE_CARD,
  CLASS_BUTTON_DISABLED,
} from './gameTemplate';
import SoundPlayer from '../../../Classes/SoundPlayer';

// const START_PIC = '/assets/img/speakit_start_pic.jpg';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const soundEffects = {
  success: 'success',
  error: 'error',
  superGame: 'supergame',
};

export default class FieldOfDreamsView {
  constructor(getNextWordCallback, useHintCallback, startListeningCallback) {
    this.startListening = startListeningCallback;
    this.goNext = getNextWordCallback;
    this.useHint = useHintCallback;
    this.soundPlayer = new SoundPlayer(this.onSoundEffectsEnd.bind(this));
    this.soundEffect = null;
  }

  attach(element) {
    this.element = element;
    this.selectedLetters = [];
    this.answer = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.answer);
    this.question = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.question);
    this.initButtons();
  }

  openAnswer(result) {
    // TODO open answers
    if (result) {
      this.soundEffect = soundEffects.success;
    } else {
      this.soundEffect = soundEffects.error;
    }
    // this.soundPlayer.addAudioToQueue();
  }

  onSoundEffectsEnd() {
    if (this.soundEffect === soundEffects.success || this.soundEffect === soundEffects.error) {
      this.hideAnswer();
      this.goNext();
    }

    this.soundEffect = null;
  }

  initButtons() {
    this.skipButton = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.skipButton);
    this.alphabet = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.alphabet);
    this.alphabet.addEventListener('click', (e) => {
      const { target } = e;
      if (!this.useHint(target.innerText)) {
        return;
      }
      target.classList.add(CLASS_BUTTON_DISABLED);
      this.selectedLetters.push(target);
      if (!this.useHint()) {
        this.startListening();
      }
    });
  }

  static createAlphabetButtons() {
    let htmlFragment = '';

    const alphabetArray = alphabet.toUpperCase().split('');
    alphabetArray.forEach((letter) => {
      const letterHTML = APLHABET_LETTER_HTML_TEMPLATE.replace(LETTER_REPLACE_STRING, letter);
      htmlFragment += letterHTML;
    });

    return htmlFragment;
  }

  // eslint-disable-next-line class-methods-use-this
  getGameLayout() {
    const alphabetHtml = FieldOfDreamsView.createAlphabetButtons();
    const html = FIELD_OF_DREAMS_GAME_HTML.replace(ALPHABET_REPLACE_STRING, alphabetHtml);
    return html;
  }

  // e.preventDefault();
  // e.stopPropagation()
  drawAnswer(word) {
    const wordElement = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.answer);

    const wordArray = word.word.toUpperCase().split('');
    const answerHtml = wordArray.reduce((html, letter) => {
      const letterHtml = ANSWER_LETTER_HTML_TEMPLATE.replace(LETTER_REPLACE_STRING, letter);
      return html + letterHtml;
    }, '');

    wordElement.innerHTML = answerHtml;
  }

  hideCard() {
    this.element.classList.add(CLASS_HIDE_CARD);
  }

  showCard() {
    this.element.classList.remove(CLASS_HIDE_CARD);
  }

  drawWordToDOM(word, lastWord = false) {
    this.selectedLetters.forEach((letter) => letter.classList.remove(CLASS_BUTTON_DISABLED));
    this.question.innerText = word.MeaningTranslate;

    this.hideCard();
    this.drawAnswer(word);

    if (lastWord) {
      this.soundEffect = soundEffects.superGame;
      // this.soundPlayer.addAudioToQueue();
      // TODO sound effect
    }
    this.showCard();
  }

  // eslint-disable-next-line class-methods-use-this
  closeAnswer() {
  }
}
