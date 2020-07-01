import Api from './Api';
import {
  DIFFICULTIES,
  DICT_CATEGORIES,
  MAX_RANDOMPAGE_WORDS_INDEX,
  MAX_REQUEST_COUNT,
  MAX_PAGE_INDEX,
  GROUPS,
} from './constants';
import Utils from '../../Utils/Utils';

export default class WordsApi {
  constructor() {
    this.api = new Api();
  }

  static createArrayOfIndexes(count, maxIndex) {
    const resultCount = Math.min(count, maxIndex + 1);
    const arrayOfIndexes = [];
    for (let n = 0; n < resultCount; n += 1) {
      let index = Math.round(Math.random() * maxIndex);
      while (arrayOfIndexes.includes(index)) {
        index = Math.round(Math.random() * maxIndex);
      }
      arrayOfIndexes.push(index);
    }

    return arrayOfIndexes;
  }

  updateUserData(userData) {
    this.api.updateUserData(userData);
  }

  async getRandomWords(count, difficulty) {
    let requestCount = Math.min(count, MAX_REQUEST_COUNT);

    if (requestCount < (count / (MAX_PAGE_INDEX + 1))) {
      requestCount = Math.floor(count / (MAX_PAGE_INDEX + 1));
      if (Math.floor(requestCount) < requestCount) {
        requestCount += 1;
      }
    }

    const arrayOfPages = WordsApi.createArrayOfIndexes(requestCount, MAX_PAGE_INDEX);
    requestCount = arrayOfPages.length;

    const arrayOfRequests = arrayOfPages
      .map((page) => this.api.getChunkOfWords({ group: difficulty, page }));

    const arrayOfResults = await Promise.all(arrayOfRequests);
    let restWordCount = count;
    const arrayOfWords = [];
    let indexOfResults = 0;
    while (restWordCount > 0) {
      const countsByRestRequests = restWordCount / (requestCount - indexOfResults);

      let countByRequest = Math.floor(countsByRestRequests);
      if (Math.floor(countsByRestRequests) < countsByRestRequests) {
        countByRequest += 1;
      }
      const arrayOfWordIndexes = WordsApi.createArrayOfIndexes(
        countByRequest,
        MAX_RANDOMPAGE_WORDS_INDEX,
      );
      countByRequest = arrayOfWordIndexes.length;

      const currentPage = arrayOfResults[indexOfResults];
      arrayOfWordIndexes.forEach((index) => {
        arrayOfWords.push(currentPage[index]);
      });

      restWordCount -= countByRequest;
      indexOfResults += 1;
    }
    return arrayOfWords;
  }

  // Служебная функция

  async getAggregatedWords(count, difficulty = false, filterString) {
    const params = {
      wordsPerPage: 1,
    };

    // difficulty is optional
    if (difficulty !== false) {
      params.group = difficulty;
    }

    if (filterString) {
      params.filter = filterString;
    }
    const totalCountResult = await this.api.getAggregatedWords(params);

    let totalCount = 0;
    try {
      totalCount = totalCountResult[0].totalCount[0].count;
    } catch (error) {
      return [];
    }

    params.wordsPerPage = totalCount;
    let arrayOfResults = await this.api.getAggregatedWords(params);
    arrayOfResults = arrayOfResults[0].paginatedResults;

    let resultCount = totalCount;

    if (count) {
      resultCount = Math.min(count, totalCount);
    }

    const arrayOfIndexes = WordsApi.createArrayOfIndexes(resultCount, (totalCount - 1));

    const randomNewWords = arrayOfIndexes.map((index) => arrayOfResults[index]);

    return randomNewWords;
  }

  async getRandomNewWords(count, difficulty) {
    const filter = JSON.stringify({ userWord: null });

    const newWords = await this.getAggregatedWords(count, difficulty, filter);
    return newWords;
  }

  async getRepeatedWords(count, day) {
    let dateNow = Date.now();
    if (day) {
      dateNow = day.getTime();
    }

    const filter = JSON.stringify({
      $not: [
        { 'userWord.optional.dictCategory': DICT_CATEGORIES.DELETE },
      ],
      'userWord.optional.nextDate': { $lt: dateNow },
    });

    const requestArray = GROUPS.map((group) => this.getAggregatedWords(undefined, group, filter));

    let repeatedWords = await Promise.all(requestArray);
    repeatedWords = repeatedWords.flat();
    repeatedWords = Utils.arrayShuffle(repeatedWords);
    if (count) {
      repeatedWords = repeatedWords.slice(0, count);
    }

    return repeatedWords;
  }

