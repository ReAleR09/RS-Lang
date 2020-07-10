const progressContainerClass = 'day-progress';
const newWordsProgressClass = 'new-words-progress';
const allWordsProgressClass = 'all-words-progress';
const queries = {
  progressBar: `.${progressContainerClass}`,
  newWordsProgress: `.${progressContainerClass} .${newWordsProgressClass}`,
  allWordsProgress: `.${progressContainerClass} .${allWordsProgressClass}`,
};

const barHideClass = 'hidden';

class ProgressBar {
  constructor() {
    this.firstInit();
  }

  firstInit() {
    this.dayResults = {
      totalWordsCount: 0,
      newWordsCount: 0,
    };
    this.dayLimits = {
      maxCount: 50,
      maxCountNewCards: 15,
    };
  }

  init(dayResults, dayLimits) {
    this.dayResults = { ...dayResults };
    this.dayLimits = { ...dayLimits };

    this.updateProgressBar();
  }

  update(dayResults) {
    this.dayResults = { ...dayResults };
    this.updateProgressBar();
  }

  addCard(isNewWord = false) {
    this.dayResults.totalWordsCount += 1;
    if (isNewWord) {
      this.dayResults.newWordsCount += 1;
    }
    this.updateProgressBar();
  }

  updateProgressBar() {
    const newWordsProgress = document.querySelector(queries.newWordsProgress);
    const allWordsProgress = document.querySelector(queries.allWordsProgress);

    newWordsProgress.setAttribute('style', `width: ${this.newWordsPercents}%`);
    allWordsProgress.setAttribute('style', `width: ${this.allWordsPercents}%`);

    const progressBar = document.querySelector(queries.progressBar);
    progressBar.classList.remove(barHideClass);
  }

  clearProgressBar() {
    const progressBar = document.querySelector(queries.progressBar);
    progressBar.classList.add(barHideClass);
    this.firstInit();
  }

  get newWordsPercents() {
    const result = Math.round(
      (this.dayResults.newWordsCount / this.dayLimits.maxCountNewCards) * 100,
    );
    return result;
  }

  get allWordsPercents() {
    const result = Math.round((this.dayResults.totalWordsCount / this.dayLimits.maxCount) * 100);
    return result;
  }
}

const ProgressBarInstance = new ProgressBar();

export default ProgressBarInstance;
