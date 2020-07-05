import WordsApi from './Api/WordsApi';
import { MILLIS_PER_MINUTE, MILLIS_PER_DAY, DIFFICULTIES } from './Api/constants';
import Dictionary from './Dictionary';

const SETTINGS = {
  firstIntervalMinutes: 5,
  baseIntervalDays: 1,
  baseMultiplierPercents: 150,
  hardMultiplierPercents: 80,
  simpleMultiplierPercents: 120,
  maxIntervalDays: 250,
};

export default class SpacedRepititions {
  constructor() {
    this.wordsApi = new WordsApi();
    this.dictionary = new Dictionary();
    this.settings = SETTINGS;
  }

  getMultiplier(difficulty) {
    let multiplier = (this.settings.baseMultiplierPercents / 100);

    if (difficulty === DIFFICULTIES.HARD) {
      multiplier = this.settings.hardMultiplierPercents / 100;
    }
    if (difficulty === DIFFICULTIES.SIMPLE) {
      multiplier = this.settings.simpleMultiplierPercents / 100;
    }

    multiplier = Math.max(1, multiplier);
    return multiplier;
  }

  calculateInterval(lastInterval, multiplier) {
    let newInterval = 0;

    if (lastInterval < this.settings.baseIntervalDays * MILLIS_PER_DAY) {
      newInterval = this.settings.baseIntervalDays * MILLIS_PER_DAY;
    } else {
      newInterval = lastInterval * multiplier;
    }

    return newInterval;
  }

  getStep(userWordData) {
    let steps = 1;
    let stepInterval = this.settings.baseIntervalDays;
    while (stepInterval < userWordData.interval) {
      steps += 1;
      stepInterval *= this.getMultiplier(userWordData.difficulty);
    }
    return steps;
  }

  /**
   * return word learning status in percents
   * @param {*} wordId
   */
  async getTrainingStatus(wordId) {
    let status = 0;
    if (!this.wordsApi.checkUserWordInBase(wordId)) return status;

    const userWordData = await this.wordsApi.getWordDataById(wordId);
    const totalSteps = this.getStep(this.settings.maxIntervalDays);

    const curStep = this.getStep(userWordData);

    status = Math.round((curStep / totalSteps) * 100);

    return status;
  }

  async putTrainingData(wordId, result) {
    let userWordData;
    const DateNow = Date.now();

    let isFirstStep = await this.wordsApi.checkUserWordInBase(wordId);
    isFirstStep = !isFirstStep;

    if (isFirstStep) {
      await this.wordsApi.changeWordDataById(wordId);
      userWordData = await this.wordsApi.getWordDataById(wordId);
    } else {
      userWordData = await this.wordsApi.getWordDataById(wordId);
      isFirstStep = (userWordData.nextDate === 0);
    }

    if (userWordData.errors >= this.settings.annoyingLimit) {
      await this.dictionary.putOnCategory(wordId, this.settings.annoyingAction);
    }

    if (isFirstStep) {
      userWordData.interval = this.settings.firstIntervalMinutes * MILLIS_PER_MINUTE;
    } else {
      let multiplier = this.getMultiplier(userWordData.difficulty);
      if (!result) multiplier = 1 / multiplier;
      userWordData.interval = this.calculateInterval(userWordData.interval, multiplier);
    }

    userWordData.lastDate = DateNow;
    userWordData.nextDate = DateNow + userWordData.interval;
    if (result) {
      userWordData.success += 1;
      userWordData.curSuccessConsistency += 1;

      if (userWordData.curSuccessConsistency > userWordData.bestResult) {
        userWordData.bestResult = userWordData.curSuccessConsistency;
      }
    } else {
      userWordData.errors += 1;
      userWordData.curSuccessConsistency = 0;
      userWordData.nextDate = DateNow + this.settings.firstIntervalMinutes * MILLIS_PER_MINUTE;
    }
    const report = await this.wordsApi.changeWordDataById(wordId, userWordData);
    return report;
  }
}
