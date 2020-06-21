export const CLASS_VISIBLE = 'visible';
export const CLASS_SUCCESS = 'success';
export const CLASS_ERROR = 'error';

const ID_WORD = 'word';

const CLASS_COMPONENT = 'learn-words';

const CLASS_CARD_SETTINGS = 'card-settings';

const CLASS_PUZZLE = 'puzzle';
const CLASS_HINTS = 'hints';

const CLASS_MODAL_INTERVAL_REPEAT = 'modal-interval-repeat';
const CLASS_MODAL_WORD_RATE = 'modal-word-rate';

const INTERVAL_RATING = 'interval-rate';

const CLASSES = {
  COMPONENT: {
    ARROW_LEFT: `${CLASS_COMPONENT}-prev`,
    ARROW_RIGHT: `${CLASS_COMPONENT}-next`,
    WORDCARD: 'word-card',
  },
  MODALS: {
    TITLE: 'modal-title',
    CLOSE: 'button-close',
    INTERVAL_REPEAT: {
      DESCRIPTION: 'interval-description',
      RATE1: `${INTERVAL_RATING}-1`,
      RATE2: `${INTERVAL_RATING}-2`,
      RATE3: `${INTERVAL_RATING}-3`,
      RATE4: `${INTERVAL_RATING}-4`,
      RATE5: `${INTERVAL_RATING}-5`,
    },
    WORD_RATE: {
      BUTTON_AGAIN: 'button-again',
      BUTTON_HARD: 'button-hard',
      BUTTON_NORMAL: 'button-normal',
      BUTTON_EASY: 'button-easy',
    },
  },
  CARD: {
    HEADER: 'card-head',
    BODY: 'card-body',
    FOOTER: 'card-footer',
    IMG_WRAPPER: 'card-img-wrapper',
    WORDSTATUS: 'word-status',
    TITLE: 'card-title',
    SETTINGS: {
      BUTTON_VOLUME: 'button-volume',
      BUTTON_TRANSLATE: 'button-translate',
    },
    PUZZLE: {
      EXAMPLE_START: 'example-start',
      EXAMPLE_END: 'example-end',
    },
    HINTS: {
      EXAMPLE_TRANSLATE: 'example-translate',
      WORD_TRANSLATE: 'word-translate',
      ADDED_HINTS: 'added-hints-title',
      DESCRIPTION: 'description',
      TRANSCRIPTION: 'transcription',
      DESCRIPTION_TRANSLATE: 'description-translate',
    },
    BUTTON_SIMPLE: 'button-simple',
    BUTTON_COMPLICATED: 'button-complicated',
  },
};

export const QUERIES = {};

