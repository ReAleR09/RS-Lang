const componentName = 'settings';

export const inputCheck = {
  firstInterval: {
    value: 60,
    alert: 'Первый интервал должен быть меньше 60 минут',
  },
  baseInterval: {
    value: 7,
    alert: 'Базовый интервал Должен быть меньше недели',
  },
  zeroCheck: {
    value: 0,
    alert: 'Нулевые значения не допустимы',
  },
  baseMulti: {
    value: 100,
    alert: 'Базовый множитель Должен быть больше 100%',
  },
  hardMulti: {
    value: 100,
    alert: 'Множитель сложных слов Должен быть больше 100%',
  },
  simpleMulti: {
    value: 100,
    alert: 'Множитель легих слов Должен быть больше 100%',
  },
  hardVSbase: {
    alert: 'Множитель сложных слов должен быть меньше или равен базовому',
  },
  simpleVSbase: {
    alert: 'Множитель легих слов должен быть больше или равен базовому',
  },
  maxInterval: {
    value: 100,
    alert: 'Максимальный интервал должен быть не меньше 100 дней',
  },
};

const CLASSES = {
  COMPONENT: componentName,
  TABS: 'tabs-settings',
  DIFFICULTY: 'difficulty',
  NEW_CARDS: 'new-cards',
  CARDS_PER_DAY: 'cards-per-day',
  TRANSLATION: 'translation',
  MEANING: 'meaning',
  EXAMPLE: 'word-use',
  TRANSCRIPTION: 'word-transcription',
  SHOW_IMAGE: 'word-picture',
  SHOW_BUTTON_ANSWER: 'show-answer',
  SHOW_BUTTON_DELETE: 'show-delete-button',
  SHOW_BUTTON_HARD: 'show-hard-button',
  SHOW_RATE: 'show-buttons',
  BUTTON_CHECK_DIFF: 'check-difficulty-button',
  BUTTON_SAVE: 'settings-btn',
  WARNING_PARAGRAPH: 'warning-paragraph',
  WARNING_TEXT: 'red-text',
  FIRST_INTERVAL: 'first-interval',
  BASE_INTERVAL: 'base-interval',
  BASE_MULTIPLIER: 'base-multiplier',
  HARD_MULTIPLIER: 'hard-multiplier',
  SIMPLE_MULTIPLIER: 'simple-multiplier',
  MAX_INTERVAL: 'max-interval',
  ANNOYING_LIMIT: 'annoying-limit',
  ANNOYING_ACTION: 'annoying-action',
  ACTION_COMPLICATED: 'annoying-action--complicated',
  ACTION_DELETE: 'annoying-action--delete',
};

export const SETTINGS_QUERIES = {
  TABS: `.${CLASSES.COMPONENT} .${CLASSES.TABS}`,
  DIFFICULTY: `.${CLASSES.COMPONENT} .${CLASSES.DIFFICULTY}`,
  NEW_CARDS: `.${CLASSES.COMPONENT} .${CLASSES.NEW_CARDS}`,
  CARDS_PER_DAY: `.${CLASSES.COMPONENT} .${CLASSES.CARDS_PER_DAY}`,
  TRANSLATION: `.${CLASSES.COMPONENT} .${CLASSES.TRANSLATION}`,
  MEANING: `.${CLASSES.COMPONENT} .${CLASSES.MEANING}`,
  EXAMPLE: `.${CLASSES.COMPONENT} .${CLASSES.EXAMPLE}`,
  TRANSCRIPTION: `.${CLASSES.COMPONENT} .${CLASSES.TRANSCRIPTION}`,
  SHOW_IMAGE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_IMAGE}`,
  SHOW_BUTTON_ANSWER: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_ANSWER}`,
  SHOW_BUTTON_DELETE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_DELETE}`,
  SHOW_BUTTON_HARD: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_HARD}`,
  SHOW_RATE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_RATE}`,
  BUTTON_SAVE: `.${CLASSES.COMPONENT} .${CLASSES.BUTTON_SAVE}`,
  BUTTON_CHECK_DIFF: `.${CLASSES.COMPONENT} .${CLASSES.BUTTON_CHECK_DIFF}`,
  WARNING_PARAGRAPH: `.${CLASSES.COMPONENT} .${CLASSES.WARNING_PARAGRAPH}`,
  WARNING_TEXT: `${CLASSES.WARNING_TEXT}`,
  FIRST_INTERVAL: `.${CLASSES.COMPONENT} .${CLASSES.FIRST_INTERVAL}`,
  BASE_INTERVAL: `.${CLASSES.COMPONENT} .${CLASSES.BASE_INTERVAL}`,
  BASE_MULTIPLIER: `.${CLASSES.COMPONENT} .${CLASSES.BASE_MULTIPLIER}`,
  HARD_MULTIPLIER: `.${CLASSES.COMPONENT} .${CLASSES.HARD_MULTIPLIER}`,
  SIMPLE_MULTIPLIER: `.${CLASSES.COMPONENT} .${CLASSES.SIMPLE_MULTIPLIER}`,
  MAX_INTERVAL: `.${CLASSES.COMPONENT} .${CLASSES.MAX_INTERVAL}`,
  ANNOYING_LIMIT: `.${CLASSES.COMPONENT} .${CLASSES.ANNOYING_LIMIT}`,
  ANNOYING_ACTION: `.${CLASSES.COMPONENT} .${CLASSES.ANNOYING_ACTION}`,
  ACTION_COMPLICATED: `.${CLASSES.COMPONENT} .${CLASSES.ANNOYING_ACTION} .${CLASSES.ACTION_COMPLICATED}`,
  ACTION_DELETE: `.${CLASSES.COMPONENT} .${CLASSES.ANNOYING_ACTION} .${CLASSES.ACTION_DELETE}`,
};

const MAIN_SETTINGS = `
<p>
  <label class="range-field">
    <input class="${CLASSES.DIFFICULTY}" type="range" min="0" max="5" value="0">
    <span>Уровень сложности изучаемых слов</span>
    <a class="${CLASSES.BUTTON_CHECK_DIFF} waves-effect waves-light btn btn-small"><i class="material-icons left">trending_down</i> Проверить уровень знаний <i class="material-icons right">trending_up</i></a>
  </label>
