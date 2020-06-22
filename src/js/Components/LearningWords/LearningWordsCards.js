import { wordStartTag, wordEndTag, WORD_STATUSES } from './constants';
import LearningWordsApi from './LearningWordsApi';

export default class LearnindWordsCards {
  constructor(
    difficulty = 0,
    limits = { maxCount: 50, maxCountNewCards: 20 },
    statistics = { totalCount: 0, NewWords: 0 },
  ) {
    this.difficulty = difficulty;

    this.limits = limits;
    this.counts = statistics;

    this.currentCardIndex = 0;

    this.cards = [];
    this.words = [];
    this.newWords = [];
    this.repeatWords = [];
  }

  get restCardsCount() {
    if ((this.limits.maxCount - this.counts.totalCount) < 0) {
      return 0;
    }
    return (this.limits.maxCount - this.counts.totalCount);
  }

  get restNewWordsCount() {
    return (this.limits.maxCountNewCards - this.counts.NewWords);
  }

  get length() {
    if (!this.cards) return 0;
    return this.cards.length;
  }

  get restLength() {
    if (this.length === 0) return 0;
    return ((this.length - 1) - this.currentCardIndex);
  }

  getNewWords() {
    // TODO WORDS API
    let words = LearningWordsApi.getRandomWordsForDifficulty(this.difficulty);
    words = words.map((word) => {
      const newWord = word;
      newWord.WordStatus = WORD_STATUSES.NEW;
      return newWord;
    });
    // TODO filter только новых (работа со словарем)
    this.newWords = this.filterByLimits(words);
  }

  getRepeatWords() {
    // TODO повторяющиеся слова (работа с интервальными повторениями)
  //  const words = LearningWordsApi.getRandomWordsForDifficulty(this.difficulty);
    let words = LearningWordsApi.getRandomWordsForDifficulty(this.difficulty);
    words = words.map((word) => {
      const newWord = word;
      newWord.wordStatus = WORD_STATUSES.NEW;
      return newWord;
    });
    this.repeatWords = this.filterByLimits(words);
  }

  filterByLimits(words) {
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

  fillCards() {
    if (!this.repeatWords.length) {
      this.getRepeatWords();
    }

    this.cards = this.cards.concat(this.repeatWords);

    if (!this.length) {
      if (!this.newWords.length) {
        this.getNewWords();
      }
      this.cards.push(this.newWords.pop());
    }

    if (!this.length) {
      // TODO подгрузка повторов следующего дня.
      // this.getRepeatWordsNextDay();
      // this.getRepeatWords();
      // this.cards.concat(this.repeatWords);
    }

    return (!this.currentCardIndex >= this.length);
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

  getNext() {
    this.currentCardIndex += 1;
    if (this.currentCardIndex === this.cards.length) {
      return this.fillCards();
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
