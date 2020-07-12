import WordsApi from './Api/WordsApi';
import {
  DICT_CATEGORIES,
  GROUPS,
  DIFFICULTIES,
  API_SEND_ERROR,
  API_ERROR,
} from './Api/constants';
import ErrorHandling from './ErrorHandling';

export default class Dictionary {
  constructor() {
    this.wordsApi = new WordsApi();
  }

  async createAndGetUserWordDataById(wordId) {
    if (!this.wordsApi.checkUserWordInBase(wordId)) {
      await this.wordsApi.changeWordDataById(wordId);
    }
    const userWordData = await this.wordsApi.getWordDataById(wordId);
    if (userWordData.error) {
      ErrorHandling.handleError(userWordData.error, API_SEND_ERROR);
    }
    return userWordData;
  }

  async putOnCategory(wordId, category = DICT_CATEGORIES.MAIN) {
    const userWordData = await this.createAndGetUserWordDataById(wordId);
    if (userWordData.error) {
      return userWordData;
    }
    userWordData.dictCategory = category;
    const report = await this.wordsApi.changeWordDataById(wordId, userWordData);
    return report;
  }

  async setUserDifficulty(wordId, userDifficulty = DIFFICULTIES.NORMAL) {
    const userWordData = await this.createAndGetUserWordDataById(wordId);
    if (userWordData.error) {
      return userWordData;
    }
    userWordData.difficulty = userDifficulty;
    const report = await this.wordsApi.changeWordDataById(wordId, userWordData);
    return report;
  }

  async getWordsList(category, count) {
    let filter;
    if (category) {
      filter = JSON.stringify({ 'userWord.optional.dictCategory': category });
    } else {
      filter = JSON.stringify({ userWord: { $ne: null } });
    }

    const requestArray = GROUPS
      .map((group) => this.wordsApi.getAggregatedWords(count, group, filter));

    let wordsList = await Promise.all(requestArray);
    const error = WordsApi.checkPromiseArrayErrors(wordsList);
    if (error) {
      ErrorHandling.handleError(error, API_ERROR);
      return [];
    }
    wordsList = wordsList.flat();

    return wordsList;
  }
}
