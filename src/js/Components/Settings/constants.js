const componentName = 'settings';

const CLASSES = {
  COMPONENT: componentName,
  NEW_CARDS: 'new_cards',
  CARDS_PER_DAY: 'cards_per_day',
  TRANSLATION: 'translation',
  TRANSLATION_MEANING: 'translation_meaning',
  EXAMPLE: 'word_use',
  TRANSCRIPTION: 'word_transcription',
  SHOW_IMAGE: 'word_picture',
  SHOW_BUTTON_ANSWER: 'show_answer',
  SHOW_BUTTON_DELETE: 'show_delete_button',
  SHOW_BUTTON_HARD: 'show_hard_button',
  SHOW_RATE: 'show_buttons',
  BUTTON_SAVE: 'settings_btn',
};

export const CLASS_BUTTON_SAVE = `.${CLASSES.COMPONENT} .${CLASSES.BUTTON_SAVE}`;

export const SETTINGS_QUERIES = {
  NEW_CARDS: `.${CLASSES.COMPONENT} .${CLASSES.NEW_CARDS}`,
  CARDS_PER_DAY: `.${CLASSES.COMPONENT} .${CLASSES.CARDS_PER_DAY}`,
  TRANSLATION: `.${CLASSES.COMPONENT} .${CLASSES.TRANSLATION}`,
  TRANSLATION_MEANING: `.${CLASSES.COMPONENT} .${CLASSES.TRANSLATION_MEANING}`,
  EXAMPLE: `.${CLASSES.COMPONENT} .${CLASSES.EXAMPLE}`,
  TRANSCRIPTION: `.${CLASSES.COMPONENT} .${CLASSES.TRANSCRIPTION}`,
  SHOW_IMAGE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_IMAGE}`,
  SHOW_BUTTON_ANSWER: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_ANSWER}`,
  SHOW_BUTTON_DELETE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_DELETE}`,
  SHOW_BUTTON_HARD: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_BUTTON_HARD}`,
  SHOW_RATE: `.${CLASSES.COMPONENT} .${CLASSES.SHOW_RATE}`,
};

export const SETTINGS_HTML = `
    <section class="${CLASSES.COMPONENT}">
        <h2>Настройки приложения</h2>
        <form action="#">
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
            <p>
            <label>
                <input class="${CLASSES.TRANSLATION}" type="checkbox">
                <span>Перевод слова</span>
            </label>
            </p>
            <p>
            <label>
                <input class="${CLASSES.TRANSLATION_MEANING}" type="checkbox">
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
            <button class="${CLASS_BUTTON_SAVE} waves-effect waves-light btn">Сохранить</button>
        </form>
    </section>`;