</p>
<p>
  <label class="range-field">
    <input class="${CLASSES.NEW_CARDS}" type="range" min="5" max="50" step="5" value="10">
    <span>Новых карточек в день</span>
  </label>
</p>
<p>
  <label class="range-field">
    <input class="${CLASSES.CARDS_PER_DAY}" type="range" min="10" max="200" step="10" value="40">
    <span>Количество карточек в день</span>
  </label>
</p>
<div class="divider"></div>
<p class="${CLASSES.WARNING_PARAGRAPH}">Выберите хотя бы один пункт</p>
<p>
<label>
  <input class="${CLASSES.TRANSLATION}" type="checkbox">
  <span>Перевод слова</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.MEANING}" type="checkbox">
  <span>Предложение с объяснением значения слова</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.EXAMPLE}" type="checkbox">
  <span>Предложение с примером использования изучаемого слова</span>
</label>
</p>
<div class="divider"></div>
<p>
<label>
  <input class="${CLASSES.TRANSCRIPTION}" type="checkbox">
  <span>Показывать транскрипцию слова</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SHOW_IMAGE}" type="checkbox">
  <span>Показывать картинку-ассоциацию</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SHOW_BUTTON_ANSWER}" type="checkbox">
  <span>Наличие кнопки "Показать ответ"</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SHOW_BUTTON_DELETE}" type="checkbox">
  <span>Наличие кнопки "Удалить"</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SHOW_BUTTON_HARD}" type="checkbox">
  <span>Наличие кнопки "Сложные"</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SHOW_RATE}" type="checkbox">
  <span>Наличие кнопок "Снова", "Трудно", "Хорошо", "Легко" </span>
</label>
</p>
`;

const INTERVAL_SETTINGS = `
<p>
<label>
  <input class="${CLASSES.FIRST_INTERVAL}" type="number" value="5">
  <span>Первый интервал между повторениями (в минутах)</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.BASE_INTERVAL}" type="number" value="1">
  <span>Базовый интервал между повторениями (в днях)</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.BASE_MULTIPLIER}" type="number" value="120">
  <span>Базовый множитель увеличения интервала (в процентах)</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.HARD_MULTIPLIER}" type="number" value="110">
  <span>Дополнительный множитель интервала для сложных слов (в процентах)</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.SIMPLE_MULTIPLIER}" type="number" value="150">
  <span>Дополнительный множитель интервала для легких слов (в процентах)</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.MAX_INTERVAL}" type="number" value="250">
  <span>Максимальный интервал, после которого слово перестанет добавляться в выдачу</span>
</label>
</p>
<p>
<label>
  <input class="${CLASSES.ANNOYING_LIMIT}" type="number" value="7">
  <span>Количество ошибок, после которых слово будет считаться надоедливым</span>
</label>
</p>
<div class="input-field col s12">
  <select class="${CLASSES.ANNOYING_ACTION}">
    <option class="${CLASSES.ACTION_COMPLICATED}" value="0" selected>Отправить в Сложные</option>
    <option class="${CLASSES.ACTION_DELETE}" value="1">Отправить в Удаленные</option>
  </select>
  <label>Действие с надоедливыми картами</label>
</div>
`;

export const SETTINGS_HTML = `
<section class="${CLASSES.COMPONENT}">

  <form action="#" class="center-align">
    <h3>Настройки приложения</h3>
    <div class="row">
      <div class="col s12">
        <ul class="${CLASSES.TABS} tabs">
          <li class="tab col s6"><a class="active" href="#main-settings">Основные</a></li>
          <li class="tab col s6"><a href="#interval-settings">Интервальные повторения</a></li>
        </ul>
      </div>
      <div id="main-settings" class="col offset-s2 s8 left-align">
        ${MAIN_SETTINGS}
      </div>
      <div id="interval-settings" class="col offset-s2 s8 left-align">
        ${INTERVAL_SETTINGS}
      </div>
    </div>
    <button class="${CLASSES.BUTTON_SAVE} waves-effect waves-light btn">Сохранить</button>
  </form>
</section>`;
