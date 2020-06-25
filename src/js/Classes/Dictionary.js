import WordsApi from './WordsApi';
import { DICT_CATEGORIES, GROUPS } from './Api/constants';

export default class Dicionary {
  constructor() {
    this.wordsApi = new WordsApi();
  }

  async putOnCategory(wordId, category = DICT_CATEGORIES.MAIN) {
    if (!this.wordsApi.checkUserWordInBase(wordId)) {
      await this.wordsApi.changeWordDataById(wordId);
    }

    const userWordData = await this.wordsApi.getWordDataById(wordId);
    userWordData.dictCategory = category;
    const report = await this.changeWordDataById(wordId, userWordData);
    return report;
  }

  async getWordsList(category, count) {
    let filter;
    if (category) {
      filter = JSON.stringify({ 'userWord.optional.dictCategory': category });
    }

    const requestArray = GROUPS
      .map((group) => this.wordsApi.getAggregatedWords(count, group, filter));

    let wordsList = await Promise.all(requestArray);
    wordsList = wordsList.flat();

    return wordsList;
  }
}
