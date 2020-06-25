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

  /**
   * @param {int} count - self-explained
   * @param {int} difficulty - words api group 0-5 or false
   * @param {int} day - epoch (if false - defaults to current timestamp)
   */
  async getRepeatedWords(count, difficulty = false, day = false) {
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
