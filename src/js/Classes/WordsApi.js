import Api from './Api';

const MAX_REQUEST_COUNT = 20;
const MAX_PAGE_INDEX = 29;
const MAX_RANDOMPAGE_WORDS_INDEX = 19;

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

    const resultCount = Math.min(count, totalCount);
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

  async changeWordDataById(wordId, wordData = {
    difficulty: '0',
    optional: {
      difficulty: 0, // Сложность в рамках оценки сложности при изучении
      vocabularyPage: 0, // Словарь Сложные, Удаленные, ещё как-нибудь
      errors: 0, // количество ошибок по карточке
      interval: 0, // текущий реальный интервал для расчета даты
      calculateInterval: 0, // текущий базовый интервал для расчета интервалов
      iteration: 1, // текущая итерация
      date: 0, // дата с которой начинает слово вываливаться в обучение.
    },
  }) {
    let result;
    result = await this.api.getUserWordById(wordId);
    if (result.error) {
      result = await this.api.postUserWordById(wordId, wordData);
    } else {
      result = await this.api.putUserWordById(wordId, wordData);
    }

    return result;
  }

  async deleteWordById(wordId) {
    const result = await this.api.deleteUserWordById(wordId);
    return result;
  }
}
