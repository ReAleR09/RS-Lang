import {
  wordStartTag,
  wordEndTag,
  WORD_STATUSES,
  chunkCount,
  difficultyMax,
} from './constants';
import WordsApi from '../../Classes/Api/WordsApi';
import { MODES } from '../../../config';

export default class LearnindWordsCards {
  constructor() {
    this.difficultyLevel = 0;

    this.limits = {};
    this.counts = {};
    this.mode = MODES.REPITITION;

    this.currentCardIndex = 0;

    this.cards = [];

    this.newWords = [];
    this.repeatWords = [];
    this.wordsApi = new WordsApi();
  }

  init(difficulty, limits, statistics, mode) {
    if (difficulty) {
      this.difficulty = difficulty;
    }
    if (limits) {
      this.limits = limits;
    }
    if (statistics) {
      this.counts = statistics;
    }
    if (mode) {
      this.mode = mode;
    }

    this.cards = [];
    this.newWords = [];
    this.repeatWords = [];
    this.currentCardIndex = 0;
  }

  set difficulty(value) {
    if (value < 0 || value > difficultyMax) return;
    if (this.difficultyLevel !== value) {
      this.init(value);
    }
    this.difficultyLevel = value;
  }

  get difficulty() {
    return this.difficultyLevel;
  }

  updateStatistics(statistics) {
    this.counts = statistics;
    console.log(this.counts);
  }

  get restCardsCount() {
    if ((this.limits.maxCount - this.counts.totalWordsCount) < 0) {
      return 0;
    }
    return (this.limits.maxCount - this.counts.totalWordsCount);
  }

  get restNewWordsCount() {
    if ((this.limits.maxCountNewCards - this.counts.newWordsCount) < 0) {
      return 0;
    }
    return (this.limits.maxCountNewCards - this.counts.newWordsCount);
  }

  get length() {
    if (!this.cards) return 0;
    return this.cards.length;
  }

  get restLength() {
    if (this.length === 0) return 0;
    return ((this.length - 1) - this.currentCardIndex);
  }

  async getNewWords() {
    let words = await this.wordsApi.getRandomNewWords(chunkCount, this.difficulty);

    if (!words.length && this.mode === MODES.REPITITION) {
      this.difficulty += 1;
    }
    words = words.map((word) => {
      const newWord = word;
      newWord.WordStatus = WORD_STATUSES.NEW;
      return newWord;
    });

    this.newWords = this.filterByLimits(words);
  }

  async getRepeatWords() {
    let words = await this.wordsApi.getRepeatedWords(chunkCount);
    words = words.map((word) => {
      const newWord = word;
      newWord.wordStatus = WORD_STATUSES.OLD;
      return newWord;
    });
    this.repeatWords = this.filterByLimits(words);
  }

  filterByLimits(words) {
    if (this.mode === MODES.GAME) {
      return LearnindWordsCards.transformWordsToCards(words);
    }

    const filteredCards = [];
    let totalCount = 0;
    let newCount = 0;

    words.forEach((card) => {
      if (card.WordStatus === WORD_STATUSES.NEW) {
        if (newCount < this.restNewWordsCount) {
          newCount += 1;
          totalCount += 1;
          filteredCards.push(card);
        }
      } else if (totalCount <= this.restCardsCount) {
        filteredCards.push(card);
        totalCount += 1;
      }
    });
    return LearnindWordsCards.transformWordsToCards(filteredCards);
  }

  async fillCards() {
    if (!this.repeatWords.length && this.mode === MODES.REPITITION) {
      await this.getRepeatWords();
      if (this.repeatWords.length) {
        this.cards = this.cards.concat(this.repeatWords);
      }
    }
    if (!this.length) {
      if (!this.newWords.length) {
        await this.getNewWords();
      }
      if (this.newWords.length) {
        this.cards.push(this.newWords.pop());
      }
    }

    return (this.currentCardIndex < this.length);
  }

  static transformWordsToCards(words, defaultStatus) {
    let cards = words.slice();
    cards = cards.map((word) => {
      const newWord = {};
      Object.assign(newWord, word);

      const firstIndexOfWord = word.textExample.indexOf(wordStartTag);
      const lastIndexOfWord = word.textExample.indexOf(wordEndTag) + wordEndTag.length;
      newWord.exampleStart = word.textExample.slice(0, firstIndexOfWord);
      newWord.exampleEnd = word.textExample.slice(lastIndexOfWord);

      if (defaultStatus) newWord.wordStatus = defaultStatus;
      newWord.errors = 0;

      return newWord;
    });
    return cards;
  }

  get currentCard() {
    const cardCopy = { ...this.cards[this.currentCardIndex] };
    return cardCopy;
  }

  async getNext() {
    this.currentCardIndex += 1;
    if (this.currentCardIndex === this.cards.length) {
      const fillingResult = await this.fillCards();
      return fillingResult;
    }
    return true;
  }

  getPrevious() {
    if (this.currentCardIndex === 0) return;
    this.currentCardIndex -= 1;
  }

  get currentStatus() {
    return this.currentCard.wordStatus;
  }

  set currentStatus(status) {
    this.cards[this.currentCardIndex].wordStatus = status;
  }

  get currentErrors() {
    return this.currentCard.errors;
  }

  set currentErrors(errors) {
    this.cards[this.currentCardIndex].errors = errors;
  }

  get trainingStatus() {
    const restTotalAmount = this.restCardsCount;
    const restNewWordsAmount = this.restNewWordsCount;
    const restCards = this.restLength;

    return {
      restTotalAmount,
      restNewWordsAmount,
      restCards,
    };
  }

  sendCardToTrainingEnd() {
    this.cards.push(this.currentCard);
  }
}
