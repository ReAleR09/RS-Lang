import Api from './Api';
import { TEAM_KEY, TEAM_VALUE } from '../../../config';
import { GAME_RESULTS_KEY, WORDS_LEARNING_RESULTS_KEY } from './constants';

export default class StatisticsApi {
  constructor() {
    this.api = new Api();
  }

  async init() {
    const result = await this.update();
    return result;
  }

  async update(statistics = {
  }) {
    const shortStats = StatisticsApi.packStatistics(statistics);
    const statisticsStructure = {
      learnedWords: 0,
      optional: shortStats,
    };

    statisticsStructure.optional[TEAM_KEY] = TEAM_VALUE;

    const result = await this.api.putUserStatistics(statisticsStructure);
    return result;
  }

  async checkValidity() {
    const statistics = await this.get();
    let result = Object.prototype.hasOwnProperty.call(statistics, TEAM_KEY);
    result = result && (statistics[TEAM_KEY] === TEAM_VALUE);

    return result;
  }

  async get() {
    const statisticsApiObject = await this.api.getUserStatistics();
    if (statisticsApiObject.error) return statisticsApiObject;

    const statistics = StatisticsApi.unpackStatistics(statisticsApiObject.optional);

    return statistics;
  }

  static shortLearningResults(dayResult) {
    const shortResult = {
      nwc: dayResult.newWordsCount,
      twc: dayResult.totalWordsCount,
    };
    if (Object.prototype.hasOwnProperty.call(dayResult, 'results')) {
      shortResult.r = {
        br: dayResult.results.bestResult,
        cr: dayResult.results.currentResult,
        e: dayResult.results.errors,
        s: dayResult.results.success,
      };
    }
    return shortResult;
  }

  static unshortLearningResults(shortResult) {
    if (Object.prototype.hasOwnProperty.call(shortResult, 'totalWordsCount')) {
      return shortResult;
    }
    const dayResult = {
      newWordsCount: shortResult.nwc,
      totalWordsCount: shortResult.twc,
    };
    if (Object.prototype.hasOwnProperty.call(shortResult, 'r')) {
      dayResult.results = {
        bestResult: shortResult.r.br,
        currentResult: shortResult.r.cr,
        errors: shortResult.r.e,
        success: shortResult.r.s,
      };
    }

    return dayResult;
  }

  static shortGameResults(gameResult) {
    const shortGameResult = {
      br: gameResult.bestResult,
      cr: gameResult.currentResult,
      d: gameResult.date,
      e: gameResult.errors,
    };
    return shortGameResult;
  }

  static unshortGameResults(shortGameResult) {
    if (Object.prototype.hasOwnProperty.call(shortGameResult, 'date')) {
      return shortGameResult;
    }
    const gameResult = {
      bestResult: shortGameResult.br,
      currentResult: shortGameResult.cr,
      date: shortGameResult.d,
      errors: shortGameResult.e,
    };
    return gameResult;
  }

  static packStatistics(statisticsObject) {
    const newStatistics = { ...statisticsObject };

    newStatistics[WORDS_LEARNING_RESULTS_KEY] = {};
    Object.entries(statisticsObject[WORDS_LEARNING_RESULTS_KEY]).forEach(([key, dayResult]) => {
      newStatistics[WORDS_LEARNING_RESULTS_KEY][key] = StatisticsApi
        .shortLearningResults(dayResult);
    });

    Object.entries(statisticsObject[GAME_RESULTS_KEY])
      .forEach(([game, arrayOfResults]) => {
        newStatistics[GAME_RESULTS_KEY][game] = arrayOfResults.map((gameResult) => {
          const shortResult = StatisticsApi.shortGameResults(gameResult);
          return shortResult;
        });
      });
    return newStatistics;
  }

  static unpackStatistics(statisticsObject) {
    const newStatistics = { ...statisticsObject };

    newStatistics[WORDS_LEARNING_RESULTS_KEY] = {};
    Object.entries(statisticsObject[WORDS_LEARNING_RESULTS_KEY]).forEach(([key, dayResult]) => {
      newStatistics[WORDS_LEARNING_RESULTS_KEY][key] = StatisticsApi
        .unshortLearningResults(dayResult);
    });

    Object.entries(statisticsObject[GAME_RESULTS_KEY])
      .forEach(([game, arrayOfResults]) => {
        newStatistics[GAME_RESULTS_KEY][game] = arrayOfResults.map((gameResult) => {
          const shortResult = StatisticsApi.unshortGameResults(gameResult);
          return shortResult;
        });
      });
    return newStatistics;
  }
}
