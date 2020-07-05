const STATISTICS_HTML = `
    <section class="container">
      <div>
        <button class="waves-effect waves-light btn mini-games-chart">Мини-игры</button>
        <button class="waves-effect waves-light btn statistics-chart">Статискика</button>
        <button class="waves-effect waves-light btn vocabulary-chart">Словарь</button>
      </div>
      <div class="mini-games-container hide">
        <canvas class="teal lighten-2" id="chart-mini-games"></canvas>
        <div>
          <button class="waves-effect waves-light btn">Sprint</button>
          <button class="waves-effect waves-light btn">SpeakIt</button>
          <button class="waves-effect waves-light btn">English puzzle</button>
          <button class="waves-effect waves-light btn">Savannah</button>
          <button class="waves-effect waves-light btn">Audio call</button>
          <button class="waves-effect waves-light btn">Field of Dreams</button>
        </div>
      </div>
      <div class="statistics-container hide">
        <canvas class="teal lighten-2" id="chart-statistics"></canvas>
      </div>
      <div class="vocabulary-container">
        <canvas class="teal lighten-2" id="сhart-vocabulary"></canvas>
      </div>
    </section>`;

export default STATISTICS_HTML;
