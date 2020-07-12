import {
  wordStartTag,
  wordEndTag,
  WORD_STATUSES,
  chunkCount,
  difficultyMax,
  MeaningWordStartTag,
  MeaningWordEndTag,
  WORD_REPLACEMENT,
} from './constants';
import WordsApi from '../../Classes/Api/WordsApi';
import { MODES } from '../../../config';

export default class LearnindWordsCards {
  constructor(gameRoundCount = 10, gameLimit) {
    this.difficultyLevel = 0;

    this.limits = {};
    this.counts = {};
    this.mode = MODES.REPITITION;

    this.currentCardIndex = 0;

    this.cards = [];

    this.newWords = [];
    this.repeatWords = [];
    this.complicatedWords = [];
    this.wordsApi = new WordsApi();
    this.gameRoundLimit = gameRoundCount;
    this.setGameLimit = gameLimit;
  }

  init(difficulty, settings, dayNorms, statistics, mode) {
    if (settings) {
      this.settings = settings;
    }
    if (dayNorms) {
      this.limits = dayNorms;
    }
    if (difficulty) {
      this.difficultyLevel = difficulty;
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
    this.complicatedWords = [];
    this.currentCardIndex = -1;
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
      newWord.wordStatus = WORD_STATUSES.NEW;
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

  async getComplicatedWords() {
    let words = await this.wordsApi.getComplicatedWords();
    words = words.map((word) => {
      const newWord = word;
      newWord.wordStatus = WORD_STATUSES.OLD;
      return newWord;
    });
    this.complicatedWords = this.filterByLimits(words);
  }

  filterByLimits(words) {
    if (this.mode !== MODES.REPITITION) {
      return this.transformWordsToCards(words);
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
    return this.transformWordsToCards(filteredCards);
  }

  async fillCardsNoLimits() {
    if (this.mode === MODES.COMPLICATED) {
      if (!this.complicatedWords.length) {
        await this.getComplicatedWords();
      }
      if (this.complicatedWords.length) {
        this.cards = this.cards.concat(this.complicatedWords);
        if (this.cards.length > this.complicatedWords.length) {
          this.cards = [];
          this.currentCardIndex = 0;
        }
        this.complicatedWords = [];
      }
    }
    if (this.mode === MODES.GAME) {
      if (!this.newWords.length) {
        await this.getNewWords();
      }
      if (this.newWords.length) {
        this.cards = this.cards.concat(this.newWords);
        this.newWords = [];
        if (this.cards.length < this.gameRoundLimit) {
          this.setGameLimit = this.difficultyLevel + 1;
        }
      }
    }
    return this.isCardReady;
  }

  async fillCards() {
    if (this.mode !== MODES.REPITITION) return this.fillCardsNoLimits();

    if (!this.repeatWords.length) {
      await this.getRepeatWords();
    }
    if (this.repeatWords.length) {
      const restCount = Math.min(this.restCardsCount, this.repeatWords.length);
      this.repeatWords = this.repeatWords.slice(0, restCount);
    }
    if (this.repeatWords.length) {
      this.cards = this.cards.concat(this.repeatWords);
      this.repeatWords = [];
    }

    if (this.isEnded) {
      if (!this.newWords.length) {
        await this.getNewWords();
      }
      if (this.newWords.length) {
        let restCount = Math.min(this.restCardsCount, this.restNewWordsCount);
        restCount = Math.min(this.newWords.length, restCount);
        this.newWords = this.newWords.slice(0, restCount);
      }
      if (this.newWords.length) {
        this.cards.push(this.newWords.pop());
      }
    }

    return this.isCardReady;
  }

  get isEnded() {
    return (this.currentCardIndex > (this.length - 1));
  }

  get isCardReady() {
    return this.currentCardIndex < this.length;
  }

  // eslint-disable-next-line class-methods-use-this
  transformWordsToCards(words, defaultStatus) {
    let cards = words.slice();
    cards = cards.map((word) => {
      const newWord = {};
      Object.assign(newWord, word);

      const firstIndexOfWord = word.textExample.indexOf(wordStartTag);
      const lastIndexOfWord = word.textExample.indexOf(wordEndTag) + wordEndTag.length;

      const wordStart = firstIndexOfWord + wordStartTag.length;
      const wordEnd = word.textExample.indexOf(wordEndTag);
      newWord.wordFromExample = word.textExample.slice(wordStart, wordEnd);

      newWord.word = newWord.word.trim();
      newWord.exampleStart = word.textExample.slice(0, firstIndexOfWord);
      newWord.exampleEnd = word.textExample.slice(lastIndexOfWord);

      const firstIndexOfWordMeaning = word.textMeaning.indexOf(MeaningWordStartTag);
      const lastIndexOfWordMeaning = word.textMeaning.indexOf(MeaningWordEndTag)
        + MeaningWordEndTag.length;

      const wordHtml = word.textMeaning.slice(firstIndexOfWordMeaning, lastIndexOfWordMeaning);
      newWord.textMeaning = word.textMeaning.replace(wordHtml, wordHtml + WORD_REPLACEMENT);

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

  updateCounts() {
    if (this.currentStatus === WORD_STATUSES.OLD) {
      this.counts.totalWordsCount += 1;
    }
    if (this.currentStatus === WORD_STATUSES.NEW) {
      this.counts.newWordsCount += 1;
      this.counts.totalWordsCount += 1;
    }
  }

  getPrevious() {
    if (this.currentCardIndex === 0) return;
    this.currentCardIndex -= 1;
  }

  get currentStatus() {
    return this.cards[this.currentCardIndex].wordStatus;
  }

  set currentStatus(status) {
    this.cards[this.currentCardIndex].wordStatus = status;
  }

  get currentErrors() {
    return this.cards[this.currentCardIndex].errors;
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
