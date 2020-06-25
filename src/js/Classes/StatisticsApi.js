import Api from './Api';
import { TEAM_KEY, TEAM_VALUE } from '../../config';

export default class SettingsApi {
  constructor() {
    this.api = new Api();
  }

  updateUserData(userData) {
    this.api.updateUserData(userData);
  }

  async init() {
    const result = await this.update();
    return result;
  }

  async update(statistics = {
  }) {
    const statisticsStructure = {
      learnedWords: 0,
      optional: statistics,
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
    const statistics = statisticsApiObject.optional;
    return statistics;
  }
}
