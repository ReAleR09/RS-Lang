import Materialize from 'materialize-css';

const NAME_REPLACE = '#NAME#';

const WORD_STATUS_ELEM_CLASS = 'word-status-button';

const PROGRESS_BAR_CLASS = 'word-status-progress';

const PROGRESS_BAR_STATUS_CLASS = `${PROGRESS_BAR_CLASS}__status`;

const CLASS_MODAL_INTERVAL_REPEAT = 'modal-interval-repeat';

export const HTML_MODAL = `
<div id="modal1" class="${CLASS_MODAL_INTERVAL_REPEAT} modal ${NAME_REPLACE}">
  <div class="modal-content">
    <h4 class="modal-title">Методика интервального повторения</h4>
    <p>Методика интервального повторения предусматривает повторение слов с периодичностью,
      расчитываемой с учетом сложности слова, правильного или ошибочного ответа при повторении.
      Вот такими категориями мы рассуждали:
    </p>
    <div class="row valign-wrapper">
      <div class="col s3">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 0%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>Новое слово</p>
      </div>
      </div><div class="row valign-wrapper">
      <div class="col s3 valign-wrapper">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 20%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>Это слово начинаем запоминать</p>
      </div>
      </div><div class="row valign-wrapper">
      <div class="col s3 valign-wrapper">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 40%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>В процессе запоминания</p>
      </div>
      </div><div class="row valign-wrapper">
      <div class="col s3 valign-wrapper">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 60%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>Слово вертится на языке</p>
      </div>
      </div><div class="row valign-wrapper">
      <div class="col s3 valign-wrapper">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 80%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>Прекрасная память!</p>
      </div>
      </div><div class="row valign-wrapper">
      <div class="col s3 valign-wrapper">
        <div class="${PROGRESS_BAR_CLASS} progress">
          <div class="${PROGRESS_BAR_STATUS_CLASS} determinate" style="width: 100%"></div>
        </div>
      </div>
      <div class="col s9 valign-wrapper">
        <p>Такое слово уже не стоит вам давать. Легкотня.</p>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
  </div>
</div>`;

export const HTML_STATUS = `
<div class="${WORD_STATUS_ELEM_CLASS} word-status-progress progress ${NAME_REPLACE}">
  <div class="${PROGRESS_BAR_STATUS_CLASS} determinate"></div>
</div>
`;

const QUERY_MODAL_INTERVAL = `.${CLASS_MODAL_INTERVAL_REPEAT}`;
const QUERY_BUTTONS_MODAL_OPEN = `.${WORD_STATUS_ELEM_CLASS}`;
const QUERY_BUTTONS_MODAL_CLOSE = `${QUERY_MODAL_INTERVAL} .modal-close`;

export default class WordStatuses {
  constructor(element) {
    this.buttonModalOpenInstances = [];
    this.buttonModalCloseInstances = [];
    this.modal = undefined;
    this.element = element;
  }

  attach() {
    const elem = document.querySelector(QUERY_MODAL_INTERVAL);
    this.modal = Materialize.Modal.init(elem);
  }

  initButtons() {
    this.buttonModalOpenInstances = Array.from(
      this.element.querySelectorAll(QUERY_BUTTONS_MODAL_OPEN),
    );
    this.buttonModalOpenInstances.forEach((button) => {
      button.addEventListener('click', () => {
        this.modal.open();
      });
    });

    this.buttonModalCloseInstances = Array.from(
      this.element.querySelectorAll(QUERY_BUTTONS_MODAL_CLOSE),
    );
    this.buttonModalCloseInstances.forEach((button) => {
      button.addEventListener('click', () => {
        this.modal.close();
      });
    });
  }

  detach() {
    this.modal.destroy();
  }

  static getHtmlModal(nameClass = '') {
    const html = HTML_MODAL.replace(NAME_REPLACE, nameClass);
    return html;
  }

  static getHtmlStatus(nameClass = '') {
    const html = HTML_STATUS.replace(NAME_REPLACE, nameClass);
    return html;
  }

  createModalElement(nameClass = '') {
    const html = WordStatuses.getHtmlModal(nameClass);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.element.append(wrapper);
  }

  // eslint-disable-next-line class-methods-use-this
  createStatusElement(parent, nameClass = '', statusPercents = 0) {
    const html = WordStatuses.getHtmlStatus(nameClass);
    const parentElement = parent;
    parentElement.innerHTML = html;

    const progressBarStatus = parentElement.querySelector(`.${PROGRESS_BAR_CLASS} .${PROGRESS_BAR_STATUS_CLASS}`);
    progressBarStatus.setAttribute('style', `width: ${statusPercents}%;`);
    const statusElement = parentElement.querySelector(`.${PROGRESS_BAR_CLASS}`);
    return statusElement;
  }

  setStatusByQuery(query, statusPercents = 0) {
    const statusEl = this.element.querySelector(query);
    const progressBar = statusEl.querySelector(`.${PROGRESS_BAR_STATUS_CLASS}`);
    progressBar.setAttribute('style', `width: ${statusPercents}%;`);
  }

  // eslint-disable-next-line class-methods-use-this
  setStatusByElement(wordStatusElement, statusPercents = 0) {
    const progressBar = wordStatusElement.querySelector(`.${PROGRESS_BAR_STATUS_CLASS}`);
    progressBar.setAttribute('style', `width: ${statusPercents}%;`);
  }
}