QUERIES.WORD_ELEMENTS = {
  WORD: `.${CLASS_COMPONENT} #${ID_WORD}`,
  EXAMPLE_START: `.${CLASS_COMPONENT} .${CLASSES.CARD.PUZZLE.EXAMPLE_START}`,
  EXAMPLE_END: `.${CLASS_COMPONENT} .${CLASSES.CARD.PUZZLE.EXAMPLE_END}`,
  IMAGE: `.${CLASS_COMPONENT} .${CLASSES.CARD.IMG_WRAPPER} img`,
  EXAMPLE_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.EXAMPLE_TRANSLATE}`,
  WORD_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.WORD_TRANSLATE}`,
  DESCRIPTION: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.DESCRIPTION}`,
  TRANSCRIPTION: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.TRANSCRIPTION}`,
  DESCRIPTION_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.DESCRIPTION_TRANSLATE}`,
};

QUERIES.MODALS = {
  INTERVAL_REPEAT: `.${CLASS_COMPONENT} .${CLASS_MODAL_INTERVAL_REPEAT}`,
  WORD_RATE: `.${CLASS_COMPONENT} .${CLASS_MODAL_WORD_RATE}`,
};
QUERIES.BUTTONS = {
  WORDSTATUS: `.${CLASS_COMPONENT} .${CLASSES.CARD.WORDSTATUS}`,
  SETTINGS: `.${CLASS_COMPONENT} .${CLASS_CARD_SETTINGS}`,
  VOLUME: `.${CLASS_COMPONENT} .${CLASSES.CARD.SETTINGS.BUTTON_VOLUME}`,
  TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.SETTINGS.BUTTON_TRANSLATE}`,
  PREV: `.${CLASS_COMPONENT} .${CLASSES.COMPONENT.ARROW_LEFT} a`,
  NEXT: `.${CLASS_COMPONENT} .${CLASSES.COMPONENT.ARROW_RIGHT} a`,
  SIMPLE: `.${CLASS_COMPONENT} .${CLASSES.CARD.BUTTON_SIMPLE}`,
  COMPLICATED: `.${CLASS_COMPONENT} .${CLASSES.CARD.BUTTON_COMPLICATED}`,
  MODAL_CLOSE: `.${CLASSES.MODALS.CLOSE}`,
  INTERVAL_REPEAT_CLOSE: `${QUERIES.MODALS.INTERVAL_REPEAT} .${CLASSES.MODALS.CLOSE}`,
  WORD_RATE_CLOSE: `${QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.CLOSE}`,
  AGAIN: `${QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_AGAIN}`,
  HARD: `${QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_HARD}`,
  NORMAL: `${QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_NORMAL}`,
  EASY: `${QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_EASY}`,
};

const HTML_CARD_HEADER = `
  <div class="${CLASSES.CARD.HEADER}">
    <a class="${CLASSES.CARD.WORDSTATUS} tooltipped" data-position="right" data-tooltip="Статус изучения слова">X X X O O</a>
    <h5 class="${CLASSES.CARD.TITLE}">Карточка изучения слов</h5>
    <div class="${CLASS_CARD_SETTINGS} fixed-action-btn click-to-toggle">
      <a class="btn-floating btn-large click-to-toggle z-depth-3">
        <i class="large material-icons">settings</i>
      </a>
      <ul>
        <li><a class="${CLASSES.CARD.SETTINGS.BUTTON_VOLUME} btn-floating blue darken-2 tooltipped" data-position="bottom" data-tooltip="Отключить произношение"><i class="material-icons">volume_up</i></a></li>
        <li><a class="${CLASSES.CARD.SETTINGS.BUTTON_TRANSLATE} btn-floating green darken-3 tooltipped" data-position="bottom" data-tooltip="Скрыть переводы"><i class="material-icons">visibility</i></a></li>
      </ul>
    </div>
  </div>`;

const HTML_CARD_BODY = `
  <div class="${CLASSES.CARD.BODY} row">
    <div class="${CLASSES.CARD.IMG_WRAPPER} col l4 s4 offset-s4 valign-wrapper">
      <img alt="word description picture" class="responsive-img img-rounded">
    </div>
    <div class="col l8 s12">
      <div class="${CLASS_PUZZLE} d-flex">
        <p class="${CLASSES.CARD.PUZZLE.EXAMPLE_START}"></p>
        <input id="${ID_WORD}" type="text" placeholder="hate" size="1">
        <p class="${CLASSES.CARD.PUZZLE.EXAMPLE_END}"></p>
      </div>
      <div class="${CLASS_HINTS}">
        <p class="${CLASSES.CARD.HINTS.EXAMPLE_TRANSLATE}"></p>
        <p class="${CLASSES.CARD.HINTS.WORD_TRANSLATE}"></p>
        <ul  class="collapsible">
          <li>
            <div class="collapsible-header transparent z-depth-2">
              <p class="${CLASSES.CARD.HINTS.ADDED_HINTS}">Дополнительные подсказки:</p>
            </div>
            <div class="collapsible-body">
              <p class="${CLASSES.CARD.HINTS.DESCRIPTION}"></p>
              <p class="${CLASSES.CARD.HINTS.DESCRIPTION_TRANSLATE}"></p>
              <p class="${CLASSES.CARD.HINTS.TRANSCRIPTION}"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>`;

