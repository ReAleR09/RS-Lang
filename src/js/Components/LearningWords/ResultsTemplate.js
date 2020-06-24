import { CLASS_COMPONENT } from './IndexTemplate';

const CLASSES = {
  RESULTS: 'results',
  TOTAL_COUNT: 'total-count',
  NEWWORDS_COUNT: 'new-words-count',
  ERRORS_COUNT: 'errors-count',
  BEST_RESULT: 'best-result',
};

export const RESULTS_QUERIES = {
  COMPONENT: `.${CLASS_COMPONENT}`,
  TOTAL_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.TOTAL_COUNT}`,
  NEWWORDS_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.NEWWORDS_COUNT}`,
  ERRORS_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.ERRORS_COUNT}`,
  BEST_RESULT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.BEST_RESULT}`,
};

export const HTML_RESULT = `
  <div class="${CLASS_COMPONENT} blue-gray center-align">
    <div class="${CLASSES.RESULTS}">
    <h1>Результаты дня:</h1>
    <p>Количество пройденных карточек:</p>
    <p class="${CLASSES.TOTAL_COUNT}"></p>
    <p>Количество новых слов:</p>
    <p class="${CLASSES.NEWWORDS_COUNT}"></p>
    <p>Количество Количество ошибок:</p>
    <p class="${CLASSES.ERRORS_COUNT}"></p>
    <p>Самая длинная серия правильных ответов:</p>
    <p class="${CLASSES.BEST_RESULT}"></p>
    </div>
  </div>`;
