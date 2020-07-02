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
    };
  }

  async updateRepititionsStatistics(wordId, isNewWordStatus) {
    if (this.game !== GAMES.LEARNING) return;
    await this.get();

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

    await this.statisticsApi.update(this.statistics);
  }

  async updateWordStatistics(wordId, result = true, isNewWord) {
    if (result) {
      this.results.success += 1;
      this.results.bestResult += 1;
    } else {
      this.results.errors += 1;
      this.results.bestResult = 0;
    }

    if (this.mode === MODES.REPITITION && !(this.wordsSendAtEnd)) {
      await this.updateRepititionsStatistics(wordId, isNewWord);
      await this.spacedRepititions.putTrainingData(wordId, result);
    }
    this.wordStat.push({ wordId, result });
    await this.get();
  }

  async sendGameResults() {
    await this.get();
    const dateNow = new Date();
    const gameResult = { date: dateNow, ...this.results };

    if (!Object.prototype.hasOwnProperty.call(this.statistics, this.game)) {
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

  get limits() {
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