  async changeWordDataById(wordId, userWordData = {
    difficulty: DIFFICULTIES.NORMAL, // Сложность в рамках оценки сложности слова
    dictCategory: DICT_CATEGORIES.MAIN, // Словарь Сложные, Удаленные, Основные
    errors: 0, // количество ошибок по карточке
    interval: 0, // текущий расчета даты
    success: 0, // количество успехов
    bestResult: 0, // лучший результат
    curSuccessCosistency: 0, // текущая серия
    lastDate: 0, // последняя дата
    nextDate: 0, // дата повторения
  }) {
    const userWordStructure = {
      difficulty: '0',
      optional: userWordData,
    };

    let result = await this.api.getUserWordById(wordId);
    if (result.error) {
      result = await this.api.postUserWordById(wordId, userWordStructure);
    } else {
      result = await this.api.putUserWordById(wordId, userWordStructure);
    }

    return result;
  }

  async checkUserWordInBase(wordId) {
    const result = this.getWordDataById(wordId);
    return !result.error;
  }

  async getWordDataById(wordId) {
    const wordData = await this.api.getUserWordById(wordId);
    if (wordData.error) return wordData;
    const userWordData = wordData.optional;
    return userWordData;
  }

  /**
   * @param {int} difficulty 0-5
   * @param {int} gameRoundSize 1-*
   * @param {int} gameRound 1-*
   * У апи сложности 0-5 и страницы 0-29
   */
  async getWordsForGame(difficulty, gameRoundSize, gameRound) {
    /**
     * Сначала нужно спроецировать "игровую страницу" (ака номер раунда)
     * в страницу(ы) апи (в каждой сложности 600/20=30 страниц,
     * а размер раунда может варьироваться от 10 до 40?)
     */
    // range start something in between 0 to 599.
    const wordRangeStart = (gameRound - 1) * gameRoundSize;
    // same, but for end. -1 because range start is included
    const wordRangeEnd = wordRangeStart + gameRoundSize - 1;
    // api page where the FIRST word of gameRound is going to be
    const apiFirstPage = Math.floor(wordRangeStart / MAX_REQUEST_COUNT);
    // api page where the LAST word of gameRound is going to be
    const apiLastPage = Math.floor(wordRangeEnd / MAX_REQUEST_COUNT);

    const arrayOfPages = [];
    for (let pageNum = apiFirstPage; pageNum <= apiLastPage; pageNum += 1) {
      arrayOfPages.push(pageNum);
    }

    const arrayOfRequests = arrayOfPages
      .map((page) => this.api.getChunkOfWords({ group: difficulty, page }));

    let arrayOfResults = await Promise.all(arrayOfRequests);
    /**
     * Now need to cut unneeded words.
     * For example, we are requesting page 3 with gameRoundSize 14. Then
     * wordRangeStart = 28, wordRangeEnd = 41, apiFirstPage = 1, apiLastPage = 3
     * Api returned words with range apiRangeStart=20 to apiRangeEnd=59
     * then we need to cut wordRangeStart-apiRangeStart=28-20=8 words
     * from the beginning of the array
     * and get only first gameRoundSize.
     * But first, we need to sort our parallel-received results. Every word has 'page'
     */
    arrayOfResults = arrayOfResults.filter((array) => array.length > 0);
    if (arrayOfResults.length > 1) {
      arrayOfResults = arrayOfResults.sort((arr1, arr2) => (arr1[0].page - arr2[0].page));
    }
    // and flaten the array
    arrayOfResults = arrayOfResults.reduce((accum, arr) => [...accum, ...arr], []);

    const apiRangeStart = MAX_REQUEST_COUNT * apiFirstPage;
    const cutFromStart = wordRangeStart - apiRangeStart;
    // cut from start
    if (cutFromStart > 0) {
      arrayOfResults = arrayOfResults.slice(cutFromStart);
    }
    // get only roundSize (or less?)
    arrayOfResults = arrayOfResults.slice(0, gameRoundSize);

    // aaaaand finally we return this nice stuff
    return arrayOfResults;
  }

  async deleteWordById(wordId) {
    const result = await this.api.deleteUserWordById(wordId);
    return result;
  }
}
