import StatisticsApi from './StatisticsApi';
import { MODES } from '../../config';
import SpacedRepititions from './SpacedRepititions';
import { GAME_RESULTS_KEY } from './Api/constants';

export default class Statistics {
  constructor(mode = MODES.LEARNING) {
    this.statisticsApi = new StatisticsApi();
    this.statistics = {};
    this.spacedRepititions = new SpacedRepititions();
    this.mode = mode;
    this.results = {
      success: 0,
      errors: 0,
    };
  }

  async updateWordStatistics(wordId, result = true) {
    if (result) {
      this.results.success += 1;
    } else {
      this.results.errors += 1;
    }
    await this.spacedRepititions.putTrainingData(wordId, result);
  }

  async sendGameResults() {
    await this.get();
    const dateNow = new Date();
    const gameResult = { date: dateNow, ...this.results };

    if (!Object.prototype.hasOwnProperty.call(this.statistics, this.mode)) {
      this.statistics[GAME_RESULTS_KEY][this.mode] = [];
    }
    this.statistics[GAME_RESULTS_KEY][this.mode].push(gameResult);

    const report = await this.statisticsApi.update(this.statistics);
    return report;
  }

  async get() {
    this.statistics = await this.statisticsApi.get();
    if (this.statistics.error) {
      this.statistics = {};
    }
    if (!Object.prototype.hasOwnProperty.call(this.statistics, GAME_RESULTS_KEY)) {
      this.statistics[GAME_RESULTS_KEY] = {};
      Object.values(MODES).forEach((mode) => {
        this.statistics[GAME_RESULTS_KEY][mode] = [];
      });
    }
  }

  async getGameResults(byDates = false, game) {
    await this.get();
    let results = [];
    if (game) {
      results = this.statistics[game];
    } else {
      Object.values(this.statistics[GAME_RESULTS_KEY]).forEach((gameResults) => {
        results = results.concat(gameResults);
      });
    }
    results = results.map((item) => {
      const newItem = item;
      newItem.percents = Math.round((item.success / (item.success + item.errors)) * 100);
      return newItem;
    });

    results.sort((a, b) => a.date - b.date);
    results = results.map((gameResult) => {
      const newResult = gameResult;
      const { date } = newResult;
      newResult.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return newResult;
    });

    if (byDates) {
      const statResults = results;
      let dates = results.map((value) => value.date);
      dates = Array.from(new Set(dates));
      results = dates.map((date) => statResults.filter((value) => value.date === date));
    }

    return results;
  }
}
