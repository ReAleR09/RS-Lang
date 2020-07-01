import { difficultyMax } from './constants';

export default class LearningWordsGameMode {
  constructor() {
    this.minBestResult = 0;
    this.roundMaxCount = 0;
    this.gameMaxCount = 0;

    this.gameCount = 0;
    this.roundCount = 0;
    this.roundBestResult = 0;

    this.difficultyLevel = 0;
    this.retry = false;
    this.ended = false;
  }

  startGame(gameMaxCount, roundMaxCount, minBestResult) {
    this.minBestResult = minBestResult;
    this.roundMaxCount = roundMaxCount;
    this.gameMaxCount = gameMaxCount;
  }

  get game() {
    return this.gameCount;
  }

  set total(value) {
    if (value >= this.gameMaxCount) {
      this.ended = true;
    }
    this.gameCount = value;
  }

  get level() {
    return this.difficultyLevel;
  }

  set level(value) {
    if (value < 0 || value > difficultyMax) return;

    this.difficultyLevel = value;
  }

  get bestResult() {
    return this.roundBestResult;
  }

  set bestResult(value) {
    if (value >= this.minBestResult) {
      this.level += 1;
      this.nextRound();
      this.roundBestResult = 0;
      return;
    }
    this.roundBestResult = value;
    this.round += 1;
  }

  get round() {
    return this.roundCount;
  }

  set round(value) {
    if (value >= this.roundMaxCount) {
      this.nextRound();
      this.level -= 1;

      if (this.retry) {
        this.ended = true;
      }
      this.retry = true;
    }
    this.roundCount = value;
  }

  inputResult(result) {
    if (this.ended) return;

    if (result) {
      this.bestResult += 1;
    } else {
      this.bestResult = 0;
    }
  }

  get isEnded() {
    return this.ended;
  }

  nextRound() {
    this.round = 0;
    this.gameCount += 1;
  }
}
