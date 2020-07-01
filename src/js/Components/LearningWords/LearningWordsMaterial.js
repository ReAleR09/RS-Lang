import Materialize from 'materialize-css';
import { INDEX_QUERIES as QUERIES } from './IndexTemplate';

export default class LearningWordsMaterial {
  constructor(element) {
    this.element = element;

    this.modals = {
      intervalRepeat: this.element.querySelector(QUERIES.MODALS.INTERVAL_REPEAT),
      wordRate: this.element.querySelector(QUERIES.MODALS.WORD_RATE),
    };
    this.init();
  }

  init() {
    let elems = this.element.querySelectorAll('.tooltipped');
    Materialize.Tooltip.init(elems);

    elems = this.element.querySelectorAll('.fixed-action-btn');
    Materialize.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
      toolbarEnabled: false,
    });

    elems = this.element.querySelectorAll('.collapsible');
    Materialize.Collapsible.init(elems);

    elems = this.element.querySelectorAll('.modal');
    Materialize.Modal.init(elems);

    this.assignButtonListeners();
  }

  assignButtonListeners() {
    const buttonDelete = this.element.querySelector(QUERIES.BUTTONS.DELETE);
    const buttonComplicated = this.element.querySelector(QUERIES.BUTTONS.COMPLICATED);

    buttonDelete.addEventListener('click', () => {
      Materialize.toast({
        html: '<p>Новое слово добавлено в Словарь/Удаленные</p>',
        displayLength: 1000,
      });
    });
    buttonComplicated.addEventListener('click', () => {
      Materialize.toast({
        html: '<p>Новое слово добавлено в Словарь/Сложные</p>',
        displayLength: 1000,
      });
    });

    const wordStatus = this.element.querySelector(QUERIES.BUTTONS.WORDSTATUS);

    wordStatus.addEventListener('click', () => {
      const modalInstance = Materialize.Modal.getInstance(this.modals.intervalRepeat);
      modalInstance.open();
    });

    this.assignModalFormButtonListeners();
  }

  assignModalFormButtonListeners() {
    const buttonModalIntervalClose = this.modals.intervalRepeat
      .querySelector(QUERIES.BUTTONS.MODAL_CLOSE);
    const buttonModalWordRateClose = this.modals.wordRate
      .querySelector(QUERIES.BUTTONS.MODAL_CLOSE);

    buttonModalIntervalClose.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.intervalRepeat);
    });

    buttonModalWordRateClose.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.wordRate);
    });

    const buttonAgain = this.element.querySelector(QUERIES.BUTTONS.AGAIN);
    const buttonHard = this.element.querySelector(QUERIES.BUTTONS.HARD);
    const buttonNormal = this.element.querySelector(QUERIES.BUTTONS.NORMAL);
    const buttonEasy = this.element.querySelector(QUERIES.BUTTONS.EASY);

    buttonAgain.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.wordRate);
    });
    buttonHard.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.wordRate);
    });
    buttonNormal.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.wordRate);
    });
    buttonEasy.addEventListener('click', () => {
      LearningWordsMaterial.closeModal(this.modals.wordRate);
    });
  }

  static showModal(modalElement) {
    const modalInstance = Materialize.Modal.getInstance(modalElement);
    modalInstance.open();
  }

  static closeModal(modalElement) {
    const modalInstance = Materialize.Modal.getInstance(modalElement);
    modalInstance.close();
  }
}
