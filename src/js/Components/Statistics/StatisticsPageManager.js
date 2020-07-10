import Chart from 'chart.js';
import StatisticsApi from '../../Classes/Api/StatisticsApi';
import { GAMES } from '../../../config';
import { getGameHistoryView } from './Templates';
import WordsApi from '../../Classes/Api/WordsApi';

import { getLearnChartData, skippedWords } from './LearnCurveData';

export default class StatisticsPageManager {
  constructor(element) {
    this.statsApi = new StatisticsApi();
    this.wordsApi = new WordsApi();
    this.element = element;
  }

  async drawStatistics() {
    let stats = await this.requestStatistics();
    if (stats === false) return;
    stats = StatisticsPageManager.mapStatistics(stats);
    this.drawMinigamesHistory(stats.games);
    this.fillByDaysChart(stats.days);
    this.fillTotalsChart(stats.totalWordsCount);
  }

  static mapStatistics(stats) {
    const mappedStats = {
      games: [],
      days: false,
      totalWordsCount: 0,
    };

    mappedStats.totalWordsCount = stats.totalWordsCount;

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
      const dates = [];
      const newWords = [];
      const oldWords = [];
      const learningWordsByDays = Object.entries(stats.learningWordsByDays);
      learningWordsByDays.forEach((entry) => {
        const [timestampStr, dayResults] = entry;
        const timestamp = Number.parseInt(timestampStr, 10);

        const dateObject = new Date(timestamp);
        const date = dateObject.toLocaleDateString();
        const newWordsForDay = dayResults.newWordsCount;
        const oldWordsPerDay = dayResults.totalWordsCount - newWordsForDay;
        dates.push(date);
        newWords.push(newWordsForDay);
        oldWords.push(oldWordsPerDay);
      });
      mappedStats.days = {
        dates,
        newWords,
        oldWords,
      };
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

  fillByDaysChart(days) {
    const byDaysCanvas = this.element.querySelector('#byDaysChart');
    // eslint-disable-next-line no-unused-vars
    const byDaysChart = new Chart(byDaysCanvas, {
      type: 'bar',
      data: {
        labels: days.dates,
        datasets: [
          {
            label: 'Кол-во новых слов',
            data: days.newWords,
            fill: true,
            borderWidth: 1,
            backgroundColor: 'green',
          },
          {
            label: 'Кол-во повторённых слов',
            data: days.oldWords,
            fill: true,
            borderWidth: 1,
            backgroundColor: 'yellow',
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              stacked: true,
            },
          ],
        },
      },
    });
  }

  fillTotalsChart(learningWordsCount) {
    // Всего изучаемых слов - пропущенные слова + изучаемые
    const totalWordsCount = skippedWords + learningWordsCount;

    const learningChartCanvas = this.element.querySelector('#learningCurveChart');
    const learnedWordsCountEl = this.element.querySelector('#learnedWordsCount');
    learnedWordsCountEl.innerHTML = learningWordsCount;

    const learnCurvePoints = getLearnChartData();

    // первые слова, которые по-уолчанию считаются выученными
    // и не фигуриру.т в нашем приложении
    const skippedCurvePoints = learnCurvePoints.filter(
      (point) => (point.x <= skippedWords),
    );

    // 400+ изучаемых слов
    const learnedCurvePoints = learnCurvePoints.filter(
      (point) => (point.x <= totalWordsCount),
    );

    // eslint-disable-next-line no-unused-vars
    const learnCurveChart = new Chart(learningChartCanvas, {
      type: 'scatter',
      data: {
        // labels: days.dates,
        datasets: [
          {
            label: 'Пропущенные 400 слов',
            data: skippedCurvePoints,
            // fill: false,
            backgroundColor: '#ebef01',
            borderColor: 'rgba(136,136,136,0.5)',
            pointBackgroundColor: 'rgba(46,204,112,0)',
            pointBorderColor: 'rgba(255,255,255,0.00)',
            borderWidth: 1,
            showLine: true,
          },
          {
            label: 'Изучаемые слова',
            data: learnedCurvePoints,
            // fill: false,
            backgroundColor: '#3498db',
            borderColor: 'rgba(136,136,136,0.5)',
            pointBackgroundColor: 'rgba(46,204,112,0)',
            pointBorderColor: 'rgba(255,255,255,0.00)',
            borderWidth: 1,
            showLine: true,
          },
          {
            label: 'Невыученные слова',
            data: learnCurvePoints,
            backgroundColor: '#fff',
            borderColor: 'rgba(136,136,136,0.5)',
            pointBackgroundColor: 'rgba(46,204,112,0)',
            pointBorderColor: 'rgba(255,255,255,0.00)',
            // fill: true,
            borderWidth: 1,
            showLine: true,
          },
        ],
      },
      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              suggestedMax: 100,
              beginAtZero: true,
              stepSize: 20,
              callback: (value) => `${value}%`,
            },
            scaleLabel: {
              display: true,
              labelString: '% понимания любого текста',
            },
          }],
          xAxes: [{
            display: true,
            ticks: {
              stepSize: 1000,
            },
          }],
        },
        legend: {
          display: true,
        },
      },
    });
  }

  async requestStatistics() {
    const stats = await this.statsApi.get();
    if (stats.error) return false;
    const totalWordsCount = await this.wordsApi.getUserWordsCount();
    stats.totalWordsCount = totalWordsCount;
    return stats;
  }
}
