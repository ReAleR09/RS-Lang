import EnglishPuzzleView from './EnglishPuzzleView';

export const EP_GAME_STATS = 'EP_GAME_STATS';

export default class EnglishPuzzleManager {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.view = new EnglishPuzzleView();
  }

  attach(element) {
    this.view.attach(element);
  }

  getInitialLayout() {
    return this.view.getGameLayout();
  }
}
