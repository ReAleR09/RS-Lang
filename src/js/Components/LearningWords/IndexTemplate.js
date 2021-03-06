export const CLASS_VISIBLE = 'visible';
export const CLASS_DISABLED = 'd-none';
export const CLASS_SUCCESS = 'success';
export const CLASS_ERROR = 'error';

const ID_WORD = 'word';

export const COMPONENT_LOCK_CLASS = 'component-lock';

export const TOOLTIP_ATTRIBUTE = 'data-tooltip';

export const CLASS_COMPONENT = 'learn-words';
export const CLASS_COMPONENT_LOCKED = 'component-locked';
export const CLASS_CARD_LOCKED = 'card-locked';

const CLASS_CARD_SETTINGS = 'card-settings';

const CLASS_MODAL_WORD_RATE = 'modal-word-rate';

const INTERVAL_RATING = 'interval-rate';

const CLASSES = {
  COMPONENT: {
    ARROW_LEFT: `${CLASS_COMPONENT}-prev`,
    ARROW_RIGHT: `${CLASS_COMPONENT}-next`,
    WORDCARD: 'word-card',
  },
  MODALS: {
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
    IMG_WRAPPER: 'card-img-wrapper',
    WORDSTATUS: 'word-status',
    TITLE: 'card-title',
    SETTINGS: {
      BUTTON_VOLUME: 'button-volume',
      BUTTON_TRANSLATE: 'button-translate',
      BUTTON_SKIP: 'button-skip',
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

export const QUERY_WORDCARD = `.${CLASS_COMPONENT} .${CLASSES.COMPONENT.WORDCARD}`;
export const INDEX_QUERIES = {};

INDEX_QUERIES.WORD_ELEMENTS = {
  WORD: `.${CLASS_COMPONENT} #${ID_WORD}`,
  EXAMPLE_START: `.${CLASS_COMPONENT} .${CLASSES.CARD.PUZZLE.EXAMPLE_START}`,
  EXAMPLE_END: `.${CLASS_COMPONENT} .${CLASSES.CARD.PUZZLE.EXAMPLE_END}`,
  IMAGE: `.${CLASS_COMPONENT} .${CLASSES.CARD.IMG_WRAPPER} img`,
  IMAGE_WRAPPER: `.${CLASS_COMPONENT} .${CLASSES.CARD.IMG_WRAPPER}`,
  EXAMPLE_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.EXAMPLE_TRANSLATE}`,
  WORD_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.WORD_TRANSLATE}`,
  DESCRIPTION: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.DESCRIPTION}`,
  TRANSCRIPTION: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.TRANSCRIPTION}`,
  DESCRIPTION_TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.HINTS.DESCRIPTION_TRANSLATE}`,
};

INDEX_QUERIES.MODALS = {
  WORD_RATE: `.${CLASS_COMPONENT} .${CLASS_MODAL_WORD_RATE}`,
};

INDEX_QUERIES.BUTTONS = {
  WORDSTATUS: `.${CLASS_COMPONENT} .${CLASSES.CARD.WORDSTATUS}`,
  SETTINGS: `.${CLASS_COMPONENT} .${CLASS_CARD_SETTINGS}`,
  VOLUME: `.${CLASS_COMPONENT} .${CLASSES.CARD.SETTINGS.BUTTON_VOLUME}`,
  TRANSLATE: `.${CLASS_COMPONENT} .${CLASSES.CARD.SETTINGS.BUTTON_TRANSLATE}`,
  SKIP: `.${CLASS_COMPONENT} .${CLASSES.CARD.SETTINGS.BUTTON_SKIP}`,
  PREV: `.${CLASS_COMPONENT} .${CLASSES.COMPONENT.ARROW_LEFT} a`,
  NEXT: `.${CLASS_COMPONENT} .${CLASSES.COMPONENT.ARROW_RIGHT} a`,
  DELETE: `.${CLASS_COMPONENT} .${CLASSES.CARD.BUTTON_SIMPLE}`,
  COMPLICATED: `.${CLASS_COMPONENT} .${CLASSES.CARD.BUTTON_COMPLICATED}`,
  MODAL_CLOSE: `.${CLASSES.MODALS.CLOSE}`,
  WORD_RATE_CLOSE: `${INDEX_QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.CLOSE}`,
  AGAIN: `${INDEX_QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_AGAIN}`,
  HARD: `${INDEX_QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_HARD}`,
  NORMAL: `${INDEX_QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_NORMAL}`,
  EASY: `${INDEX_QUERIES.MODALS.WORD_RATE} .${CLASSES.MODALS.WORD_RATE.BUTTON_EASY}`,
};

const HTML_CARD_HEADER = `
  <div class="card-head">
    <div class="${CLASSES.CARD.WORDSTATUS} tooltipped" data-position="right" data-tooltip="Статус изучения слова"></div>
    <h5 class="${CLASSES.CARD.TITLE}">Карточка изучения слов</h5>
    <div class="${CLASS_CARD_SETTINGS} fixed-action-btn click-to-toggle">
      <a class="btn-floating btn-small click-to-toggle z-depth-3">
        <i class="material-icons">settings</i>
      </a>
      <ul>
        <li><a class="${CLASSES.CARD.SETTINGS.BUTTON_VOLUME} btn-floating blue darken-2 tooltipped btn-small" data-position="bottom" data-tooltip="Отключить произношение"><i class="material-icons">volume_up</i></a></li>
        <li><a class="${CLASSES.CARD.SETTINGS.BUTTON_TRANSLATE} btn-floating green darken-3 tooltipped btn-small" data-position="bottom" data-tooltip="Скрыть переводы"><i class="material-icons">translate</i></a></li>
        <li><a class="${CLASSES.CARD.SETTINGS.BUTTON_SKIP} btn-floating red darken-3 tooltipped btn-small" data-position="bottom" data-tooltip="Показать Ответ"><i class="material-icons">visibility</i></a></li>
      </ul>
    </div>
  </div>`;

const HTML_CARD_BODY = `
  <div class="card-body row">
    <div class="${CLASSES.CARD.IMG_WRAPPER} col l4 s8 offset-s2 valign-wrapper">
      <img alt="word description picture" class="responsive-img img-rounded">
    </div>
    <div class="col l8 s12">
      <div class="puzzle d-flex">
        <p class="example-text"><span class="${CLASSES.CARD.PUZZLE.EXAMPLE_START}"></span><input id="${ID_WORD}" type="text" autofocus autocomplete="off"><span class="${CLASSES.CARD.PUZZLE.EXAMPLE_END}"></span></p>
      </div>
      <div class="divider"></div>
      <div class="hints">
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
  <div class="card-footer row">
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

const HTML_MODAL_WORD_RATE = `
<div id="modal2" class="${CLASS_MODAL_WORD_RATE} modal">
  <div class="modal-content center-align">
    <h4 class="modal-title">Оцените, пожалуйста, сложность слова для вас, начиная от "Уже забыл и надо повторить" до "легко запомню"</h4>
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
  <section class="${CLASS_COMPONENT} center-align">
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
    </div>
    ${HTML_MODAL_WORD_RATE}
    <div class="${COMPONENT_LOCK_CLASS}"></div>
  </section>`;
