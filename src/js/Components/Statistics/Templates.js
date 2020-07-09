import { GAMES, GAMES_TITLES } from '../../../config';

const gamesKeys = Object.values(GAMES);
let gamesTabsButtonsHtml = '';
let gamesTabsHtml = '';
gamesKeys.forEach((gameKey, index) => {
  const active = (index === 0) ? 'class="active"' : '';
  const tabButtonHtml = `
    <li class="tab col s2">
      <a ${active} href="#${gameKey}">${GAMES_TITLES[gameKey]}</a>
    </li>`;
  gamesTabsButtonsHtml += tabButtonHtml;

  const tabHtml = `<div id="${gameKey}" class="col s12"></div>`;
  gamesTabsHtml += tabHtml;
});

export const STATISTICS_HTML = `
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s6"><a class="active" href="#forgames">Mini-games</a></li>
        <li class="tab col s6"><a href="#bydays">By days</a></li>
      </ul>
    </div>
    <div id="forgames" class="col s12">
      <ul class="tabs">
        ${gamesTabsButtonsHtml}
      </ul>
        ${gamesTabsHtml}
    </div>
    <div id="bydays" class="col s12">
      Leraning by days chart
    </div>
  </div>
`;

const getGameHistoryCard = (oneGameHistory) => {
  const html = `
    <div class="row">
      <div class="col s12">
        <div>
          Дата: ${oneGameHistory.date}
        </div>
        <div>
          Угадано: ${oneGameHistory.success}
        </div>
        <div>
          Не угадано: ${oneGameHistory.errors}
        </div>
      </div>
    </div>
  `;
  return html;
};

export const getGameHistoryView = (gameHistory) => {
  if (gameHistory.results.length === 0) {
    return `
    <div class="row">
      <div class="col s12">
        Вы еще не играли в "${GAMES_TITLES[gameHistory.gameKey]}"
      </div>
    </div>
    `;
  }
  const cardsHtml = gameHistory.results.reduce((acc, gameResult) => {
    const result = acc + getGameHistoryCard(gameResult);
    return result;
  }, '');
  return cardsHtml;
};
