import StatisticsApi from './Api/StatisticsApi';
import { GAMES, MODES } from '../../config';
import SpacedRepititions from './SpacedRepititions';
import { GAME_RESULTS_KEY, WORDS_LEARNING_RESULTS_KEY } from './Api/constants';
import WordsApi from './Api/WordsApi';
import Utils from '../Utils/Utils';

export default class Statistics {
  constructor(game = GAMES.LEARNING, mode = MODES.REPITITION, wordsSendAtEnd = false) {
    this.statisticsApi = new StatisticsApi();
    this.wordsApi = new WordsApi();
    this.statistics = {};
    this.spacedRepititions = new SpacedRepititions();
    this.game = game;
    this.mode = mode;
    this.wordsSendAtEnd = wordsSendAtEnd;
    this.wordStat = [];
    this.results = {
      success: 0,
      errors: 0,
      bestResult: 0,
      currentResult: 0,
    };
    this.isLoaded = false;
  }

  async updateRepititionsStatistics(wordId, isNewWordStatus) {
    if (this.game !== GAMES.LEARNING) return;
    if (!this.isLoaded) {
      await this.get();
    }

    let isNewWord;
    if (isNewWordStatus !== undefined) {
      isNewWord = isNewWordStatus;
    } else {
      isNewWord = await this.wordsApi.checkUserWordInBase(wordId);
    }

    const dateNow = Utils.getDateNoTime().getTime();
    if (!Object.prototype.hasOwnProperty.call(
      this.statistics[WORDS_LEARNING_RESULTS_KEY],
      dateNow,
    )) {
      this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow] = {
        totalWordsCount: 0,
        newWordsCount: 0,
      };
    }
    this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].totalWordsCount += 1;

    if (isNewWord) {
      this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].newWordsCount += 1;
    }
    if (this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].results) {
      const statResults = this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].results;

      statResults.errors += this.results.errors;
      statResults.success += this.results.success;
      if (statResults.bestResult < this.results.bestResult) {
        statResults.bestResult.bestResult = this.results.bestResult;
      }
      statResults.currentResult = this.results.currentResult;
    } else {
      this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].results = { ...this.results };
    }
    await this.statisticsApi.update(this.statistics);
  }

  async updateWordStatistics(wordId, result = true, isNewWord) {
    if (!this.isLoaded) {
      await this.get();
    }
    if (result) {
      this.results.success += 1;
      this.results.currentResult += 1;
      if (this.results.currentResult > this.results.bestResult) {
        this.results.bestResult = this.results.currentResult;
      }
    } else {
      this.results.errors += 1;
      this.results.currentResult = 0;
    }

    if (this.mode === MODES.REPITITION && !(this.wordsSendAtEnd)) {
      await this.updateRepititionsStatistics(wordId, isNewWord);
      await this.spacedRepititions.putTrainingData(wordId, result);
    }
    this.wordStat.push({ wordId, result });
  }

  async getLearningStatistics(date) {
    if (!this.isLoaded) {
      await this.get();
    }
    const requestDate = Utils.getDateNoTime(date).getTime();
    if (this.statistics[WORDS_LEARNING_RESULTS_KEY][requestDate]) {
      return this.statistics[WORDS_LEARNING_RESULTS_KEY][requestDate];
    }
    return {
      totalWordsCount: 0,
      newWordsCount: 0,
    };
  }

  // difficulty is optional
  async getUserWordsCount(difficultyGroup) {
    const result = await this.wordsApi.getUserWordsCount(difficultyGroup);
    return result;
  }

  async getLearningFullStatistics() {
    if (!this.isLoaded) {
      await this.get();
    }
    const statArray = Object.entries(this.statistics[WORDS_LEARNING_RESULTS_KEY])
      .sort((a, b) => a[0] < b[0]);
    const fullStatistics = statArray.map(([date, dayResult]) => ({ date, ...dayResult }));
    return fullStatistics;
  }

  async getLastGameResult() {
    if (!this.isLoaded) {
      await this.get();
    }
    const gameResults = this.statistics[GAME_RESULTS_KEY][this.game];

    return gameResults[gameResults.length - 1];
  }

  async sendGameResults() {
    if (!this.isLoaded) {
      await this.get();
    }

    const dateNow = new Date().getTime();
    const gameResult = { date: dateNow, ...this.results };

    if (!Object.prototype.hasOwnProperty.call(this.statistics[GAME_RESULTS_KEY], this.game)) {
      this.statistics[GAME_RESULTS_KEY][this.game] = [];
    }
    this.statistics[GAME_RESULTS_KEY][this.game].push(gameResult);

    const report = await this.statisticsApi.update(this.statistics);

    if (this.wordsSendAtEnd && this.mode === MODES.REPITITION) {
      let words = this.wordStat.map(({ wordId }) => wordId);
      const bestResults = [];
      words = Array.from(new Set(words));
      words.forEach((word) => {
        const results = this.wordStat.filter(({ wordId }) => wordId === word);
        const bestResult = (results.find((result) => result) !== -1);
        bestResults.push({ word, bestResult });
      });

      const requestStatArrays = [];
      const requestRepitArrays = [];
      this.bestResults.forEach(({ wordId, result }) => {
        requestStatArrays.push(this.updateRepititionsStatistics(wordId));
        requestRepitArrays.push(this.spacedRepititions.putTrainingData(wordId, result));
      });

      await Promise.all(requestStatArrays);
      await Promise.all(requestRepitArrays);
    }

    return report;
  }

  async get() {
    this.statistics = await this.statisticsApi.get();
    if (this.statistics.error) {
      this.statistics = {
        [WORDS_LEARNING_RESULTS_KEY]: {},
      };
    }
    if (!Object.prototype.hasOwnProperty.call(this.statistics, GAME_RESULTS_KEY)) {
      this.statistics[GAME_RESULTS_KEY] = {};
      Object.values(GAMES).forEach((game) => {
        this.statistics[GAME_RESULTS_KEY][game] = [];
      });
    }
    if (!Object.prototype.hasOwnProperty.call(this.statistics, WORDS_LEARNING_RESULTS_KEY)) {
      this.statistics[WORDS_LEARNING_RESULTS_KEY] = {};
    }
    this.isLoaded = true;
  }

  // if byDates === true result is divided by dates [[result, result],[...],[...]]
  // Фиг его знает зачем такая опция. Иначе просто массив результатов
  async getGameResults(byDates = false, game) {
    if (!this.isLoaded) {
      await this.get();
    }

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
      newResult.date = Utils.getDateNoTime(gameResult.date);
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

  async getLimits() {
    if (!this.isLoaded) {
      await this.get();
    }
    const dateNow = Utils.getDateNoTime().getTime();
    let limits = {};

    try {
      limits = {
        totalWordsCount: this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].totalWordsCount,
        newWordsCount: this.statistics[WORDS_LEARNING_RESULTS_KEY][dateNow].newWordsCount,
      };
    } catch (error) {
      limits = {
        totalWordsCount: 0,
        newWordsCount: 0,
      };
    }

    return limits;
  }
}
