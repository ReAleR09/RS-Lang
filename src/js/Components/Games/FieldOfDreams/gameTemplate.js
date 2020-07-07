import { fieldOfDreamsComponent } from './constants';

const CLASSES = {
  question: 'question',
  answer: 'answer',
  alphabet: 'letters',
  speechButton: 'button-speech',
  acceptButton: 'button-accept',
  skipButton: 'button-skip',
  currentAnswer: 'current-answer',
};

export const CLASS_LISTENING = 'listening';
export const CLASS_HIDE_CARD = 'card-hide';

export const FIELD_OF_DREAMS_QUERIES = {
  question: `${fieldOfDreamsComponent} .${CLASSES.question} p`,
  alphabet: `${fieldOfDreamsComponent} .${CLASSES.alphabet}`,
  answer: `.${fieldOfDreamsComponent} .${CLASSES.answer}`,
  skipButton: `${fieldOfDreamsComponent} .${CLASSES.skipButton}`,
};

export const LETTER_REPLACE_STRING = '#LETTER#';
export const ALPHABET_REPLACE_STRING = '#ALPHABET#';

export const APLHABET_LETTER_HTML_TEMPLATE = `
<div class="button-letter col s2 l1">
  <a class="button-letter__link btn-floating circle tooltipped z-depth-3" data-position="bottom" data-tooltip="Вернуться к предыдущей карточке">
    ${LETTER_REPLACE_STRING}
  </a>
</div>`;

export const ANSWER_LETTER_HTML_TEMPLATE = `
<div class="letter">
    <div class="letter-card">
      <div class="letter-card__front card-side"></div>
      <div class="letter-card__back card-side">${LETTER_REPLACE_STRING}</div>
    </div>
</div>`;

export const FIELD_OF_DREAMS_GAME_HTML = `
<section>
  <h1>Своя Игра</h1>
  <div class="${CLASSES.question}">
    <p></p>
  </div>
  <div class="${CLASSES.alphabet}">
    <div class="row">
      ${ALPHABET_REPLACE_STRING}
    </div>
  </div>
  <div class="${CLASSES.answer} row">
  </div>
  <div class="control-panel">
    <button class="${CLASSES.skipButton}">Пропустить</button>
  </div>
</section>
`;
