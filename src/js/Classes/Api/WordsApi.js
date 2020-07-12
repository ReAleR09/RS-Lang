import Api from './Api';
import {
  DIFFICULTIES,
  DICT_CATEGORIES,
  MAX_RANDOMPAGE_WORDS_INDEX,
  MAX_REQUEST_COUNT,
  MAX_PAGE_INDEX,
  API_ERROR,
  API_SEND_ERROR,
} from './constants';
import Utils from '../../Utils/Utils';
import ErrorHandling from '../ErrorHandling';

const puzzleMaxLength = 10;

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

    const error = WordsApi.checkPromiseArrayErrors(arrayOfResults);
    if (error) {
      ErrorHandling.handleError(error, API_ERROR);
      return [];
    }

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

    const totalCount = await this.getTotalCountByAggregatedWordsRequest(params);

    if (!totalCount) {
      return [];
    }

    params.wordsPerPage = totalCount;
    let arrayOfResults = await this.api.getAggregatedWords(params);
    const error = WordsApi.checkPromiseArrayErrors(arrayOfResults);
    if (error) {
      ErrorHandling.handleError(error, API_ERROR);
      return [];
    }

    arrayOfResults = arrayOfResults[0].paginatedResults;

    let resultCount = totalCount;

    if (count) {
      resultCount = Math.min(count, totalCount);
    }

    const arrayOfIndexes = WordsApi.createArrayOfIndexes(resultCount, (totalCount - 1));

    const randomWords = arrayOfIndexes.map((index) => arrayOfResults[index]);

    return randomWords;
  }

  async getRandomNewWords(count, difficulty) {
    const filter = JSON.stringify({ userWord: null });

    const newWords = await this.getAggregatedWords(count, difficulty, filter);

    if (newWords.error) {
      ErrorHandling.handleError(newWords.error, API_ERROR);
      return [];
    }

    return newWords;
  }

  async getRepeatedWords(count, day, forPuzzle = false) {
    let dateNow = Date.now();
    if (day) {
      dateNow = day.getTime();
    }

    const filter = JSON.stringify({
      'userWord.optional.dictCategory': { $ne: DICT_CATEGORIES.DELETE },
      'userWord.optional.nextDate': { $lt: dateNow },
    });

    let repeatedWords = await this.getAggregatedWords(undefined, undefined, filter);

    if (repeatedWords.error) {
      ErrorHandling.handleError(repeatedWords.error, API_ERROR);
      return [];
    }

    if (forPuzzle) {
      repeatedWords = repeatedWords.filter((word) => {
        const exampleLength = word.textExample.trim().split(' ').length;
        return (exampleLength <= puzzleMaxLength);
      });
    }

    repeatedWords = Utils.arrayShuffle(repeatedWords);

    if (count < repeatedWords.length) {
      repeatedWords = repeatedWords.slice(0, count);
    }

    return repeatedWords;
  }

  async getComplicatedWords(count) {
    const filter = JSON.stringify({
      'userWord.optional.dictCategory': DICT_CATEGORIES.COMPLICATED,
    });

    let repeatedWords = await this.getAggregatedWords(undefined, undefined, filter);

    if (repeatedWords.error) {
      ErrorHandling.handleError(repeatedWords.error, API_ERROR);
      return [];
    }

    repeatedWords = Utils.arrayShuffle(repeatedWords);

    if (count < repeatedWords.length) {
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
    curSuccessConsistency: 0, // текущая серия
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

    if (result.error) {
      ErrorHandling.handleNonCriticalError(result.error, API_SEND_ERROR);
    }

    return result;
  }

  async checkUserWordInBase(wordId) {
    const result = await this.getWordDataById(wordId);
    return !result.error;
  }

  async getWordDataById(wordId) {
    const wordData = await this.api.getUserWordById(wordId);
    if (wordData.error) return wordData;
    const userWordData = wordData.optional;
    return userWordData;
  }

  async getUserWordsCount(difficulty = false) {
    const params = {
      wordsPerPage: 1,
    };

    // difficulty is optional
    if (difficulty !== false) {
      params.group = difficulty;
    }

    params.filter = JSON.stringify({
      userWord: { $ne: null },
    });

    const totalCount = await this.getTotalCountByAggregatedWordsRequest(params);

    return totalCount;
  }

  async getRepitionWordsCount(difficulty, date) {
    const params = {
      wordsPerPage: 1,
    };

    // difficulty is optional
    if (difficulty !== false) {
      params.group = difficulty;
    }

    let dateNow = new Date().getTime();

    if (date) {
      dateNow = date.getTime();
    }

    params.filter = JSON.stringify({
      'userWord.optional.dictCategory': { $ne: DICT_CATEGORIES.DELETE },
      'userWord.optional.nextDate': { $lt: dateNow },
    });

    const totalCount = await this.getTotalCountByAggregatedWordsRequest(params);

    return totalCount;
  }

  /**
   * @param {int} difficulty 0-5
   * @param {int} gameRoundSize 1-*
   * @param {int} gameRound 1-*
   * У апи сложности 0-5 и страницы 0-29
   */
  async getWordsForGame(difficulty, gameRoundSize, gameRound, forPuzzle = false) {
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

    const requestParams = {
      group: difficulty,
    };
    if (forPuzzle) {
      requestParams.wordsPerExampleSentenceLTE = puzzleMaxLength;
      requestParams.wordsPerPage = MAX_REQUEST_COUNT;
    }

    const arrayOfRequests = arrayOfPages
      .map((page) => {
        requestParams.page = page;
        return this.api.getChunkOfWords(requestParams);
      });

    let arrayOfResults = await Promise.all(arrayOfRequests);

    const error = WordsApi.checkPromiseArrayErrors(arrayOfResults);
    if (error) {
      ErrorHandling.handleError(error, API_ERROR);
      return [];
    }
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

  async getTotalCountByAggregatedWordsRequest(params) {
    const totalCountResult = await this.api.getAggregatedWords(params);

    if (totalCountResult.error) {
      ErrorHandling.handleNonCriticalError(totalCountResult.error, API_ERROR);
      return 0;
    }

    let totalCount = 0;
    try {
      totalCount = totalCountResult[0].totalCount[0].count;
    } catch (error) {
      return 0;
    }
    return totalCount;
  }

  static checkPromiseArrayErrors(array) {
    const result = array.findIndex((requestResult) => requestResult.error);
    if (result === -1) {
      return false;
    }
    return array[result].error;
  }
}
