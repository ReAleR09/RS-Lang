import Chart from 'chart.js';
import View from '../../lib/View';
import STATISTICS_HTML from '../../Components/Statistics/constants';

export default class IndexView extends View {
  onMount() {
    this.ctx = document.getElementById('сhart-vocabulary').getContext('2d');

    const gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0.5, '#80b6f4');
    gradientStroke.addColorStop(0.5, '#f49080');

    const gradientFill = this.ctx.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0.5, 'rgba(128, 182, 244, 0.6)');
    gradientFill.addColorStop(0.5, 'rgba(244, 144, 128, 0.6)');

    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
          label: 'Data',
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 4,
          data: [100, 120, 150, 170, 180, 170, 160],
        }],
      },
      options: {
        legend: {
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawTicks: false,
              display: false,
            },
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
            },
          }],
        },
      },
    });

    this.ctx1 = document.getElementById('chart-statistics').getContext('2d');

    const gradientStroke1 = this.ctx1.createLinearGradient(500, 0, 100, 0);
    gradientStroke1.addColorStop(0.8, '#80b6f4');
    gradientStroke1.addColorStop(0.8, '#f49080');

    const gradientFill1 = this.ctx1.createLinearGradient(500, 0, 100, 0);
    gradientFill1.addColorStop(0.5, 'rgba(128, 182, 244, 0.6)');
    gradientFill1.addColorStop(0.5, 'rgba(244, 144, 128, 0.6)');

    // eslint-disable-next-line no-unused-vars
    const myChart1 = new Chart(this.ctx1, {
      type: 'line',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
          label: 'Data',
          borderColor: gradientStroke1,
          pointBorderColor: gradientStroke1,
          pointBackgroundColor: gradientStroke1,
          pointHoverBackgroundColor: gradientStroke1,
          pointHoverBorderColor: gradientStroke1,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          fill: true,
          backgroundColor: gradientFill1,
          borderWidth: 4,
          data: [100, 120, 150, 170, 180, 170, 160],
        }],
      },
      options: {
        legend: {
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawTicks: false,
              display: false,
            },
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
            },
          }],
        },
      },
    });

    this.ctx2 = document.getElementById('chart-mini-games').getContext('2d');

    const gradientStroke2 = this.ctx2.createLinearGradient(500, 0, 100, 0);
    gradientStroke2.addColorStop(0.2, '#80b6f4');
    gradientStroke2.addColorStop(0.2, '#f49080');

    const gradientFill2 = this.ctx2.createLinearGradient(500, 0, 100, 0);
    gradientFill2.addColorStop(0.2, 'rgba(128, 182, 244, 0.6)');
    gradientFill2.addColorStop(0.2, 'rgba(244, 144, 128, 0.6)');

    // eslint-disable-next-line no-unused-vars
    const myChart2 = new Chart(this.ctx2, {
      type: 'line',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
          label: 'Data',
          borderColor: gradientStroke2,
          pointBorderColor: gradientStroke2,
          pointBackgroundColor: gradientStroke2,
          pointHoverBackgroundColor: gradientStroke2,
          pointHoverBorderColor: gradientStroke2,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 3,
          fill: true,
          backgroundColor: gradientFill2,
          borderWidth: 4,
          data: [100, 120, 150, 170, 180, 170, 160],
        }],
      },
      options: {
        legend: {
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20,
            },
            gridLines: {
              drawTicks: false,
              display: false,
            },
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
            },
          }],
        },
      },
    });

    const miniGamesBtn = document.querySelector('.mini-games-chart');
    const statisticsBtn = document.querySelector('.statistics-chart');
    const vocabularyBtn = document.querySelector('.vocabulary-chart');
    const miniGamesContainer = document.querySelector('.mini-games-container');
    const statisticsContainer = document.querySelector('.statistics-container');
    const vocabularyContainer = document.querySelector('.vocabulary-container');

    miniGamesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      miniGamesContainer.classList.remove('hide');
      statisticsContainer.classList.add('hide');
      vocabularyContainer.classList.add('hide');
    });

    statisticsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      statisticsContainer.classList.remove('hide');
      vocabularyContainer.classList.add('hide');
      miniGamesContainer.classList.add('hide');
    });

    vocabularyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      vocabularyContainer.classList.remove('hide');
      statisticsContainer.classList.add('hide');
      miniGamesContainer.classList.add('hide');
    });
  }

  render() {
    this.html = STATISTICS_HTML;
    return this.html;
  }
}
