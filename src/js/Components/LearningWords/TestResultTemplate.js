import { CLASS_COMPONENT } from './IndexTemplate';

const CLASS_DIFFICULTY = 'difficulty';

export const QUERY_DIFFICULTY = `.${CLASS_COMPONENT} .${CLASS_DIFFICULTY}`;

export const TEST_RESULT_HTML = `
<div class="${CLASS_COMPONENT} center-align">
<div class="test-result">
<h1>Тестирование окончено!</h1>
<h3>Ваш новый уровень сложности: <span class="${CLASS_DIFFICULTY}"></span></h3>
</div>
</div>`;