const HTML_CARD_FOOTER = `
  <div class="${CLASSES.CARD.FOOTER} row">
    <div class="col s6 valign-wrapper flex-justify-center">
      <a class="${CLASSES.CARD.BUTTON_SIMPLE} waves-effect waves-light btn red">Простое</a>
    </div>
    <div class="col s6 valign-wrapper flex-justify-center">
      <a class="${CLASSES.CARD.BUTTON_COMPLICATED} waves-effect waves-light btn green">Сложное</a>
    </div>
  </div>`;

const HTML_CARD = `
  <div class="${CLASSES.COMPONENT.WORDCARD} blue-grey z-depth-5 p-2">
    ${HTML_CARD_HEADER}
    ${HTML_CARD_BODY}
    ${HTML_CARD_FOOTER}
  </div>`;

const HTML_MODAL_INTERVAL_REPEAT = `
  <div id="modal1" class="${CLASS_MODAL_INTERVAL_REPEAT} modal">
    <div class="modal-content">
      <h4 class="${CLASSES.MODALS.TITLE}">Методика интервального повторения</h4>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.DESCRIPTION}">Методика интервального повторения предусматривает повторение слов с периодичностью,
        расчитываемой с учетом сложности слова, правильного или ошибочного ответа при повторении.
        Слова имеют 5 категорий:
      </p>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.RATE1}">x o o o o Новое слово</p>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.RATE2}">x x o o o Это слово начинаем запоминать</p>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.RATE3}">x x x o o В процессе запоминания</p>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.RATE4}">x x x x o Слово вертится на языке</p>
      <p class="${CLASSES.MODALS.INTERVAL_REPEAT.RATE5}">x x x x x Прекрасная память!</p>
    </div>
    <div class="modal-footer">
      <a class="${CLASSES.MODALS.CLOSE} modal-close waves-effect waves-green btn-flat">Закрыть</a>
    </div>
  </div>`;

const HTML_MODAL_WORD_RATE = `
<div id="modal2" class="${CLASS_MODAL_WORD_RATE} modal">
  <div class="modal-content center-align">
    <h4 class="${CLASSES.MODALS.TITLE}">Оцените, пожалуйста, сложность слова для вас, начиная от "Уже забыл и надо повторить" до "легко запомню"</h4>
    <a class="${CLASSES.MODALS.WORD_RATE.BUTTON_AGAIN} btn-floating circle red">
      0
    </a>
    <a class="${CLASSES.MODALS.WORD_RATE.BUTTON_HARD} btn-floating  circle orange">
      1
    </a>
    <a class="${CLASSES.MODALS.WORD_RATE.BUTTON_NORMAL} btn-floating circle yellow darken-1">
      2
    </a>
    <a class="${CLASSES.MODALS.WORD_RATE.BUTTON_EASY} btn-floating circle green">
      3
    </a>
  </div>
  <div class="modal-footer">
    <a class="${CLASSES.MODALS.CLOSE} button-close modal-close waves-effect waves-green btn-flat">Закрыть</a>
  </div>
</div>`;

export const HTML_COMPONENT = `
  <div class="${CLASS_COMPONENT} center-align">
    <div class="">
      <div class="d-flex flex-align-center">
        <div class="${CLASSES.COMPONENT.ARROW_LEFT} m-1">
          <a class="btn-floating circle tooltipped z-depth-3" data-position="bottom" data-tooltip="Вернуться к предыдущей карточке">
            <i class="large material-icons">chevron_left</i>
          </a>
        </div>
        ${HTML_CARD}
        <div class="${CLASSES.COMPONENT.ARROW_RIGHT} m-1">
          <a class="btn-floating circle tooltipped z-depth-3" data-position="bottom" data-tooltip="Продолжить">
            <i class="large material-icons">chevron_right</i>
          </a>
        </div>
      </div>
      ${HTML_MODAL_INTERVAL_REPEAT}
      ${HTML_MODAL_WORD_RATE}
    </div>
  </div>`;
