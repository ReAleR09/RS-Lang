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
  CLASS_LETTER_FLIP,
  CLASS_DRUM_ROTATE,
  CLASS_LETTER_WRAP,
  CLASS_COMPONENT_LOCKED,
} from './gameTemplate';
import SoundPlayer from '../../../Classes/SoundPlayer';
import {
  alphabet,
  instructions,
  phraseAboutMicrophone,
  soundEffects,
  soundsSources,
} from './constants';
import Toaster from '../../../Classes/Toaster';

// const START_PIC = '/assets/img/speakit_start_pic.jpg';

export default class FieldOfDreamsView {
  constructor(
    getNextWordCallback,
    useHintCallback,
    startListeningCallback,
    AcceptAnswerCallback,
    startQuestionUtteranceCallback,
  ) {
    this.startQuestionUtterance = startQuestionUtteranceCallback;
    this.startListening = startListeningCallback;
    this.acceptAnswer = AcceptAnswerCallback;
    this.goNext = getNextWordCallback;
    this.useHint = useHintCallback;
    this.soundPlayer = new SoundPlayer(this.onSoundEffectsEnd.bind(this));
    this.soundEffect = null;
  }

  attach(element, setTimerCallback) {
    this.setTimer = setTimerCallback;
    this.element = element;
    this.selectedLetters = [];
    this.answer = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.answer);
    this.question = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.question);
    this.drum = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.drum);
    this.initButtons();
  }

  openAnswer(result) {
    this.stopDrum();
    this.flipLetters();

    if (result) {
      this.soundEffect = soundEffects.success;
    } else {
      this.soundEffect = soundEffects.error;
    }
    this.playSounds();
  }

  onSoundEffectsEnd() {
    if (this.soundEffect === soundEffects.success || this.soundEffect === soundEffects.error) {
      this.hideCard();
      this.setTimer(this.goNext(), 1000);
    }
    this.soundEffect = null;
  }

  playSounds() {
    this.soundPlayer.addAudioToQueue(soundsSources[this.soundEffect]);
    this.soundPlayer.play();
  }

  startLetterEffects(result) {
    this.soundEffect = (result) ? soundEffects.letterTrue : soundEffects.letterFalse;
    this.playSounds();
  }

  initButtons() {
    this.skipButton = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.skipButton);
    this.speechButton = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.speechButton);
    this.alphabet = this.element.querySelector(FIELD_OF_DREAMS_QUERIES.alphabet);

    this.alphabet.addEventListener('click', (e) => {
      const { target } = e;
      if (target.classList.contains(CLASS_LETTER_WRAP)) return;
      if (!this.useHint(target.innerText)) {
        return;
      }
      target.classList.add(CLASS_BUTTON_DISABLED);
      this.selectedLetters.push(target);
      if (!this.useHint()) {
        this.startDrum();
        Toaster.showToast(phraseAboutMicrophone, '', 1500);
        this.startListening();
      }
    });
    this.skipButton.addEventListener('click', () => {
      this.acceptAnswer();
    });

    this.speechButton.addEventListener('click', this.startQuestionUtterance);
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

  flipLetters(indexArray) {
    const letters = Array.from(this.answer.children);

    if (!indexArray) {
      letters.forEach((letter) => letter.classList.remove(CLASS_LETTER_FLIP));
      return;
    }
    indexArray.forEach((index) => letters[index].classList.remove(CLASS_LETTER_FLIP));
  }

  closeAnswer() {
    const letters = Array.from(this.answer.children);
    letters.forEach((letter) => letter.classList.add(CLASS_LETTER_FLIP));
  }

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

    this.drawAnswer(word);

    if (lastWord) {
      this.soundEffect = soundEffects.superGame;
    }
    this.showCard();

    this.unlockComponent();
  }

  startDrum() {
    this.drum.classList.add(CLASS_DRUM_ROTATE);
  }

  stopDrum() {
    this.drum.classList.remove(CLASS_DRUM_ROTATE);
  }

  lockComponent() {
    this.element.classList.add(CLASS_COMPONENT_LOCKED);
  }

  unlockComponent() {
    this.element.classList.remove(CLASS_COMPONENT_LOCKED);
  }

  static showInstructions() {
    Toaster.showToast(instructions, '', 2000);
  }
}
