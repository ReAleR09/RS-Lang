import LearningWordsView from './LearningWordsView';
import LearningWordsApi from './LearningWordsApi';
import { wordStartTag, wordEndTag } from './constants';

export default class LearningWordsModel {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    this.wordsState = [];
    this.view = new LearningWordsView(this);
    this.currentCard = 0;
    this.cards = [];
    this.statistics = {}; // mockStatistics
  }

  get card() {
    return this.cards[this.currentCard];
  }

  attach(element) {
    this.view.attach(element);
  }

  init() {
    this.addNewCards();

    this.updateWordCard(this.card);
  }

  updateWordCard(word) {
    this.view.drawWordToDOM(word);
  }

  getInitialLayout() {
    return this.view.getCardLayout(this.difficulty);
  }

  checkInput(value) {
    const textResult = value.trim();

    const checkResult = (textResult === this.card.word);

    this.updateStatistics(checkResult);

    if (!checkResult) {
      this.card.errors += 1;
    }
    return (textResult === this.card.word);
  }

  goNext() {
    if (this.card.errors) {
      this.sendCardToTrainingEnd();
    }

    if (this.currentCard === this.cards.length - 1) {
      this.addNewCards();
    }

    if (this.currentCard < this.cards.length - 1) this.currentCard += 1;
    this.updateWordCard(this.card);
  }

  goPrevious() {
    if (this.currentCard === 0) return;
    this.currentCard -= 1;
    this.updateWordCard(this.card);
  }

  updateStatistics(result) { // mockStatistics
    this.statistics.word = this.card;
    this.statistics.result = result;
    this.statistics.errors = this.card.errors;
  }

  addNewCards() {
    let words = LearningWordsApi.getRandomWordsForDifficulty(this.difficulty);
    // words filter только новых
    // OldWords получить уже известные слова
    // положить в порядке сначала повторения, потом новые
    words = words.map((word) => {
      const newWord = {};
      Object.assign(newWord, word);
      const firstIndexOfWord = word.textExample.indexOf(wordStartTag);

      const lastIndexOfWord = word.textExample.indexOf(wordEndTag) + wordEndTag.length;
      newWord.exampleStart = word.textExample.slice(0, firstIndexOfWord);
      newWord.exampleEnd = word.textExample.slice(lastIndexOfWord);
      newWord.errors = 0;
      return newWord;
    });

    this.cards = this.cards.concat(words);
  }

  sendCardToTrainingEnd() {
    this.cards.push(this.card);
  }
}
