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
  SUGGESTION: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} blockquote`,
};

export const HTML_RESULT = `
  <div class="${CLASS_COMPONENT} blue-gray center-align">
    <div class="${CLASSES.RESULTS}">
    <h1>Результаты дня:</h1>
    <p>Количество пройденных карточек: <span class="${CLASSES.TOTAL_COUNT}"></span></p>
    <p>Количество новых слов: <span class="${CLASSES.NEWWORDS_COUNT}"></span></p>
    <p>Количество Количество ошибок: <span class="${CLASSES.ERRORS_COUNT}"></span></p>
    <p>Самая длинная серия правильных ответов: <span class="${CLASSES.BEST_RESULT}"></span></p>
    <blockquote class="d-none">Если у вас есть уверенность, что Вы можете продолжить изучение слов, то в любой момент можете поменять ежедневные лимиты в настройках и продолжить обучение.</blockquote>
    </div>
  </div>`;
