const componentName = 'settings';

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
};

// export const CLASS_BUTTON_SAVE = `.${CLASSES.COMPONENT} .${CLASSES.BUTTON_SAVE}`;

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
};

const MAIN_SETTINGS = `
<p>
<label>
    <input class="${CLASSES.DIFFICULTY}" type="number" value="20" style="width: 40px">
    <span>Новых карточек в день</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.NEW_CARDS}" type="number" value="20" style="width: 40px">
    <span>Новых карточек в день</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.CARDS_PER_DAY}" type="number" value="50" style="width: 40px">
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
    <input class="${CLASSES.FIRST_INTERVAL}" type="number" value="5" style="width: 40px">
    <span>Первый интервал между повторениями (в минутах)</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.BASE_INTERVAL}" type="number" value="20" style="width: 40px">
    <span>Базовый интервал между повторениями (в днях)</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.BASE_MULTIPLIER}" type="number" value="20" style="width: 40px">
    <span>Базовый множитель увеличения интервала (в процентах)</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.HARD_MULTIPLIER}" type="number" value="20" style="width: 40px">
    <span>Дополнительный множитель интервала для сложных слов (в процентах)</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.SIMPLE_MULTIPLIER}" type="number" value="20" style="width: 40px">
    <span>Дополнительный множитель интервала для легких слов (в процентах)</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.MAX_INTERVAL}" type="number" value="20" style="width: 40px">
    <span>Максимальный интервал, после которого слово перестанет добавляться в выдачу</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.ANNOYING_LIMIT}" type="number" value="20" style="width: 40px">
    <span>Количество ошибок, после которых слово будет считаться надоедливым</span>
</label>
</p>
<p>
<label>
    <input class="${CLASSES.ANNOYING_ACTION}" type="number" value="20" style="width: 40px">
    <span>Действие с надоедливыми картами</span>
</label>
</p>
`;

export const SETTINGS_HTML = `
    <section class="${CLASSES.COMPONENT}">

      <form action="#" class="center-align">
        <h2>Настройки приложения</h2>
        <div class="row">
          <div class="col s12">
            <ul class="${CLASSES.TABS} tabs">
              <li class="tab col offset-s2 s4"><a class="active" href="#main-settings">Основные</a></li>
              <li class="tab col s4"><a href="#interval-settings">Интервальные повторения</a></li>
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
