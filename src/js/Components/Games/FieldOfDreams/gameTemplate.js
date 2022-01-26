import { fieldOfDreamsComponent } from './constants';

const CLASSES = {
  question: 'question',
  answer: 'answer',
  alphabet: 'alphabet',
  speechButton: 'button-speech',
  acceptButton: 'button-accept',
  skipButton: 'button-skip',
  currentAnswer: 'current-answer',
  drum: 'drum',
};

export const CLASS_COMPONENT_LOCKED = 'component-locked';
const COMPONENT_LOCK_CLASS = 'component-lock';

export const CLASS_LETTER_WRAP = 'button-letter-wrap';
export const CLASS_LETTER_FLIP = 'letter-flipped';
export const CLASS_DRUM_ROTATE = 'drum-rotation';

export const CLASS_BUTTON_DISABLED = 'disabled';
export const CLASS_LISTENING = 'field-of-dreams__listening';
export const CLASS_HIDE_CARD = 'card-hide';

export const FIELD_OF_DREAMS_QUERIES = {
  question: `.${fieldOfDreamsComponent} .${CLASSES.question} p`,
  alphabet: `.${fieldOfDreamsComponent} .${CLASSES.alphabet}`,
  answer: `.${fieldOfDreamsComponent} .${CLASSES.answer}`,
  speechButton: `.${fieldOfDreamsComponent} .${CLASSES.speechButton}`,
  skipButton: `.${fieldOfDreamsComponent} .${CLASSES.skipButton}`,
  drum: `.${fieldOfDreamsComponent} .${CLASSES.drum} img`,
};

export const LETTER_REPLACE_STRING = '#LETTER#';
export const ALPHABET_REPLACE_STRING = '#ALPHABET#';

export const APLHABET_LETTER_HTML_TEMPLATE = `
<div class="${CLASS_LETTER_WRAP} col s3 m2 l1">
  <a class="${CLASS_LETTER_WRAP}__link btn-floating circle tooltipped z-depth-3" data-position="bottom" data-tooltip="Вернуться к предыдущей карточке">
    ${LETTER_REPLACE_STRING}
  </a>
</div>`;

export const ANSWER_LETTER_HTML_TEMPLATE = `
<div class="letter ${CLASS_LETTER_FLIP}">
    <div class="letter-card">
      <div class="letter-card__front card-side"></div>
      <div class="letter-card__back card-side">
        <p>${LETTER_REPLACE_STRING}</p>
      </div>
    </div>
</div>`;

export const FIELD_OF_DREAMS_GAME_HTML = `
<section class="${fieldOfDreamsComponent} center-align">
  <div class="row valign-wrapper">
    <div class="drum-wrapper col s3">
      <div class="${CLASSES.drum}">
        <img src="/assets/img/fieldOfDreams_drum.png">
      </div>
    </div>
    <div class="col s9"><h1>Поле Чудес</h1></div>
  </div>
  <div class="${CLASSES.question}">
    <p></p>
  </div>
  <div class="${CLASSES.alphabet} row">
      ${ALPHABET_REPLACE_STRING}
  </div>
  <div class="${CLASSES.answer}">
  </div>
  <div class="control-panel">
    <a class="${CLASSES.speechButton} waves-effect waves-light btn">Прослушать вопрос</a>
    <a class="${CLASSES.skipButton} waves-effect waves-light btn">Пропустить</a>
  </div>
  <div class="${COMPONENT_LOCK_CLASS}"></div>
</section>
`;
