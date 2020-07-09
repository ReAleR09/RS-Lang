// import Chart from 'chart.js';
import StatisticsApi from '../../Classes/Api/StatisticsApi';
import { GAMES } from '../../../config';
import { getGameHistoryView } from './Templates';

export default class StatisticsPageManager {
  constructor(element) {
    this.statsApi = new StatisticsApi();
    this.element = element;
  }

  async drawStatistics() {
    let stats = await this.requestStatistics();
    if (stats === false) return;
    stats = StatisticsPageManager.mapStatistics(stats);
    this.drawMinigamesHistory(stats.games);
  }

  static mapStatistics(stats) {
    const mappedStats = {
      games: [],
      days: [],
    };

    const gamesNames = Object.values(GAMES);
    gamesNames.forEach((gameTitle) => {
      const gameStat = {
        gameKey: gameTitle,
        results: [],
      };

      const gameResults = stats.gameResults[gameTitle];
      if (gameResults && Array.isArray(gameResults) && gameResults.length > 0) {
        gameResults.forEach((result) => {
          const dateObj = new Date(result.date);
          if (!dateObj) return;
          const resultMapped = {
            date: `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`,
            success: result.success,
            errors: result.errors,
          };
          gameStat.results.push(resultMapped);
        });
      }

      mappedStats.games.push(gameStat);
    });

    if (stats.learningWordsByDays) {
      mappedStats.days = stats.learningWordsByDays;
    }

    return mappedStats;
  }

  drawMinigamesHistory(gamesStats) {
    gamesStats.forEach((gameStat) => {
      const viewElement = this.element.querySelector(`#${gameStat.gameKey}`);
      if (!viewElement) return;
      const innerHTML = getGameHistoryView(gameStat);
      viewElement.innerHTML = innerHTML;
    });
  }

  async requestStatistics() {
    const stats = await this.statsApi.get();
    if (stats.error) return false;
    return stats;
  }
}
