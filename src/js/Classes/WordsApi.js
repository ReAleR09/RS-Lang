import Api from './Api';

const MAX_REQUEST_COUNT = 10;
const MAX_PAGE_INDEX = 29;
const MAX_RANDOMPAGE_WORDS_INDEX = 19;

export default class WordsApi {
  constructor() {
    this.api = new Api();
  }

  updateUserData(userData) {
    this.api.updateUserData(userData);
  }

  async getRandomWords(count, difficulty) {
    const requestCount = Math.min(count, MAX_REQUEST_COUNT);

    const arrayOfRequests = [];
    for (let index = 0; index < requestCount; index += 1) {
      const randomPage = Math.round(Math.random() * MAX_PAGE_INDEX);
      arrayOfRequests.push(this.api.getChunkOfWords({ group: difficulty, page: randomPage }));
    }
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

      for (let number = 0; number < countByRequest; number += 1) {
        const indexOfWord = Math.round(Math.random() * MAX_RANDOMPAGE_WORDS_INDEX);
        arrayOfWords.push(arrayOfResults[indexOfResults][indexOfWord]);
      }

      restWordCount -= countByRequest;
      indexOfResults += 1;
    }
    return arrayOfWords;
  }

  async getRandomNewWords(count, difficulty) {
    let totalCount = await this.api.getAggregatedWords({
      group: difficulty,
      wordsPerPage: 1,
      filter: JSON.stringify({ userWord: null }),
    });
    totalCount = totalCount[0].totalCount[0].count;

    let arrayOfResults = await this.api.getAggregatedWords({
      group: difficulty,
      wordsPerPage: totalCount,
      filter: JSON.stringify({ userWord: null }),
    });
    arrayOfResults = arrayOfResults[0].paginatedResults;

    const arrayOfIndexes = [];
    for (let number = 0; number < count; number += 1) {
      arrayOfIndexes.push(Math.round(Math.random() * (totalCount - 1)));
    }

    const randomNewWords = [];
    arrayOfIndexes.forEach((index) => {
      randomNewWords.push(arrayOfResults[index]);
    });

    return randomNewWords;
  }
}
