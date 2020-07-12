import { MODES } from '../../../config';
import { CLASS_COMPONENT } from './IndexTemplate';

const CLASSES = {
  RESULTS: 'results',
  TOTAL_COUNT: 'total-count',
  NEWWORDS_COUNT: 'new-words-count',
  ERRORS_COUNT: 'errors-count',
  BEST_RESULT: 'best-result',
  COMPLICATED_ALL: 'complicated-all',
  COMPLICATED_ERRORS: 'complicated-errors',
  COMPLICATED_BEST: 'complicated-best',
};

export const RESULTS_QUERIES = {
  COMPONENT: `.${CLASS_COMPONENT}`,
  REPITITION: `.${CLASS_COMPONENT} .${MODES.REPITITION}`,
  COMPLICATED: `.${CLASS_COMPONENT} .${MODES.COMPLICATED}`,
  TOTAL_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.TOTAL_COUNT}`,
  NEWWORDS_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.NEWWORDS_COUNT}`,
  ERRORS_COUNT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.ERRORS_COUNT}`,
  BEST_RESULT: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} .${CLASSES.BEST_RESULT}`,
  SUGGESTION: `.${CLASS_COMPONENT} .${CLASSES.RESULTS} blockquote`,
  COMPLICATED_ALL: `.${CLASS_COMPONENT} .${CLASSES.COMPLICATED_ALL}`,
  COMPLICATED_ERRORS: `.${CLASS_COMPONENT} .${CLASSES.COMPLICATED_ERRORS}`,
  COMPLICATED_BEST: `.${CLASS_COMPONENT} .${CLASSES.COMPLICATED_BEST}`,
};

export const HTML_RESULT = `
  <div class="${CLASS_COMPONENT} blue-gray center-align">
    <div class="${CLASSES.RESULTS}">
    <div class="${MODES.REPITITION}">
      <h3>Результаты дня:</h3>
      <p>Количество пройденных карточек: <span class="${CLASSES.TOTAL_COUNT}"></span></p>
      <p>Количество новых слов: <span class="${CLASSES.NEWWORDS_COUNT}"></span></p>
      <p>Количество Количество ошибок: <span class="${CLASSES.ERRORS_COUNT}"></span></p>
      <p>Самая длинная серия правильных ответов: <span class="${CLASSES.BEST_RESULT}"></span></p>
    </div>
    <div class="${MODES.COMPLICATED}">
      <h3>Результаты серии:</h3>
      <p>Количество пройденных карточек: <span class="${CLASSES.COMPLICATED_ALL}"></span></p>
      <p>Количество Количество ошибок: <span class="${CLASSES.COMPLICATED_ERRORS}"></span></p>
      <p>Самая длинная серия правильных ответов: <span class="${CLASSES.COMPLICATED_BEST}"></span></p>
    </div>
    <blockquote class="d-none">Если у вас есть уверенность, что Вы можете продолжить изучение слов, то в любой момент можете поменять ежедневные лимиты в настройках и продолжить обучение.</blockquote>
    </div>
  </div>`;
