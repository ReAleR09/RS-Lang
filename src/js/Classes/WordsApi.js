import Api from './Api';
import {
  DIFFICULTIES,
  DICT_CATEGORIES,
  MAX_RANDOMPAGE_WORDS_INDEX,
  MAX_REQUEST_COUNT,
  MAX_PAGE_INDEX,
} from './Api/constants';

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

  async getAggregatedWords(count, difficulty, filterString) {
    const params = {
      group: difficulty,
      wordsPerPage: 1,
    };
    if (filterString) {
      params.filter = filterString;
    }
    let totalCount = await this.api.getAggregatedWords(params);

    totalCount = totalCount[0].totalCount[0].count;

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

  async getRepeatedWords(count, difficulty, day) {
    let dateNow = Date.now();
    if (day) {
      dateNow = day.getTime();
    }

    const filter = JSON.stringify({ 'userWord.optional.date': { $lt: dateNow } });

    const repeatedWords = await this.getAggregatedWords(count, difficulty, filter);
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

  async deleteWordById(wordId) {
    const result = await this.api.deleteUserWordById(wordId);
    return result;
  }
}
